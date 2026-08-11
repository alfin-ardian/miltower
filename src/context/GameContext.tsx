import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import { QUESTIONS } from "../data/questions";
import { evaluateEssay } from "../services/evaluationService";
import type {
  BlockColor,
  Difficulty,
  Duration,
  Evaluation,
  GameMode,
  GameState,
  Question,
} from "../types/game";
import { uid } from "../utils/ids";
import {
  applyStability,
  categoryFromColor,
  durationToMaxTurns,
  isGameFinished,
  nextPlayerIndex,
  pickQuestion,
} from "../utils/scoring";
import { generateTower, hasUnsupportedGap } from "../utils/tower";

const STORAGE_KEY = "mil-tower-game";
const PROFILE_KEY = "mil-tower-profile";

const initialState: GameState = {
  players: [],
  currentPlayerIndex: 0,
  turnNumber: 1,
  maxTurns: 12,
  towerStability: 85,
  selectedBlockColor: null,
  selectedBlockId: null,
  currentQuestion: null,
  currentAnswer: "",
  evaluation: null,
  gameStatus: "setup",
  history: [],
  difficulty: "medium",
  duration: 30,
  mode: "individual",
  usedQuestionIds: [],
  towerBlocks: [],
  structuralCollapse: false,
};

type Action =
  | {
      type: "SETUP";
      payload: {
        names: string[];
        mode: GameMode;
        duration: Duration;
        difficulty: Difficulty;
      };
    }
  | { type: "SELECT_BLOCK"; payload: { blockId: string; color: BlockColor } }
  | { type: "CLEAR_SELECTION" }
  | { type: "PULL_BLOCK"; payload: { question: Question } }
  | { type: "SET_ANSWER"; payload: string }
  | { type: "EVALUATION_START" }
  | { type: "EVALUATION_DONE"; payload: Evaluation }
  | { type: "CONTINUE" }
  | { type: "STRUCTURE_CHECK" }
  | { type: "RESET" };

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "SETUP": {
      const players = action.payload.names.map((name) => ({
        id: uid("player"),
        name: name.trim(),
        score: 0,
        answeredQuestions: 0,
      }));
      return {
        ...initialState,
        players,
        mode: action.payload.mode,
        duration: action.payload.duration,
        difficulty: action.payload.difficulty,
        maxTurns: durationToMaxTurns(action.payload.duration),
        towerBlocks: generateTower(),
        gameStatus: "playing",
        towerStability: 85,
        turnNumber: 1,
      };
    }
    case "SELECT_BLOCK": {
      if (state.gameStatus !== "playing" || state.structuralCollapse) return state;
      const block = state.towerBlocks.find((b) => b.id === action.payload.blockId);
      if (!block || block.removed) return state;
      return {
        ...state,
        selectedBlockId: action.payload.blockId,
        selectedBlockColor: action.payload.color,
      };
    }
    case "CLEAR_SELECTION":
      return { ...state, selectedBlockId: null, selectedBlockColor: null };
    case "PULL_BLOCK": {
      if (!state.selectedBlockId) return state;
      const towerBlocks = state.towerBlocks.map((block) =>
        block.id === state.selectedBlockId ? { ...block, removed: true } : block,
      );
      const structuralCollapse = hasUnsupportedGap(towerBlocks);
      return {
        ...state,
        towerBlocks,
        structuralCollapse,
        towerStability: structuralCollapse ? 0 : state.towerStability,
        currentQuestion: action.payload.question,
        usedQuestionIds: [...state.usedQuestionIds, action.payload.question.id],
        currentAnswer: "",
        evaluation: null,
        gameStatus: "question",
      };
    }
    case "SET_ANSWER":
      return { ...state, currentAnswer: action.payload };
    case "EVALUATION_START":
      return { ...state, gameStatus: "evaluating" };
    case "EVALUATION_DONE": {
      if (state.evaluation) return state;
      if (!state.currentQuestion) {
        return { ...state, evaluation: action.payload, gameStatus: "evaluating" };
      }
      const player = state.players[state.currentPlayerIndex];
      const nextStability = state.structuralCollapse
        ? 0
        : applyStability(state.towerStability, action.payload.score);
      const players = state.players.map((p, index) =>
        index === state.currentPlayerIndex
          ? {
              ...p,
              score: p.score + action.payload.score,
              answeredQuestions: p.answeredQuestions + 1,
            }
          : p,
      );
      const history = player
        ? [
            ...state.history,
            {
              turnNumber: state.turnNumber,
              playerId: player.id,
              playerName: player.name,
              question: state.currentQuestion,
              answer: state.currentAnswer,
              evaluation: action.payload,
              stabilityAfter: nextStability,
              blockColor: state.selectedBlockColor ?? "wood",
            },
          ]
        : state.history;
      return {
        ...state,
        evaluation: action.payload,
        towerStability: nextStability,
        players,
        history,
        gameStatus: "evaluating",
      };
    }
    case "CONTINUE": {
      if (isGameFinished(state)) {
        return { ...state, gameStatus: "finished" };
      }
      return {
        ...state,
        gameStatus: "playing",
        currentPlayerIndex: nextPlayerIndex(
          state.currentPlayerIndex,
          state.players.length,
        ),
        turnNumber: state.turnNumber + 1,
        selectedBlockColor: null,
        selectedBlockId: null,
        currentQuestion: null,
        currentAnswer: "",
        evaluation: null,
      };
    }
    case "STRUCTURE_CHECK":
      return applyStructure(state);
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
}

function applyStructure(state: GameState): GameState {
  if (state.structuralCollapse || hasUnsupportedGap(state.towerBlocks)) {
    const playing = state.gameStatus === "playing";
    return {
      ...state,
      structuralCollapse: true,
      towerStability: 0,
      gameStatus: playing ? "finished" : state.gameStatus,
    };
  }
  return state;
}

function loadState(): GameState | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GameState;
    return applyStructure({
      ...parsed,
      structuralCollapse: parsed.structuralCollapse ?? false,
    });
  } catch {
    return null;
  }
}

interface GameContextValue {
  state: GameState;
  currentPlayer: GameState["players"][number] | null;
  setupGame: (input: {
    names: string[];
    mode: GameMode;
    duration: Duration;
    difficulty: Difficulty;
  }) => void;
  selectBlock: (blockId: string, color: BlockColor) => void;
  clearSelection: () => void;
  pullSelectedBlock: () => Question | null;
  setAnswer: (value: string) => void;
  submitForEvaluation: (answer?: string, locale?: "en" | "id") => Promise<void>;
  continueGame: () => "playing" | "finished";
  resetGame: () => void;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    () => loadState() ?? initialState,
  );
  const evaluating = useRef(false);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (!state.structuralCollapse && hasUnsupportedGap(state.towerBlocks)) {
      dispatch({ type: "STRUCTURE_CHECK" });
    }
  }, [state.structuralCollapse, state.towerBlocks]);

  const currentPlayer = state.players[state.currentPlayerIndex] ?? null;

  const setupGame = useCallback(
    (input: {
      names: string[];
      mode: GameMode;
      duration: Duration;
      difficulty: Difficulty;
    }) => {
      evaluating.current = false;
      dispatch({ type: "SETUP", payload: input });
      localStorage.setItem(
        PROFILE_KEY,
        JSON.stringify({ name: input.names[0] ?? "Pemain" }),
      );
    },
    [],
  );

  const selectBlock = useCallback((blockId: string, color: BlockColor) => {
    dispatch({ type: "SELECT_BLOCK", payload: { blockId, color } });
  }, []);

  const clearSelection = useCallback(() => {
    dispatch({ type: "CLEAR_SELECTION" });
  }, []);

  const pullSelectedBlock = useCallback((): Question | null => {
    if (!state.selectedBlockColor) return null;
    const category = categoryFromColor(
      state.selectedBlockColor,
      state.turnNumber,
    );
    const question = pickQuestion(
      QUESTIONS,
      category,
      state.difficulty,
      state.usedQuestionIds,
    );
    dispatch({ type: "PULL_BLOCK", payload: { question } });
    return question;
  }, [
    state.selectedBlockColor,
    state.turnNumber,
    state.difficulty,
    state.usedQuestionIds,
  ]);

  const setAnswer = useCallback((value: string) => {
    dispatch({ type: "SET_ANSWER", payload: value });
  }, []);

  const submitForEvaluation = useCallback(async (answer?: string, locale: "en" | "id" = "en") => {
    if (evaluating.current) return;
    if (!state.currentQuestion) return;
    const text = answer ?? state.currentAnswer;
    evaluating.current = true;
    dispatch({ type: "SET_ANSWER", payload: text });
    dispatch({ type: "EVALUATION_START" });
    try {
      const result = await evaluateEssay(state.currentQuestion, text, locale);
      dispatch({ type: "EVALUATION_DONE", payload: result });
    } finally {
      evaluating.current = false;
    }
  }, [state.currentQuestion, state.currentAnswer]);

  const continueGame = useCallback((): "playing" | "finished" => {
    const finished = isGameFinished(state);
    dispatch({ type: "CONTINUE" });
    return finished ? "finished" : "playing";
  }, [state]);

  const resetGame = useCallback(() => {
    evaluating.current = false;
    dispatch({ type: "RESET" });
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo<GameContextValue>(
    () => ({
      state,
      currentPlayer,
      setupGame,
      selectBlock,
      clearSelection,
      pullSelectedBlock,
      setAnswer,
      submitForEvaluation,
      continueGame,
      resetGame,
    }),
    [
      state,
      currentPlayer,
      setupGame,
      selectBlock,
      clearSelection,
      pullSelectedBlock,
      setAnswer,
      submitForEvaluation,
      continueGame,
      resetGame,
    ],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) {
    throw new Error("useGame must be used within GameProvider");
  }
  return ctx;
}

export function readProfileName(): string {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return "Rania";
    const parsed = JSON.parse(raw) as { name?: string };
    return parsed.name?.trim() || "Rania";
  } catch {
    return "Rania";
  }
}

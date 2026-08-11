export type BlockColor = "yellow" | "orange" | "blue" | "wood";

export type CategoryId =
  | "media-literacy"
  | "information-literacy"
  | "digital-literacy";

export type Difficulty = "easy" | "medium" | "hard";

export type GameMode = "individual" | "group";

export type Duration = 20 | 30 | 40;

export type GameStatus =
  | "setup"
  | "playing"
  | "question"
  | "evaluating"
  | "finished";

export type EvaluationStatus = "strong" | "adequate" | "weak";

export type StabilityLabel = "stable" | "wobbling" | "critical" | "collapsing";

export interface Player {
  id: string;
  name: string;
  score: number;
  answeredQuestions: number;
}

export interface Question {
  id: string;
  number: number;
  category: CategoryId;
  difficulty: Difficulty;
  question: string;
  minimumWords: number;
  referenceTopics: string[];
}

export interface Rubric {
  relevance: number;
  accuracy: number;
  argumentation: number;
  completeness: number;
  clarity: number;
}

export interface Evaluation {
  score: number;
  status: EvaluationStatus;
  rubric: Rubric;
  feedback: string;
  strengths: string[];
  improvements: string[];
}

export interface TurnHistory {
  turnNumber: number;
  playerId: string;
  playerName: string;
  question: Question;
  answer: string;
  evaluation: Evaluation;
  stabilityAfter: number;
  blockColor: BlockColor;
}

export interface TowerBlockData {
  id: string;
  color: BlockColor;
  layer: number;
  index: number;
  removed: boolean;
}

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  turnNumber: number;
  maxTurns: number;
  towerStability: number;
  selectedBlockColor: BlockColor | null;
  selectedBlockId: string | null;
  currentQuestion: Question | null;
  currentAnswer: string;
  evaluation: Evaluation | null;
  gameStatus: GameStatus;
  history: TurnHistory[];
  difficulty: Difficulty;
  duration: Duration;
  mode: GameMode;
  usedQuestionIds: string[];
  towerBlocks: TowerBlockData[];
  structuralCollapse: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  hint: string;
}

export interface DashboardGame {
  id: string;
  label: string;
  score: number;
  date: string;
}

export interface TeamMember {
  name: string;
  role: string;
  initial: string;
}

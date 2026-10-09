import { CATEGORY_ORDER } from "../data/categories";
import type {
  BlockColor,
  CategoryId,
  Difficulty,
  Duration,
  Evaluation,
  GameState,
  Player,
  Question,
  StabilityLabel,
  TurnHistory,
} from "../types/game";

export function durationToMaxTurns(duration: Duration): number {
  if (duration === 20) return 8;
  if (duration === 40) return 16;
  return 12;
}

export function stabilityDelta(score: number): number {
  if (score >= 80) return 5;
  if (score >= 60) return 2;
  if (score >= 40) return -3;
  return -5;
}

export function applyStability(current: number, score: number): number {
  return Math.max(0, Math.min(100, current + stabilityDelta(score)));
}

export function getStabilityLabel(stability: number): StabilityLabel {
  if (stability >= 80) return "stable";
  if (stability >= 50) return "wobbling";
  if (stability >= 20) return "critical";
  return "collapsing";
}

export function getStabilityCopy(label: StabilityLabel): string {
  if (label === "stable") return "Stabil";
  if (label === "wobbling") return "Mulai Goyah";
  if (label === "critical") return "Kritis";
  return "Hampir Roboh";
}

export function wobbleDegrees(stability: number): number {
  if (stability >= 80) return 0.2;
  if (stability >= 50) return 1.2;
  if (stability >= 20) return 2.4;
  return 4.2;
}

export function nextPlayerIndex(current: number, playerCount: number): number {
  if (playerCount <= 0) return 0;
  return (current + 1) % playerCount;
}

export function categoryFromColor(
  color: BlockColor,
  turnNumber: number,
): CategoryId {
  // Matches MIL logo: coral → media, yellow → information, green → digital
  if (color === "orange") return "media-literacy";
  if (color === "yellow") return "information-literacy";
  if (color === "blue") return "digital-literacy";
  return CATEGORY_ORDER[(turnNumber - 1) % CATEGORY_ORDER.length];
}

export function pickQuestion(
  questions: Question[],
  category: CategoryId,
  difficulty: Difficulty,
  usedIds: string[],
): Question {
  const unused = questions.filter((q) => !usedIds.includes(q.id));
  const pool = unused.length > 0 ? unused : questions;

  const exact = pool.filter(
    (q) => q.category === category && q.difficulty === difficulty,
  );
  if (exact.length > 0) return exact[turnPick(exact.length, usedIds.length)];

  const byCategory = pool.filter((q) => q.category === category);
  if (byCategory.length > 0) {
    return byCategory[turnPick(byCategory.length, usedIds.length)];
  }

  return pool[turnPick(pool.length, usedIds.length)];
}

function turnPick(length: number, salt: number): number {
  return salt % length;
}

export function winnerOf(players: Player[]): Player[] {
  if (players.length === 0) return [];
  const highest = Math.max(...players.map((p) => p.score));
  return players.filter((p) => p.score === highest);
}

export function categoryAverages(
  history: TurnHistory[],
): Record<CategoryId, number | null> {
  const result = {
    "media-literacy": null as number | null,
    "information-literacy": null as number | null,
    "digital-literacy": null as number | null,
  };

  for (const category of CATEGORY_ORDER) {
    const items = history.filter((h) => h.question.category === category);
    if (items.length === 0) continue;
    const avg =
      items.reduce((sum, item) => sum + item.evaluation.score, 0) /
      items.length;
    result[category] = Math.round(avg);
  }

  return result;
}

export function bestAndWeakest(history: TurnHistory[]): {
  best: TurnHistory | null;
  weakest: TurnHistory | null;
} {
  if (history.length === 0) return { best: null, weakest: null };
  const sorted = [...history].sort(
    (a, b) => b.evaluation.score - a.evaluation.score,
  );
  return { best: sorted[0], weakest: sorted[sorted.length - 1] };
}

export function questionTimerSeconds(difficulty: Difficulty): number {
  if (difficulty === "easy") return 180;
  if (difficulty === "hard") return 150;
  return 165;
}

export function isGameFinished(
  state: Pick<
    GameState,
    "towerStability" | "turnNumber" | "maxTurns" | "structuralCollapse"
  >,
): boolean {
  return (
    state.towerStability <= 0 ||
    state.structuralCollapse ||
    state.turnNumber >= state.maxTurns
  );
}

export function evaluationStatusLabel(status: Evaluation["status"]): string {
  if (status === "strong") return "Jawaban Kuat";
  if (status === "adequate") return "Cukup Baik";
  return "Perlu Diperkuat";
}

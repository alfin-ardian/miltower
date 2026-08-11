import type { Badge, TurnHistory } from "../types/game";

export const BADGES: Badge[] = [
  {
    id: "fact-checker",
    name: "Fact Checker",
    description: "Rajin menahan diri sebelum percaya dan membagikan klaim.",
    hint: "Raih skor ≥ 80 pada Literasi Media.",
  },
  {
    id: "source-hunter",
    name: "Source Hunter",
    description: "Cepat menelusuri siapa yang bicara dan dari mana buktinya.",
    hint: "Raih skor ≥ 80 pada Literasi Informasi.",
  },
  {
    id: "critical-thinker",
    name: "Critical Thinker",
    description: "Menimbang argumen, bukan hanya mengulang opini yang ramai.",
    hint: "Rata-rata skor seluruh jawaban ≥ 85.",
  },
  {
    id: "digital-guardian",
    name: "Digital Guardian",
    description: "Menjaga akun, data, dan ruang digital teman-teman.",
    hint: "Raih skor ≥ 80 pada Literasi Digital.",
  },
  {
    id: "tower-keeper",
    name: "Tower Keeper",
    description: "Menara masih berdiri karena keputusan yang cukup hati-hati.",
    hint: "Akhiri permainan dengan stabilitas di atas 70.",
  },
];

export function earnedBadgeIds(
  history: TurnHistory[],
  finalStability: number,
): string[] {
  if (history.length === 0) return [];

  const avg =
    history.reduce((sum, item) => sum + item.evaluation.score, 0) /
    history.length;

  const bestByCategory = (category: TurnHistory["question"]["category"]) => {
    const items = history.filter((h) => h.question.category === category);
    if (items.length === 0) return 0;
    return Math.max(...items.map((h) => h.evaluation.score));
  };

  const earned: string[] = [];
  if (bestByCategory("media-literacy") >= 80) earned.push("fact-checker");
  if (bestByCategory("information-literacy") >= 80) earned.push("source-hunter");
  if (avg >= 85) earned.push("critical-thinker");
  if (bestByCategory("digital-literacy") >= 80) earned.push("digital-guardian");
  if (finalStability > 70) earned.push("tower-keeper");
  return earned;
}

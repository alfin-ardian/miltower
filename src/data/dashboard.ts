import type { DashboardGame } from "../types/game";

export const DASHBOARD_STATS = {
  totalScore: 1280,
  gamesPlayed: 12,
  averageScore: 84,
  badgeCount: 7,
  playerName: "Rania",
  recommendation:
    "Latih kemampuan memverifikasi sumber dan konteks informasi.",
};

export const DASHBOARD_PERFORMANCE = [
  { category: "Media Literacy", value: 88, color: "#FFC928" },
  { category: "Information Literacy", value: 76, color: "#F4512A" },
  { category: "Digital Literacy", value: 91, color: "#1769AA" },
];

export const DASHBOARD_HISTORY: DashboardGame[] = [
  { id: "g12", label: "Game #12", score: 89, date: "12 Aug 2026" },
  { id: "g11", label: "Game #11", score: 76, date: "10 Aug 2026" },
  { id: "g10", label: "Game #10", score: 92, date: "08 Aug 2026" },
  { id: "g09", label: "Game #9", score: 81, date: "03 Aug 2026" },
  { id: "g08", label: "Game #8", score: 70, date: "28 Jul 2026" },
];

export const DASHBOARD_BADGE_IDS = [
  "fact-checker",
  "source-hunter",
  "critical-thinker",
  "digital-guardian",
  "tower-keeper",
];

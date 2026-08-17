import type { TeamMember } from "../types/game";

export const TEAM: TeamMember[] = [
  {
    name: "Riris Rhegita Chayani",
    role: "Konsep & Riset Kartu",
    initial: "RR",
  },
  {
    name: "Alfi Syakilah Mayah Shafa",
    role: "Mekanisme & Aturan Main",
    initial: "AS",
  },
  {
    name: "Novia Salsabila",
    role: "Desain Visual Balok",
    initial: "NS",
  },
  {
    name: "Alfin Ardian",
    role: "Pengembangan Antarmuka",
    initial: "AA",
  },
];

export const SOCIALS = [
  { label: "Instagram", handle: "@miltower.id", href: "https://instagram.com" },
  { label: "YouTube", handle: "MIL Tower", href: "https://youtube.com" },
  { label: "Twitter", handle: "@miltower", href: "https://x.com" },
] as const;

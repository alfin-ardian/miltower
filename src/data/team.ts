import type { TeamMember } from "../types/game";

export const TEAM: TeamMember[] = [
  {
    name: "Rania Azzahra Putri",
    role: "Konsep & Riset Kartu",
    initial: "RA",
  },
  {
    name: "Bagas Wicaksono",
    role: "Mekanisme & Aturan Main",
    initial: "BW",
  },
  {
    name: "Nadia Putri Maharani",
    role: "Desain Visual Balok",
    initial: "NP",
  },
  {
    name: "Fikri Ramadhan",
    role: "Pengembangan Antarmuka",
    initial: "FR",
  },
  {
    name: "Aulia Khairunnisa",
    role: "Konten Literasi Media",
    initial: "AK",
  },
];

export const SOCIALS = [
  { label: "Instagram", handle: "@miltower.id", href: "https://instagram.com" },
  { label: "YouTube", handle: "MIL Tower", href: "https://youtube.com" },
  { label: "Twitter", handle: "@miltower", href: "https://x.com" },
] as const;

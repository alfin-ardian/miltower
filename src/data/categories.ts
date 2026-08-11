import type { BlockColor, CategoryId } from "../types/game";

export interface CategoryMeta {
  id: CategoryId;
  label: string;
  labelId: string;
  color: Exclude<BlockColor, "wood">;
  hex: string;
  blurb: string;
}

export const CATEGORIES: Record<CategoryId, CategoryMeta> = {
  "media-literacy": {
    id: "media-literacy",
    label: "Media Literacy",
    labelId: "Literasi Media",
    color: "yellow",
    hex: "#FFC928",
    blurb: "Membaca pesan, bingkai, dan kepentingan di balik konten yang beredar.",
  },
  "information-literacy": {
    id: "information-literacy",
    label: "Information Literacy",
    labelId: "Literasi Informasi",
    color: "orange",
    hex: "#F4512A",
    blurb: "Menelusuri sumber, membandingkan klaim, dan menimbang bukti.",
  },
  "digital-literacy": {
    id: "digital-literacy",
    label: "Digital Literacy",
    labelId: "Literasi Digital",
    color: "blue",
    hex: "#1769AA",
    blurb: "Menjaga akun, privasi, dan keputusan aman di ruang daring.",
  },
};

export const CATEGORY_ORDER: CategoryId[] = [
  "media-literacy",
  "information-literacy",
  "digital-literacy",
];

export const COLOR_LABEL: Record<BlockColor, string> = {
  yellow: "Balok Kuning",
  orange: "Balok Oranye",
  blue: "Balok Biru",
  wood: "Balok Kayu",
};

import type { BlockColor, CategoryId, StabilityLabel } from "../types/game";

const COLOR_KEY: Record<BlockColor, string> = {
  yellow: "game.yellow",
  orange: "game.orange",
  blue: "game.blue",
  wood: "game.wood",
};

const CATEGORY_KEY: Record<CategoryId, string> = {
  "media-literacy": "game.catMedia",
  "information-literacy": "game.catInfo",
  "digital-literacy": "game.catDigital",
};

const CATEGORY_BLURB: Record<CategoryId, string> = {
  "media-literacy": "game.blurbMedia",
  "information-literacy": "game.blurbInfo",
  "digital-literacy": "game.blurbDigital",
};

const STABILITY_KEY: Record<StabilityLabel, string> = {
  stable: "game.stable",
  wobbling: "game.wobbling",
  critical: "game.critical",
  collapsing: "game.collapsing",
};

export function colorKey(color: BlockColor): string {
  return COLOR_KEY[color];
}

export function categoryKey(id: CategoryId): string {
  return CATEGORY_KEY[id];
}

export function categoryBlurbKey(id: CategoryId): string {
  return CATEGORY_BLURB[id];
}

export function stabilityKey(label: StabilityLabel): string {
  return STABILITY_KEY[label];
}

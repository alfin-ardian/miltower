import type { BlockColor, TowerBlockData } from "../types/game";

const LAYER_COLORS: BlockColor[][] = [
  ["wood", "wood", "yellow"],
  ["orange", "wood", "wood"],
  ["wood", "blue", "wood"],
  ["wood", "wood", "wood"],
  ["yellow", "wood", "orange"],
  ["wood", "wood", "blue"],
  ["wood", "yellow", "wood"],
  ["blue", "wood", "wood"],
  ["wood", "orange", "wood"],
  ["wood", "wood", "yellow"],
  ["orange", "wood", "blue"],
  ["wood", "wood", "wood"],
];

export function generateTower(): TowerBlockData[] {
  const blocks: TowerBlockData[] = [];
  LAYER_COLORS.forEach((row, layer) => {
    row.forEach((color, index) => {
      blocks.push({
        id: `block-${layer}-${index}`,
        color,
        layer,
        index,
        removed: false,
      });
    });
  });
  return blocks;
}

export function layersFrom(blocks: TowerBlockData[]): TowerBlockData[][] {
  if (blocks.length === 0) return [];
  const maxLayer = blocks.reduce((max, b) => Math.max(max, b.layer), 0);
  const layers: TowerBlockData[][] = [];
  for (let i = 0; i <= maxLayer; i += 1) {
    layers.push(
      blocks.filter((b) => b.layer === i).sort((a, b) => a.index - b.index),
    );
  }
  return layers;
}

function layerHasBlock(row: TowerBlockData[]): boolean {
  return row.some((block) => !block.removed);
}

/** Empty layer under remaining blocks — the tower cannot stand. */
export function hasUnsupportedGap(blocks: TowerBlockData[]): boolean {
  const layers = layersFrom(blocks);
  let seenEmpty = false;
  for (const row of layers) {
    if (!layerHasBlock(row)) {
      seenEmpty = true;
      continue;
    }
    if (seenEmpty) return true;
  }
  return false;
}

export function wouldCauseCollapse(
  blocks: TowerBlockData[],
  blockId: string,
): boolean {
  const next = blocks.map((block) =>
    block.id === blockId ? { ...block, removed: true } : block,
  );
  return hasUnsupportedGap(next);
}

/** Layers that still have at least one block, used only when the tower stands. */
export function standingLayers(blocks: TowerBlockData[]): TowerBlockData[][] {
  return layersFrom(blocks).filter(layerHasBlock);
}

function hashId(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export interface FallenBlock {
  block: TowerBlockData;
  x: number;
  y: number;
  rotate: number;
}

export function fallenLayout(blocks: TowerBlockData[]): FallenBlock[] {
  const remaining = blocks.filter((block) => !block.removed);
  return remaining.map((block, index) => {
    const hash = hashId(block.id);
    const col = index % 4;
    const row = Math.floor(index / 4);
    return {
      block,
      x: col * 38 + (hash % 18) - 4,
      y: row * 10 + (hash % 8),
      rotate: (hash % 56) - 28,
    };
  });
}

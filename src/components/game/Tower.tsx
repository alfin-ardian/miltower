import { CATEGORIES } from "../../data/categories";
import { useI18n } from "../../i18n/LanguageContext";
import { categoryKey, colorKey } from "../../i18n/labels";
import type { BlockColor, TowerBlockData } from "../../types/game";
import { categoryFromColor, wobbleDegrees } from "../../utils/scoring";
import {
  fallenLayout,
  hasUnsupportedGap,
  standingLayers,
} from "../../utils/tower";
import { cn } from "../../utils/cn";
import { TowerBlock } from "./TowerBlock";

const fill: Record<BlockColor, string> = {
  wood: "wood-fill",
  yellow: "bg-yellow",
  orange: "bg-orange",
  blue: "bg-blue",
};

export function Tower({
  blocks,
  selectedId,
  pullingId,
  stability,
  turnNumber,
  collapsed,
  onSelect,
}: {
  blocks: TowerBlockData[];
  selectedId: string | null;
  pullingId: string | null;
  stability: number;
  turnNumber: number;
  collapsed?: boolean;
  onSelect?: (block: TowerBlockData) => void;
}) {
  const { t } = useI18n();
  const isCollapsed =
    collapsed || stability <= 0 || hasUnsupportedGap(blocks);
  const layers = standingLayers(blocks);
  const wobble = wobbleDegrees(stability);

  function blockLabel(color: BlockColor, layer: number): string {
    const category = CATEGORIES[categoryFromColor(color, turnNumber)];
    return `${t(colorKey(color))}, ${t(categoryKey(category.id))}, ${t("game.layer", { n: layer + 1 })}`;
  }

  return (
    <div className="flex flex-col items-center">
      {isCollapsed ? (
        <CollapsedPile blocks={blocks} />
      ) : (
        <div
          className="animate-wobble flex flex-col-reverse items-center gap-[3px]"
          style={{ ["--wobble" as string]: `${wobble}deg` }}
          role="group"
          aria-label={t("a11y.tower")}
        >
          {layers.map((row, layer) => (
            <div key={row[0]?.layer ?? layer} className="flex gap-[3px]">
              {row.map((block) =>
                block.removed ? (
                  <div
                    key={block.id}
                    className="h-7 w-[4.35rem] rounded-[4px] border border-dashed border-navy/25 md:h-8 md:w-[4.8rem]"
                    aria-hidden="true"
                  />
                ) : (
                  <TowerBlock
                    key={block.id}
                    color={block.color}
                    selected={selectedId === block.id}
                    pulling={pullingId === block.id}
                    offsetLayer={layer % 2 === 1}
                    label={blockLabel(block.color, layer)}
                    onClick={() => onSelect?.(block)}
                  />
                ),
              )}
            </div>
          ))}
        </div>
      )}
      <div className="mt-2 h-3 w-48 rounded-sm border-2 border-navy bg-[#8b5a24] md:w-56" />
      <p className="mt-3 text-center text-xs text-navy/55">
        {isCollapsed ? t("game.collapsedHint") : t("game.pickHint")}
      </p>
    </div>
  );
}

function CollapsedPile({ blocks }: { blocks: TowerBlockData[] }) {
  const { t } = useI18n();
  const fallen = fallenLayout(blocks);

  return (
    <div
      className="relative h-44 w-56 md:h-48 md:w-64"
      role="img"
      aria-label={t("a11y.towerCollapsed")}
    >
      {fallen.map((item, index) => (
        <div
          key={item.block.id}
          className={cn(
            "absolute h-7 w-[4.35rem] rounded-[4px] border-2 border-navy md:h-8 md:w-[4.8rem]",
            fill[item.block.color],
            "animate-collapse-fall",
          )}
          style={{
            left: item.x,
            bottom: item.y,
            ["--rot" as string]: `${item.rotate}deg`,
            animationDelay: `${index * 18}ms`,
          }}
        />
      ))}
    </div>
  );
}

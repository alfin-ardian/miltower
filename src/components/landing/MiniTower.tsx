import { cn } from "../../utils/cn";
import type { BlockColor } from "../../types/game";

const LAYERS: BlockColor[][] = [
  ["wood", "yellow", "wood"],
  ["wood", "wood", "blue"],
  ["orange", "wood", "wood"],
  ["wood", "yellow", "wood"],
  ["blue", "wood", "orange"],
  ["wood", "wood", "yellow"],
  ["wood", "blue", "wood"],
  ["orange", "wood", "wood"],
];

const fill: Record<BlockColor, string> = {
  wood: "wood-fill",
  yellow: "bg-yellow",
  orange: "bg-orange",
  blue: "bg-blue",
};

export function MiniTower({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn("flex flex-col-reverse items-center gap-[3px]", className)}
      aria-hidden="true"
    >
      {LAYERS.slice(0, compact ? 5 : 8).map((row, layer) => (
        <div
          key={layer}
          className={cn("flex gap-[3px]", layer % 2 === 1 && "translate-x-1")}
        >
          {row.map((color, index) => (
            <span
              key={`${layer}-${index}`}
              className={cn(
                "rounded-[3px] border-[1.5px] border-navy",
                compact ? "h-3.5 w-9" : "h-5 w-12 md:h-6 md:w-[3.4rem]",
                fill[color],
              )}
            />
          ))}
        </div>
      ))}
      <div
        className={cn(
          "rounded-sm border-[1.5px] border-navy bg-[#8b5a24]",
          compact ? "mt-1 h-2 w-28" : "mt-1.5 h-3 w-44",
        )}
      />
    </div>
  );
}

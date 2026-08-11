import { cn } from "../../utils/cn";
import type { BlockColor } from "../../types/game";

const fill: Record<BlockColor, string> = {
  wood: "wood-fill",
  yellow: "bg-yellow",
  orange: "bg-orange",
  blue: "bg-blue",
};

export function TowerBlock({
  color,
  selected,
  pulling,
  offsetLayer,
  label,
  onClick,
}: {
  color: BlockColor;
  selected: boolean;
  pulling: boolean;
  offsetLayer: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={selected}
      className={cn(
        "h-7 w-[4.35rem] rounded-[4px] border-2 border-navy transition md:h-8 md:w-[4.8rem]",
        fill[color],
        offsetLayer && "translate-x-0.5",
        selected && "z-10 scale-110 ring-2 ring-navy ring-offset-2 ring-offset-cream",
        pulling && "animate-pull",
        "hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-offset-2",
      )}
    />
  );
}

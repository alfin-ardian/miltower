import { useI18n } from "../../i18n/LanguageContext";
import { stabilityKey } from "../../i18n/labels";
import { getStabilityLabel } from "../../utils/scoring";
import { cn } from "../../utils/cn";

export function TowerStability({ value }: { value: number }) {
  const { t } = useI18n();
  const label = getStabilityLabel(value);
  const copy = t(stabilityKey(label));
  const barColor =
    label === "stable"
      ? "bg-blue"
      : label === "wobbling"
        ? "bg-yellow"
        : "bg-orange";

  return (
    <section className="card-editorial p-5" aria-labelledby="stability-heading">
      <p
        id="stability-heading"
        className="font-display text-[11px] font-extrabold uppercase tracking-[0.16em] text-navy/60"
      >
        {t("game.stability")}
      </p>
      <div className="mt-2 flex items-end justify-between">
        <p className="font-display text-4xl font-black tracking-tight text-navy">
          {Math.round(value)}%
        </p>
        <p
          className={cn(
            "rounded-full px-3 py-1 font-display text-[10px] font-extrabold uppercase tracking-wider",
            label === "stable" && "bg-blue/15 text-blue",
            label === "wobbling" && "bg-yellow text-navy",
            label === "critical" && "bg-orange/15 text-orange",
            label === "collapsing" && "bg-orange text-navy",
          )}
        >
          {copy}
        </p>
      </div>
      <div
        className="mt-4 h-3 overflow-hidden rounded-full border-2 border-navy bg-cream-dark"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(value)}
        aria-label={t("a11y.stability")}
      >
        <div
          className={cn("h-full transition-all duration-700", barColor)}
          style={{ width: `${Math.max(4, value)}%` }}
        />
      </div>
    </section>
  );
}

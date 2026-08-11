import { useI18n } from "../../i18n/LanguageContext";
import type { Rubric } from "../../types/game";

const ITEMS: Array<{ key: keyof Rubric; labelKey: string; max: number }> = [
  { key: "relevance", labelKey: "eval.relevance", max: 25 },
  { key: "accuracy", labelKey: "eval.accuracy", max: 25 },
  { key: "argumentation", labelKey: "eval.argumentation", max: 25 },
  { key: "completeness", labelKey: "eval.completeness", max: 15 },
  { key: "clarity", labelKey: "eval.clarity", max: 10 },
];

export function RubricScore({ rubric }: { rubric: Rubric }) {
  const { t } = useI18n();

  return (
    <ul className="space-y-3">
      {ITEMS.map((item) => {
        const value = rubric[item.key];
        const pct = (value / item.max) * 100;
        return (
          <li key={item.key}>
            <div className="mb-1 flex justify-between font-display text-[11px] font-extrabold uppercase tracking-wider">
              <span>{t(item.labelKey)}</span>
              <span>
                {value} / {item.max}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full border border-navy bg-cream-dark">
              <div
                className="h-full bg-navy transition-all duration-700"
                style={{ width: `${pct}%` }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

import { ArrowRight, Check } from "lucide-react";
import type { Evaluation } from "../../types/game";
import { stabilityDelta } from "../../utils/scoring";
import { useCountUp } from "../../hooks/useCountUp";
import { useI18n } from "../../i18n/LanguageContext";
import { RubricScore } from "./RubricScore";
import { cn } from "../../utils/cn";

export function EvaluationResult({ evaluation }: { evaluation: Evaluation }) {
  const { t } = useI18n();
  const score = useCountUp(evaluation.score, 1000);
  const delta = stabilityDelta(evaluation.score);
  const statusKey =
    evaluation.status === "strong"
      ? "eval.strong"
      : evaluation.status === "adequate"
        ? "eval.adequate"
        : "eval.weak";

  return (
    <div className="animate-fade-up grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="card-editorial p-6 md:p-8">
        <p className="font-display text-[11px] font-extrabold uppercase tracking-[0.18em] text-navy/50">
          {t("eval.result")}
        </p>
        <p className="mt-3 font-display text-6xl font-black tracking-tight text-navy">
          {score}
          <span className="text-2xl text-navy/40"> / 100</span>
        </p>
        <p
          className={cn(
            "mt-4 inline-flex rounded-full px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-wider",
            evaluation.status === "strong" && "bg-yellow text-navy",
            evaluation.status === "adequate" && "bg-blue/15 text-blue",
            evaluation.status === "weak" && "bg-orange/15 text-orange",
          )}
        >
          {t(statusKey)}
        </p>
        <p className="mt-4 text-sm text-navy/70">
          {t("eval.stability")} {delta >= 0 ? "+" : ""}
          {delta}
        </p>
        <div className="mt-6">
          <RubricScore rubric={evaluation.rubric} />
        </div>
      </section>

      <section className="space-y-4">
        <div className="card-editorial p-6">
          <h2 className="font-display text-sm font-extrabold uppercase tracking-wider text-navy">
            {t("eval.feedback")}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-navy/80">
            {evaluation.feedback}
          </p>
        </div>
        <div className="card-editorial p-6">
          <h2 className="font-display text-sm font-extrabold uppercase tracking-wider text-navy">
            {t("eval.strengths")}
          </h2>
          <ul className="mt-3 space-y-2">
            {evaluation.strengths.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-navy">
                <Check size={16} className="mt-0.5 text-blue" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="card-editorial p-6">
          <h2 className="font-display text-sm font-extrabold uppercase tracking-wider text-navy">
            {t("eval.improve")}
          </h2>
          <ul className="mt-3 space-y-2">
            {evaluation.improvements.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-navy">
                <ArrowRight size={16} className="mt-0.5 text-orange" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

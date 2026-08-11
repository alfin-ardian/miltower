import { CATEGORIES } from "../../data/categories";
import { questionText } from "../../data/questionEn";
import { useI18n } from "../../i18n/LanguageContext";
import { categoryKey } from "../../i18n/labels";
import type { Question } from "../../types/game";

export function QuestionCard({ question }: { question: Question }) {
  const { t, locale } = useI18n();
  const category = CATEGORIES[question.category];

  return (
    <article className="card-editorial animate-fade-up p-6 md:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-orange">
          {t("question.card", { n: String(question.number).padStart(2, "0") })}
        </p>
        <span
          className="rounded-full border-2 border-navy px-3 py-0.5 font-display text-[10px] font-extrabold uppercase tracking-wider"
          style={{ background: category.hex }}
        >
          {t(categoryKey(question.category))}
        </span>
        <span className="rounded-full bg-cream-dark px-3 py-0.5 font-display text-[10px] font-extrabold uppercase tracking-wider text-navy">
          {t(`setup.${question.difficulty}`)}
        </span>
      </div>
      <h1 className="mt-5 font-display text-2xl font-extrabold leading-snug text-navy md:text-[1.75rem]">
        “{questionText(question, locale)}”
      </h1>
    </article>
  );
}

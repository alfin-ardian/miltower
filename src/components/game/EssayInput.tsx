import { useI18n } from "../../i18n/LanguageContext";
import { countWords } from "../../utils/words";

export function EssayInput({
  value,
  onChange,
  id = "essay-answer",
}: {
  value: string;
  onChange: (value: string) => void;
  id?: string;
}) {
  const { t } = useI18n();
  const words = countWords(value);

  return (
    <div>
      <label
        htmlFor={id}
        className="font-display text-[11px] font-extrabold uppercase tracking-[0.16em] text-navy/60"
      >
        {t("question.essay")}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={t("question.placeholder")}
        rows={10}
        className="mt-2 w-full resize-y rounded-xl border-2 border-navy bg-white p-4 text-base leading-relaxed text-navy placeholder:text-navy/35 focus-visible:outline-offset-2"
      />
      <p
        className="mt-2 text-right font-display text-sm font-extrabold text-navy/60"
        aria-live="polite"
      >
        {t("question.words", { n: words })}
      </p>
    </div>
  );
}

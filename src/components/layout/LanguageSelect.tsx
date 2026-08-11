import { useI18n } from "../../i18n/LanguageContext";
import { LOCALES, type Locale } from "../../i18n/translations";
import { cn } from "../../utils/cn";

export function LanguageSelect({ className }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <label className={cn("inline-flex items-center", className)}>
      <span className="sr-only">{t("a11y.language")}</span>
      <select
        value={locale}
        onChange={(event) => setLocale(event.target.value as Locale)}
        className="h-11 cursor-pointer rounded-md border-2 border-navy bg-white px-2.5 font-display text-xs font-extrabold uppercase tracking-wider text-navy focus-visible:outline-offset-2"
        aria-label={t("a11y.language")}
      >
        {LOCALES.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </label>
  );
}

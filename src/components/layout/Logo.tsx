import { Link } from "react-router-dom";
import { useI18n } from "../../i18n/LanguageContext";
import { cn } from "../../utils/cn";

export function Logo({
  inverted = false,
  to = "/",
}: {
  inverted?: boolean;
  to?: string;
}) {
  const { t } = useI18n();

  return (
    <Link
      to={to}
      className="flex items-center gap-2.5 focus-visible:outline-offset-4"
      aria-label={t("a11y.home")}
    >
      <span className="grid h-9 w-9 place-items-center rounded-sm bg-orange font-display text-sm font-extrabold text-white">
        MT
      </span>
      <span
        className={cn(
          "font-display text-lg font-extrabold tracking-tight",
          inverted ? "text-white" : "text-navy",
        )}
      >
        MIL TOWER
      </span>
    </Link>
  );
}

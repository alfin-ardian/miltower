import { Link } from "react-router-dom";
import milLogo from "../../assets/mil-logo-transparent.png";
import { useI18n } from "../../i18n/LanguageContext";
import { cn } from "../../utils/cn";

export function Logo({
  to = "/",
  compact = false,
}: {
  inverted?: boolean;
  to?: string;
  compact?: boolean;
}) {
  const { t } = useI18n();

  return (
    <Link
      to={to}
      className="inline-flex items-center focus-visible:outline-offset-4"
      aria-label={t("a11y.home")}
    >
      <img
        src={milLogo}
        alt="MIL — Media Information Literacy"
        className={cn(
          "w-auto object-contain object-left",
          compact ? "h-10 sm:h-11" : "h-12 sm:h-14",
        )}
      />
    </Link>
  );
}

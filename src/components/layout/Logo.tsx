import { Link } from "react-router-dom";
import milLogo from "../../assets/mil-logo.png";
import { useI18n } from "../../i18n/LanguageContext";
import { cn } from "../../utils/cn";

export function Logo({
  inverted = false,
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
      className={cn(
        "inline-flex items-center focus-visible:outline-offset-4",
        inverted && "rounded-md bg-white/95 px-2 py-1",
      )}
      aria-label={t("a11y.home")}
    >
      <img
        src={milLogo}
        alt="MIL — Media Information Literacy"
        className={cn(
          "w-auto object-contain",
          compact ? "h-9" : "h-11 sm:h-12",
        )}
      />
    </Link>
  );
}

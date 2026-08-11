import { Award } from "lucide-react";
import type { Badge } from "../../types/game";
import { useI18n } from "../../i18n/LanguageContext";
import { cn } from "../../utils/cn";

export function BadgeCard({
  badge,
  earned,
}: {
  badge: Badge;
  earned: boolean;
}) {
  const { t } = useI18n();

  return (
    <article
      className={cn(
        "card-editorial p-4",
        earned ? "bg-white" : "bg-cream-dark opacity-70",
      )}
    >
      <Award
        size={22}
        className={earned ? "text-orange" : "text-navy/40"}
      />
      <h3 className="mt-3 font-display text-xs font-extrabold uppercase tracking-wider text-navy">
        {badge.name}
      </h3>
      <p className="mt-1 text-xs leading-relaxed text-navy/65">
        {earned
          ? t(`badges.${badge.id}.d`)
          : t(`badges.${badge.id}.h`)}
      </p>
    </article>
  );
}

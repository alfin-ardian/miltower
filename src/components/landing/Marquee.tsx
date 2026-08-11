import { BookOpen, Lightbulb, Search, Share2, Shield } from "lucide-react";
import { useI18n } from "../../i18n/LanguageContext";

export function Marquee() {
  const { t } = useI18n();
  const items = [
    { label: t("marquee.fact"), icon: Search },
    { label: t("marquee.share"), icon: Share2 },
    { label: t("marquee.read"), icon: BookOpen },
    { label: t("marquee.source"), icon: Shield },
    { label: t("marquee.context"), icon: Lightbulb },
  ];
  const loop = [...items, ...items];

  return (
    <div className="overflow-hidden bg-navy py-3" aria-hidden="true">
      <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
        {loop.map((item, index) => {
          const Icon = item.icon;
          return (
            <span
              key={`${item.label}-${index}`}
              className="inline-flex items-center gap-3 font-display text-sm font-extrabold uppercase tracking-[0.18em] text-white"
            >
              <Icon className="text-yellow" size={16} />
              {item.label}
              <span className="text-yellow">◆</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

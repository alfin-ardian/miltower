import { Clock3, Layers, Sparkles, Users } from "lucide-react";
import { PageContainer } from "../layout/PageContainer";
import { useI18n } from "../../i18n/LanguageContext";

export function GameStats() {
  const { t } = useI18n();
  const stats = [
    { value: "2–6", label: t("stats.players"), icon: Users },
    { value: "20–40", label: t("stats.minutes"), icon: Clock3 },
    { value: "100+", label: t("stats.cards"), icon: Sparkles },
    { value: "3", label: t("stats.categories"), icon: Layers },
  ];

  return (
    <section className="border-y-2 border-navy/10 bg-cream-dark py-8">
      <PageContainer className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="flex items-start gap-3">
              <Icon className="mt-1 text-navy" size={22} strokeWidth={1.8} />
              <div>
                <p className="font-display text-3xl font-black tracking-tight text-navy">
                  {stat.value}
                </p>
                <p className="text-sm text-navy/65">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </PageContainer>
    </section>
  );
}

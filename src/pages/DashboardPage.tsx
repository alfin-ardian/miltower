import { Award, Gamepad2, Sparkles, Target } from "lucide-react";
import { BadgeCard } from "../components/dashboard/BadgeCard";
import { GameHistory } from "../components/dashboard/GameHistory";
import { PerformanceChart } from "../components/dashboard/PerformanceChart";
import { StatCard } from "../components/dashboard/StatCard";
import { PageContainer } from "../components/layout/PageContainer";
import { ButtonLink } from "../components/ui/Button";
import { readProfileName } from "../context/GameContext";
import { BADGES } from "../data/badges";
import {
  DASHBOARD_BADGE_IDS,
  DASHBOARD_HISTORY,
  DASHBOARD_PERFORMANCE,
  DASHBOARD_STATS,
} from "../data/dashboard";
import { useI18n } from "../i18n/LanguageContext";

export function DashboardPage() {
  const { locale, t } = useI18n();
  const name = readProfileName();

  return (
    <section className="py-12 md:py-16">
      <PageContainer className="space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-orange">
              {t("dash.eyebrow")}
            </p>
            <h1 className="mt-2 font-display text-4xl font-black tracking-tight text-navy md:text-5xl">
              {t("dash.hello", { name })}
            </h1>
            <p className="mt-2 max-w-xl text-navy/70">{t("dash.body")}</p>
          </div>
          <ButtonLink to="/game/setup">{t("cta.playAgainArrow")}</ButtonLink>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label={t("dash.total")}
            value={DASHBOARD_STATS.totalScore.toLocaleString(
              locale === "id" ? "id-ID" : "en-US",
            )}
            icon={<Sparkles size={18} />}
          />
          <StatCard
            label={t("dash.played")}
            value={String(DASHBOARD_STATS.gamesPlayed)}
            icon={<Gamepad2 size={18} />}
          />
          <StatCard
            label={t("dash.average")}
            value={`${DASHBOARD_STATS.averageScore}%`}
            icon={<Target size={18} />}
          />
          <StatCard
            label={t("dash.badges")}
            value={String(DASHBOARD_STATS.badgeCount)}
            icon={<Award size={18} />}
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <PerformanceChart items={DASHBOARD_PERFORMANCE} />
          <GameHistory games={DASHBOARD_HISTORY} />
        </div>

        <section>
          <h2 className="mb-4 font-display text-sm font-extrabold uppercase tracking-wider text-navy">
            {t("result.badges")}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {BADGES.map((badge) => (
              <BadgeCard
                key={badge.id}
                badge={badge}
                earned={DASHBOARD_BADGE_IDS.includes(badge.id)}
              />
            ))}
          </div>
        </section>

        <aside className="rounded-2xl border-2 border-navy bg-navy p-6 text-white">
          <p className="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-yellow">
            {t("dash.rec")}
          </p>
          <p className="mt-3 text-lg font-medium leading-relaxed">
            “{t("dash.recBody")}”
          </p>
        </aside>
      </PageContainer>
    </section>
  );
}

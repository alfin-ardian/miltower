import { Navigate, useNavigate } from "react-router-dom";
import { Award, Trophy } from "lucide-react";
import { BadgeCard } from "../components/dashboard/BadgeCard";
import { Tower } from "../components/game/Tower";
import { LanguageSelect } from "../components/layout/LanguageSelect";
import { Logo } from "../components/layout/Logo";
import { PageContainer } from "../components/layout/PageContainer";
import { Button } from "../components/ui/Button";
import { useGame } from "../context/GameContext";
import { questionText } from "../data/questionEn";
import { BADGES, earnedBadgeIds } from "../data/badges";
import { CATEGORY_ORDER } from "../data/categories";
import { useI18n } from "../i18n/LanguageContext";
import { categoryKey } from "../i18n/labels";
import {
  bestAndWeakest,
  categoryAverages,
  winnerOf,
} from "../utils/scoring";

export function GameResultPage() {
  const navigate = useNavigate();
  const { locale, t } = useI18n();
  const { state, resetGame } = useGame();

  if (state.players.length === 0) {
    return <Navigate to="/game/setup" replace />;
  }
  if (state.gameStatus !== "finished" && state.history.length === 0) {
    return <Navigate to="/game" replace />;
  }

  const collapsed = state.towerStability <= 0 || state.structuralCollapse;
  const winners = winnerOf(state.players);
  const averages = categoryAverages(state.history);
  const { best, weakest } = bestAndWeakest(state.history);
  const badges = earnedBadgeIds(state.history, state.towerStability);

  function playAgain() {
    resetGame();
    navigate("/game/setup");
  }

  return (
    <section className="py-12 md:py-16">
      <PageContainer className="max-w-4xl space-y-8">
        <div className="flex items-center justify-between gap-3">
          <Logo />
          <LanguageSelect />
        </div>
        <div>
          <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-orange">
            {t("result.done")}
          </p>
          <h1 className="mt-3 font-display text-4xl font-black uppercase tracking-tight text-navy md:text-6xl">
            {collapsed ? t("result.collapsed") : t("result.stood")}
          </h1>
          <p className="mt-3 text-navy/70">
            {t("result.final", { n: Math.round(state.towerStability) })}{" "}
            {collapsed ? t("result.collapsedBody") : t("result.stoodBody")}
          </p>
        </div>

        {collapsed ? (
          <div className="flex justify-center">
            <Tower
              blocks={state.towerBlocks}
              selectedId={null}
              pullingId={null}
              stability={0}
              turnNumber={state.turnNumber}
              collapsed
            />
          </div>
        ) : null}

        <div className="card-editorial flex flex-col items-start gap-2 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="text-yellow" />
            <div>
              <p className="font-display text-xs font-extrabold uppercase tracking-wider text-navy/50">
                {t("result.highest")}
              </p>
              <p className="font-display text-3xl font-black uppercase text-navy">
                {winners.map((w) => w.name).join(" & ")}
              </p>
            </div>
          </div>
          <p className="font-display text-4xl font-black text-navy">
            {winners[0]?.score ?? 0}{" "}
            <span className="text-base text-navy/50">{t("result.points")}</span>
          </p>
        </div>

        <section>
          <h2 className="font-display text-sm font-extrabold uppercase tracking-wider text-navy">
            {t("result.category")}
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {CATEGORY_ORDER.map((id) => (
              <article key={id} className="card-editorial p-4">
                <p className="font-display text-[11px] font-extrabold uppercase tracking-wider text-navy/60">
                  {t(categoryKey(id))}
                </p>
                <p className="mt-2 font-display text-3xl font-black">
                  {averages[id] ?? "—"}
                  {averages[id] !== null ? "%" : ""}
                </p>
              </article>
            ))}
          </div>
        </section>

        <div className="grid gap-4 md:grid-cols-2">
          <article className="card-editorial p-5">
            <h2 className="font-display text-sm font-extrabold uppercase tracking-wider text-navy">
              {t("result.best")}
            </h2>
            {best ? (
              <>
                <p className="mt-3 font-display text-2xl font-black text-navy">
                  {best.evaluation.score} · {best.playerName}
                </p>
                <p className="mt-2 text-sm text-navy/70">
                  {questionText(best.question, locale)}
                </p>
              </>
            ) : (
              <p className="mt-3 text-sm text-navy/60">{t("result.noData")}</p>
            )}
          </article>
          <article className="card-editorial p-5">
            <h2 className="font-display text-sm font-extrabold uppercase tracking-wider text-navy">
              {t("result.weakest")}
            </h2>
            {weakest ? (
              <>
                <p className="mt-3 font-display text-2xl font-black text-navy">
                  {weakest.evaluation.score} · {weakest.playerName}
                </p>
                <p className="mt-2 text-sm text-navy/70">
                  {weakest.evaluation.improvements[0]}
                </p>
              </>
            ) : (
              <p className="mt-3 text-sm text-navy/60">{t("result.noData")}</p>
            )}
          </article>
        </div>

        <section>
          <h2 className="mb-4 flex items-center gap-2 font-display text-sm font-extrabold uppercase tracking-wider text-navy">
            <Award size={16} /> {t("result.badges")}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {BADGES.map((badge) => (
              <BadgeCard
                key={badge.id}
                badge={badge}
                earned={badges.includes(badge.id)}
              />
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-3">
          <Button onClick={playAgain}>{t("cta.playAgain")}</Button>
          <Button variant="secondary" onClick={() => navigate("/dashboard")}>
            {t("cta.viewDashboard")}
          </Button>
        </div>
      </PageContainer>
    </section>
  );
}

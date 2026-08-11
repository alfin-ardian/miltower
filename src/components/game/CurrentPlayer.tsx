import { useI18n } from "../../i18n/LanguageContext";
import type { Player } from "../../types/game";

export function CurrentPlayer({
  player,
  turnNumber,
  maxTurns,
}: {
  player: Player | null;
  turnNumber: number;
  maxTurns: number;
}) {
  const { t } = useI18n();

  return (
    <section className="card-editorial p-5">
      <p className="font-display text-[11px] font-extrabold uppercase tracking-[0.16em] text-orange">
        {t("game.turn")} {player?.name ?? t("game.playerFallback")}
      </p>
      <p className="mt-3 font-display text-4xl font-black tracking-tight text-navy">
        {player?.score ?? 0}
        <span className="ml-2 text-sm font-bold text-navy/50">
          {t("game.points")}
        </span>
      </p>
      <p className="mt-1 text-sm text-navy/60">
        {t("game.turnOf")} {String(turnNumber).padStart(2, "0")} / {maxTurns}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-navy/75">
        {t("game.pullInstruction")}
      </p>
    </section>
  );
}

import { useI18n } from "../../i18n/LanguageContext";

export function GameProgress({
  turnNumber,
  maxTurns,
}: {
  turnNumber: number;
  maxTurns: number;
}) {
  const { t } = useI18n();
  const pct = Math.min(100, (turnNumber / maxTurns) * 100);
  return (
    <div>
      <div className="mb-2 flex justify-between font-display text-[10px] font-extrabold uppercase tracking-wider text-navy/50">
        <span>{t("game.progress")}</span>
        <span>
          {turnNumber}/{maxTurns}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full border border-navy bg-cream-dark">
        <div className="h-full bg-navy" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

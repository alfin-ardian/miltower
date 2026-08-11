import { LanguageSelect } from "../layout/LanguageSelect";
import { Logo } from "../layout/Logo";
import { PageContainer } from "../layout/PageContainer";
import { useI18n } from "../../i18n/LanguageContext";

export function GameTopBar({
  turnNumber,
  playerName,
}: {
  turnNumber: number;
  playerName: string;
}) {
  const { t } = useI18n();

  return (
    <header className="border-b-2 border-navy/10 bg-cream">
      <PageContainer className="flex h-16 items-center justify-between gap-3">
        <Logo to="/game" />
        <p className="hidden font-display text-xs font-extrabold uppercase tracking-[0.18em] text-navy sm:block">
          {t("game.turnOf")} {String(turnNumber).padStart(2, "0")}
        </p>
        <div className="flex items-center gap-3">
          <p className="font-display text-[10px] font-extrabold uppercase tracking-[0.14em] text-navy sm:text-xs">
            {t("game.turn")}: <span className="text-orange">{playerName}</span>
          </p>
          <LanguageSelect />
        </div>
      </PageContainer>
    </header>
  );
}

import type { DashboardGame } from "../../types/game";
import { useI18n } from "../../i18n/LanguageContext";

export function GameHistory({ games }: { games: DashboardGame[] }) {
  const { t } = useI18n();

  return (
    <section className="card-editorial overflow-hidden">
      <div className="border-b-2 border-navy px-6 py-4">
        <h2 className="font-display text-sm font-extrabold uppercase tracking-wider text-navy">
          {t("dash.recent")}
        </h2>
      </div>
      <ul>
        {games.map((game, index) => (
          <li
            key={game.id}
            className={`flex items-center justify-between px-6 py-4 ${
              index < games.length - 1 ? "border-b border-navy/10" : ""
            }`}
          >
            <div>
              <p className="font-display text-sm font-extrabold text-navy">
                {game.label}
              </p>
              <p className="text-xs text-navy/55">{game.date}</p>
            </div>
            <p className="font-display text-xl font-black text-navy">
              {game.score}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

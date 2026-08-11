import { CATEGORIES } from "../../data/categories";
import { useI18n } from "../../i18n/LanguageContext";
import { categoryBlurbKey, categoryKey, colorKey } from "../../i18n/labels";
import type { BlockColor } from "../../types/game";
import { categoryFromColor } from "../../utils/scoring";
import { Button } from "../ui/Button";

export function BlockConfirm({
  color,
  turnNumber,
  dangerous,
  onPull,
  onCancel,
}: {
  color: BlockColor;
  turnNumber: number;
  dangerous?: boolean;
  onPull: () => void;
  onCancel: () => void;
}) {
  const { t } = useI18n();
  const category = CATEGORIES[categoryFromColor(color, turnNumber)];

  return (
    <section className="card-editorial animate-fade-up p-5">
      <p className="font-display text-[11px] font-extrabold uppercase tracking-[0.16em] text-navy/50">
        {t("game.selected")}
      </p>
      <h2 className="mt-2 font-display text-2xl font-black uppercase tracking-tight text-navy">
        {t(colorKey(color))}
      </h2>
      <p
        className="mt-2 inline-flex rounded-full px-3 py-1 font-display text-[10px] font-extrabold uppercase tracking-wider text-navy"
        style={{ background: category.hex }}
      >
        {t(categoryKey(category.id))}
      </p>
      <p className="mt-3 text-sm text-navy/70">{t(categoryBlurbKey(category.id))}</p>
      {dangerous ? (
        <p className="mt-3 rounded-md border-2 border-orange bg-orange/10 px-3 py-2 text-sm font-medium text-orange">
          {t("game.collapseWarn")}
        </p>
      ) : null}
      <div className="mt-5 flex flex-wrap gap-2">
        <Button onClick={onPull}>{t("game.pull")}</Button>
        <Button variant="ghost" onClick={onCancel}>
          {t("game.cancel")}
        </Button>
      </div>
    </section>
  );
}

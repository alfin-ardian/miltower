import { useI18n } from "../../i18n/LanguageContext";

export function PerformanceChart({
  items,
}: {
  items: Array<{ category: string; value: number; color: string }>;
}) {
  const { t } = useI18n();

  return (
    <section className="card-editorial p-6">
      <h2 className="font-display text-sm font-extrabold uppercase tracking-wider text-navy">
        {t("dash.performance")}
      </h2>
      <ul className="mt-5 space-y-4">
        {items.map((item) => (
          <li key={item.category}>
            <div className="mb-1.5 flex justify-between text-sm">
              <span className="font-medium text-navy">{item.category}</span>
              <span className="font-display font-extrabold">{item.value}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full border-2 border-navy bg-cream-dark">
              <div
                className="h-full"
                style={{ width: `${item.value}%`, background: item.color }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

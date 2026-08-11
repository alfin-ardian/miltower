import { PageContainer } from "../components/layout/PageContainer";
import { ButtonLink } from "../components/ui/Button";
import { Highlight } from "../components/ui/Highlight";
import { useI18n } from "../i18n/LanguageContext";

export function TipsPage() {
  const { t } = useI18n();
  const tips = [
    { id: "t1", title: t("tips.t1t"), body: t("tips.t1b") },
    { id: "t2", title: t("tips.t2t"), body: t("tips.t2b") },
    { id: "t3", title: t("tips.t3t"), body: t("tips.t3b") },
    { id: "t4", title: t("tips.t4t"), body: t("tips.t4b") },
    { id: "t5", title: t("tips.t5t"), body: t("tips.t5b") },
    { id: "t6", title: t("tips.t6t"), body: t("tips.t6b") },
  ];

  return (
    <section className="py-16">
      <PageContainer>
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-orange">
          {t("tips.label")}
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-black uppercase leading-tight tracking-tight text-navy md:text-6xl">
          {t("tips.titleBefore")} <Highlight>{t("tips.titleHighlight")}</Highlight>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy/75">
          {t("tips.body")}
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {tips.map((tip, index) => (
            <article key={tip.id} className="card-editorial p-6">
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-navy/40">
                0{index + 1}
              </p>
              <h2 className="mt-2 font-display text-xl font-extrabold uppercase tracking-wide text-navy">
                {tip.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-navy/70">
                {tip.body}
              </p>
            </article>
          ))}
        </div>

        <ButtonLink to="/game/setup" className="mt-10">
          {t("cta.trainTower")}
        </ButtonLink>
      </PageContainer>
    </section>
  );
}

import { PageContainer } from "../components/layout/PageContainer";
import { ButtonLink } from "../components/ui/Button";
import { Highlight } from "../components/ui/Highlight";
import { useI18n } from "../i18n/LanguageContext";

export function MechanismPage() {
  const { t } = useI18n();
  const steps = [
    { n: "01", title: t("mechanism.s1t"), body: t("mechanism.s1b") },
    { n: "02", title: t("mechanism.s2t"), body: t("mechanism.s2b") },
    { n: "03", title: t("mechanism.s3t"), body: t("mechanism.s3b") },
    { n: "04", title: t("mechanism.s4t"), body: t("mechanism.s4b") },
    { n: "05", title: t("mechanism.s5t"), body: t("mechanism.s5b") },
  ];

  return (
    <section className="py-16">
      <PageContainer className="max-w-4xl">
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-orange">
          {t("mechanism.label")}
        </p>
        <h1 className="mt-3 font-display text-4xl font-black uppercase leading-tight tracking-tight text-navy md:text-6xl">
          {t("mechanism.titleBefore")}{" "}
          <Highlight>{t("mechanism.titleHighlight")}</Highlight>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy/75">
          {t("mechanism.body")}
        </p>

        <ol className="mt-12 space-y-4">
          {steps.map((step) => (
            <li
              key={step.n}
              className="card-editorial grid gap-4 p-6 sm:grid-cols-[auto_1fr] sm:items-start"
            >
              <span className="font-display text-3xl font-black text-yellow">
                {step.n}
              </span>
              <div>
                <h2 className="font-display text-lg font-extrabold uppercase tracking-wide text-navy">
                  {step.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink to="/game/setup">{t("cta.startQuiz")}</ButtonLink>
          <ButtonLink to="/tips" variant="secondary">
            {t("cta.viewTips")}
          </ButtonLink>
        </div>
      </PageContainer>
    </section>
  );
}

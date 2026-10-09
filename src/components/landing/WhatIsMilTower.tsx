import { HelpCircle, Layers, Users } from "lucide-react";
import { PageContainer } from "../layout/PageContainer";
import { Highlight } from "../ui/Highlight";
import { useI18n } from "../../i18n/LanguageContext";

export function WhatIsMilTower() {
  const { t } = useI18n();
  const cards = [
    { title: t("what.c1t"), body: t("what.c1b"), icon: Layers, swatches: true },
    { title: t("what.c2t"), body: t("what.c2b"), icon: HelpCircle },
    { title: t("what.c3t"), body: t("what.c3b"), icon: Users },
  ];

  return (
    <section className="py-20 md:py-24">
      <PageContainer className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <h2 className="font-display text-4xl font-black uppercase leading-tight tracking-tight text-navy md:text-5xl">
            {t("what.title")}
            <br />
            <Highlight>MIL Tower?</Highlight>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-navy/75">
            {t("what.body")}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <article key={card.title} className="card-editorial p-5">
                <Icon className="text-navy" size={28} strokeWidth={1.8} />
                <h3 className="mt-4 font-display text-sm font-extrabold uppercase tracking-wide text-navy">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">
                  {card.body}
                </p>
                {card.swatches ? (
                  <div className="mt-4 flex gap-2" aria-label={t("a11y.colorCode")}>
                    <span className="h-3 w-3 rounded-full border border-navy bg-orange" title="Media" />
                    <span className="h-3 w-3 rounded-full border border-navy bg-yellow" title="Information" />
                    <span className="h-3 w-3 rounded-full border border-navy bg-blue" title="Literacy" />
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}

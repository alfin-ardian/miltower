import { Handshake, MessageCircle, RefreshCw, Sparkles } from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";
import { ButtonLink } from "../components/ui/Button";
import { Highlight } from "../components/ui/Highlight";
import { useI18n } from "../i18n/LanguageContext";

export function PhilosophyPage() {
  const { t } = useI18n();
  const principles = [
    { title: t("philosophy.p1t"), icon: RefreshCw, body: t("philosophy.pp1b") },
    { title: t("philosophy.p2t"), icon: Sparkles, body: t("philosophy.pp2b") },
    { title: t("philosophy.p3t"), icon: MessageCircle, body: t("philosophy.pp3b") },
    { title: t("philosophy.p4t"), icon: Handshake, body: t("philosophy.pp4b") },
  ];

  return (
    <section className="py-16">
      <PageContainer className="max-w-4xl">
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-orange">
          {t("philosophy.label")}
        </p>
        <h1 className="mt-3 font-display text-4xl font-black uppercase leading-tight tracking-tight text-navy md:text-6xl">
          {t("philosophy.pageTitleBefore")}{" "}
          <Highlight>{t("philosophy.pageTitleHighlight")}</Highlight>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy/75">
          {t("philosophy.pageBody")}
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {principles.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="card-editorial p-6">
                <Icon className="text-orange" />
                <h2 className="mt-4 font-display text-lg font-extrabold uppercase tracking-wide text-navy">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">
                  {item.body}
                </p>
              </article>
            );
          })}
        </div>

        <blockquote className="mt-12 border-l-4 border-yellow pl-6 text-xl font-medium leading-relaxed text-navy">
          Play → Think → Write → Get feedback → Learn.
        </blockquote>

        <ButtonLink to="/game/setup" className="mt-10">
          {t("cta.tryPhilosophy")}
        </ButtonLink>
      </PageContainer>
    </section>
  );
}

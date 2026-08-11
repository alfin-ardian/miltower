import { PageContainer } from "../components/layout/PageContainer";
import { ButtonLink } from "../components/ui/Button";
import { Highlight } from "../components/ui/Highlight";
import { SOCIALS, TEAM } from "../data/team";
import { useI18n } from "../i18n/LanguageContext";

const COLORS = ["bg-yellow", "bg-orange", "bg-blue", "bg-cream-dark", "bg-yellow"];

const ROLE_KEY: Record<string, string> = {
  RA: "team.rRA",
  BW: "team.rBW",
  NP: "team.rNP",
  FR: "team.rFR",
  AK: "team.rAK",
};

export function TeamPage() {
  const { t } = useI18n();

  return (
    <section className="py-16">
      <PageContainer>
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-orange">
          {t("team.label")}
        </p>
        <h1 className="mt-3 font-display text-4xl font-black uppercase leading-tight tracking-tight text-navy md:text-6xl">
          {t("team.titleBefore")} <Highlight>{t("team.titleHighlight")}</Highlight>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy/75">
          {t("team.body")}
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((member, index) => (
            <article key={member.name} className="card-editorial p-6">
              <span
                className={`grid h-14 w-14 place-items-center rounded-full border-2 border-navy font-display text-sm font-extrabold text-navy ${COLORS[index]}`}
              >
                {member.initial}
              </span>
              <h2 className="mt-4 font-display text-lg font-extrabold text-navy">
                {member.name}
              </h2>
              <p className="mt-1 text-sm text-navy/65">
                {t(ROLE_KEY[member.initial] ?? "team.rRA")}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 card-editorial p-6">
          <h2 className="font-display text-sm font-extrabold uppercase tracking-wider text-navy">
            {t("team.social")}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {SOCIALS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="inline-flex rounded-full border-2 border-navy px-4 py-2 text-sm font-semibold text-navy hover:bg-yellow"
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.label} · {item.handle}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <ButtonLink to="/game/setup" className="mt-10">
          {t("cta.playThis")}
        </ButtonLink>
      </PageContainer>
    </section>
  );
}

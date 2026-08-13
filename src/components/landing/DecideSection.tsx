import { PageContainer } from "../layout/PageContainer";
import { useI18n } from "../../i18n/LanguageContext";

const STEPS = [
  { letter: "D", key: "d1" },
  { letter: "E", key: "e1" },
  { letter: "C", key: "c" },
  { letter: "I", key: "i" },
  { letter: "D", key: "d2" },
  { letter: "E", key: "e2" },
] as const;

export function DecideSection() {
  const { t } = useI18n();

  return (
    <section className="border-y border-navy/10 bg-cream-dark/50 py-20 md:py-24">
      <PageContainer>
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-orange">
          {t("decide.label")}
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-3xl font-black uppercase leading-tight tracking-tight text-navy md:text-5xl">
          {t("decide.title")}
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-navy/75 md:text-lg">
          {t("decide.body")}
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-navy/65 md:text-base">
          {t("decide.loop")}
        </p>

        <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={`${step.letter}-${step.key}`} className="card-editorial p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-md bg-yellow font-display text-xl font-black text-navy">
                  {step.letter}
                </span>
                <span className="font-display text-[11px] font-extrabold uppercase tracking-[0.16em] text-navy/45">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-4 font-display text-sm font-extrabold uppercase tracking-wide text-navy">
                {t(`decide.${step.key}`)}
              </h3>
            </li>
          ))}
        </ol>

        <p className="mt-10 font-display text-lg font-extrabold uppercase tracking-wide text-navy md:text-xl">
          {t("decide.slogan")}
        </p>
      </PageContainer>
    </section>
  );
}

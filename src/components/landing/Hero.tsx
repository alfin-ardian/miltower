import { Play } from "lucide-react";
import { ButtonLink } from "../ui/Button";
import { Highlight } from "../ui/Highlight";
import { PageContainer } from "../layout/PageContainer";
import { MiniTower } from "./MiniTower";
import { useI18n } from "../../i18n/LanguageContext";

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden pb-16 pt-10 md:pb-20 md:pt-14">
      <PageContainer className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="animate-fade-up">
          <p className="inline-flex rounded-full bg-yellow px-4 py-1.5 font-display text-[11px] font-extrabold uppercase tracking-[0.16em] text-navy">
            {t("hero.eyebrow")}
          </p>
          <h1 className="mt-6 font-display text-[2.35rem] font-black uppercase leading-[1.05] tracking-tight text-navy sm:text-5xl lg:text-[3.35rem]">
            {t("hero.pull")} <Highlight>{t("hero.block")}</Highlight>, {t("hero.answer")}{" "}
            <Highlight>{t("hero.card")}</Highlight>, {t("hero.protect")}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-navy/80 md:text-lg">
            {t("hero.body")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/game/setup">{t("cta.startQuiz")}</ButtonLink>
            <ButtonLink to="/mechanism" variant="secondary">
              <Play size={16} fill="currentColor" />
              {t("cta.howToPlay")}
            </ButtonLink>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[520px]">
          <svg
            className="absolute -left-6 top-8 h-64 w-64 text-navy md:h-80 md:w-80"
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M42.7,-62.3C54.4,-53.2,62.1,-39,69.6,-23.6C77.2,-8.2,84.6,8.3,80.7,22.1C76.8,35.9,61.6,46.9,46.3,56.8C31,66.6,15.5,75.2,-0.7,76.2C-16.9,77.1,-33.8,70.3,-48.2,59.6C-62.6,48.9,-74.6,34.2,-79.3,17.3C-84,-0.6,-81.4,-20.8,-71.7,-35.8C-62,-50.8,-45.2,-60.6,-29.1,-67.4C-13,-74.1,2.4,-77.8,17.8,-74.7C33.3,-71.6,48.7,-61.7,42.7,-62.3Z"
              transform="translate(100 100)"
            />
          </svg>
          <svg
            className="absolute -right-4 bottom-4 h-40 w-40 text-navy"
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M39.4,-57.2C50.7,-49.3,59.1,-36.6,64.4,-22.5C69.8,-8.4,72.1,7.1,67.3,20.3C62.5,33.5,50.6,44.3,37.4,53.7C24.2,63.1,9.7,71.1,-5.6,78.7C-20.8,86.3,-41.7,93.5,-54.6,85.4C-67.5,77.2,-72.4,53.7,-75.6,32.4C-78.8,11.1,-80.3,-8,-73.5,-23.4C-66.7,-38.8,-51.6,-50.5,-36.6,-57.3C-21.6,-64.1,-6.6,-66,7.3,-76.1C21.3,-86.2,42.6,-104.4,39.4,-57.2Z"
              transform="translate(100 100) scale(0.7)"
            />
          </svg>

          <div className="relative flex items-end justify-center gap-4 py-8">
            <div className="animate-float">
              <MiniTower />
            </div>

            <article className="animate-float-delayed card-editorial absolute right-0 top-6 w-[210px] rotate-3 p-4 sm:w-[230px]">
              <p className="font-display text-[10px] font-extrabold uppercase tracking-[0.16em] text-orange">
                {t("hero.cardLabel")}
              </p>
              <p className="mt-2 font-display text-sm font-extrabold leading-snug text-navy">
                “{t("hero.cardQuestion")}”
              </p>
            </article>
          </div>

          <div className="absolute bottom-2 left-2 flex h-[92px] w-[92px] items-center justify-center rounded-full border-2 border-navy bg-yellow p-3 text-center font-display text-[10px] font-extrabold uppercase leading-tight tracking-wide text-navy sm:left-6">
            {t("hero.badge")}
          </div>
          <svg
            className="absolute bottom-16 left-[110px] hidden w-16 text-navy sm:block"
            viewBox="0 0 80 40"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 28C22 8 48 6 76 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M66 10l10 8-12 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </PageContainer>
    </section>
  );
}

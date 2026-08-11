import { PageContainer } from "../layout/PageContainer";
import { ButtonLink } from "../ui/Button";
import { MiniTower } from "./MiniTower";
import { useI18n } from "../../i18n/LanguageContext";

export function CTASection() {
  const { t } = useI18n();

  return (
    <section className="pb-20">
      <PageContainer>
        <div className="flex flex-col items-center gap-8 rounded-2xl bg-navy px-6 py-10 text-white md:flex-row md:justify-between md:px-10">
          <div className="hidden md:block">
            <MiniTower compact className="opacity-95" />
          </div>
          <div className="max-w-xl text-center md:text-left">
            <h2 className="font-display text-3xl font-black uppercase leading-tight tracking-tight md:text-4xl">
              {t("ctaBand.title")}
            </h2>
            <p className="mt-3 text-white/75">{t("ctaBand.body")}</p>
          </div>
          <ButtonLink to="/game/setup" className="shrink-0">
            {t("cta.startNow")}
          </ButtonLink>
        </div>
      </PageContainer>
    </section>
  );
}

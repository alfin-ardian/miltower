import { Logo } from "./Logo";
import { PageContainer } from "./PageContainer";
import { SOCIALS, TEAM } from "../../data/team";
import { useI18n } from "../../i18n/LanguageContext";

function SocialIcon({ label }: { label: string }) {
  if (label === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    );
  }
  if (label === "YouTube") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path
          fill="currentColor"
          d="M23 12.2s-.2-4.3-1-6.2c-.5-1.1-1.6-1.5-2.5-1.6C16.7 4 12 4 12 4s-4.7 0-7.5.4c-.9.1-2 .5-2.5 1.6-.8 1.9-1 6.2-1 6.2s.2 4.3 1 6.2c.5 1.1 1.6 1.5 2.5 1.6 2.8.4 7.5.4 7.5.4s4.7 0 7.5-.4c.9-.1 2-.5 2.5-1.6.8-1.9 1-6.2 1-6.2ZM10 15.5v-7l6 3.5-6 3.5Z"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M13.8 10.4 20.4 3h-1.6l-5.7 6.4L8.5 3H3.2l7 10.1L3.2 21h1.6l6.1-7 4.9 7h5.3l-7.3-10.6Zm-2.2 2.5-.7-1-5.6-8h2.4l4.5 6.5.7 1 5.9 8.4h-2.4l-4.8-6.9Z"
      />
    </svg>
  );
}

const ROLE_KEY: Record<string, string> = {
  RR: "team.rRA",
  AS: "team.rBW",
  NS: "team.rNP",
  AA: "team.rFR",
};

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-navy text-white">
      <PageContainer className="grid gap-10 py-14 md:grid-cols-3">
        <div>
          <Logo inverted />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            {t("footer.blurb")}
          </p>
        </div>

        <div>
          <h2 className="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-yellow">
            {t("footer.social")}
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {SOCIALS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="inline-flex items-center gap-2 text-white/80 transition hover:text-yellow"
                  target="_blank"
                  rel="noreferrer"
                >
                  <SocialIcon label={item.label} />
                  {item.handle}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-yellow">
            {t("footer.team")}
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {TEAM.map((member) => (
              <li key={member.name}>
                <span className="font-semibold text-white">{member.name}</span>
                <span className="block text-white/55">
                  {t(ROLE_KEY[member.initial] ?? "team.rRA")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </PageContainer>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/45">
        {t("footer.copy")}
      </div>
    </footer>
  );
}

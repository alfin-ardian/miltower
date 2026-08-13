import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { LanguageSelect } from "./LanguageSelect";
import { PageContainer } from "./PageContainer";
import { ButtonLink } from "../ui/Button";
import { useI18n } from "../../i18n/LanguageContext";
import { cn } from "../../utils/cn";

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { t } = useI18n();

  const navLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/philosophy", label: t("nav.philosophy") },
    { to: "/mechanism", label: t("nav.mechanism") },
    { to: "/game/setup", label: t("nav.quiz") },
    { to: "/dashboard", label: t("nav.dashboard") },
    { to: "/tips", label: t("nav.tips") },
    { to: "/team", label: t("nav.team") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-cream">
      <PageContainer className="flex h-[72px] items-center justify-between gap-4">
        <Logo compact />

        <nav
          className="hidden items-center gap-5 lg:flex"
          aria-label={t("a11y.nav")}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                cn(
                  "font-display text-[11px] font-extrabold uppercase tracking-[0.14em] text-navy/70 transition hover:text-navy",
                  isActive && "text-navy",
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSelect />
          <ButtonLink
            to="/game/setup"
            className="hidden px-5 py-2.5 sm:inline-flex"
          >
            {t("cta.startQuiz")}
          </ButtonLink>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-md border-2 border-navy lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t("a11y.closeMenu") : t("a11y.openMenu")}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </PageContainer>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-navy/10 bg-cream lg:hidden"
        >
          <PageContainer className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-3 font-display text-sm font-extrabold uppercase tracking-wider",
                  location.pathname === link.to
                    ? "bg-yellow text-navy"
                    : "text-navy",
                )}
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-2 flex items-center gap-3">
              <LanguageSelect />
              <ButtonLink to="/game/setup" className="flex-1">
                {t("cta.startQuiz")}
              </ButtonLink>
            </div>
          </PageContainer>
        </div>
      ) : null}
    </header>
  );
}

import { Handshake, MessageCircle, RefreshCw, Sparkles } from "lucide-react";
import { PageContainer } from "../layout/PageContainer";
import { useI18n } from "../../i18n/LanguageContext";

export function PhilosophySection() {
  const { t } = useI18n();
  const principles = [
    { title: t("philosophy.p1t"), icon: RefreshCw, body: t("philosophy.p1b") },
    { title: t("philosophy.p2t"), icon: Sparkles, body: t("philosophy.p2b") },
    { title: t("philosophy.p3t"), icon: MessageCircle, body: t("philosophy.p3b") },
    { title: t("philosophy.p4t"), icon: Handshake, body: t("philosophy.p4b") },
  ];

  return (
    <section className="py-20 md:py-24">
      <PageContainer className="grid items-center gap-10 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-xl border-2 border-navy bg-[#c9a36a] shadow-brutal">
          <PhilosophyVisual caption={t("philosophy.session")} />
        </div>

        <div>
          <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-orange">
            {t("philosophy.label")}
          </p>
          <h2 className="mt-3 font-display text-3xl font-black uppercase leading-tight tracking-tight text-navy md:text-4xl">
            {t("philosophy.title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-navy/75">
            {t("philosophy.body")}
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {principles.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-xl border-2 border-navy bg-white p-4"
                >
                  <Icon size={18} className="text-orange" />
                  <p className="mt-2 font-display text-xs font-extrabold uppercase tracking-wider text-navy">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-navy/65">
                    {item.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

function PhilosophyVisual({ caption }: { caption: string }) {
  const people = [
    { name: "Rania", color: "bg-yellow", x: "12%", y: "18%" },
    { name: "Bagas", color: "bg-orange", x: "70%", y: "14%" },
    { name: "Nadia", color: "bg-blue", x: "8%", y: "58%" },
    { name: "Fikri", color: "bg-cream", x: "72%", y: "58%" },
  ];

  return (
    <div className="relative aspect-[4/3] min-h-[280px] p-6">
      <div className="absolute inset-x-10 bottom-10 h-24 rounded-lg border-2 border-navy bg-[#8b5a24]" />
      <div className="absolute bottom-28 left-1/2 flex -translate-x-1/2 flex-col-reverse gap-[2px]">
        {["wood", "yellow", "wood", "blue", "orange"].map((c, i) => (
          <span
            key={i}
            className={`h-3 w-16 rounded-sm border border-navy ${
              c === "yellow"
                ? "bg-yellow"
                : c === "blue"
                  ? "bg-blue"
                  : c === "orange"
                    ? "bg-orange"
                    : "wood-fill"
            }`}
          />
        ))}
      </div>
      {people.map((person) => (
        <div
          key={person.name}
          className="absolute flex flex-col items-center"
          style={{ left: person.x, top: person.y }}
        >
          <span
            className={`grid h-14 w-14 place-items-center rounded-full border-2 border-navy font-display text-xs font-extrabold text-navy ${person.color}`}
          >
            {person.name.slice(0, 1)}
          </span>
          <span className="mt-1 rounded-full bg-navy px-2 py-0.5 text-[10px] font-semibold text-white">
            {person.name}
          </span>
        </div>
      ))}
      <p className="absolute bottom-3 left-4 font-display text-[10px] font-extrabold uppercase tracking-wider text-navy">
        {caption}
      </p>
    </div>
  );
}

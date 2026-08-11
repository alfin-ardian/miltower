import type { ReactNode } from "react";

export function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <article className="card-editorial p-5">
      <div className="flex items-start justify-between">
        <p className="font-display text-[11px] font-extrabold uppercase tracking-[0.16em] text-navy/50">
          {label}
        </p>
        <span className="text-navy/70">{icon}</span>
      </div>
      <p className="mt-3 font-display text-3xl font-black tracking-tight text-navy">
        {value}
      </p>
    </article>
  );
}

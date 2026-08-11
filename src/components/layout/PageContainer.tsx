import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export function PageContainer({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer";
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1180px] px-5 md:px-8", className)}>
      {children}
    </Tag>
  );
}

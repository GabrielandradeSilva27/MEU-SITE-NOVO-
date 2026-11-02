import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type Variant = "accent" | "light" | "dark";
const cls = (v: Variant, extra = "") =>
  ["btn", v === "light" && "btn--light", v === "dark" && "btn--dark", extra].filter(Boolean).join(" ");

export function ButtonLink({
  variant = "accent",
  children,
  className,
  arrow = true,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; arrow?: boolean; children: ReactNode }) {
  return (
    <a className={cls(variant, className)} {...rest}>
      <span>{children}</span>
      {arrow && <ArrowRight className="btn-arrow" size={18} strokeWidth={2.25} aria-hidden />}
    </a>
  );
}

export function Button({
  variant = "accent",
  children,
  className,
  arrow = true,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; arrow?: boolean; children: ReactNode }) {
  return (
    <button className={cls(variant, className)} {...rest}>
      <span>{children}</span>
      {arrow && <ArrowRight className="btn-arrow" size={18} strokeWidth={2.25} aria-hidden />}
    </button>
  );
}

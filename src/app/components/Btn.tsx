import type { PointerEvent, ReactNode } from "react";
import { Link } from "react-router";

type Props = {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: "white" | "dark" | "black";
  size?: "sm" | "md";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

export const AppleLogo = () => (
  <svg className="btn__apple" viewBox="0 0 384 512" aria-hidden="true">
    <path
      fill="currentColor"
      d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
    />
  </svg>
);

// Magnetic hover: the button leans a few px toward the pointer (fine pointers only).
const pull = (e: PointerEvent<HTMLElement>) => {
  if (e.pointerType !== "mouse") return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--tx", `${((e.clientX - r.left) / r.width - 0.5) * 8}px`);
  el.style.setProperty("--ty", `${((e.clientY - r.top) / r.height - 0.5) * 8}px`);
};
const release = (e: PointerEvent<HTMLElement>) => {
  e.currentTarget.style.setProperty("--tx", "0px");
  e.currentTarget.style.setProperty("--ty", "0px");
};

/** White / dark button; links to the App Store get the Apple logo. */
export default function Btn({ children, to, href, variant = "white", size = "md", className = "", type = "button", onClick }: Props) {
  const cls = `btn btn--${variant} btn--${size} ${className}`;
  const mag = { onPointerMove: pull, onPointerLeave: release };
  const inner = (
    <>
      {href?.startsWith("https://apps.apple.com") && <AppleLogo />}
      <span>{children}</span>
    </>
  );
  if (to) return <Link to={to} className={cls} {...mag}>{inner}</Link>;
  if (href)
    return (
      <a {...mag} href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        {inner}
      </a>
    );
  return (
    <button type={type} className={cls} onClick={onClick} {...mag}>
      {inner}
    </button>
  );
}

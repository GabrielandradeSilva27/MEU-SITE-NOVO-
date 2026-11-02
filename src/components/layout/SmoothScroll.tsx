"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

declare global {
  interface Window { __lenis?: Lenis }
}

/** Rolagem suave (Lenis) sincronizada com o ScrollTrigger. Desligada com movimento reduzido. */
export function SmoothScroll() {
  // quando a altura da página muda (filtro do portfólio, fontes, mídia), recalcula os pins
  useEffect(() => {
    let raf = 0;
    let last = document.body.scrollHeight;
    const ro = new ResizeObserver(() => {
      const h = document.body.scrollHeight;
      if (h === last) return;
      last = h;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    ro.observe(document.body);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    // sem rolagem suave para movimento reduzido e navegadores automatizados (testes)
    if (prefersReducedMotion() || navigator.webdriver) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // âncoras internas passam pelo Lenis
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href")!;
      const el = id === "#" ? null : document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.4 });
      history.replaceState(null, "", id);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
  return null;
}

export const lockScroll = (lock: boolean) => {
  const l = typeof window !== "undefined" ? window.__lenis : undefined;
  if (l) (lock ? l.stop() : l.start());
  document.body.style.overflow = lock ? "hidden" : "";
};

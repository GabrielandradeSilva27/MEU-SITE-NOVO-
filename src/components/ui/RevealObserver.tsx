"use client";

import { useEffect } from "react";

const SELECTOR = "[data-reveal]:not(.is-in), [data-lines]:not(.is-in), [data-mask]:not(.is-in)";

/** Liga as entradas de todos os elementos marcados com data-reveal / data-lines / data-mask. */
export function RevealObserver() {
  useEffect(() => {
    document.documentElement.classList.add("js");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -10% 0px" }
    );
    const scan = () => document.querySelectorAll(SELECTOR).forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}

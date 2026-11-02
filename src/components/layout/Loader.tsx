"use client";

import { useEffect, useState } from "react";

/**
 * Abertura curta: o símbolo G/A é cortado por uma cortina no ângulo da barra.
 * Some sozinho em menos de 1 s e não bloqueia a leitura (o conteúdo já está na página por baixo).
 */
export function Loader() {
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setGone(true); return; }
    const t1 = setTimeout(() => setDone(true), 350);
    const t2 = setTimeout(() => setGone(true), 1300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (gone) return null;
  return (
    <div className={`ga-loader ${done ? "is-done" : ""}`} aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/ga-simbolo.svg" alt="" width={120} height={64} />
    </div>
  );
}

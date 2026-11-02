"use client";

import { useEffect, useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

/** Horário local em timecode (HH:MM:SS:FF a 24 fps) — o pilar Tempo Real como interface. */
export function Timecode() {
  const [tc, setTc] = useState("00:00:00:00");
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tick = () => {
      const d = new Date();
      setTc(`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}:${pad(Math.floor((d.getMilliseconds() / 1000) * 24))}`);
    };
    tick();
    const id = setInterval(tick, reduced ? 1000 : 1000 / 24);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="inline-flex items-center gap-2.5 t-small tnum font-medium" aria-label="Horário local">
      <span className="rec-dot" aria-hidden />
      <span>{tc}</span>
    </span>
  );
}

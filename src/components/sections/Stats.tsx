"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/config/site";
import { pt } from "@/content/pt";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { Lines } from "@/components/ui/Lines";

const fmt = (n: number) => n.toLocaleString("pt-BR");

/** Conta do zero até o valor configurado quando entra na tela. */
function Counter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el || value === 0) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const step = (t: number) => {
        const p = Math.min((t - start) / 1600, 1);
        setShown(Math.round(value * (1 - Math.pow(1 - p, 4))));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return (
    <span ref={ref} className="tnum">
      {prefix}{fmt(shown)}{suffix}
    </span>
  );
}

export function Stats() {
  if (!stats.visible) return null;
  return (
    <section id="numeros" className="ga-stats wrap" aria-labelledby="numeros-title">
      <div className="ga-stats__films">
        {pt.stats.videos.map((v, i) => (
          <div key={v.src} className="ga-stats__film media" data-mask="" style={{ "--i": i } as React.CSSProperties}>
            <LoopVideo src={v.src} poster={v.poster} className="bw" />
          </div>
        ))}
      </div>
      <div className="ga-stats__content">
        <Lines id="numeros-title" className="t-display" lines={[pt.stats.heading]} />
        <p className="t-statement mt-6 max-w-[28ch]" data-reveal="">{pt.stats.intro}</p>
        <dl className="ga-stats__grid">
          {stats.items.map((s, i) => (
            <div key={s.id} className={`ga-stat ${s.prefix ? "is-wide" : ""}`} data-reveal="" style={{ "--i": i } as React.CSSProperties}>
              <dd className="ga-stat__value">
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </dd>
              <dt className="ga-stat__label">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

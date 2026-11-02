"use client";

import { useState } from "react";
import { pt } from "@/content/pt";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { Lines } from "@/components/ui/Lines";

const { pillars } = pt;

/** Três colunas desencontradas; cada pilar ganha cor e movimento ao receber o mouse ou o foco. */
export function Pillars() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="pilares" className="ga-pillars wrap" aria-labelledby="pilares-title">
      <div className="ga-pillars__head">
        <Lines id="pilares-title" className="t-display" lines={["Três pilares,", "uma visão"]} />
        <p className="t-statement text-white/90 max-w-[30ch]" data-reveal="" style={{ "--i": 1 } as React.CSSProperties}>
          {pillars.intro}
        </p>
      </div>

      <div className="ga-pillars__track">
        {pillars.items.map((p, i) => (
          <article
            key={p.id}
            className={`ga-pillar ${active === p.id ? "is-active" : ""}`}
            data-reveal=""
            style={{ "--i": i } as React.CSSProperties}
            onMouseEnter={() => setActive(p.id)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(p.id)}
            onBlur={() => setActive(null)}
            tabIndex={0}
            aria-labelledby={`pilar-${p.id}`}
          >
            <div className="ga-pillar__media media" data-mask="">
              <LoopVideo src={p.video.src} poster={p.video.poster} className="ga-pillar__video" />
              <span className="ga-pillar__slash" aria-hidden />
            </div>
            <div className="ga-pillar__body">
              <div className="ga-pillar__top">
                <h3 id={`pilar-${p.id}`} className="t-title">{p.title}</h3>
              </div>
              <p className="ga-pillar__summary">{p.summary}</p>
              <ul className="ga-pillar__list">
                {p.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
      <p className="t-small text-muted mt-10" data-reveal="">{pillars.note}</p>
    </section>
  );
}

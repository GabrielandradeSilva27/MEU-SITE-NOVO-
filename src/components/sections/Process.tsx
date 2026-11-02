"use client";

import { useEffect, useRef } from "react";
import { pt } from "@/content/pt";
import { gsap } from "@/lib/gsap";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { Lines } from "@/components/ui/Lines";

const { process } = pt;

/**
 * Desktop: a seção fixa e as cinco etapas correm na horizontal, como uma timeline de edição.
 * Celular e movimento reduzido: lista vertical.
 */
export function Process() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const el = track.current!;
      const distance = () => el.scrollWidth - el.clientWidth;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance() + window.innerHeight * 0.4}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
      tl.to(el, { x: () => -distance(), ease: "none" }, 0).fromTo(bar.current, { scaleX: 0.2 }, { scaleX: 1, ease: "none" }, 0);
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="processo" ref={root} className="ga-process" aria-labelledby="processo-title">
      <div className="ga-process__bg media" aria-hidden>
        <LoopVideo src={process.video.src} poster={process.video.poster} className="bw" />
      </div>
      <div className="ga-process__inner wrap">
        <div className="ga-process__head">
          <Lines id="processo-title" className="t-display" lines={["Como", "conduzimos"]} />
          <p className="t-statement max-w-[28ch]" data-reveal="">{process.intro}</p>
        </div>
        <div className="ga-process__viewport">
        <ol ref={track} className="ga-process__track">
          {process.steps.map((s, i) => (
            <li key={s.title} className="ga-step" data-reveal="" style={{ "--i": i } as React.CSSProperties}>
              <span className="ga-step__num tnum" aria-hidden>{i + 1}</span>
              <h3 className="t-title">{s.title}</h3>
              <p className="ga-step__text">{s.text}</p>
            </li>
          ))}
        </ol>
        </div>
        <div className="ga-process__progress" aria-hidden>
          <span ref={bar} />
        </div>
      </div>
    </section>
  );
}

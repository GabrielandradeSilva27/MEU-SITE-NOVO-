"use client";

import { useEffect, useRef } from "react";
import { pt } from "@/content/pt";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { Lines } from "@/components/ui/Lines";

const { manifesto } = pt;

/** As palavras acendem conforme a rolagem — o texto é "revelado" como um plano em fade-in. */
export function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ga-manifesto__word",
        { opacity: 0.16 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: ".ga-manifesto__body", start: "top 78%", end: "bottom 45%", scrub: 0.6 },
        }
      );
      gsap.fromTo(
        ".ga-manifesto__film",
        { clipPath: "inset(18% 22% 18% 22%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: { trigger: ".ga-manifesto__film", start: "top 90%", end: "center 55%", scrub: 0.6 },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="manifesto" ref={root} className="ga-manifesto wrap" aria-labelledby="manifesto-title">
      <Lines id="manifesto-title" className="ga-manifesto__title t-display" lines={[manifesto.heading]} />

      <div className="ga-manifesto__body">
        {manifesto.lines.map((line, i) => (
          <p key={i} className={`ga-manifesto__line ${"strong" in line && line.strong ? "is-strong" : ""}`}>
            {line.text.split(" ").map((w, k) => (
              <span key={k} className="ga-manifesto__word">{w} </span>
            ))}
          </p>
        ))}
      </div>

      <div className="ga-manifesto__film media">
        <LoopVideo src={manifesto.video.src} poster={manifesto.video.poster} className="bw" />
      </div>

      <div className="ga-manifesto__closing">
        {manifesto.closing.map((c, i) => (
          <p key={c} className="t-statement" data-reveal="" style={{ "--i": i } as React.CSSProperties}>
            {c}
          </p>
        ))}
      </div>
    </section>
  );
}

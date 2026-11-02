"use client";

import { useEffect, useRef, useState } from "react";
import { pt } from "@/content/pt";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { ButtonLink } from "@/components/ui/Button";

const { hero } = pt;
/** Tempo (ms) que o título fica na tela antes do vídeo assumir o protagonismo. */
const TITLE_HOLD = 3000;

/**
 * Abertura: "Ideias em movimento" entra sobre o vídeo escurecido;
 * depois de ~3 s o título sai e o vídeo ganha cor e luz, rodando em loop.
 */
export function Hero() {
  const [phase, setPhase] = useState<"intro" | "title" | "film">("intro");
  const root = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setPhase("title");
      return;
    }
    video.current?.play().catch(() => {});
    const t0 = setTimeout(() => setPhase("title"), 250);
    const t = setTimeout(() => setPhase("film"), 250 + TITLE_HOLD);

    // parallax sutil: o vídeo desce mais devagar que a página ao sair
    const ctx = gsap.context(() => {
      gsap.to(media.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);
    return () => {
      clearTimeout(t0);
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <section id="inicio" ref={root} className="ga-hero" data-phase={phase} aria-labelledby="hero-title">
      <div className="ga-hero__media" ref={media}>
        <video
          ref={video}
          className="ga-hero__video"
          src={hero.video.src}
          poster={hero.video.poster}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          aria-hidden
        />
        <div className="ga-hero__scrim" />
      </div>

      <h1 id="hero-title" className="ga-hero__title t-hero">
        {hero.title.map((l, i) => (
          <span key={l} className="line" style={{ "--l": i } as React.CSSProperties}>
            <span>{l}</span>
          </span>
        ))}
      </h1>

      <div className="ga-hero__bottom wrap">
        <div className="ga-hero__lede">
          <p className="ga-hero__tagline">
            {hero.tagline.map((t) => (
              <span key={t} className="block">{t}</span>
            ))}
          </p>
          <p className="ga-hero__sub">{hero.lede}</p>
        </div>
        <div className="ga-hero__side">
          <a href="#manifesto" className="ga-hero__scroll" aria-label={hero.scroll}>
            <span className="ga-hero__scroll-bar" aria-hidden />
            <span className="t-small">{hero.scroll}</span>
          </a>
          <ButtonLink href="#contato">{hero.cta}</ButtonLink>
        </div>
      </div>
    </section>
  );
}

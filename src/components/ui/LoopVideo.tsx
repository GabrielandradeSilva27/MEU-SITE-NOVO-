"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

type Props = {
  src: string;
  poster: string;
  className?: string;
  /** Força tocar/pausar (ex.: hover). Sem ele, toca enquanto estiver visível. */
  playing?: boolean;
  /** Carrega e toca imediatamente (vídeo do hero). */
  eager?: boolean;
  label?: string;
};

/**
 * Vídeo em loop, mudo, que só baixa e toca quando entra na tela.
 * Com "reduzir movimento" ativo, mostra apenas a capa.
 */
export function LoopVideo({ src, poster, className, playing, eager, label }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const visible = useRef(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduced = prefersReducedMotion();

    const sync = () => {
      const shouldPlay = !reduced && visible.current && (playing ?? true);
      if (shouldPlay) {
        if (!v.src) v.src = src;
        v.play().catch(() => {});
      } else if (!v.paused) {
        v.pause();
      }
    };

    const io = new IntersectionObserver(
      ([e]) => {
        visible.current = e.isIntersecting;
        if (e.isIntersecting && !v.src && !reduced) v.src = src;
        sync();
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(v);
    if (eager && !reduced) v.src = src;
    sync();
    return () => io.disconnect();
  }, [src, playing, eager]);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}

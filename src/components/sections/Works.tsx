"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Play, X } from "lucide-react";
import { projects, type Pillar, type Project } from "@/content/projects";
import { pt } from "@/content/pt";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { Lines } from "@/components/ui/Lines";
import { lockScroll } from "@/components/layout/SmoothScroll";

const filters: ("Todos" | Pillar)[] = ["Todos", "Performance", "Tempo Real", "Posicionamento"];

type Cell = { p: Project; index: number; col: string; offset: string };

/**
 * Monta linhas de 12 colunas que sempre fecham: horizontal + vertical, dois horizontais
 * ou três verticais. O lado e o desnível alternam a cada linha para o grid ficar assimétrico.
 */
function buildRows(list: Project[]): Cell[][] {
  const rows: Cell[][] = [];
  let i = 0;
  while (i < list.length) {
    const flip = rows.length % 2 === 1;
    const a = list[i], b = list[i + 1], c = list[i + 2];
    if (a.format === "horizontal" && b?.format === "vertical") {
      rows.push(flip
        ? [{ p: b, index: i + 1, col: "1 / 5", offset: "0" }, { p: a, index: i, col: "6 / 13", offset: "clamp(32px, 6vw, 112px)" }]
        : [{ p: a, index: i, col: "1 / 8", offset: "0" }, { p: b, index: i + 1, col: "9 / 13", offset: "clamp(32px, 5vw, 96px)" }]);
      i += 2;
    } else if (a.format === "vertical" && b?.format === "horizontal") {
      rows.push([{ p: a, index: i, col: flip ? "8 / 12" : "2 / 6", offset: "0" }, { p: b, index: i + 1, col: flip ? "1 / 7" : "7 / 13", offset: "clamp(32px, 6vw, 112px)" }]);
      if (flip) rows[rows.length - 1].reverse();
      i += 2;
    } else if (a.format === "vertical" && b?.format === "vertical" && c?.format === "vertical") {
      rows.push([
        { p: a, index: i, col: "1 / 5", offset: "0" },
        { p: b, index: i + 1, col: "5 / 9", offset: "clamp(24px, 4vw, 80px)" },
        { p: c, index: i + 2, col: "9 / 13", offset: "clamp(20px, 3vw, 60px)" },
      ]);
      i += 3;
    } else if (a.format === "vertical" && b?.format === "vertical") {
      rows.push([{ p: a, index: i, col: flip ? "3 / 7" : "1 / 5", offset: "0" }, { p: b, index: i + 1, col: flip ? "9 / 13" : "7 / 11", offset: "clamp(24px, 4vw, 80px)" }]);
      i += 2;
    } else if (a.format === "horizontal" && b?.format === "horizontal") {
      rows.push([{ p: a, index: i, col: "1 / 7", offset: "0" }, { p: b, index: i + 1, col: "7 / 13", offset: "clamp(24px, 4vw, 80px)" }]);
      i += 2;
    } else {
      rows.push([{ p: a, index: i, col: a.format === "horizontal" ? (flip ? "5 / 13" : "1 / 9") : (flip ? "8 / 12" : "2 / 6"), offset: "0" }]);
      i += 1;
    }
  }
  return rows;
}

function Card({ p, index, onOpen, style }: { p: Project; index: number; onOpen: () => void; style?: React.CSSProperties }) {
  const [hover, setHover] = useState(false);
  const canHover = typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;
  return (
    <article
      className={`ga-work ga-work--${p.format}`}
      data-reveal=""
      style={{ "--i": index % 3, ...style } as React.CSSProperties}
    >
      <button
        className="ga-work__btn"
        onClick={onOpen}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        aria-label={`${pt.works.open}: ${p.title}`}
      >
        <span className={`ga-work__media media ${hover ? "is-hover" : ""}`}>
          <LoopVideo src={p.preview} poster={p.poster} className="ga-work__video" playing={canHover ? hover : undefined} />
          <span className="ga-work__play" aria-hidden>
            <Play size={18} fill="currentColor" />
            {pt.works.open}
          </span>
        </span>
      </button>
      <div className="ga-work__meta">
        <h3 className="ga-work__title">{p.title}</h3>
        <p className="ga-work__info">
          <span>{p.category}</span>
          {p.client && <span>{p.client}</span>}
          {p.year && <span className="tnum">{p.year}</span>}
        </p>
      </div>
    </article>
  );
}

function Lightbox({ list, index, onClose, onMove }: { list: Project[]; index: number; onClose: () => void; onMove: (d: number) => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const p = list[index];

  useEffect(() => {
    const d = ref.current!;
    d.showModal();
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onMove(1);
      if (e.key === "ArrowLeft") onMove(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [onMove]);

  return (
    <dialog
      ref={ref}
      className="ga-lightbox"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="lightbox-title"
    >
      <div className={`ga-lightbox__inner ga-lightbox__inner--${p.format}`}>
        <video key={p.video} className="ga-lightbox__video" src={p.video} poster={p.poster} controls autoPlay playsInline />
        <div className="ga-lightbox__meta">
          <div>
            <p className="t-small text-muted">{[p.category, p.client, p.year].filter(Boolean).join(" · ")}</p>
            <h3 id="lightbox-title" className="t-title mt-2">{p.title}</h3>
            <p className="mt-4 max-w-[46ch] text-white/90">{p.description}</p>
            {p.link && (
              <a className="link-line mt-4" href={p.link} target="_blank" rel="noopener">Ver projeto completo</a>
            )}
          </div>
          <div className="ga-lightbox__nav">
            <button onClick={() => onMove(-1)} aria-label="Projeto anterior"><ArrowLeft size={20} /></button>
            <span className="t-small tnum">{index + 1} / {list.length}</span>
            <button onClick={() => onMove(1)} aria-label="Próximo projeto"><ArrowRight size={20} /></button>
          </div>
        </div>
        <button className="ga-lightbox__close" onClick={onClose} aria-label={pt.works.close} autoFocus>
          <X size={22} />
        </button>
      </div>
    </dialog>
  );
}

export function Works() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Todos");
  const [open, setOpen] = useState<number | null>(null);
  const list = useMemo(() => (filter === "Todos" ? projects : projects.filter((p) => p.category === filter)), [filter]);
  const rows = useMemo(() => buildRows(list), [list]);
  const move = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + list.length) % list.length)), [list.length]);

  return (
    <section id="trabalhos" className="ga-works wrap" aria-labelledby="trabalhos-title">
      <div className="ga-works__head">
        <Lines id="trabalhos-title" className="t-display" lines={["Trabalhos", "selecionados"]} />
        <div className="ga-works__aside">
          <p className="t-statement max-w-[26ch]" data-reveal="">{pt.works.intro}</p>
          <div className="ga-works__filters" role="group" aria-label="Filtrar por pilar" data-reveal="">
            {filters.map((f) => (
              <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)} className="ga-chip">
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="ga-works__rows">
        {rows.map((row, r) => (
          <div key={r} className="ga-works__row">
            {row.map((c) => (
              <Card
                key={c.p.slug}
                p={c.p}
                index={c.index}
                onOpen={() => setOpen(c.index)}
                style={{ gridColumn: c.col, marginTop: c.offset }}
              />
            ))}
          </div>
        ))}
      </div>

      {open !== null && <Lightbox list={list} index={open} onClose={() => setOpen(null)} onMove={move} />}
    </section>
  );
}

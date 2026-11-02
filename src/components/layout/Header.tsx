"use client";

import { useEffect, useRef, useState } from "react";
import { nav, site, whatsappLink } from "@/config/site";
import { pt } from "@/content/pt";
import { Timecode } from "@/components/ui/Timecode";
import { lockScroll } from "./SmoothScroll";
import { SoundToggle } from "./SoundToggle";

export function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY.current && y > 240);
      setSolid(y > window.innerHeight * 0.85);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    lockScroll(open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`ga-header ${hidden && !open ? "is-hidden" : ""} ${solid && !open ? "is-solid" : ""}`}
      >
        <a href="#inicio" className="ga-header__logo" aria-label={`${site.shortName}, início`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/ga-horizontal.svg" alt="" width={170} height={52} className="hidden md:block" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/ga-simbolo.svg" alt="" width={58} height={31} className="md:hidden" />
        </a>
        <div className="ga-header__center">
          <span className="t-small">{site.locationShort} · Brasil</span>
          <Timecode />
        </div>
        <div className="ga-header__end">
        <SoundToggle />
        <button
          className="ga-header__menu"
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span>{open ? pt.menu.close : pt.menu.open}</span>
          <span className={`menu-icon ${open ? "is-open" : ""}`} aria-hidden>
            <span />
            <span />
          </span>
        </button>
        </div>
      </header>

      <nav id="menu" className={`ga-menu ${open ? "is-open" : ""}`} aria-label="Principal" aria-hidden={!open} inert={!open}>
        <ul className="ga-menu__list">
          {nav.map((item, i) => (
            <li key={item.href} className="ga-menu__item" style={{ "--i": i } as React.CSSProperties}>
              <a href={item.href} className="ga-menu__link" onClick={() => setOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="ga-menu__foot">
          <div className="grid gap-1">
            <a className="link-line w-fit" href={whatsappLink()} target="_blank" rel="noopener">
              WhatsApp {site.contact.whatsappDisplay}
            </a>
            <a className="link-line w-fit" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          </div>
          <div className="flex gap-6">
            <a className="link-line" href={site.social.instagram.url} target="_blank" rel="noopener">Instagram</a>
            <a className="link-line" href={site.social.linkedin.url} target="_blank" rel="noopener">LinkedIn</a>
          </div>
          <p className="t-small text-muted">{site.slogan}</p>
        </div>
      </nav>
    </>
  );
}

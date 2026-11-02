"use client";

import { useEffect, useState } from "react";
import { whatsappLink } from "@/config/site";
import { pt } from "@/content/pt";
import { WhatsAppIcon } from "@/components/ui/Icons";

/** Botão flutuante de contato. Aparece depois da primeira tela. */
export function WhatsAppFloat() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a
      href={whatsappLink(pt.floating.message)}
      target="_blank"
      rel="noopener"
      className={`ga-float ${show ? "is-visible" : ""}`}
      aria-label={pt.floating.label}
    >
      <WhatsAppIcon size={26} />
      <span className="ga-float__label">Fale com a G/A</span>
    </a>
  );
}

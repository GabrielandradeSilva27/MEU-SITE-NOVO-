"use client";

import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { pt } from "@/content/pt";
import { initMusic, subscribeMusic, toggleSound } from "@/lib/music";

/** Liga a trilha de fundo e mostra o botão de som no cabeçalho. */
export function SoundToggle() {
  const [audible, setAudible] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const stop = initMusic(site.music.src, site.music.volume);
    const unsub = subscribeMusic((s) => {
      setAudible(s.audible);
      setBlocked(s.blocked);
    });
    return () => {
      unsub();
      stop();
    };
  }, []);

  return (
    <button
      type="button"
      data-sound-toggle
      className={`ga-sound ${audible ? "is-on" : ""} ${blocked ? "is-blocked" : ""}`}
      aria-pressed={audible}
      aria-label={audible ? pt.sound.off : pt.sound.on}
      onClick={toggleSound}
    >
      <span className="ga-sound__bars" aria-hidden>
        <span />
        <span />
        <span />
        <span />
      </span>
      <span className={blocked ? "" : "hidden sm:inline"}>{blocked ? pt.sound.unlock : pt.sound.label}</span>
    </button>
  );
}

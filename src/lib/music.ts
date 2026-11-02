/**
 * Trilha de fundo do site.
 *
 * O volume passa por um GainNode (Web Audio) porque o iPhone ignora `audio.volume`.
 * Navegadores só liberam som depois que a pessoa interage com a página: tentamos
 * tocar ao abrir e, se for bloqueado, a trilha começa no primeiro clique/toque/tecla.
 */

const FADE_IN = 1.2;
const FADE_OUT = 0.6;
const PREF_KEY = "ga-sound";

/** `blocked`: a trilha deveria tocar, mas o navegador ainda não liberou o som. */
type State = { enabled: boolean; audible: boolean; blocked: boolean };

let audio: HTMLAudioElement | null = null;
let ctx: AudioContext | null = null;
let gain: GainNode | null = null;
let target = 0.25;
let enabled = true;
let ducks = 0;
let audible = false;
let refused = false;
let pauseTimer: ReturnType<typeof setTimeout> | undefined;
const listeners = new Set<(s: State) => void>();

const snapshot = (): State => ({ enabled, audible, blocked: refused && enabled && ducks === 0 && !audible });
const emit = () => listeners.forEach((fn) => fn(snapshot()));

function rampTo(value: number, seconds: number) {
  if (!ctx || !gain) return;
  const now = ctx.currentTime;
  gain.gain.cancelScheduledValues(now);
  gain.gain.setValueAtTime(gain.gain.value, now);
  gain.gain.linearRampToValueAtTime(value, now + seconds);
}

/** Decide se a trilha deve soar agora e faz o fade para lá. */
function update() {
  if (!audio || !ctx) return;
  const want = enabled && ducks === 0 && !document.hidden;
  clearTimeout(pauseTimer);
  if (want) {
    Promise.all([ctx.resume(), audio.play()])
      .then(() => {
        if (ctx!.state !== "running") throw new Error("suspended");
        refused = false;
        rampTo(target, FADE_IN);
        audible = true;
        emit();
      })
      .catch(() => {
        /* bloqueado até a primeira interação */
        refused = true;
        emit();
      });
  } else {
    rampTo(0, FADE_OUT);
    audible = false;
    emit();
    pauseTimer = setTimeout(() => audio?.pause(), FADE_OUT * 1000 + 50);
  }
}

function onGesture(e: Event) {
  // O botão de som cuida de si mesmo; não queremos ligar e desligar no mesmo clique.
  if ((e.target as Element | null)?.closest?.("[data-sound-toggle]")) return;
  if (!audible) update();
}

export function initMusic(src: string, volume: number) {
  if (audio) return () => {};
  target = volume;
  try {
    enabled = localStorage.getItem(PREF_KEY) !== "off";
  } catch {}

  audio = new Audio(src);
  audio.loop = true;
  audio.preload = "auto";
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  ctx = new AC();
  gain = ctx.createGain();
  gain.gain.value = 0;
  ctx.createMediaElementSource(audio).connect(gain).connect(ctx.destination);

  const gestures = ["pointerdown", "keydown", "touchend"] as const;
  gestures.forEach((g) => window.addEventListener(g, onGesture, { capture: true, passive: true }));
  document.addEventListener("visibilitychange", update);
  update();
  emit();

  return () => {
    gestures.forEach((g) => window.removeEventListener(g, onGesture, { capture: true }));
    document.removeEventListener("visibilitychange", update);
    audio?.pause();
    void ctx?.close();
    audio = ctx = gain = null;
    audible = false;
  };
}

/** Abaixa a trilha (ex.: enquanto um vídeo com som está aberto). Chame de novo com `false` para voltar. */
export function duckMusic(on: boolean) {
  ducks = Math.max(0, ducks + (on ? 1 : -1));
  update();
}

export function setSoundEnabled(on: boolean) {
  enabled = on;
  try {
    localStorage.setItem(PREF_KEY, on ? "on" : "off");
  } catch {}
  update();
}

/** Liga/desliga. Se estava ligado mas o navegador bloqueou, o clique só destrava. */
export function toggleSound() {
  if (enabled && !audible && ducks === 0) update();
  else setSoundEnabled(!enabled);
}

export function subscribeMusic(fn: (s: State) => void) {
  listeners.add(fn);
  fn(snapshot());
  return () => void listeners.delete(fn);
}

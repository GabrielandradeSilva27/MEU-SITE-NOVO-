"use client";

import { useState, type FormEvent } from "react";
import { pt } from "@/content/pt";
import { site, whatsappLink } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Lines } from "@/components/ui/Lines";
import { InstagramIcon, LinkedInIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { Mail } from "lucide-react";

const f = pt.contact.form;
type Fields = {
  name: string; company: string; email: string; phone: string; segment: string;
  service: string; message: string; budget: string; consent: boolean; website: string;
};
const empty: Fields = { name: "", company: "", email: "", phone: "", segment: "", service: "", message: "", budget: "", consent: false, website: "" };
type Status = "idle" | "sending" | "success" | "error" | "whatsapp";

function validate(v: Fields) {
  const e: Partial<Record<keyof Fields, string>> = {};
  if (!v.name.trim()) e.name = f.required;
  if (!v.company.trim()) e.company = f.required;
  if (!v.email.trim()) e.email = f.required;
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = f.invalidEmail;
  if (!v.phone.trim()) e.phone = f.required;
  else if (v.phone.replace(/\D/g, "").length < 10) e.phone = f.invalidPhone;
  if (!v.service) e.service = f.required;
  if (!v.message.trim()) e.message = f.required;
  if (!v.consent) e.consent = f.consentRequired;
  return e;
}

const toWhatsappText = (v: Fields) =>
  [
    "Olá, G/A! Vim pelo site.",
    `Nome: ${v.name}`,
    `Empresa: ${v.company}`,
    `E-mail: ${v.email}`,
    `Telefone: ${v.phone}`,
    v.segment && `Segmento: ${v.segment}`,
    `Serviço: ${v.service}`,
    v.budget && `Investimento: ${v.budget}`,
    `Projeto: ${v.message}`,
  ]
    .filter(Boolean)
    .join("\n");

export function Contact() {
  const [v, setV] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const hasEndpoint = Boolean(site.formEndpoint);

  const set = <K extends keyof Fields>(k: K, val: Fields[K]) => {
    setV((s) => ({ ...s, [k]: val }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (v.website) return; // armadilha para robôs
    const e = validate(v);
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById(`f-${Object.keys(e)[0]}`)?.focus();
      return;
    }
    if (!hasEndpoint) {
      window.open(whatsappLink(toWhatsappText(v)), "_blank", "noopener");
      setStatus("whatsapp");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...v, website: undefined, _replyto: v.email, _subject: `Novo contato pelo site — ${v.company}` }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      setV(empty);
    } catch {
      setStatus("error");
    }
  }

  const field = (k: keyof Fields) => ({
    id: `f-${k}`,
    name: k,
    "aria-invalid": Boolean(errors[k]),
    "aria-describedby": errors[k] ? `e-${k}` : undefined,
  });
  const err = (k: keyof Fields) =>
    errors[k] ? <span id={`e-${k}`} className="ga-field__error" role="alert">{errors[k]}</span> : null;

  return (
    <section id="contato" className="ga-contact wrap" aria-labelledby="contato-title">
      <Lines id="contato-title" className="t-display ga-contact__head" lines={pt.contact.heading} />
      <div className="ga-contact__intro">
        <p className="t-statement max-w-[24ch]" data-reveal="">{pt.contact.lede}</p>

        <div className="ga-contact__direct" data-reveal="">
          <p className="t-small text-muted">{pt.contact.direct}</p>
          <a href={whatsappLink(pt.floating.message)} target="_blank" rel="noopener" className="ga-direct">
            <WhatsAppIcon size={22} /> <span>{site.contact.whatsappDisplay}</span>
          </a>
          <a href={site.social.instagram.url} target="_blank" rel="noopener" className="ga-direct">
            <InstagramIcon size={22} /> <span>{site.social.instagram.handle}</span>
          </a>
          <a href={`mailto:${site.contact.email}`} className="ga-direct">
            <Mail size={22} aria-hidden /> <span className="break-all">{site.contact.email}</span>
          </a>
          <a href={site.social.linkedin.url} target="_blank" rel="noopener" className="ga-direct">
            <LinkedInIcon size={22} /> <span>LinkedIn</span>
          </a>
        </div>
      </div>

      <form className="ga-form" onSubmit={onSubmit} noValidate data-reveal="">
        <div className="ga-form__row">
          <label className="ga-field">
            <span>{f.name} *</span>
            <input {...field("name")} autoComplete="name" value={v.name} onChange={(e) => set("name", e.target.value)} />
            {err("name")}
          </label>
          <label className="ga-field">
            <span>{f.company} *</span>
            <input {...field("company")} autoComplete="organization" value={v.company} onChange={(e) => set("company", e.target.value)} />
            {err("company")}
          </label>
        </div>
        <div className="ga-form__row">
          <label className="ga-field">
            <span>{f.email} *</span>
            <input {...field("email")} type="email" autoComplete="email" value={v.email} onChange={(e) => set("email", e.target.value)} />
            {err("email")}
          </label>
          <label className="ga-field">
            <span>{f.phone} *</span>
            <input {...field("phone")} type="tel" autoComplete="tel" inputMode="tel" placeholder="(27) 99999-9999" value={v.phone} onChange={(e) => set("phone", e.target.value)} />
            {err("phone")}
          </label>
        </div>
        <label className="ga-field">
          <span>{f.segment}</span>
          <input {...field("segment")} value={v.segment} onChange={(e) => set("segment", e.target.value)} />
        </label>

        <fieldset className="ga-field" aria-describedby={errors.service ? "e-service" : undefined}>
          <legend>{f.service} *</legend>
          <div className="ga-form__chips" id="f-service" tabIndex={-1}>
            {f.services.map((s) => (
              <label key={s} className="ga-chip ga-chip--radio">
                <input type="radio" name="service" value={s} checked={v.service === s} onChange={() => set("service", s)} />
                <span>{s}</span>
              </label>
            ))}
          </div>
          {err("service")}
        </fieldset>

        <label className="ga-field">
          <span>{f.message} *</span>
          <textarea {...field("message")} rows={5} value={v.message} onChange={(e) => set("message", e.target.value)} />
          {err("message")}
        </label>

        <label className="ga-field">
          <span>{f.budget}</span>
          <select {...field("budget")} value={v.budget} onChange={(e) => set("budget", e.target.value)}>
            <option value="">Selecione</option>
            {f.budgets.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </label>

        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden value={v.website} onChange={(e) => set("website", e.target.value)} />

        <label className="ga-consent">
          <input {...field("consent")} type="checkbox" checked={v.consent} onChange={(e) => set("consent", e.target.checked)} />
          <span>
            {f.consent} <a href="/privacidade/" className="underline underline-offset-4">Política de Privacidade</a>.
          </span>
        </label>
        {err("consent")}

        <div className="ga-form__submit">
          <Button type="submit" disabled={status === "sending"}>
            {status === "sending" ? f.sending : hasEndpoint ? f.submit : f.submitWhatsapp}
          </Button>
          <p className="ga-form__status" role="status" aria-live="polite">
            {status === "success" && f.success}
            {status === "whatsapp" && f.whatsappOpened}
            {status === "error" && (
              <>
                {f.error}{" "}
                <a className="underline underline-offset-4" href={whatsappLink(toWhatsappText(v))} target="_blank" rel="noopener">
                  Abrir WhatsApp
                </a>
              </>
            )}
          </p>
        </div>
      </form>
    </section>
  );
}

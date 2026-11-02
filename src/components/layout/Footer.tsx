import { nav, site, whatsappLink } from "@/config/site";
import { pt } from "@/content/pt";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="ga-footer">
      <div className="ga-footer__body">
        <div className="wrap ga-footer__top">
          <div className="ga-footer__brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/ga-simbolo-preto.svg" alt={site.shortName} width={120} height={64} />
            <p className="t-statement mt-6 max-w-[16ch]">{site.slogan}</p>
          </div>
          <nav aria-label="Rodapé" className="ga-footer__col">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="link-line w-fit">{n.label}</a>
            ))}
          </nav>
          <div className="ga-footer__col">
            <a className="link-line w-fit" href={whatsappLink()} target="_blank" rel="noopener">WhatsApp</a>
            <a className="link-line w-fit" href={site.social.instagram.url} target="_blank" rel="noopener">Instagram</a>
            <a className="link-line w-fit" href={site.social.linkedin.url} target="_blank" rel="noopener">LinkedIn</a>
            <a className="link-line w-fit break-all" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          </div>
          <div className="ga-footer__col">
            <span>{site.city}, {site.state}</span>
            <span>{site.country}</span>
          </div>
        </div>
        {/* Logo gigante ao fundo, apagada, apoiada na linha dos direitos. */}
        <div className="ga-footer__mark" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/ga-simbolo-recortado.svg" alt="" width={1840} height={882} loading="lazy" />
        </div>
      </div>
      <div className="wrap ga-footer__legal">
        <span>© {year} {site.name} — {pt.footer.rights}</span>
        <a className="link-line" href="/privacidade/">{pt.footer.privacy}</a>
        <a className="link-line" href="#inicio">{pt.footer.backToTop} ↑</a>
      </div>
    </footer>
  );
}

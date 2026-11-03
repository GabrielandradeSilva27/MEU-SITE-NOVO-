import { nav, site, whatsappLink } from "@/config/site";
import { pt } from "@/content/pt";

/* Símbolo G/A (de /brand/ga-simbolo-recortado.svg), desenhado direto no rodapé. */
const MARK_VIEWBOX = "78 102 1840 882";
const MARK_LETTERS = [
  "M485.5,471.7v142.9h258.4l-98.5,224.9H517.9c-78.7,0-153-31-209.2-87.2c-56.2-56.2-87.2-130.5-87.2-209.2 c0-78.7,31-153,87.2-209.2c56.2-56.2,130.5-87.2,209.2-87.2h175L755,104.9H517.9c-58.9,0-116.2,11.6-170.2,34.6 c-52.1,22.1-99,53.8-139.3,94.1c-40.3,40.3-72,87.2-94.1,139.3c-23,54-34.6,111.3-34.6,170.2s11.6,116.2,34.6,170.2 c22.1,52.1,53.8,99,94.1,139.3c40.3,40.3,87.2,72,139.3,94.1c54,23,111.3,34.6,170.2,34.6h225l221.3-509.7H485.5z",
  "M1357.2,103.9L974.3,980h0c96.9,0,184.6-57.4,223.3-146.2l318.3-729.9H1357.2z",
];
const MARK_A_LEG = "1900.6,951 1858.1,853.2 1853.8,843.3 1561.6,170.4 1540.6,122 1460,306.3 1691.8,839.4 1470.2,839.4 1407.6,982.2 1879.1,982.3 1914.9,982.2";
const MARK_SLASH = "M1097,250.5L777.6,981.1h159.5l382-876.1h0C1222.8,105.1,1135.6,162.1,1097,250.5z";

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
      </div>
      <div className="wrap ga-footer__legal">
        <span>© {year} {site.name} — {pt.footer.rights}</span>
        <a className="link-line" href="/privacidade/">{pt.footer.privacy}</a>
        <a className="link-line" href="#inicio">{pt.footer.backToTop} ↑</a>
      </div>
      {/* Logo gigante no fim da página, cortada embaixo. */}
      <div className="ga-footer__mark" aria-hidden>
        <svg viewBox={MARK_VIEWBOX}>
          {MARK_LETTERS.map((d) => <path key={d.slice(0, 12)} d={d} />)}
          <polygon points={MARK_A_LEG} />
          <path className="ga-footer__mark-slash" d={MARK_SLASH} />
        </svg>
      </div>
    </footer>
  );
}

import { pt } from "@/content/pt";
import { site } from "@/config/site";
import { Lines } from "@/components/ui/Lines";

const { about } = pt;

export function About() {
  return (
    <section id="sobre" className="ga-about wrap" aria-labelledby="sobre-title">
      <div className="ga-about__photos">
        <figure className="ga-about__main media" data-mask="">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={about.images[0].src} alt={about.images[0].alt} className="bw" loading="lazy" width={1800} height={1011} />
        </figure>
        <figure className="ga-about__inset media" data-mask="" style={{ "--i": 2 } as React.CSSProperties}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={about.images[1].src} alt={about.images[1].alt} className="bw" loading="lazy" width={1800} height={1011} />
        </figure>
      </div>

      <div className="ga-about__content">
        <Lines id="sobre-title" className="t-display" lines={["Mais do que", "imagens"]} />
        <div className="ga-about__text">
          {about.text.map((t, i) => (
            <p key={i} data-reveal="" style={{ "--i": i } as React.CSSProperties}>{t}</p>
          ))}
        </div>
        <p className="t-statement ga-about__statement" data-reveal="">{about.statement}</p>
        <ul className="ga-about__values" aria-label="O que nos guia">
          {about.values.map((v, i) => (
            <li key={v} data-reveal="" style={{ "--i": i } as React.CSSProperties}>
              <span className="ga-about__slash" aria-hidden>/</span>
              {v}
            </li>
          ))}
        </ul>
        <p className="ga-about__slogan" data-reveal="">{site.slogan}</p>
      </div>
    </section>
  );
}

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Loader } from "@/components/layout/Loader";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Pillars } from "@/components/sections/Pillars";
import { Stats } from "@/components/sections/Stats";
import { Works } from "@/components/sections/Works";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { site } from "@/config/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  slogan: site.slogan,
  url: site.seo.url,
  email: site.contact.email,
  telephone: site.contact.whatsappDisplay,
  foundingDate: String(site.foundedYear),
  address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: "ES", addressCountry: "BR" },
  sameAs: [site.social.instagram.url, site.social.linkedin.url],
};

export default function Home() {
  return (
    <>
      <Loader />
      <SmoothScroll />
      <RevealObserver />
      <Header />
      <main>
        <Hero />
        <Manifesto />
        <Pillars />
        <Works />
        <Stats />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { site } from "@/config/site";
import "./globals.css";
import "./sections.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.seo.url),
  title: site.seo.title,
  description: site.seo.description,
  icons: { icon: "/brand/ga-simbolo.svg" },
  openGraph: {
    title: site.seo.title,
    description: site.seo.description,
    locale: site.seo.locale,
    type: "website",
    siteName: site.name,
    // Imagem oficial de compartilhamento: A DEFINIR. Provisória: capa do reel.
    images: [{ url: "/media/hero/reel.jpg", width: 1600, height: 900 }],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#0d0d0d" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={jakarta.variable}>
      <body>{children}</body>
    </html>
  );
}

/**
 * G/A PRODUCTIONS — dados institucionais e comerciais.
 * Fonte: GA_Productions_Informacoes_Empresa.txt. Altere aqui e o site inteiro acompanha.
 * Não publique campos marcados como "A DEFINIR" no documento oficial.
 */

export const site = {
  name: "G/A PRODUCTIONS",
  shortName: "G/A Productions",
  slogan: "Transformamos ideias em resultados.",
  city: "Vitória",
  state: "Espírito Santo",
  country: "Brasil",
  locationShort: "Vitória, ES",
  foundedYear: 2024,

  seo: {
    title: "G/A Productions | Produtora Audiovisual e Estratégia para Marcas",
    description:
      "A G/A Productions transforma ideias em experiências audiovisuais estratégicas. Performance, conteúdo em tempo real e posicionamento de marcas.",
    locale: "pt_BR",
    // Domínio oficial: A DEFINIR. Atualize antes do lançamento (usado no sitemap e Open Graph).
    url: "https://gaproductions.com.br",
  },

  contact: {
    whatsappDisplay: "+55 (27) 99267-7628",
    whatsappNumber: "5527992677628",
    email: "gabriel.maker.es@gmail.com",
    // Ativação deste endereço ainda precisa ser confirmada antes do lançamento.
    quoteEmail: "comercial@gaproductions.com.br",
  },

  social: {
    instagram: { handle: "@gaproduction.s", url: "https://www.instagram.com/gaproduction.s/" },
    linkedin: { label: "LinkedIn", url: "https://www.linkedin.com/in/gabriel-andrade-silva-3a180529b/" },
  },

  /**
   * Endpoint do formulário (Formspree, Getform, API própria…).
   * Defina NEXT_PUBLIC_FORM_ENDPOINT no .env. Sem ele, o formulário envia pelo WhatsApp.
   */
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "",

  /** Trilha de fundo: toca em loop, baixinha, e some enquanto um vídeo do portfólio está aberto. */
  music: {
    src: "/media/audio/trilha.m4a",
    /** Volume de 0 a 1 (0.15 = 15%). */
    volume: 0.15,
  },
} as const;

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.contact.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const mailto = (address: string, subject?: string) =>
  `mailto:${address}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

export const nav = [
  { label: "Início", href: "#inicio" },
  { label: "Manifesto", href: "#manifesto" },
  { label: "Pilares", href: "#pilares" },
  { label: "Trabalhos", href: "#trabalhos" },
  { label: "Processo", href: "#processo" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
] as const;

/**
 * Indicadores informados pela G/A. Altere só com dados reais.
 * `decimals` mostra casas decimais (ex.: 3,8); `wide` ocupa a linha inteira.
 * `visible: false` esconde a faixa inteira sem mexer no layout.
 */
export const stats: {
  visible: boolean;
  items: {
    id: string;
    label: string;
    value: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
    wide?: boolean;
  }[];
} = {
  visible: true,
  items: [
    { id: "projectsCompleted", label: "Projetos realizados", value: 180, prefix: "+" },
    { id: "companiesServed", label: "Empresas atendidas", value: 80, prefix: "+" },
    { id: "eventsCovered", label: "Eventos cobertos", value: 35, prefix: "+" },
    { id: "videosProduced", label: "Vídeos produzidos", value: 500, prefix: "+" },
    { id: "recurringClients", label: "Clientes recorrentes", value: 10, prefix: "+" },
    { id: "yearsExperience", label: "Anos de experiência", value: 3, prefix: "+" },
    {
      id: "clientRevenue",
      label: "Em negócios impactados pelo audiovisual",
      value: 3.8,
      prefix: "R$ ",
      suffix: " milhões",
      decimals: 1,
      wide: true,
    },
  ],
};

/** Marcas autorizadas para exibição. Lista vazia = a faixa de clientes não aparece. */
export const clients: { name: string; logo: string }[] = [];

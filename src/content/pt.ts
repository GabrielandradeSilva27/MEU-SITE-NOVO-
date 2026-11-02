/**
 * Textos do site em português (idioma principal).
 * Para o inglês, crie `en.ts` com o mesmo formato (tipo `Copy`) e traduções revisadas.
 */

export const pt = {
  hero: {
    title: ["Ideias em", "movimento"],
    lede: "Produtora audiovisual estratégica para marcas que querem ir além.",
    tagline: ["Imagens que conectam.", "Histórias que posicionam."],
    cta: "Fale com a gente",
    scroll: "Role para ver",
    video: { src: "/media/hero/reel.mp4", poster: "/media/hero/reel.jpg" },
  },

  manifesto: {
    heading: "Manifesto",
    // Cada item é uma linha do manifesto; `strong` destaca a linha inteira.
    lines: [
      { text: "Não acreditamos em produzir apenas por produzir." },
      {
        text: "Acreditamos em histórias que merecem ser contadas, marcas que precisam ser percebidas e experiências que não podem passar despercebidas.",
      },
      { text: "Transformamos ideias em narrativas visuais.", strong: true },
    ],
    closing: [
      "Porque uma boa imagem chama atenção.",
      "Uma boa história cria conexão.",
      "E uma estratégia bem executada gera resultados.",
    ],
    video: { src: "/media/manifesto/aerial.mp4", poster: "/media/manifesto/aerial.jpg" },
  },

  pillars: {
    heading: "Três pilares, uma mesma visão",
    intro:
      "Atuamos em três frentes que se complementam: atenção, presença e percepção de valor.",
    items: [
      {
        id: "performance",
        title: "Performance",
        summary:
          "Produções audiovisuais estratégicas para marcas que desejam gerar atenção, conexão e resultados.",
        deliverables: [
          "Conteúdo para redes sociais",
          "Vídeos comerciais e publicitários",
          "Campanhas audiovisuais",
          "Vídeos de produtos e serviços",
          "Conteúdo de marca",
        ],
        video: { src: "/media/pillars/performance.mp4", poster: "/media/pillars/performance.jpg" },
      },
      {
        id: "tempo-real",
        title: "Tempo Real",
        summary:
          "O momento acontece uma vez. Nossa missão é capturá-lo e transformá-lo em conteúdo enquanto ele ainda importa.",
        deliverables: [
          "Cobertura audiovisual de eventos",
          "Conteúdo em tempo real",
          "Same day edit",
          "Reels e vídeos verticais durante eventos",
          "Registros de experiências e ativações",
        ],
        video: { src: "/media/pillars/real-time.mp4", poster: "/media/pillars/real-time.jpg" },
      },
      {
        id: "posicionamento",
        title: "Posicionamento",
        summary:
          "Construímos narrativas visuais que fortalecem a percepção, a identidade e o posicionamento de marcas.",
        deliverables: [
          "Filmes institucionais",
          "Storytelling de marca",
          "Vídeos de apresentação de empresas",
          "Filmes de campanha",
          "Produções cinematográficas",
        ],
        video: { src: "/media/pillars/positioning.mp4", poster: "/media/pillars/positioning.jpg" },
      },
    ],
    note: "Cada formato é definido conforme o escopo do projeto.",
  },

  stats: {
    heading: "Em números",
    intro: "Indicadores atualizados conforme os projetos são concluídos.",
    videos: [
      { src: "/media/stats/festival.mp4", poster: "/media/stats/festival.jpg" },
      { src: "/media/stats/street.mp4", poster: "/media/stats/street.jpg" },
    ],
  },

  works: {
    heading: "Trabalhos selecionados",
    intro: "Uma seleção de filmes, coberturas e conteúdos produzidos pela G/A.",
    filterAll: "Todos",
    open: "Assistir",
    close: "Fechar",
  },

  process: {
    heading: "Como conduzimos um projeto",
    intro: "Uma metodologia clara, do primeiro encontro à entrega final.",
    steps: [
      { title: "Imersão", text: "Entendemos a empresa, o contexto, os objetivos e as necessidades do projeto." },
      { title: "Estratégia", text: "Definimos a abordagem criativa, a narrativa e a direção audiovisual." },
      { title: "Produção", text: "Realizamos a captação e transformamos o planejamento em imagens." },
      { title: "Pós-produção", text: "Editamos, finalizamos e revisamos cada detalhe do material." },
      { title: "Entrega", text: "Disponibilizamos os conteúdos nos formatos e canais definidos no projeto." },
    ],
    video: { src: "/media/process/room.mp4", poster: "/media/process/room.jpg" },
  },

  about: {
    heading: "Mais do que produzir imagens",
    text: [
      "A G/A Productions é uma produtora audiovisual especializada em criar experiências visuais e soluções estratégicas para marcas e empresas.",
      "Unimos criatividade, narrativa e estratégia para transformar ideias em conteúdos que comunicam, conectam e fortalecem marcas.",
    ],
    statement: "Queremos dar forma à maneira como as marcas são vistas e lembradas.",
    values: [
      "Visão estratégica",
      "Criatividade",
      "Comprometimento",
      "Qualidade técnica",
      "Organização",
      "Busca por excelência",
    ],
    images: [
      { src: "/media/about/ga-stage.jpg", alt: "Palestrante no palco durante cobertura de evento corporativo" },
      { src: "/media/about/ga-case.jpg", alt: "Case de equipamento com a marca G/A em um evento" },
    ],
  },

  contact: {
    heading: ["Sua próxima história", "começa aqui."],
    lede: "Vamos transformar sua ideia em uma experiência audiovisual?",
    form: {
      name: "Nome",
      company: "Empresa",
      email: "E-mail",
      phone: "WhatsApp / telefone",
      segment: "Segmento da empresa (opcional)",
      service: "Serviço de interesse",
      services: ["Performance", "Tempo Real", "Posicionamento", "Ainda não sei"],
      message: "Conte sobre o projeto e o objetivo",
      budget: "Previsão de investimento (opcional)",
      budgets: ["Até R$ 5 mil", "R$ 5 a 15 mil", "R$ 15 a 30 mil", "Acima de R$ 30 mil", "Prefiro conversar"],
      consent:
        "Autorizo a G/A Productions a usar estes dados apenas para responder a este contato, conforme a LGPD.",
      submit: "Enviar mensagem",
      submitWhatsapp: "Enviar pelo WhatsApp",
      sending: "Enviando…",
      success: "Mensagem enviada. Retornaremos em breve.",
      error: "Não foi possível enviar agora. Tente pelo WhatsApp.",
      whatsappOpened: "Abrimos o WhatsApp com a sua mensagem pronta. É só confirmar o envio por lá.",
      required: "Campo obrigatório",
      invalidEmail: "Informe um e-mail válido",
      invalidPhone: "Informe um telefone com DDD",
      consentRequired: "É preciso autorizar o uso dos dados para enviar",
    },
    direct: "Prefere falar direto?",
  },

  footer: {
    rights: "Todos os direitos reservados.",
    privacy: "Política de Privacidade",
    backToTop: "Voltar ao topo",
  },

  floating: { label: "Fale com a G/A no WhatsApp", message: "Olá, G/A! Vim pelo site e quero conversar sobre um projeto." },
  menu: { open: "Menu", close: "Fechar" },
} as const;

export type Copy = typeof pt;

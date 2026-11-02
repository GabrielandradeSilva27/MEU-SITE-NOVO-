/**
 * Portfólio. Para adicionar um projeto:
 * 1. Coloque `nome.mp4` (prévia em loop, sem áudio), `nome.jpg` (capa) e `nome-full.mp4` (versão completa)
 *    em /public/media/works — ou rode `bash scripts/media/build-media.sh` depois de incluí-lo lá.
 * 2. Acrescente um item abaixo. A ordem do array é a ordem do grid.
 *
 * `client` fica vazio até a marca autorizar a exibição — campos vazios não aparecem no site.
 */

export type Pillar = "Performance" | "Tempo Real" | "Posicionamento";

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: Pillar;
  description: string;
  year?: number;
  format: "horizontal" | "vertical";
  preview: string;
  poster: string;
  video: string;
  link?: string;
};

const media = (slug: string) => ({
  preview: `/media/works/${slug}.mp4`,
  poster: `/media/works/${slug}.jpg`,
  video: `/media/works/${slug}-full.mp4`,
});

export const projects: Project[] = [
  {
    slug: "convencao",
    title: "Convenção corporativa",
    client: "",
    category: "Tempo Real",
    description: "Cobertura de um dia inteiro de palestras, bastidores e conexões, editada para circular ainda no clima do evento.",
    format: "horizontal",
    ...media("convencao"),
  },
  {
    slug: "mansao",
    title: "Residência de alto padrão",
    client: "",
    category: "Performance",
    description: "Filme vertical para apresentar um imóvel exclusivo com ritmo, detalhe e desejo.",
    format: "vertical",
    ...media("mansao"),
  },
  {
    slug: "lancamento",
    title: "Lançamento imobiliário",
    client: "",
    category: "Tempo Real",
    description: "Evento de apresentação de empreendimento: depoimentos, palco e a atmosfera do lugar.",
    format: "horizontal",
    ...media("lancamento"),
  },
  {
    slug: "clinica",
    title: "Filme institucional de clínica",
    client: "",
    category: "Posicionamento",
    description: "Cuidado, estrutura e equipe traduzidos em uma narrativa de marca.",
    format: "vertical",
    ...media("clinica"),
  },
  {
    slug: "celebracao",
    title: "Celebração de 50 anos",
    client: "",
    category: "Tempo Real",
    description: "Um registro sensível de uma noite que só acontece uma vez.",
    format: "horizontal",
    ...media("celebracao"),
  },
  {
    slug: "tecnologia",
    title: "Produto em destaque",
    client: "",
    category: "Performance",
    description: "Peça de produto com luz, textura e movimento para redes sociais.",
    format: "vertical",
    ...media("tecnologia"),
  },
  {
    slug: "dia-dos-pais",
    title: "Filme de Dia dos Pais",
    client: "",
    category: "Posicionamento",
    description: "Storytelling de data comemorativa com depoimentos e emoção.",
    format: "horizontal",
    ...media("dia-dos-pais"),
  },
  {
    slug: "evento",
    title: "Evento de negócios",
    client: "",
    category: "Tempo Real",
    description: "Captação dinâmica de painéis e plateia para conteúdo durante o evento.",
    format: "vertical",
    ...media("evento"),
  },
  {
    slug: "coworking",
    title: "Espaço de coworking",
    client: "",
    category: "Performance",
    description: "Ambientes e rotina apresentados para atrair novos membros.",
    format: "vertical",
    ...media("coworking"),
  },
  {
    slug: "consultorio",
    title: "Novo endereço",
    client: "",
    category: "Performance",
    description: "Anúncio de mudança com apresentação do novo espaço de atendimento.",
    format: "vertical",
    ...media("consultorio"),
  },
  {
    slug: "bairro",
    title: "Bairro planejado",
    client: "",
    category: "Performance",
    description: "Apresentação de empreendimento com imagens aéreas e apresentadora.",
    format: "vertical",
    ...media("bairro"),
  },
  {
    slug: "feira-inovacao",
    title: "Feira de inovação",
    client: "",
    category: "Tempo Real",
    description: "Estande, palestras e entrevistas captados em uma grande feira, com legendas e ritmo de aftermovie.",
    format: "horizontal",
    ...media("feira-inovacao"),
  },
  {
    slug: "casa-condominio",
    title: "Casa em condomínio",
    client: "",
    category: "Performance",
    description: "Apresentação de casa com aéreas, ambientes e apresentador, pensada para vender pelo celular.",
    format: "vertical",
    ...media("casa-condominio"),
  },
  {
    slug: "imersao",
    title: "Imersão de planejamento",
    client: "",
    category: "Tempo Real",
    description: "Dia de imersão com equipe: dinâmicas, depoimentos e a energia do grupo registrados de ponta a ponta.",
    format: "horizontal",
    ...media("imersao"),
  },
  {
    slug: "orla",
    title: "Morar perto do mar",
    client: "",
    category: "Performance",
    description: "Cidade, orla e imóvel na mesma história, com aéreas e apresentadora.",
    format: "vertical",
    ...media("orla"),
  },
  {
    slug: "encontro-mercado",
    title: "Encontro com o mercado",
    client: "",
    category: "Posicionamento",
    description: "Filme de apresentação para o mercado, com entrevista do fundador e o encontro com convidados.",
    format: "horizontal",
    ...media("encontro-mercado"),
  },
  {
    slug: "antes-depois",
    title: "Antes e depois",
    client: "",
    category: "Performance",
    description: "Transformação de produto mostrada em poucos segundos, com luz e montagem marcadas.",
    format: "vertical",
    ...media("antes-depois"),
  },
  {
    slug: "feira-bastidores",
    title: "Bastidores de feira",
    client: "",
    category: "Tempo Real",
    description: "Versão vertical da cobertura, com convidados e o movimento dos corredores.",
    format: "vertical",
    ...media("feira-bastidores"),
  },
  {
    slug: "litoral",
    title: "Vida no litoral",
    client: "",
    category: "Performance",
    description: "A rotina da cidade à beira-mar como argumento de venda do imóvel.",
    format: "vertical",
    ...media("litoral"),
  },
];

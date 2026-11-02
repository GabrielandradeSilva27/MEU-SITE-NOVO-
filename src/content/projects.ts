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
];

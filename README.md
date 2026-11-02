# G/A PRODUCTIONS — website

Site one-page em Next.js + TypeScript + Tailwind, com GSAP (pins e animações de rolagem) e Lenis (rolagem suave). Gera um site estático na pasta `out/`.

## Rodar

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # gera /out
npm start            # serve /out em http://localhost:5173
```

## Onde trocar cada coisa

| O quê | Arquivo |
| --- | --- |
| Contatos, WhatsApp, e-mails, redes, SEO, domínio | `src/config/site.ts` |
| Números (todos em 0) e se aparecem (`visible`) | `src/config/site.ts` → `stats` |
| Marcas/clientes autorizados | `src/config/site.ts` → `clients` |
| Todos os textos | `src/content/pt.ts` |
| Projetos do portfólio | `src/content/projects.ts` |
| Logo | `public/brand/` (mesmos nomes de arquivo) |
| Vídeo do hero e demais vídeos | `public/media/…` (mesmo nome, ou altere o caminho em `pt.ts`) |
| Trilha de fundo (arquivo e volume) | `public/media/audio/trilha.m4a` e `src/config/site.ts` → `music` |

### Vídeos
Os loops do site são curtos (6–20 s), sem áudio e leves (~1 MB). As versões completas do portfólio (`*-full.mp4`) abrem no player.
Para regerar tudo a partir dos arquivos brutos desta pasta (macOS, sem ffmpeg):

```bash
bash scripts/media/build-media.sh
```

Para um projeto novo: adicione uma linha `work …` no script, rode-o e inclua o item em `src/content/projects.ts`.

### Formulário
Sem configuração, o formulário valida os campos e abre o WhatsApp com a mensagem pronta (não simula envio).
Para enviar por e-mail, crie `.env.local` com `NEXT_PUBLIC_FORM_ENDPOINT=https://…` (Formspree, Getform ou API própria) e rode o build de novo.

## Antes de publicar
- Confirmar o domínio (`site.seo.url`) e a ativação de `comercial@gaproductions.com.br`.
- Revisar a Política de Privacidade (`src/app/privacidade/page.tsx`, versão preliminar).
- Confirmar títulos dos projetos e autorização para exibir nomes de clientes.
- Preencher os indicadores reais ou esconder a faixa (`stats.visible = false`).
- Hospedar com suporte a requisições Range para vídeo (Vercel, Netlify e Cloudflare já suportam).

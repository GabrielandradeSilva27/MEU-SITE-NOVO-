import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = { title: `Política de Privacidade | ${site.shortName}` };

/** Versão preliminar — revisar com assessoria jurídica antes do lançamento. */
export default function Privacidade() {
  return (
    <main className="wrap max-w-3xl mx-auto py-32 grid gap-6">
      <a href="/" className="link-line w-fit t-small">← Voltar ao site</a>
      <h1 className="t-display">Política de Privacidade</h1>
      <p className="t-small text-muted">Versão preliminar, em revisão.</p>
      <p>
        Os dados enviados pelo formulário de contato (nome, empresa, e-mail, telefone, segmento, serviço de interesse,
        descrição do projeto e previsão de investimento) são usados exclusivamente para responder à sua solicitação e
        elaborar uma proposta comercial.
      </p>
      <p>
        Não vendemos nem compartilhamos esses dados com terceiros para fins de marketing. Quando você opta pelo
        WhatsApp, a mensagem é enviada pelo próprio aplicativo e segue também a política de privacidade dele.
      </p>
      <p>
        Você pode pedir acesso, correção ou exclusão dos seus dados a qualquer momento pelo e-mail{" "}
        <a className="underline underline-offset-4" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
      </p>
    </main>
  );
}

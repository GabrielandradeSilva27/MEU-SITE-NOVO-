import type { CSSProperties, ElementType } from "react";

type Props = {
  as?: ElementType;
  lines: readonly string[];
  className?: string;
  /** atraso inicial em ms */
  delay?: number;
  id?: string;
};

/** Título em linhas que sobem de dentro de uma máscara ao entrar na tela. */
export function Lines({ as: Tag = "h2", lines, className, delay = 0, id }: Props) {
  return (
    <Tag className={className} data-lines="" id={id} style={{ "--d": `${delay}ms` } as CSSProperties}>
      {lines.map((line, i) => (
        <span key={i} className="line" style={{ "--l": i } as CSSProperties}>
          <span>{line}</span>
        </span>
      ))}
    </Tag>
  );
}

import { AlertTriangle, Info } from "lucide-react";
import type { ArticleBlock } from "@/data/insights";
import { ArticleMediaFigure } from "./ArticleMediaFigure";
import { InstagramEmbed } from "./InstagramEmbed";

/**
 * Renderiza el cuerpo de un artículo a partir de bloques tipados.
 *
 * Es un componente de servidor sin estado: no hay `dangerouslySetInnerHTML` ni
 * HTML en crudo, de modo que el contenido no obliga a relajar la CSP.
 *
 * Va sobre la sección clara (#F5F7FB) de la plantilla: texto Graphite, títulos
 * Onyx y acentos Sapphire, según el brandbook ATM.
 */

const Callout = ({
    tone,
    title,
    text,
}: {
    tone: "alert" | "info";
    title: string;
    text: string;
}) => {
    const isAlert = tone === "alert";
    const Icon = isAlert ? AlertTriangle : Info;

    // Bloque destacado del brandbook: Onyx con borde izquierdo Neon Ice (alerta)
    // o tarjeta informativa azul con borde izquierdo Sapphire (info).
    return (
        <div
            role="note"
            aria-label={isAlert ? `Alerta: ${title}` : title}
            className={`my-10 rounded-2xl border-l-4 p-6 md:p-7 ${
                isAlert
                    ? "border-l-[#16F3E8] bg-[#0F1215] text-white shadow-[0_20px_50px_rgba(15,18,21,0.15)]"
                    : "border border-[#b8ccf0] border-l-[#176BDE] bg-[#f2f7ff]"
            }`}
        >
            <div className="flex items-start gap-4">
                <div
                    className={`mt-0.5 shrink-0 rounded-lg p-2 ${
                        isAlert ? "bg-[#16F3E8]/10 text-[#16F3E8]" : "bg-[#176BDE]/10 text-[#176BDE]"
                    }`}
                >
                    <Icon aria-hidden className="h-4 w-4" />
                </div>
                <div>
                    <p
                        className={`mb-2 text-base font-black tracking-tight ${
                            isAlert ? "text-white" : "text-[#0F1215]"
                        }`}
                    >
                        {title}
                    </p>
                    <p
                        className={`text-[0.9375rem] leading-relaxed md:text-base ${
                            isAlert ? "text-slate-300" : "text-[#3F3D44]"
                        }`}
                    >
                        {text}
                    </p>
                </div>
            </div>
        </div>
    );
};

export const ArticleBody = ({ blocks }: { blocks: readonly ArticleBlock[] }) => (
    <div className="max-w-none">
        {blocks.map((block, idx) => {
            switch (block.kind) {
                case "heading":
                    return (
                        <h2
                            key={idx}
                            className="mb-5 mt-14 text-2xl font-black leading-tight tracking-tight text-[#0F1215] md:text-3xl"
                        >
                            {block.text}
                        </h2>
                    );

                case "paragraph":
                    return (
                        <p key={idx} className="mb-6 text-[1.0625rem] leading-[1.75] text-[#3F3D44]">
                            {block.text}
                        </p>
                    );

                case "list":
                    return (
                        <ul key={idx} className="mb-8 space-y-3">
                            {block.items.map((item, i) => (
                                <li key={i} className="flex gap-3.5">
                                    <span
                                        aria-hidden="true"
                                        className="mt-[0.65rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#176BDE]"
                                    />
                                    <span className="text-[1.0625rem] leading-[1.7] text-[#3F3D44]">{item}</span>
                                </li>
                            ))}
                        </ul>
                    );

                case "numbered":
                    return (
                        <ol key={idx} className="mb-10 space-y-4">
                            {block.items.map((item, i) => (
                                <li
                                    key={i}
                                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-7"
                                >
                                    <div className="mb-3 flex items-center gap-3.5">
                                        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#176BDE] text-sm font-black text-white">
                                            {i + 1}
                                        </span>
                                        <h3 className="text-lg font-bold leading-snug text-[#0F1215]">
                                            {item.title}
                                        </h3>
                                    </div>
                                    <p className="text-[0.9375rem] leading-relaxed text-[#3F3D44] md:text-base">
                                        {item.text}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    );

                case "callout":
                    return (
                        <Callout key={idx} tone={block.tone} title={block.title} text={block.text} />
                    );

                case "figure":
                    return <ArticleMediaFigure key={idx} media={block.media} />;

                case "instagram":
                    return (
                        <InstagramEmbed
                            key={idx}
                            url={block.url}
                            account={block.account}
                            caption={block.caption}
                        />
                    );

                case "timeline":
                    return (
                        <ol key={idx} className="relative my-10 space-y-6 border-l-2 border-[#b8ccf0] pl-6 md:pl-8">
                            {block.items.map((item) => (
                                <li key={item.date + item.title} className="relative">
                                    <span
                                        aria-hidden="true"
                                        className={`absolute -left-[33px] top-1.5 h-4 w-4 rounded-full border-4 md:-left-[41px] ${
                                            item.current
                                                ? "border-[#16F3E8] bg-[#0F1215]"
                                                : "border-[#F5F7FB] bg-[#176BDE]"
                                        }`}
                                    />
                                    <p className="text-xs font-black uppercase tracking-[0.15em] text-[#176BDE]">
                                        {item.date}
                                    </p>
                                    <p className="mt-1 text-base font-bold leading-snug text-[#0F1215] md:text-lg">
                                        {item.title}
                                    </p>
                                    <p className="mt-1 text-[0.9375rem] leading-relaxed text-[#3F3D44]">{item.text}</p>
                                </li>
                            ))}
                        </ol>
                    );

                case "table":
                    return (
                        <div
                            key={idx}
                            tabIndex={0}
                            role="region"
                            aria-label={`Tabla: ${block.headers.join(", ")} (desplazable)`}
                            className="my-10 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm"
                        >
                            <table className="w-full border-collapse text-left">
                                <thead>
                                    <tr className="bg-[#0F1215]">
                                        {block.headers.map((header) => (
                                            <th
                                                key={header}
                                                scope="col"
                                                className="px-5 py-4 text-[0.75rem] font-black uppercase tracking-widest text-[#16F3E8]"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {block.rows.map((row, i) => (
                                        <tr key={i} className="border-t border-slate-200 align-top even:bg-[#F5F7FB]">
                                            {row.map((cell, j) => (
                                                <td
                                                    key={j}
                                                    className={`px-5 py-4 text-[0.9375rem] leading-relaxed ${
                                                        j === 0
                                                            ? "min-w-[7rem] font-bold text-[#0F1215]"
                                                            : "min-w-[12rem] text-[#3F3D44]"
                                                    }`}
                                                >
                                                    {cell}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    );
            }
        })}
    </div>
);

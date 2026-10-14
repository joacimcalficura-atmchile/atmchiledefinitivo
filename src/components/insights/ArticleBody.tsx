import { AlertTriangle, Info } from "lucide-react";
import type { ArticleBlock } from "@/data/insights";

/**
 * Renderiza el cuerpo de un artículo a partir de bloques tipados.
 *
 * Es un componente de servidor sin estado: no hay `dangerouslySetInnerHTML` ni
 * HTML en crudo, de modo que el contenido no obliga a relajar la CSP.
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

    return (
        <aside
            className={`my-10 rounded-2xl border p-6 md:p-7 ${
                isAlert
                    ? "border-amber-400/25 bg-amber-400/[0.06]"
                    : "border-[#176BDE]/25 bg-[#176BDE]/[0.06]"
            }`}
        >
            <div className="flex items-start gap-4">
                <div
                    className={`mt-0.5 shrink-0 rounded-lg p-2 ${
                        isAlert
                            ? "bg-amber-400/10 text-amber-300"
                            : "bg-[#176BDE]/10 text-[#4D9BFF]"
                    }`}
                >
                    <Icon className="h-4 w-4" />
                </div>
                <div>
                    <p
                        className={`mb-2 text-sm font-black tracking-wide ${
                            isAlert ? "text-amber-200" : "text-[#8FC0FF]"
                        }`}
                    >
                        {title}
                    </p>
                    <p className="text-[15px] leading-relaxed text-slate-300">{text}</p>
                </div>
            </div>
        </aside>
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
                            className="mt-14 mb-5 text-2xl font-black leading-tight tracking-tight text-white md:text-3xl"
                        >
                            {block.text}
                        </h2>
                    );

                case "paragraph":
                    return (
                        <p
                            key={idx}
                            className="mb-6 text-[17px] leading-[1.75] text-slate-300"
                        >
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
                                        className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#176BDE]"
                                    />
                                    <span className="text-[17px] leading-[1.7] text-slate-300">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    );

                case "numbered":
                    return (
                        <ol key={idx} className="mb-10 space-y-6">
                            {block.items.map((item, i) => (
                                <li
                                    key={i}
                                    className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 md:p-7"
                                >
                                    <div className="mb-3 flex items-center gap-3.5">
                                        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#176BDE]/12 text-sm font-black text-[#4D9BFF]">
                                            {i + 1}
                                        </span>
                                        <h3 className="text-lg font-bold leading-snug text-white">
                                            {item.title}
                                        </h3>
                                    </div>
                                    <p className="text-[15px] leading-relaxed text-slate-400">
                                        {item.text}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    );

                case "callout":
                    return (
                        <Callout
                            key={idx}
                            tone={block.tone}
                            title={block.title}
                            text={block.text}
                        />
                    );

                case "table":
                    return (
                        <div
                            key={idx}
                            className="my-10 overflow-x-auto rounded-2xl border border-white/[0.07]"
                        >
                            <table className="w-full border-collapse text-left">
                                <thead>
                                    <tr className="bg-white/[0.03]">
                                        {block.headers.map((header) => (
                                            <th
                                                key={header}
                                                scope="col"
                                                className="px-5 py-4 text-[11px] font-black uppercase tracking-widest text-[#8FC0FF]"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {block.rows.map((row, i) => (
                                        <tr
                                            key={i}
                                            className="border-t border-white/[0.06] align-top"
                                        >
                                            {row.map((cell, j) => (
                                                <td
                                                    key={j}
                                                    className={`px-5 py-4 text-[15px] leading-relaxed ${
                                                        j === 0
                                                            ? "font-bold whitespace-nowrap text-white"
                                                            : "text-slate-400"
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

import { getLatestReels } from "@/lib/instagram";
import { ReelsCarousel } from "./ReelsCarousel";

const INSTAGRAM_PROFILE = "https://www.instagram.com/atmchile_com/";

/**
 * Sección "Reels" de la home (Server Component). Los datos vienen de la API de
 * Instagram con ISR (ver `src/lib/instagram.ts`): cuando ATM publica un reel
 * nuevo, aparece aquí solo en menos de una hora. Si no hay token o la API
 * falla, la sección no se renderiza.
 */
export async function InstagramReels() {
    const reels = await getLatestReels(8);
    if (reels.length === 0) return null;

    return (
        <section id="reels" aria-labelledby="reels-title" className="py-20 md:py-28 bg-atm-onyx relative overflow-hidden">
            <div className="absolute -top-32 right-0 w-[480px] h-[480px] rounded-full bg-atm-sapphire/20 blur-[140px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
                    <div className="max-w-2xl">
                        <span className="inline-block rounded-full border border-atm-neon-ice/30 bg-atm-onyx px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-atm-neon-ice">
                            En Instagram
                        </span>
                        <h2 id="reels-title" className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
                            Lo último de ATM, en video
                        </h2>
                        <p className="mt-4 text-base md:text-lg font-extralight text-atm-alabaster/80">
                            Casos reales, cursos y tecnología a tu medida contada en menos de un minuto.
                        </p>
                    </div>
                    <a
                        href={INSTAGRAM_PROFILE}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center self-start md:self-auto rounded-full bg-atm-sapphire px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-atm-sapphire/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atm-neon-ice"
                    >
                        Síguenos en @atmchile_com
                    </a>
                </div>

                <ReelsCarousel reels={reels} />
            </div>
        </section>
    );
}

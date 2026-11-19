/**
 * Entradas del menú lateral de secciones (rayitas a la derecha).
 *
 * Las páginas listadas aquí usan títulos y resúmenes escritos a mano, en el
 * orden de la página. El resto de las páginas arma el menú solo: toma cada
 * <section> principal de <main> y usa su primer título (h1/h2) y su primer
 * párrafo. Para ajustar una sección sin tocar este archivo, ponle
 * `data-rail-title` y/o `data-rail-summary`; para sacarla del menú,
 * `data-rail-ignore`.
 */
export interface RailSection {
    /** id del elemento <section> en la página. */
    id: string;
    title: string;
    summary: string;
}

export const CURATED_RAILS: Record<string, RailSection[]> = {
    "/": [
        { id: "inicio", title: "Inicio", summary: "Partner tecnológico 360° para empresas chilenas: software a medida, IA y ciberseguridad." },
        { id: "aliados", title: "Empresas que confían", summary: "Organizaciones que ya integran sus procesos con ATM." },
        { id: "reels", title: "Lo último en video", summary: "Casos reales, cursos y tecnología contada en menos de un minuto." },
        { id: "productos", title: "Productos propios", summary: "CRM y ERP desarrollados por ATM, listos para operar." },
        { id: "leasing", title: "Leasing de software", summary: "Tu sistema a medida, pagado en cuotas." },
        { id: "insights", title: "Insights", summary: "Los plazos normativos que ya están corriendo en Chile." },
        { id: "ecosistema", title: "Ecosistema 360", summary: "Integración con las plataformas y estándares globales." },
        { id: "servicios", title: "Servicios estratégicos", summary: "Talento senior, IA generativa y ciberseguridad 360." },
        { id: "club100", title: "Club 100", summary: "Alianza restringida a 100 empresas, con ingeniería de élite y soporte prioritario." },
        { id: "admision-form", title: "Portal de Admisión", summary: "Postula tu empresa y cuéntanos tu proyecto." },
    ],
};

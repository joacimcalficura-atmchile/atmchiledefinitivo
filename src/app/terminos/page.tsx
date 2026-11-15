import Link from "next/link";
import { SITE } from "@/data/site";
import { ControllerCard, LegalDocument, type LegalSection } from "@/components/legal/LegalDocument";
import { LEGAL_EFFECTIVE_DATE } from "@/components/legal/legal-meta";

/*
 * Texto definitivo entregado por ATM (redactado con su asesoría legal).
 * No editar el contenido sin su validación.
 */

const domain = SITE.url.replace("https://", "");

const sections: LegalSection[] = [
    {
        id: "titular",
        title: "Titular",
        body: (
            <>
                <p>
                    El dominio web{" "}
                    <a href={SITE.url} className="font-semibold text-[#176BDE] underline underline-offset-2">
                        {domain}
                    </a>{" "}
                    es operado y es de propiedad exclusiva de {SITE.legalName}, RUT {SITE.rut}, con domicilio comercial
                    en {SITE.address}.
                </p>
                <ControllerCard />
            </>
        ),
    },
    {
        id: "objeto",
        title: "Objeto y aceptación",
        body: (
            <p>
                El ingreso a esta plataforma y la aceptación expresa mediante el aviso de ingreso (clic afirmativo)
                confieren la calidad de usuario y suponen la total conformidad con el presente instrumento legal.
            </p>
        ),
    },
    {
        id: "uso",
        title: "Uso permitido y prohibido",
        body: (
            <p>
                El sitio está destinado a la información, contacto y evaluación comercial B2B. Queda estrictamente
                prohibido su uso para fines ilícitos, ingeniería inversa, alteración de servidores, extracción masiva de
                datos (web scraping) o cualquier acción que vulnere la integridad de la infraestructura de ATM Chile.
            </p>
        ),
    },
    {
        id: "propiedad-intelectual",
        title: "Propiedad intelectual",
        body: (
            <p>
                Toda la arquitectura, código subyacente, diseños, textos descriptivos, modelos comerciales y el slogan
                &quot;A tu medida&quot; constituyen creaciones intelectuales exclusivas de ATM Chile y se encuentran
                amparados bajo la Ley 17.336 de Propiedad Intelectual. Queda estrictamente prohibida su copia,
                distribución o reproducción no autorizada.
            </p>
        ),
    },
    {
        id: "servicios-leasing",
        title: "Información sobre servicios y leasing",
        body: (
            <p>
                Toda la información dispuesta sobre desarrollo de software a medida, integración ERP, ciberseguridad y
                el modelo de negocio denominado &quot;leasing de software&quot;, es de carácter puramente referencial,
                publicitario y no vinculante. Las condiciones definitivas, los montos de las cuotas, la adquisición de
                la licencia perpetua y los porcentajes de retribución por comercialización a terceros se regulan,
                perfeccionan y ejecutan única y exclusivamente según lo estipulado en el respectivo contrato de
                confidencialidad y servicios que se suscriba de mutuo acuerdo con cada cliente.
            </p>
        ),
    },
    {
        id: "enlaces",
        title: "Enlaces a terceros",
        body: (
            <p>
                El portal puede contener vínculos a plataformas externas (ej. herramientas de Meta o pasarelas). ATM
                Chile no asume responsabilidad alguna por el contenido, seguridad o políticas de privacidad aplicadas en
                dichos dominios de terceros.
            </p>
        ),
    },
    {
        id: "responsabilidad",
        title: "Disponibilidad, limitación de responsabilidad e indemnidad",
        body: (
            <p>
                El Service Level Agreement (SLA) de disponibilidad del 99,597 % es una métrica de infraestructura que
                aplica de forma exclusiva a los servicios de software final ya contratados. Este sitio web informativo
                se provee &quot;tal cual&quot;. En consecuencia, ATM Chile no se hace responsable por caídas de red,
                eventos de fuerza mayor tecnológica (tales como desconexiones de ISP, fallos de infraestructura de
                alojamiento externa o ciberataques) que impidan temporalmente el acceso. Asimismo, el usuario se obliga
                a mantener indemne a ATM Chile ante cualquier reclamo, demanda o sanción impulsada por terceros que
                derive directamente del uso indebido del sitio por parte del usuario.
            </p>
        ),
    },
    {
        id: "datos",
        title: "Protección de datos",
        body: (
            <p>
                Todo dato personal recopilado en el portal se gestiona en estricto rigor con nuestra{" "}
                <Link href="/privacidad" className="font-semibold text-[#176BDE] underline underline-offset-2">
                    Política de Privacidad y Seguridad
                </Link>
                , sujeta a los tribunales y regulaciones de la República de Chile.
            </p>
        ),
    },
    {
        id: "modificaciones",
        title: "Modificaciones",
        body: (
            <p>
                ATM Chile se reserva el derecho de modificar estos términos de manera unilateral para adaptarlos a
                novedades legislativas o tecnológicas. Toda modificación será oponible desde el momento de su
                publicación.
            </p>
        ),
    },
    {
        id: "ley-aplicable",
        title: "Ley aplicable y jurisdicción",
        body: (
            <p>
                El presente instrumento se rige íntegramente por las leyes de la República de Chile. Para todos los
                efectos legales, toda controversia derivada de este documento será sometida a la competencia de los
                Tribunales Ordinarios de Justicia de la ciudad y comuna de Santiago, o bien, resuelta mediante arbitraje
                conforme a las reglas del Centro de Arbitraje y Mediación (CAM) de Santiago, si las partes así lo
                acuerdan por escrito.
            </p>
        ),
    },
];

export default function TerminosPage() {
    return (
        <LegalDocument
            eyebrow="Documento legal"
            title="Términos y Condiciones de Uso"
            version="1.0"
            effectiveDate={LEGAL_EFFECTIVE_DATE}
            summary={
                <p>
                    Establece el marco jurídico para el uso del sitio corporativo de ATM Chile, resguardando los activos
                    de propiedad intelectual, delimitando las responsabilidades por infraestructura y aclarando la
                    naturaleza referencial del modelo comercial de &quot;leasing&quot;.
                </p>
            }
            sections={sections}
            related={{ href: "/privacidad", label: "Política de Privacidad y Seguridad" }}
        />
    );
}

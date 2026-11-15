import { SITE } from "@/data/site";
import { ControllerCard, LegalDocument, type LegalSection } from "@/components/legal/LegalDocument";
import { CookiePreferencesButton } from "@/components/legal/CookiePreferencesButton";
import { LEGAL_EFFECTIVE_DATE } from "@/components/legal/legal-meta";

/*
 * Texto definitivo entregado por ATM (redactado con su asesoría legal).
 * No editar el contenido sin su validación.
 */

const ul = "list-disc space-y-2 pl-5 marker:text-slate-400";
const mail = (
    <a href={`mailto:${SITE.privacyEmail}`} className="font-semibold text-[#176BDE] underline underline-offset-2">
        {SITE.privacyEmail}
    </a>
);

const sections: LegalSection[] = [
    {
        id: "responsable",
        title: "Responsable del tratamiento",
        body: (
            <>
                <p>
                    {SITE.legalName} (en adelante, &quot;ATM Chile&quot;), RUT {SITE.rut}, domiciliada en {SITE.address}.
                </p>
                <ControllerCard />
            </>
        ),
    },
    {
        id: "datos",
        title: "Datos que tratamos",
        body: (
            <>
                <p>
                    El tratamiento se limita a los datos estrictamente necesarios, adecuados y pertinentes para nuestros
                    fines. Tratamos:
                </p>
                <ul className={ul}>
                    <li>Nombre, correo electrónico, teléfono y empresa mediante el formulario de contacto.</li>
                    <li>
                        Historial, metadatos y contenido de interacciones a través del botón de WhatsApp y asistente de
                        chat con Inteligencia Artificial.
                    </li>
                    <li>Datos de navegación y comportamiento web mediante cookies.</li>
                </ul>
            </>
        ),
    },
    {
        id: "finalidades",
        title: "Finalidades y base de licitud",
        body: (
            <>
                <p>Los datos son recolectados con fines específicos, explícitos y lícitos:</p>
                <ul className={ul}>
                    <li>
                        <strong>Gestión y soporte B2B:</strong> para contactar, cotizar y negociar los servicios de
                        software. Base de licitud: consentimiento libre, informado y específico, así como la ejecución de
                        medidas precontractuales.
                    </li>
                    <li>
                        <strong>Analítica web y marketing:</strong> para medición y campañas. Base de licitud:
                        consentimiento expreso otorgado a través de una clara acción afirmativa en nuestro aviso de
                        ingreso.
                    </li>
                </ul>
            </>
        ),
    },
    {
        id: "destinatarios",
        title: "Destinatarios y encargados",
        body: (
            <>
                <p>
                    Para el cumplimiento y alojamiento de nuestros servicios, operamos con terceros en calidad de
                    &quot;Tercero mandatario o encargado&quot;:
                </p>
                <ul className={ul}>
                    <li>Google Workspace (planilla de contacto).</li>
                    <li>Proveedor de Inteligencia Artificial y WhatsApp (asistente de chat).</li>
                    <li>Vercel (alojamiento web de la plataforma).</li>
                </ul>
                <p>
                    Dado que Vercel aloja servidores fuera del territorio nacional, esta transferencia internacional de
                    datos se rige por cláusulas contractuales u otros instrumentos jurídicos que garantizan niveles
                    adecuados de protección, de conformidad con las exigencias de la ley.
                </p>
            </>
        ),
    },
    {
        id: "conservacion",
        title: "Plazo de conservación",
        body: (
            <p>
                Los datos personales serán conservados únicamente por el período de tiempo que sea necesario para
                cumplir con los fines del tratamiento para los cuales fueron recopilados, luego de lo cual serán
                suprimidos de manera definitiva o anonimizados.
            </p>
        ),
    },
    {
        id: "cookies",
        title: "Cookies",
        body: (
            <>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full min-w-[560px] text-left text-sm">
                        <thead className="bg-slate-50 text-slate-800">
                            <tr>
                                <th scope="col" className="px-4 py-3 font-semibold">Categoría</th>
                                <th scope="col" className="px-4 py-3 font-semibold">Finalidad</th>
                                <th scope="col" className="px-4 py-3 font-semibold">Base de licitud</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 align-top">
                            <tr>
                                <td className="px-4 py-3 font-semibold text-slate-800">Esenciales</td>
                                <td className="px-4 py-3">Funcionamiento de la plataforma, registro de preferencias y sistema antispam.</td>
                                <td className="px-4 py-3">Necesidad técnica (sin opción de rechazo).</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-semibold text-slate-800">Analíticas</td>
                                <td className="px-4 py-3">Vercel Web Analytics para evaluar el rendimiento técnico del sitio.</td>
                                <td className="px-4 py-3">Consentimiento previo del titular.</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-semibold text-slate-800">Marketing</td>
                                <td className="px-4 py-3">Meta Pixel para la gestión de campañas publicitarias B2B (en implementación).</td>
                                <td className="px-4 py-3">Consentimiento previo del titular.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <CookiePreferencesButton />
            </>
        ),
    },
    {
        id: "seguridad",
        title: "Seguridad de la información",
        body: (
            <p>
                Como responsables del tratamiento, ATM Chile garantiza estándares adecuados de seguridad, protegiendo
                las bases de datos contra su pérdida, filtración, daño accidental o tratamiento no autorizado. Nuestro
                Sistema de Gestión de Seguridad de la Información (SGSI) opera alineado a la norma NCh-ISO 27001, dando
                cumplimiento preventivo a las obligaciones de la Ley Marco de Ciberseguridad (Ley 21.663).
            </p>
        ),
    },
    {
        id: "confidencialidad",
        title: "Confidencialidad de la información de clientes (NDA)",
        body: (
            <p>
                Todo el personal interno y las personas jurídicas que ejecuten operaciones de tratamiento bajo la
                responsabilidad de ATM Chile están obligados a mantener el más estricto secreto y confidencialidad
                respecto de la información tratada. Este deber subsiste sin límite de tiempo, aun después de concluida
                la relación comercial, laboral o precontractual.
            </p>
        ),
    },
    {
        id: "derechos",
        title: "Derechos del titular y cómo ejercerlos",
        body: (
            <>
                <p>
                    El titular tiene derecho irrenunciable a solicitar el acceso, rectificación, supresión, oposición y
                    portabilidad de sus datos personales, así como a solicitar el bloqueo temporal de los mismos.
                </p>
                <ul className={ul}>
                    <li>Para ejercerlos, debe presentar una solicitud escrita a {mail}.</li>
                    <li>
                        ATM Chile acusará recibo y emitirá una respuesta oficial en un plazo máximo de treinta días
                        corridos desde el ingreso de la solicitud.
                    </li>
                    <li>Este plazo podrá ser prorrogado por una sola vez, hasta por treinta días corridos adicionales.</li>
                </ul>
            </>
        ),
    },
    {
        id: "menores",
        title: "Menores de edad",
        body: (
            <p>
                Nuestros servicios y el modelo de negocio operan en el segmento B2B (Business to Business). No
                recabamos ni tratamos intencionalmente datos personales de menores de edad.
            </p>
        ),
    },
    {
        id: "cambios",
        title: "Cambios a la política",
        body: (
            <p>
                ATM Chile podrá actualizar o modificar esta política en cualquier momento. Los cambios entrarán en
                plena vigencia a partir de su publicación en este sitio web.
            </p>
        ),
    },
    {
        id: "contacto",
        title: "Contacto y autoridad de control",
        body: (
            <p>
                Consultas y requerimientos formales deben dirigirse a: {mail}. El titular siempre tendrá el derecho de
                recurrir ante la Agencia de Protección de Datos Personales, en caso de estimar vulnerados los derechos
                que le confiere la ley.
            </p>
        ),
    },
];

export default function PrivacidadPage() {
    return (
        <LegalDocument
            eyebrow="Documento legal"
            title="Política de Privacidad y Seguridad"
            version="1.0"
            effectiveDate={LEGAL_EFFECTIVE_DATE}
            summary={
                <p>
                    Este documento regula el tratamiento de datos personales en {SITE.legalName} conforme a la Ley
                    19.628, modernizada por la Ley 21.719. Establece finalidades, bases de licitud, transferencias
                    internacionales y el estándar de ciberseguridad exigido legalmente para la protección de la
                    información corporativa y personal.
                </p>
            }
            sections={sections}
            related={{ href: "/terminos", label: "Términos y Condiciones de Uso" }}
        />
    );
}

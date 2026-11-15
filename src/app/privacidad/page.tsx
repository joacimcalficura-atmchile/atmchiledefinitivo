import Link from "next/link";
import { SITE } from "@/data/site";
import { ControllerCard, LegalDocument, type LegalSection } from "@/components/legal/LegalDocument";
import { CookiePreferencesButton } from "@/components/legal/CookiePreferencesButton";

const ul = "list-disc space-y-2 pl-5 marker:text-slate-400";

const sections: LegalSection[] = [
    {
        id: "responsable",
        title: "Responsable del tratamiento",
        body: (
            <>
                <p>
                    El responsable del tratamiento de los datos personales recogidos a través de este sitio web es:
                </p>
                <ControllerCard />
            </>
        ),
    },
    {
        id: "datos",
        title: "Datos personales que tratamos",
        body: (
            <>
                <p>Tratamos únicamente los datos que nos entregas o que se generan al usar el sitio:</p>
                <ul className={ul}>
                    <li>
                        <strong>Datos de contacto:</strong> nombre, correo electrónico, teléfono, empresa y cargo, cuando
                        completas el formulario de contacto o nos escribes por WhatsApp o por el asistente del sitio.
                    </li>
                    <li>
                        <strong>Contenido de tu consulta:</strong> la información sobre tu proyecto o necesidad que decidas
                        compartir.
                    </li>
                    <li>
                        <strong>Datos de navegación:</strong> páginas visitadas, tipo de dispositivo y origen de la visita,
                        solo si autorizas las cookies de analítica o marketing.
                    </li>
                </ul>
                <p>No solicitamos datos sensibles a través de este sitio. Te pedimos no incluirlos en tus mensajes.</p>
            </>
        ),
    },
    {
        id: "finalidades",
        title: "Finalidades y base de licitud",
        body: (
            <ul className={ul}>
                <li>
                    <strong>Responder tus consultas y preparar propuestas comerciales</strong>, sobre la base de las
                    medidas precontractuales que solicitas.
                </li>
                <li>
                    <strong>Medir el uso del sitio y la efectividad de nuestras campañas</strong>, sobre la base de tu
                    consentimiento, que puedes retirar en cualquier momento.
                </li>
                <li>
                    <strong>Proteger el sitio y prevenir el fraude o el envío automatizado de formularios</strong>, sobre
                    la base de nuestro interés legítimo en la seguridad de la información.
                </li>
                <li>
                    <strong>Cumplir obligaciones legales</strong> que nos resulten aplicables.
                </li>
            </ul>
        ),
    },
    {
        id: "destinatarios",
        title: "Destinatarios y encargados del tratamiento",
        body: (
            <>
                <p>
                    No vendemos ni cedemos tus datos personales a terceros para sus propios fines. Para operar el sitio
                    contamos con proveedores que tratan datos por cuenta de {SITE.legalName}, bajo instrucciones y
                    obligaciones de confidencialidad: servicios de alojamiento web, correo electrónico, hojas de cálculo
                    en la nube y medición de audiencias.
                </p>
                <p>
                    Algunos de estos proveedores pueden almacenar información en servidores ubicados fuera de Chile. En
                    esos casos exigimos garantías adecuadas de protección conforme a la normativa vigente.
                </p>
            </>
        ),
    },
    {
        id: "conservacion",
        title: "Plazo de conservación",
        body: (
            <p>
                Conservamos los datos de contacto mientras sea necesario para atender tu consulta y gestionar la
                eventual relación comercial, y luego durante los plazos que exija la ley. Los datos de navegación se
                conservan de forma agregada. Cumplidos estos plazos, los datos se eliminan o se anonimizan.
            </p>
        ),
    },
    {
        id: "cookies",
        title: "Cookies y tecnologías similares",
        body: (
            <>
                <p>
                    Al ingresar al sitio te pedimos elegir qué cookies autorizas. Las cookies no esenciales permanecen
                    desactivadas hasta que las aceptes.
                </p>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full min-w-[520px] text-left text-sm">
                        <thead className="bg-slate-50 text-slate-800">
                            <tr>
                                <th scope="col" className="px-4 py-3 font-semibold">Categoría</th>
                                <th scope="col" className="px-4 py-3 font-semibold">Finalidad</th>
                                <th scope="col" className="px-4 py-3 font-semibold">Base</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            <tr>
                                <td className="px-4 py-3 font-medium text-slate-800">Esenciales</td>
                                <td className="px-4 py-3">Funcionamiento del sitio, registro de tu elección y protección de formularios.</td>
                                <td className="px-4 py-3">Necesarias</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-medium text-slate-800">Analítica</td>
                                <td className="px-4 py-3">Medición de visitas y de contactos generados (Vercel Web Analytics).</td>
                                <td className="px-4 py-3">Consentimiento</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-medium text-slate-800">Marketing</td>
                                <td className="px-4 py-3">Medición de campañas publicitarias en redes sociales (por ejemplo, Meta).</td>
                                <td className="px-4 py-3">Consentimiento</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>Puedes cambiar o retirar tu consentimiento en cualquier momento:</p>
                <CookiePreferencesButton />
            </>
        ),
    },
    {
        id: "seguridad",
        title: "Seguridad de la información",
        body: (
            <p>
                Aplicamos medidas técnicas y organizativas para proteger tus datos frente a accesos no autorizados,
                pérdida o alteración: cifrado de las comunicaciones (HTTPS/TLS), control de acceso por roles, registro
                de actividad y buenas prácticas de desarrollo seguro (OWASP). Nuestra gestión se alinea a la norma
                NCh-ISO 27001, cuya certificación se encuentra en proceso.
            </p>
        ),
    },
    {
        id: "confidencialidad",
        title: "Confidencialidad de la información de clientes",
        body: (
            <p>
                La información de negocio, bases de datos e infraestructura que nuestros clientes comparten en el marco
                de un proyecto se rige por un acuerdo de confidencialidad (NDA) y por el contrato respectivo. No la
                compartimos ni la exponemos a terceros fuera de lo pactado.
            </p>
        ),
    },
    {
        id: "derechos",
        title: "Tus derechos",
        body: (
            <>
                <p>
                    Conforme a la Ley N° 19.628 sobre protección de la vida privada, modificada por la Ley N° 21.719,
                    puedes ejercer en cualquier momento tus derechos de:
                </p>
                <ul className={ul}>
                    <li><strong>Acceso</strong> a los datos que tratamos sobre ti.</li>
                    <li><strong>Rectificación</strong> de datos inexactos o incompletos.</li>
                    <li><strong>Supresión</strong> de tus datos cuando corresponda.</li>
                    <li><strong>Oposición</strong> a determinados tratamientos.</li>
                    <li><strong>Portabilidad</strong> de tus datos en un formato estructurado.</li>
                    <li><strong>Bloqueo</strong> temporal del tratamiento.</li>
                </ul>
                <p>
                    Para ejercerlos, escribe a{" "}
                    <a href={`mailto:${SITE.privacyEmail}`} className="font-semibold text-[#176BDE] underline underline-offset-2">
                        {SITE.privacyEmail}
                    </a>{" "}
                    indicando tu nombre, el derecho que deseas ejercer y un medio de contacto. Responderemos dentro de
                    los plazos legales. Si consideras que no hemos atendido tu solicitud, puedes reclamar ante la
                    Agencia de Protección de Datos Personales.
                </p>
            </>
        ),
    },
    {
        id: "menores",
        title: "Menores de edad",
        body: (
            <p>
                Este sitio está dirigido a empresas y profesionales. No recogemos de forma intencionada datos de
                menores de edad.
            </p>
        ),
    },
    {
        id: "cambios",
        title: "Cambios a esta política",
        body: (
            <p>
                Podemos actualizar esta política para reflejar cambios legales o en nuestros servicios. Publicaremos
                cada nueva versión en esta página, indicando su número y fecha de vigencia, y te pediremos de nuevo tu
                consentimiento cuando el cambio lo requiera.
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
            effectiveDate="15 de noviembre de 2026"
            summary={
                <p>
                    En {SITE.legalName} protegemos los datos personales de quienes visitan nuestro sitio y de nuestros
                    clientes. Esta política explica qué datos tratamos, para qué, con quién los compartimos y cómo
                    puedes ejercer tus derechos, conforme a la legislación chilena de protección de datos personales.
                    Al usar este sitio declaras conocerla, junto con los{" "}
                    <Link href="/terminos" className="font-semibold text-[#176BDE] underline underline-offset-2">
                        Términos y Condiciones
                    </Link>
                    .
                </p>
            }
            sections={sections}
            related={{ href: "/terminos", label: "Términos y Condiciones" }}
        />
    );
}

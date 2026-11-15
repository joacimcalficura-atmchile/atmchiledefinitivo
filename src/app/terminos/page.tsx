import Link from "next/link";
import { SITE } from "@/data/site";
import { ControllerCard, LegalDocument, type LegalSection } from "@/components/legal/LegalDocument";

const ul = "list-disc space-y-2 pl-5 marker:text-slate-400";

const sections: LegalSection[] = [
    {
        id: "titular",
        title: "Titular del sitio",
        body: (
            <>
                <p>El sitio web {SITE.url.replace("https://", "")} es operado por:</p>
                <ControllerCard />
            </>
        ),
    },
    {
        id: "objeto",
        title: "Objeto y aceptación",
        body: (
            <p>
                Estos Términos y Condiciones regulan el acceso y uso de este sitio web. Al navegar en él y seleccionar
                una opción en el aviso de ingreso, declaras haberlos leído y aceptado, junto con la{" "}
                <Link href="/privacidad" className="font-semibold text-[#176BDE] underline underline-offset-2">
                    Política de Privacidad y Seguridad
                </Link>
                . Si no estás de acuerdo, te pedimos no utilizar el sitio.
            </p>
        ),
    },
    {
        id: "uso",
        title: "Uso del sitio",
        body: (
            <>
                <p>Te comprometes a usar el sitio de forma lícita y de buena fe. En particular, no está permitido:</p>
                <ul className={ul}>
                    <li>Intentar acceder sin autorización a sistemas, cuentas o datos de {SITE.name} o de terceros.</li>
                    <li>Introducir código malicioso o realizar acciones que afecten la disponibilidad o seguridad del sitio.</li>
                    <li>Enviar información falsa o suplantar la identidad de otra persona u organización.</li>
                    <li>Extraer contenidos de forma masiva o automatizada sin autorización previa.</li>
                </ul>
            </>
        ),
    },
    {
        id: "propiedad-intelectual",
        title: "Propiedad intelectual",
        body: (
            <p>
                Los textos, diseños, logotipos, marcas, gráficas y demás contenidos del sitio pertenecen a {SITE.legalName}
                {" "}o a sus respectivos titulares, y están protegidos por la legislación de propiedad intelectual e
                industrial. Su reproducción, distribución o modificación requiere autorización previa y por escrito.
                Las marcas de terceros que aparecen en el sitio identifican a clientes, aliados o tecnologías con las que
                trabajamos y pertenecen a sus titulares.
            </p>
        ),
    },
    {
        id: "servicios",
        title: "Información sobre servicios",
        body: (
            <>
                <p>
                    La información publicada sobre nuestros servicios, incluido el leasing de software, es referencial y
                    no constituye una oferta vinculante. Las condiciones de cada proyecto (alcance, plazos, precio,
                    niveles de servicio, propiedad intelectual de los desarrollos y garantías) se establecen en la
                    propuesta y en el contrato que se suscriba con cada cliente.
                </p>
                <p>
                    Salvo pacto en contrario, {SITE.legalName} conserva la titularidad de sus marcos de trabajo,
                    componentes reutilizables y metodologías propias.
                </p>
            </>
        ),
    },
    {
        id: "enlaces",
        title: "Enlaces a sitios de terceros",
        body: (
            <p>
                El sitio puede contener enlaces a sitios de terceros, como redes sociales o aliados. No somos
                responsables de sus contenidos ni de sus políticas de privacidad, que te recomendamos revisar.
            </p>
        ),
    },
    {
        id: "responsabilidad",
        title: "Disponibilidad y responsabilidad",
        body: (
            <p>
                Procuramos mantener el sitio disponible y su información actualizada, pero no garantizamos la ausencia
                de interrupciones o errores. En la máxima medida permitida por la ley, {SITE.legalName} no responde por
                daños derivados del uso del sitio o de la imposibilidad de acceder a él. Esta limitación no afecta los
                derechos que la ley reconoce a los consumidores.
            </p>
        ),
    },
    {
        id: "datos-personales",
        title: "Protección de datos personales",
        body: (
            <p>
                El tratamiento de los datos personales que entregues a través del sitio se rige por nuestra{" "}
                <Link href="/privacidad" className="font-semibold text-[#176BDE] underline underline-offset-2">
                    Política de Privacidad y Seguridad
                </Link>
                , conforme a la Ley N° 19.628, modificada por la Ley N° 21.719.
            </p>
        ),
    },
    {
        id: "modificaciones",
        title: "Modificaciones",
        body: (
            <p>
                Podemos modificar estos Términos para reflejar cambios legales o en nuestros servicios. Cada nueva
                versión se publicará en esta página con su número y fecha de vigencia.
            </p>
        ),
    },
    {
        id: "ley-aplicable",
        title: "Ley aplicable y jurisdicción",
        body: (
            <p>
                Estos Términos se rigen por las leyes de la República de Chile. Las partes procurarán resolver de buena
                fe cualquier controversia. De no lograrse un acuerdo, esta se someterá a los tribunales ordinarios de
                justicia de la ciudad de Santiago.
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
            effectiveDate="15 de noviembre de 2026"
            summary={
                <p>
                    Estos términos establecen las reglas de uso del sitio web de {SITE.name} y el alcance de la
                    información que publicamos. Las condiciones de cada servicio contratado se rigen por su propuesta y
                    contrato específicos.
                </p>
            }
            sections={sections}
            related={{ href: "/privacidad", label: "Política de Privacidad y Seguridad" }}
        />
    );
}

/**
 * Sello ATM: la cruz andina de las gráficas complementarias del brandbook
 * (trazos tomados del archivo vectorial oficial).
 */
export function AtmSeal({
    className = "",
    primary = "#176BDE",
    accent = "#16F3E8",
}: {
    className?: string;
    primary?: string;
    accent?: string;
}) {
    return (
        <svg
            viewBox="224 607 191 201"
            className={className}
            role="img"
            aria-label="Sello ATM"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill={primary}
                fillRule="evenodd"
                d="M308.972,692.298l-0,20.763l-9.227,9.227l-34.056,0l-9.227,-9.227l-0,-20.763l-20.763,0l-9.227,-9.227l0,-34.056l9.227,-9.227l20.763,-0l0,-20.763l9.227,-9.227l34.056,0l9.227,9.227l0,20.763l20.763,-0l9.227,9.227l0,34.056l-9.227,9.227l-20.763,0Zm-18.85,-18.85l13.042,0l0,-14.81l-13.042,0l0,-13.042l-14.81,0l0,13.042l-13.042,0l0,14.81l13.042,0l0,13.042l14.81,0l0,-13.042Z"
            />
            <path
                fill={accent}
                d="M381.446,774.359l31.444,0l0,-35.706l-31.444,0l0,-31.444l-35.706,0l0,31.444l-31.444,0l0,35.706l31.444,0l0,31.444l35.706,0l0,-31.444Z"
            />
        </svg>
    );
}

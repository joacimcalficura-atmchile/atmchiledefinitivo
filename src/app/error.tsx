"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Antes no existía: cualquier excepción en el cliente (p. ej. el fondo 3D)
 * dejaba la pantalla genérica «Application error» de Next, sin salida ni
 * forma de contactar a ATM. Ahora el visitante puede reintentar o escribirnos.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app] Error no controlado:", error.digest ?? error.message);
  }, [error]);

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-brand-cobalt">Algo salió mal</p>
      <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
        No pudimos cargar esta página
      </h1>
      <p className="mt-4 text-base text-slate-600">
        Fue un problema de nuestro lado. Puedes intentar de nuevo o escribirnos y te respondemos a la brevedad.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="rounded-xl bg-[#176BDE] px-6 py-3 font-bold text-white transition-colors hover:bg-[#0E4FA5]"
        >
          Intentar de nuevo
        </button>
        <Link
          href="/contacto"
          className="rounded-xl border border-slate-300 px-6 py-3 font-bold text-slate-800 transition-colors hover:bg-slate-100"
        >
          Ir a contacto
        </Link>
      </div>
    </section>
  );
}

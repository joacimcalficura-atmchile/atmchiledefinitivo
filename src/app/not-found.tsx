import Link from "next/link";

export const metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

/** 404 en español con salida a las páginas que más interesan al visitante. */
export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-brand-cobalt">Error 404</p>
      <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
        Esta página no existe
      </h1>
      <p className="mt-4 text-base text-slate-600">
        Puede que el enlace esté desactualizado. Te dejamos los caminos más útiles.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/servicios"
          className="rounded-xl bg-[#176BDE] px-6 py-3 font-bold text-white transition-colors hover:bg-[#0E4FA5]"
        >
          Ver servicios
        </Link>
        <Link
          href="/contacto"
          className="rounded-xl border border-slate-300 px-6 py-3 font-bold text-slate-800 transition-colors hover:bg-slate-100"
        >
          Hablar con ATM
        </Link>
      </div>
    </section>
  );
}

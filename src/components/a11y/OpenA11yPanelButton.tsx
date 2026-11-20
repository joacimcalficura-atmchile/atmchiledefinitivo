"use client";

import { SlidersHorizontal } from "lucide-react";
import { openA11yPanel } from "@/lib/a11y-prefs";

export function OpenA11yPanelButton() {
    return (
        <button
            type="button"
            onClick={openA11yPanel}
            className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl bg-[#176BDE] px-7 text-base font-bold text-white shadow-[0_10px_30px_rgba(23,107,222,0.45)] transition-colors hover:bg-[#1A78F5]"
        >
            <SlidersHorizontal className="h-5 w-5" aria-hidden="true" />
            Abrir preferencias de accesibilidad
        </button>
    );
}

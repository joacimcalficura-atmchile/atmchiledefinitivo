"use client";

import { openConsentPreferences } from "@/lib/consent";

export function CookiePreferencesButton() {
    return (
        <button
            type="button"
            onClick={openConsentPreferences}
            className="inline-flex items-center rounded-lg border border-[#0F1215] px-4 py-2 text-sm font-semibold text-[#0F1215] transition-colors hover:bg-[#0F1215] hover:text-white"
        >
            Configurar mis preferencias de cookies
        </button>
    );
}

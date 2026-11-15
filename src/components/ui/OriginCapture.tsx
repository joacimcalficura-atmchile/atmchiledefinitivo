"use client";

import { useEffect } from "react";
import { capturarOrigen } from "@/lib/attribution";

/** Anota la página de entrada y las UTM al llegar (ver src/lib/attribution.ts). */
export function OriginCapture() {
    useEffect(() => {
        capturarOrigen();
    }, []);
    return null;
}

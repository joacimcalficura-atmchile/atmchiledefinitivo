"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { CONSENT_EVENT, hasConsent } from "@/lib/consent";

/** Carga Vercel Analytics solo si el visitante aceptó la analítica. */
export function ConsentedAnalytics() {
    const [allowed, setAllowed] = useState(false);

    useEffect(() => {
        // El consentimiento vive en localStorage: solo se puede leer tras montar.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAllowed(hasConsent("analytics"));
        const update = () => setAllowed(hasConsent("analytics"));
        window.addEventListener(CONSENT_EVENT, update);
        return () => window.removeEventListener(CONSENT_EVENT, update);
    }, []);

    return allowed ? <Analytics /> : null;
}

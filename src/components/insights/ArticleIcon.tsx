import { Cpu, Gavel, Scale, Search, Shield, Siren } from "lucide-react";
import type { ArticleIcon as IconKey } from "@/data/insights";

/**
 * Puente entre la clave de ícono serializable que guardan los datos y el
 * componente de lucide. Los módulos de `src/data` no importan JSX a propósito:
 * así siguen siendo datos puros, consumibles desde el servidor.
 */
const ICONS: Record<IconKey, React.ComponentType<{ className?: string }>> = {
    shield: Shield,
    siren: Siren,
    scale: Scale,
    gavel: Gavel,
    cpu: Cpu,
    search: Search,
};

export const ArticleIcon = ({
    icon,
    className = "w-4 h-4",
}: {
    icon: IconKey;
    className?: string;
}) => {
    const Icon = ICONS[icon];
    return <Icon className={className} />;
};

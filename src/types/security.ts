import { z } from 'zod';

export const LeadSchema = z.object({
    nombre: z.string().min(2, "Nombre demasiado corto").max(100).trim(),
    empresa: z.string().max(100).trim().optional().default("Particular"),
    correo: z.string().email("Correo inválido").trim().toLowerCase(),
    telefono: z.string().max(20).trim().optional().default(""),
    mensaje: z.string().min(5, "Mensaje demasiado corto").max(2000).trim(),
    servicio: z.string().max(100).trim().optional().default("Consulta General"),
});

export type LeadInput = z.infer<typeof LeadSchema>;

export const ChatSchema = z.object({
    messages: z.array(z.any()),
}).passthrough();

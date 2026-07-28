import { z } from 'zod';

/**
 * Schema flexible para leads. Solo `nombre` y `correo` son obligatorios: es el
 * denominador común de TODOS los formularios (contacto, WhatsApp y admisión
 * Club 100). El resto de campos varía por formulario —`hojaDestino`, `numero`,
 * `rubro`, `desafio`, `estadoLegal`, `datoExtra`, etc.— y se preservan con
 * `.passthrough()` para reenviarlos íntegros al Apps Script, que enruta a la
 * hoja correcta según `hojaDestino`.
 *
 * Antes exigía `mensaje` (min 5), campo que el formulario de admisión nunca
 * envía → devolvía 400 y el formulario no avanzaba.
 */
export const LeadSchema = z.object({
    nombre: z.string().min(2, "Nombre demasiado corto").max(120).trim(),
    correo: z.string().email("Correo inválido").trim().toLowerCase(),
    mensaje: z.string().max(2000).trim().optional(),
}).passthrough();

export type LeadInput = z.infer<typeof LeadSchema>;

export const ChatSchema = z.object({
    messages: z.array(z.any()),
}).passthrough();

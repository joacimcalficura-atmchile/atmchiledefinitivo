# Feed automático de reels de Instagram

La home muestra los últimos reels de [@atmchile_com](https://www.instagram.com/atmchile_com/) leyéndolos de la API de Instagram (Meta). Cuando ATM publica un reel nuevo aparece solo en la web en menos de una hora, sin redeploy.

- Datos: `src/lib/instagram.ts` (solo servidor, caché ISR de 1 hora).
- Sección: `src/components/sections/InstagramReels.tsx` + `ReelsCarousel.tsx`.
- Si falta el token o Meta falla, la sección no aparece; el resto de la home sigue igual.

## Variables de entorno (Vercel → Project Settings → Environment Variables)

| Variable | Obligatoria | Valor |
|---|---|---|
| `INSTAGRAM_ACCESS_TOKEN` | Sí | Token de acceso (ver abajo). **Nunca** con prefijo `NEXT_PUBLIC_`. |
| `INSTAGRAM_USER_ID` | No | ID de la cuenta de Instagram. Por defecto `17841402108394457` (@atmchile_com). |
| `CRON_SECRET` | Solo si usas un token "IG…" | Cadena aleatoria larga; Vercel la usa para firmar el cron. |

Después de agregarlas, haz un redeploy para que tomen efecto.

## Cómo obtener el token (opción recomendada: token de página, no vence)

1. En [developers.facebook.com/apps](https://developers.facebook.com/apps) crea una app de tipo **Empresa** (o usa una existente) y agrégale el producto **Instagram** ("API setup with Facebook login").
2. Abre el [Explorador de la API Graph](https://developers.facebook.com/tools/explorer/), elige esa app y pide un *User Token* con los permisos `instagram_basic`, `pages_show_list` y `pages_read_engagement`. Inicia sesión con una cuenta que administre la página de Facebook de ATM.
3. Cambia ese token corto por uno de larga duración:
   `GET https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id={APP_ID}&client_secret={APP_SECRET}&fb_exchange_token={TOKEN_CORTO}`
4. Con el token largo, pide el token de la página:
   `GET https://graph.facebook.com/v21.0/me/accounts?access_token={TOKEN_LARGO}`
   y copia el `access_token` de la página de ATM. Ese token de página **no vence** (mientras no cambie la contraseña ni se quiten permisos), así que no hay que renovarlo.
5. Pégalo en `INSTAGRAM_ACCESS_TOKEN` en Vercel.

Puedes verificarlo en el [Depurador de tokens](https://developers.facebook.com/tools/debug/accesstoken/): "Expira: Nunca".

## Alternativa: token de "Instagram Login" (empieza con `IG`)

También funciona. Vence a los 60 días, por eso `vercel.json` programa un cron semanal (`/api/cron/instagram-token`, lunes 09:00 UTC) que lo renueva con `refresh_access_token` y refresca la caché del feed. Requiere `CRON_SECRET`. Si Meta llegara a devolver un token distinto, queda un aviso en los logs de Vercel para actualizar la variable.

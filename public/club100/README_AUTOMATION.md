# Guía de Automatización - Club de los 100

Este sistema monitorea la hoja de cálculo de Google, valida enlaces con un navegador simulado y prepara el envío de mensajes.

## Comandos Rápidos

Para ejecutar el bot:
```bash
npm run automate
```

## Configuración (Necesaria para producción)

Actualmente, el sistema está en **Modo de Prueba (Mock Mode)** porque faltan las credenciales reales.

Para activarlo con tu hoja real:
1.  Edita el archivo `scripts/.env`.
2.  Coloca tu **Email de Cuenta de Servicio** de Google.
3.  Pega tu **Clave Privada (Private Key)** completa (incluyendo `-----BEGIN...`).
4.  Pega el **ID de la Hoja de Cálculo** (lo encuentras en la URL de tu Google Sheet).

## Qué hace el script (`scripts/sheet_automation.js`)
1.  Se conecta a Google Sheets.
2.  Lee filas nuevas (que no digan "PROCESADO" en la columna N).
3.  Reemplaza `[Nombre]` en los mensajes.
4.  Abre un navegador invisible (Puppeteer) y visita el link del mensaje de bienvenida para asegurar que funciona (Status 200).
5.  Si el link está roto, salta el registro.
6.  Si todo está bien, marca el registro como "PROCESADO" y muestra en consola los mensajes que se enviarían.

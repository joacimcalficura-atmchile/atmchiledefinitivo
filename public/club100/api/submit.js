export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const formData = req.body;

    try {
        // CONEXIÓN DIRECTA CON GOOGLE SHEETS (VIA APPS SCRIPT)
        const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx6Fol7DsyUSQWm1DJQdaHQYNMdUvYyBDeygN5ZCoo2SxfoCI7wrKaU4WakzIU3PzYrSA/exec';

        const response = await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        return res.status(200).json({
            success: true,
            message: 'Postulación recibida y guardada en la hoja de cálculo.',
            result: result
        });
    } catch (error) {
        console.error('Error al guardar en la hoja:', error);
        return res.status(500).json({
            success: false,
            error: 'Error al procesar la solicitud en el servidor'
        });
    }
}

import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { type, data } = body;

        console.log('API Request received:', { type, data });

        if (!process.env.GOOGLE_SHEETS_CLIENT_EMAIL || !process.env.GOOGLE_SHEETS_PRIVATE_KEY) {
            console.error('Missing Google Sheets credentials in environment variables');
            return NextResponse.json({ error: 'Credenciales no configuradas' }, { status: 500 });
        }

        // Autenticación con Google Service Account
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        let spreadsheetId = '';
        
        if (type === 'contact') {
            spreadsheetId = process.env.GOOGLE_SHEETS_CONTACT_ID || '';
        } else if (type === 'admission') {
            spreadsheetId = process.env.GOOGLE_SHEETS_ADMISSION_ID || '';
        }

        if (!spreadsheetId) {
            console.error('Missing Spreadsheet ID for type:', type);
            return NextResponse.json({ error: 'ID de hoja de cálculo no configurado' }, { status: 500 });
        }

        // --- DEBUG: List all current sheet names ---
        let availableSheets: string[] = [];
        try {
            const spreadsheetData = await sheets.spreadsheets.get({ spreadsheetId });
            availableSheets = spreadsheetData.data.sheets?.map(s => s.properties?.title || '') || [];
            console.log('Available sheets in spreadsheet:', availableSheets);
        } catch (e: any) {
            console.error('Error fetching spreadsheet metadata:', e.message);
        }
        // -------------------------------------------

        let range = 'Sheet1'; 
        let values: any[][] = [];

        if (type === 'contact') {
            const isWhatsApp = data.canal === 'WhatsApp';
            const isIALead = data.tamano === 'Lead IA Premium';
            
            if (isIALead) {
                // Sección 4: Leads generados por la Inteligencia Artificial
                range = "'ia leeads'!A1:Z";
            } else if (isWhatsApp) {
                // Sección 1: Leads que vienen del botón de WhatsApp
                range = "'leeads wsp'!A1:Z";
            } else {
                // Sección 2: Leads que vienen del formulario web estándar
                range = "'Leeads atm'!A1:Z";
            }
            
            values = [[
                new Date().toLocaleString(),
                data.nombre,
                data.empresa,
                data.email,
                data.tamano || 'Web Lead',
                data.mensaje || (isWhatsApp ? 'Solicitud vía WhatsApp' : 'N/A'),
                data.canal || 'Web'
            ]];
        } else if (type === 'admission') {
            // Sección 3: Protocolo de Admisión (Club de los 100)
            range = "'el club de los 100'!A1:Z";
            
            values = [[
                new Date().toLocaleString(),
                data.fullName,
                data.email,
                data.whatsapp,
                data.projectName,
                data.legalStatus,
                data.industry,
                data.whatsappStatus,
                data.painPoint,
                data.wantAudit
            ]];
        } else {
            console.error('Invalid form type:', type);
            return NextResponse.json({ error: 'Tipo de formulario inválido' }, { status: 400 });
        }

        console.log(`Final Range selected: ${range}`);

        if (!spreadsheetId) {
            console.error('Missing Spreadsheet ID for type:', type);
            return NextResponse.json({ error: 'ID de hoja de cálculo no configurado' }, { status: 500 });
        }

        // Añadir fila a la hoja
        const result = await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values,
            },
        });

        console.log('Append result:', result.statusText);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('CRITICAL ERROR in Google Sheets API:', error);
        
        // Fetch sheets one last time if possible for context
        let sheetsDetected = 'Unknown';
        try {
            const auth = new google.auth.GoogleAuth({
                credentials: {
                    client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
                    private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
                },
                scopes: ['https://www.googleapis.com/auth/spreadsheets'],
            });
            const sheets = google.sheets({ version: 'v4', auth });
            const body = await req.json().catch(() => ({}));
            const spreadsheetId = body.type === 'contact' ? process.env.GOOGLE_SHEETS_CONTACT_ID : process.env.GOOGLE_SHEETS_ADMISSION_ID;
            if (spreadsheetId) {
                const meta = await sheets.spreadsheets.get({ spreadsheetId });
                sheetsDetected = meta.data.sheets?.map(s => `"${s.properties?.title}"`).join(', ') || 'None';
            }
        } catch (e) {}

        return NextResponse.json({ 
            error: 'Error al procesar el formulario', 
            details: error.message,
            sheetsDetected: sheetsDetected,
            code: error.code || 'UNKNOWN'
        }, { status: 500 });
    }
}

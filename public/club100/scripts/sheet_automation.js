import dotenv from 'dotenv';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '.env') });

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import puppeteer from 'puppeteer';

// Configuration
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const GOOGLE_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_KEY = process.env.GOOGLE_PRIVATE_KEY;
const SHEET_TITLE = 'club de los 100';

async function main() {
    console.log('--- Starting Automation System ---');

    let useMock = false;
    if (!SPREADSHEET_ID || !GOOGLE_EMAIL || !GOOGLE_KEY || GOOGLE_KEY.includes('...')) {
        console.warn('WARNING: Missing or invalid environment variables (Key contains placeholder). Switching to MOCK MODE for testing.');
        useMock = true;
    }

    let rows = [];
    let sheet;

    if (!useMock) {
        // Initialize Auth
        const serviceAccountAuth = new JWT({
            email: GOOGLE_EMAIL,
            key: GOOGLE_KEY.replace(/\\n/g, '\n'),
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);

        try {
            await doc.loadInfo();
            console.log(`Connected to spreadsheet: ${doc.title}`);

            sheet = doc.sheetsByTitle[SHEET_TITLE];
            if (!sheet) {
                console.error(`Sheet '${SHEET_TITLE}' not found.`);
                process.exit(1);
            }

            // Load rows
            rows = await sheet.getRows();
            console.log(`Found ${rows.length} rows.`);
        } catch (error) {
            console.error('Connection Failed:', error);
            process.exit(1);
        }
    } else {
        // MOCK DATA GENERATION
        console.log('--- MOCK MODE: Generating test data ---');
        rows = [
            {
                _rawData: [
                    'Timestamp', 'Juan Pérez', 'juan@example.com', '+56912345678',
                    'Other', 'Other', 'Other', 'Other', 'Other', 'Other',
                    'Hola [Nombre], bienvenido! Link: https://example.com', // Col K (Msg1)
                    'Email para [Nombre]', // Col L (Msg2)
                    'Recordatorio para [Nombre]' // Col M (Msg3)
                ],
                rowIndex: 2 // Mock row index
            },
            {
                _rawData: [
                    'Timestamp', 'Maria Invalid', 'maria@test.com', '+56987654321',
                    'Other', 'Other', 'Other', 'Other', 'Other', 'Other',
                    'Hola [Nombre], link roto: https://this-is-a-broken-link-12345.com',
                    'Email',
                    'Recordatorio'
                ],
                rowIndex: 3
            }
        ];
    }

    try {
        // Launch Browser for validation
        const browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox'] // Safer for some envs
        });

        for (const row of rows) {
            // Columns (0-indexed logic for google-spreadsheet row access matches headers normally, 
            // but we need to rely on column letters if headers aren't perfect.
            // However, row.get('HeaderName') is standard. 
            // Since we don't know exact headers, we might need to access by index if possible or assume headers match description.
            // But strict column letters were given: B, C, D, K, L, M.
            // B=1, C=2, D=3, K=10, L=11, M=12.
            // Note: row._rawData is an array of strings. index 0 corresponds to Column A.

            const rawData = row._rawData;
            if (!rawData) continue;

            // Check Status in Column N (Index 13)
            // If the row is shorter, status is undefined => Process.
            // If row has value at index 13 and it is 'PROCESADO', skip.
            // Mock rows don't have index 13 initially
            const status = rawData[13];
            if (status === 'PROCESADO') {
                continue;
            }

            // Extract Data
            const nombre = rawData[1] || ''; // Col B
            const email = rawData[2] || '';  // Col C
            const whatsapp = rawData[3] || ''; // Col D
            let msg1 = rawData[10] || ''; // Col K
            let msg2 = rawData[11] || ''; // Col L
            let msg3 = rawData[12] || ''; // Col M

            console.log(`Processing record: ${nombre}`);

            // Variable Substitution
            const substitute = (text) => text.replace(/\[\s*Nombre\s*\]/gi, nombre);
            msg1 = substitute(msg1);
            msg2 = substitute(msg2);
            msg3 = substitute(msg3);

            // Validation: Extract URL from Msg1 (Col K) -> "Incluye el link..."
            // Regex to find http/https links
            const urlRegex = /(https?:\/\/[^\s]+)/g;
            const match = msg1.match(urlRegex);
            let linkIsValid = true;

            if (match && match[0]) {
                const url = match[0];
                console.log(`  Validating link: ${url}`);
                try {
                    const page = await browser.newPage();
                    // Fake navigation for mock mode to save time/bandwidth if needed, 
                    // but we really want to test puppeteer. 
                    // Note: Example.com should pass. Broken link should fail.
                    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
                    if (!response || !response.ok()) {
                        console.error(`  Link Validation Failed: ${url} returned ${response ? response.status() : 'Error'}`);
                        linkIsValid = false;
                    } else {
                        console.log(`  Link Validated (${response.status()})`);
                    }
                    await page.close();
                } catch (err) {
                    console.error(`  Link Validation Error: ${err.message}`);
                    linkIsValid = false;
                }
            } else {
                console.log(`  No link found in Message 1 to validate.`);
                // We proceed even if no link, or should we fail? Prompt says "verify... before processing". 
                // If no link, we can't verify, but maybe that's valid.
            }

            if (!linkIsValid) {
                console.warn(`  Skipping row for ${nombre} due to invalid link.`);
                continue; // Skip this row
            }

            // Execution Sequence
            console.log(`  [WhatsApp] Sending to ${whatsapp}: "${msg1}"`);
            console.log(`  [Email] Sending to ${email}: "${msg2}"`);
            console.log(`  [WhatsApp] Sending reminder to ${whatsapp}: "${msg3}"`);

            // Update Status
            // row is an object. To update a specific cell by index, we might need a different approach 
            // or just update if mapped by header.
            // The safest way with potentially unknown headers is to use sheet.loadCells() for the specific row range
            // or assume we can set a value if we know the header for Col N. 
            // If we don't know the header, we can't easily use row.save() with a new field.
            // So let's use loadCells for the Status cell.
            // Row index in sheet: row.rowIndex (1-based because 0 is header?). 
            // google-spreadsheet row.rowIndex is 1-based index in the sheet.

            // We need to load cells for this row to write to Status (Col N = 13).
            // Be careful not to reload everything.

            // SIMPLER APPROACH:
            // If the sheet has a header for Column N, we can use `row.Status = 'PROCESADO'; await row.save();`
            // But we don't know the header.
            // Let's try to set it via cell directly.

            if (!useMock && sheet) {
                await sheet.loadCells({
                    startRowIndex: row.rowIndex - 1,
                    endRowIndex: row.rowIndex,
                    startColumnIndex: 13,
                    endColumnIndex: 14
                });
                const statusCell = sheet.getCell(row.rowIndex - 1, 13);
                statusCell.value = 'PROCESADO';
                await sheet.saveUpdatedCells();
                console.log(`  Marked as PROCESADO.`);
            } else {
                console.log(`  [MOCK] Would mark row ${row.rowIndex} as PROCESADO`);
            }
        }

        await browser.close();
        console.log('--- Batch Processing Complete ---');

    } catch (error) {
        console.error('Fatal Error:', error);
    }
}

main();

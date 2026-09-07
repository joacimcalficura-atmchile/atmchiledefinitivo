import { readFileSync } from 'fs';
import ts from 'typescript';

const src = readFileSync('./src/lib/anti-spam.ts', 'utf8');
const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const mod = await import('data:text/javascript;base64,' + Buffer.from(js).toString('base64'));
const { inspectLead, normalizeEmail } = mod;

const SPAM = [
  ['spam REAL del correo', { nombre: 'ZnlCqtuXeAgqynlHgLbEcx', correo: 'jj.u.g.esodes13@gmail.com', mensaje: 'SUgVaYfAPdZgfbsrla', empresa: 'gvpMJPePAqujoGInJP', datoExtra: 'startup' }],
  ['desechable', { nombre: 'Juan Perez', correo: 'x@mailinator.com', empresa: 'Test' }],
  ['url en empresa', { nombre: 'Juan Perez', correo: 'a@gmail.com', empresa: 'visita http://cheap-seo.ru' }],
  ['cirilico', { nombre: 'Иван Петров', correo: 'a@gmail.com', empresa: 'Test' }],
  ['seo spam', { nombre: 'Mark Smith', correo: 'a@gmail.com', mensaje: 'We offer backlink packages', empresa: 'Agency' }],
];

const LEGIT = [
  ['chileno tipico', { nombre: 'Juan Pérez González', correo: 'juan@empresa.cl', empresa: 'Constructora Andes SpA', mensaje: 'Necesitamos digitalizar nuestro sistema de bodega y facturación.' }],
  ['acronimos', { nombre: 'María José Fuenzalida', correo: 'mj@bci.cl', empresa: 'BCI ATM SQM SpA', mensaje: 'Quiero cotizar un ERP.' }],
  ['apellido aleman', { nombre: 'Cristóbal Schwarzenberg', correo: 'c@x.cl', empresa: 'Transbank', mensaje: 'Integración de pagos.' }],
  ['mapuche/extranjero', { nombre: 'Joacim Calficura', correo: 'j@atmchile.cl', empresa: 'ATM Chile', mensaje: 'Prueba interna del formulario.' }],
  ['ingles corporativo', { nombre: 'Andrew Thompson', correo: 'a@corp.com', empresa: 'Blackstone Growth Partners', mensaje: 'Requesting a proposal for cloud migration services.' }],
  ['nombre compuesto largo', { nombre: 'Francisca Ignacia Vergara Undurraga', correo: 'f@x.cl', empresa: 'Viña Santa Rita', mensaje: 'Automatizar reportes de exportación.' }],
];

let fail = 0;
console.log('--- DEBE BLOQUEAR ---');
for (const [label, p] of SPAM) {
  const v = inspectLead(p);
  const ok = v.blocked;
  if (!ok) fail++;
  console.log(`${ok ? '✅' : '❌ FALLO'} ${label.padEnd(22)} score=${String(v.score).padEnd(3)} ${v.reason ?? ''}`);
}
console.log('\n--- DEBE PASAR ---');
for (const [label, p] of LEGIT) {
  const v = inspectLead(p);
  const ok = !v.blocked;
  if (!ok) fail++;
  console.log(`${ok ? '✅' : '❌ FALSO POSITIVO'} ${label.padEnd(22)} score=${String(v.score).padEnd(3)} ${v.reason ?? ''}`);
}
console.log('\n--- normalizeEmail ---');
console.log('jj.u.g.esodes13@gmail.com ->', normalizeEmail('jj.u.g.esodes13@gmail.com'));
console.log('jjugesodes13+atm@gmail.com ->', normalizeEmail('jjugesodes13+atm@gmail.com'));
console.log('Joacim.Calficura@atmchile.cl ->', normalizeEmail('Joacim.Calficura@atmchile.cl'));
console.log(fail === 0 ? '\n🟢 TODO CORRECTO' : `\n🔴 ${fail} CASOS FALLIDOS`);

// Casos extra tras la corrección del ratio de vocales
console.log('\n--- CASOS BORDE ---');
const EXTRA = [
  [true,  'minusculas random', { nombre: 'qwlkfjhsdlkfj', correo: 'a@gmail.com', empresa: 'zxcvbnmqwrt' }],
  [true,  'solo nombre basura', { nombre: 'ZnlCqtuXeAgqynlHgLbEcx', correo: 'a@gmail.com', empresa: 'Sodimac' }],
  [false, 'ingles corporativo', { nombre: 'Andrew Thompson', correo: 'a@corp.com', empresa: 'Blackstone Growth Partners', mensaje: 'Requesting a proposal for cloud migration services.' }],
  [false, 'apellidos dificiles', { nombre: 'Sebastián Krmpotic Vrsalovic', correo: 's@x.cl', empresa: 'Watts SpA', mensaje: 'Consulta.' }],
  [false, 'startup tech', { nombre: 'Nicolás Bravo', correo: 'n@x.cl', empresa: 'Fintech Spark SpA', mensaje: 'Necesito un MVP.' }],
];
for (const [shouldBlock, label, p] of EXTRA) {
  const v = inspectLead(p);
  const ok = v.blocked === shouldBlock;
  console.log(`${ok ? '✅' : '❌ FALLO'} ${label.padEnd(20)} bloqueado=${String(v.blocked).padEnd(5)} score=${String(v.score).padEnd(3)} ${v.reason ?? ''}`);
}

// ── Validación de nombre real ────────────────────────────────────────────────
const { validatePersonName } = mod;
console.log('\n--- NOMBRE REAL (debe RECHAZAR) ---');
const MALOS = [
  'HLVjGmvZggaIYQWckAjvn',   // spam 07-09 14:39
  'ZnlCqtuXeAgqynlHgLbEcx',  // spam 07-09 10:02
  'Juan',                     // solo nombre de pila
  'Juan 123',                 // con números
  'test',
  'a b',                      // iniciales sueltas
  '<script>alert(1)</script>',
];
for (const n of MALOS) {
  const r = validatePersonName(n);
  if (r.ok) fail++;
  console.log(`${!r.ok ? '✅' : '❌ FALLO'} ${JSON.stringify(n).padEnd(28)} ${r.message ?? 'PASÓ'}`);
}

console.log('\n--- NOMBRE REAL (debe ACEPTAR) ---');
const BUENOS = [
  'Juan Pérez',
  'María José Fuenzalida Undurraga',
  'José-Luis Fernández',
  "Bernardo O'Higgins",
  'Ma. José Vergara',
  'Joacim Calficura',
  'Alberto Castillo',
  'Andrew Thompson',
  'Sebastián Krmpotic Vrsalovic',
  'ana maría soto',        // sin mayúsculas, sigue siendo válido
];
for (const n of BUENOS) {
  const r = validatePersonName(n);
  if (!r.ok) fail++;
  console.log(`${r.ok ? '✅' : '❌ FALSO POSITIVO'} ${JSON.stringify(n).padEnd(34)} ${r.message ?? ''}`);
}
console.log(fail === 0 ? '\n🟢 SUITE COMPLETA OK' : `\n🔴 ${fail} FALLOS`);

import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInNewContext, Script } from 'node:vm';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = path => readFileSync(resolve(root, path), 'utf8');
const sandbox = {window: {}};
const source = read('assets/docs.js');
new Script(source); new Script(read('assets/app.js'));
runInNewContext(source, sandbox);
const docs = sandbox.window.SOLAR_DOCS;
const ids = new Set();
function assert(condition, text) { if (!condition) throw Error(text); }
for (const doc of docs) {
  assert(!ids.has(doc.id), 'Duplicate article: ' + doc.id); ids.add(doc.id);
  assert(doc.title && doc.lead && doc.html, 'Incomplete article: ' + doc.id);
  const sections = [...doc.html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert(new Set(sections).size === sections.length, 'Duplicate section: ' + doc.id);
}
for (const doc of docs) for (const [,id] of doc.html.matchAll(/href="#([^"/]+)"/g)) assert(ids.has(id), 'Broken article link: ' + id);
for (const [,asset] of read('index.html').matchAll(/(?:src|href)="(assets\/[^"?#]+)"/g)) assert(existsSync(resolve(root, asset)), 'Missing asset: ' + asset);
assert(!/https?:\/\/localhost|C:\\Users|THAY_BANG_MAT_KHAU_RIENG.*THAT/.test(source), 'Unexpected local/private reference');
console.log(`PASS: ${docs.length} articles, JS syntax, unique routes/sections and local links/assets.`);

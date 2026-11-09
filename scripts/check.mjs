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
runInNewContext(read('assets/config-data.js'), sandbox);
runInNewContext(read('assets/wiki.js'), sandbox);
runInNewContext(read('assets/products.js'), sandbox);
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
for (const doc of docs) for (const [,asset] of doc.html.matchAll(/(?:src|href)="(assets\/[^"?#]+)"/g)) assert(existsSync(resolve(root, asset)), 'Missing asset: ' + asset);
assert(docs.filter(d=>d.product==='solartpa').length === 4, 'Missing SolarTPA documentation');
assert(sandbox.window.ONIC_TPA_CONFIGS.length === 8, 'Missing SolarTPA YAML templates');
assert((docs.find(d=>d.id==='bat-dau').html.match(/<img /g)||[]).length === 6, 'Missing SolarShop screenshots');
for (const doc of docs) for (const [,article,section] of doc.html.matchAll(/href="#([^"/]+)\/([^"]+)"/g)) {
  const target = docs.find(d => d.id === article);
  assert(target && target.html.includes('id="' + section + '"'), 'Broken section link: ' + article + '/' + section);
}
assert(runInNewContext('keyRows("messages:\\n  chat-messages: false")[1][0]',sandbox).includes('messages.chat-messages'), 'Nested key paths must be complete');
assert(runInNewContext('keyRows("command-aliases:\\n  - shop")[0][0]',sandbox).includes('command-aliases'), 'List key must be indexed');
assert(docs[0].id === 'wiki', 'Default page must be multi-product wiki');
assert(docs.some(d=>d.id==='solarshop-config') && docs.some(d=>d.id==='solarshards-config'), 'Missing config references');
for (const [,asset] of read('index.html').matchAll(/(?:src|href)="(assets\/[^"?#]+)"/g)) assert(existsSync(resolve(root, asset)), 'Missing asset: ' + asset);
assert(!/https?:\/\/localhost|C:\\Users|THAY_BANG_MAT_KHAU_RIENG.*THAT/.test(source), 'Unexpected local/private reference');
console.log(`PASS: ${docs.length} articles, JS syntax, unique routes/sections and local links/assets.`);

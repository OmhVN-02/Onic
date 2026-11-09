// Build asset from the published YAML templates: one canonical copy in Git.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
function collect(product) {
  const directory = resolve(root, 'assets/examples', product);
  function walk(path) {
    return readdirSync(path, {withFileTypes:true}).flatMap(entry => {
      const full = resolve(path, entry.name);
      return entry.isDirectory() ? walk(full) : full.endsWith('.yml') ? [{path:relative(directory,full).replaceAll('\\','/'),content:readFileSync(full,'utf8')}] : [];
    });
  }
  return walk(directory);
}
const shop = collect('solarshop'), shards = collect('solarshards'), tpa = collect('solartpa');
const output = `// Generated from public YAML templates. Do not edit.\nwindow.ONIC_CONFIGS=${JSON.stringify(shop)};\nwindow.ONIC_SHARDS_CONFIG=${JSON.stringify(shards.find(f=>f.path==='config.yml').content)};\nwindow.ONIC_TPA_CONFIGS=${JSON.stringify(tpa)};\n`;
writeFileSync(resolve(root,'assets/config-data.js'),output);
console.log(`Generated config data: ${shop.length} SolarShop, ${shards.length} SolarShards, ${tpa.length} SolarTPA templates.`);

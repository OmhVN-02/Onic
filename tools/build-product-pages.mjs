import {readFileSync,writeFileSync,existsSync,mkdirSync} from 'node:fs';
import {resolve} from 'node:path';
import {createContext,runInContext} from 'node:vm';

const root=process.cwd();
if(!process.argv[2]) throw Error('Provide an output directory');
const output=resolve(process.argv[2]);
const read=path=>readFileSync(resolve(root,path),'utf8');
const template=read('index.html');
const context=createContext({window:{}});
for(const [,path] of template.matchAll(/<script\b[^>]*src="(assets\/[^"?]+)(?:\?[^"]*)?"[^>]*><\/script>/g)) {
  if(['assets/app.js','assets/theme.js','assets/loading.js'].includes(path)) continue;
  runInContext(read(path),context,{filename:path});
}
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const logos={solarshop:'solarshop-logo.png',solarshards:'solarshards-logo.png'};
const base='https://omhvn-02.github.io/Onic/';
mkdirSync(output,{recursive:true});
let count=0;
for(const product of context.window.ONIC_PLUGINS.filter(p=>p.route)) {
  if(!/^[a-z0-9-]+$/.test(product.id)) throw Error('Invalid product route');
  const doc=context.window.SOLAR_DOCS.find(doc=>doc.id===product.route);
  if(!doc) throw Error('Missing product overview: '+product.id);
  const description=doc.lead.replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
  const image='assets/images/'+(product.image||logos[product.id]||'onic-studio.png');
  if(!existsSync(resolve(root,image))) throw Error('Missing product image: '+image);
  const url=base+product.id+'.html';
  let html=template.replace(/<meta\b[^>]*(?:property="og:[^"]*"|name="twitter:[^"]*")[^>]*>\s*/g,'').replace(/<link\b[^>]*rel="canonical"[^>]*>\s*/g,'');
  html=html.replace(/<title>[\s\S]*?<\/title>/,'<title>'+escape(product.name)+'</title>');
  html=html.replace(/<meta name="description"[^>]*>/,'<meta name="description" content="'+escape(description)+'">');
  const metadata=[
    ['property','og:type','website'],['property','og:site_name','Onic Wiki'],
    ['property','og:title',product.name],['property','og:description',description],
    ['property','og:url',url],['property','og:image',base+image],
    ['property','og:image:alt',product.name+' logo'],
    ['name','twitter:card','summary_large_image'],['name','twitter:title',product.name],
    ['name','twitter:description',description],['name','twitter:image',base+image]
  ].map(([attribute,name,value])=>'  <meta '+attribute+'="'+name+'" content="'+escape(value)+'">').join('\n');
  html=html.replace('</head>',metadata+'\n  <link rel="canonical" href="'+url+'">\n  <script>window.ONIC_ENTRY_ROUTE='+JSON.stringify(product.route)+';</script>\n</head>');
  writeFileSync(resolve(output,product.id+'.html'),html);
  count++;
}
console.log('Generated '+count+' product pages with static descriptions and logo previews.');

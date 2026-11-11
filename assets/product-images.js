'use strict';
const suppliedProductImages={solartpa:'SolarTPA.png',solarbounty:'SolarBounty.png',scombat:'Scombat.png',solarrtp:'SolarRTP.png',solarquest:'SolarQuest.png',solarorder:'SolarOrder.png',oniccraft:'OnicCraft.png',oniccore:'OnicCore.png',crystalguard:'CrystalGuard.png',antintr:'AntiNTR.png',onicsus:'OnicSUS.png',onickits:'onickits.png'};
if(!window.ONIC_PLUGINS.some(p=>p.id==='oniccraft')) {
  window.ONIC_PLUGINS.push({id:'oniccraft',name:'OnicCraft',icon:'▦',category:'onic',route:'oniccraft-home',status:'planned',updatedAt:'2026-11-11'});
  for(const [docs,en] of [[window.SOLAR_DOCS,false],[window.ONIC_ENGLISH,true]]) {
    docs.push({id:'oniccraft-home',product:'oniccraft',group:en?'GET STARTED':'BẮT ĐẦU',title:en?'Overview':'Tổng quan',icon:'▦',lead:en?'OnicCraft documentation will be added here.':'Tài liệu OnicCraft sẽ được bổ sung tại đây.',html:'<div class="pills"><span class="pill">'+(en?'Coming soon':'Sắp cập nhật')+'</span></div><h2 id="cap-nhat">'+(en?'Coming soon':'Đang cập nhật')+'</h2><p>'+(en?'This product section is ready for future documentation.':'Chuyên mục đã sẵn sàng để bổ sung tài liệu.')+'</p>'});
    const wiki=docs.find(d=>d.id==='wiki');
    const marker='<section class="product-group" aria-labelledby="products-other">';
    const boundary=wiki.html.indexOf(marker);
    if(boundary<0) throw Error('Onic product group missing');
    const close=wiki.html.lastIndexOf('</div></section>',boundary);
    if(close<0) throw Error('Onic product grid missing');
    wiki.html=wiki.html.slice(0,close)+card('oniccraft-home','▦','OnicCraft',en?'Documentation will be added.':'Tài liệu sẽ được bổ sung.').replace('</p>','</p><span class="product-status">'+(en?'Coming soon':'Sắp cập nhật')+'</span>')+wiki.html.slice(close);
  }
}
for(const [id,file] of Object.entries(suppliedProductImages)) {
  const product=window.ONIC_PLUGINS.find(p=>p.id===id);
  if(!product) throw Error('Product image has no product: '+id);
  product.image=file;
  const src='assets/images/'+file+'?v=20261111-logos';
  for(const [docs,en] of [[window.SOLAR_DOCS,false],[window.ONIC_ENGLISH,true]]) {
    const logo='<span class="product-logo-frame"><img src="'+src+'" alt="'+esc(product.name)+'" width="1920" height="1080" loading="lazy"></span>';
    const wiki=docs.find(d=>d.id==='wiki');
    const route=product.route.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    wiki.html=wiki.html.replace(new RegExp('<a class="card[^\"]*" href="#'+route+'"[\\s\\S]*?<\\/a>','g'),html=>html.replace(/<span class="(?:card-icon|product-logo-frame|product-symbol)"[^>]*>[\s\S]*?<\/span>/,logo));
    const home=docs.find(d=>d.id===product.route);
    if(home&&!home.html.includes(src)) {
      if(/<span class="product-symbol"[^>]*>[\s\S]*?<\/span>/.test(home.html)) home.html=home.html.replace(/<span class="product-symbol"[^>]*>[\s\S]*?<\/span>/,logo);
      else home.html='<div class="product-heading-logo">'+logo+'</div>'+home.html;
    }
  }
}

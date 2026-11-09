'use strict';
window.ONIC_PRODUCT_GROUPS = [
  {id:'solar',vi:'Solar Plugin',en:'Solar Plugin'},
  {id:'onic',vi:'Onic Plugin',en:'Onic Plugin'},
  {id:'other',vi:'Khác',en:'Other'},
  {id:'beta',vi:'Beta (thử nghiệm)',en:'Beta (experimental)'}
];
const additionalProducts = [
  {id:'scombat',name:'Scombat',icon:'⚔',category:'solar'},
  {id:'onicsus',name:'OnicSus',icon:'◈',category:'onic'},
  {id:'onickits',name:'OnicKits',icon:'▣',category:'onic'},
  {id:'crystalguard',name:'CrystalGuard',icon:'◇',category:'other'},
  {id:'antintr',name:'AntiNTR',icon:'⛨',category:'other'},
  {id:'solarauctionhouse',name:'SolarAuctionHouse',icon:'⚖',category:'beta'},
  {id:'oniccore',name:'OnicCore',icon:'✳',category:'beta'}
];
for (const product of window.ONIC_PLUGINS) product.category='solar';
for (const product of additionalProducts) {
  window.ONIC_PLUGINS.push({...product,route:product.id+'-home',status:product.category==='beta'?'beta':'planned',updatedAt:'2026-11-09'});
}
for (const [docs,en] of [[window.SOLAR_DOCS,false],[window.ONIC_ENGLISH,true]]) {
  const t=(vi,english)=>en?english:vi;
  for (const product of additionalProducts) {
    const beta=product.category==='beta';
    docs.push({id:product.id+'-home',product:product.id,icon:product.icon,group:t('BẮT ĐẦU','GET STARTED'),title:t('Tổng quan','Overview'),updatedAt:'2026-11-09',
      lead:t('Tài liệu '+product.name+' sẽ được bổ sung tại đây.',product.name+' documentation will be added here.'),
      html:'<div class="pills"><span class="pill">'+(beta?t('Beta (thử nghiệm)','Beta (experimental)'):t('Sắp cập nhật','Coming soon'))+'</span></div><h2 id="cap-nhat">'+t('Đang cập nhật','Coming soon')+'</h2><p>'+t('Chuyên mục đã sẵn sàng để bổ sung tài liệu.','This section is ready for future documentation.')+'</p>'});
  }
  const home=docs.find(doc=>doc.id==='wiki');
  const start=home.html.indexOf('<div class="cards plugin-cards">');
  const end=home.html.indexOf('<h2 id="lo-trinh">',start);
  if(start<0||end<0) throw Error('Product grid boundary missing');
  const oldCards=new Map([...home.html.slice(start,end).matchAll(/<a class="card[^\"]*" href="#([^\"]+)"[\s\S]*?<\/a>/g)].map(match=>[match[1],match[0]]));
  const grouped=window.ONIC_PRODUCT_GROUPS.map(group=>'<section class="product-group" aria-labelledby="products-'+group.id+'"><h3 id="products-'+group.id+'">'+t(group.vi,group.en)+'</h3><div class="cards plugin-cards">'+window.ONIC_PLUGINS.filter(p=>p.route&&p.category===group.id).map(p=>oldCards.get(p.route)||card(p.route,p.icon,p.name,t('Tài liệu sẽ được bổ sung.','Documentation will be added.')).replace('</p>','</p><span class="product-status">'+(p.status==='beta'?t('Thử nghiệm','Experimental'):t('Sắp cập nhật','Coming soon'))+'</span>')).join('')+'</div></section>').join('');
  home.html=home.html.slice(0,start)+grouped+home.html.slice(end).replace(/<h2 id="lo-trinh">[\s\S]*?<\/ol>/,'');
}

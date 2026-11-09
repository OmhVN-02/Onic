'use strict';
window.ONIC_IS_NEW = (item, now = Date.now()) => {
  const updated = Date.parse(item?.updatedAt || '');
  return Number.isFinite(updated) && now >= updated && now - updated < 7 * 86400000;
};
const worthProduct = window.ONIC_PLUGINS.find(p => p.id === 'solarworth');
Object.assign(worthProduct, {version:'1.5', updatedAt:'2026-11-09'});
delete worthProduct.status;
window.ONIC_PLUGINS.find(p => p.id === 'solarshards').updatedAt='2026-11-09';
const worthReleases = [
  {number:146,date:'2026-11-04',display:'04 / 11 / 2026',version:'SolarWorth-1.5',sections:[
    ['GUI bán hàng','Selling GUI',[
      ['Giữ GUI mở sau khi xác nhận bán để người chơi có thể bán liên tục.','The GUI stays open after confirming a sale so players can continue selling.']]]]},
  {number:140,date:'2026-10-04',display:'04 / 10 / 2026',version:'SolarWorth-1.5 (GUI Matrix & Paper 26.3 Items)',sections:[
    ['Ma trận GUI','GUI matrix',[
      ['Tùy chỉnh toàn bộ GUI bằng ma trận: bán đồ, bảng giá Worth, lịch sử giao dịch, danh mục vật phẩm, hệ số bán và tiến độ danh mục.','Customize all menus with matrices: selling, Worth prices, transaction history, item categories, sell multipliers and category progress.'],
      ['Thiết kế từ 1–6 hàng, mỗi hàng 9 ô; thay đổi vị trí nút, ô vật phẩm và ô trang trí ngay trong cấu hình.','Design layouts with 1–6 rows of 9 slots. Configure button positions, item slots and decorative slots.'],
      ['GUI bán đồ không còn cố định vị trí nút xác nhận, lịch sử và các nút danh mục.','The selling GUI no longer fixes the positions of confirmation, history and category buttons.'],
      ['Phân trang tự tính theo số ô nội dung trong ma trận.','Pagination adapts to the number of content slots in the matrix.']]],
    ['121 vật phẩm mới','121 new items',[
      ['Bổ sung 121 vật phẩm theo danh sách Material của Paper 26.3: 99 vật phẩm vào Blocks và 22 vào Natural Items.','Adds 121 items from the Paper 26.3 Material list: 99 to Blocks and 22 to Natural Items.'],
      ['Thêm giá mặc định và phân loại cho họ gỗ Poplar, cầu thang/nửa khối Wool và Concrete, Cushion, Straw Bed, thực vật mới và các loại bản đồ mới.','Adds default prices and categories for Poplar wood, Wool and Concrete stairs/slabs, Cushion, Straw Bed, new plants and new map types.']]]]},
  {number:224,date:'2026-08-27',display:'27 / 8 / 2026',version:'SolarWorth-1.5-R01 (Minecraft 26.2 Sulfur Items)',sections:[
    ['Vật phẩm Sulfur','Sulfur items',[
      ['Bổ sung giá mặc định cho các vật phẩm và khối Minecraft 26.2 trong <code>worth/prices.yml</code>.','Adds default prices for Minecraft 26.2 items and blocks in <code>worth/prices.yml</code>.'],
      ['Tự động nhận diện, hiển thị giá Worth Lore, hỗ trợ bán qua GUI <code>/sell</code>, Sell Stick, Sell Axe, Custom Tools và thống kê lịch sử giao dịch.','Automatically recognizes items, displays Worth Lore prices and supports selling through <code>/sell</code>, Sell Stick, Sell Axe, Custom Tools and transaction history.']]]],prices:true}
];
for (const [docs,en] of [[window.SOLAR_DOCS,false],[window.ONIC_ENGLISH,true]]) {
  const t=(vi,english)=>en?english:vi;
  const prices=table([t('Vật phẩm','Item'),t('Giá mặc định','Default price')],[['SULFUR','10.0$'],['POTENT_SULFUR','15.0$'],['SULFUR_SPIKE','5.0$'],['SULFUR_CUBE_BUCKET','10.0$']]);
  const releaseHtml=worthReleases.map(release=>'<section class="release-card"><h2 id="devlog-'+release.number+'">'+esc(release.version)+'</h2><p class="release-meta">DevLog Plugins #'+release.number+' · <time datetime="'+release.date+'">'+release.display+'</time></p>'+release.sections.map(([vi,english,items])=>'<h3>'+t(vi,english)+'</h3><ul>'+items.map(([vi,english])=>'<li>'+t(vi,english)+'</li>').join('')+'</ul>').join('')+(release.prices?prices:'')+'</section>').join('');
  const overview=docs.find(d=>d.id==='solarworth-home');
  Object.assign(overview,{updatedAt:'2026-11-09',lead:t('Bán vật phẩm, bảng giá Worth và bố cục GUI tùy chỉnh.','Item selling, Worth prices and customizable GUI layouts.'),html:
    '<div class="pills"><span class="pill">SolarWorth 1.5</span></div><div class="hero-art"><span class="product-logo-frame"><img src="assets/images/solarworth.png" alt="SolarWorth" width="1920" height="1080"></span></div>'+
    '<h2 id="gui">GUI</h2><p>'+t('Tùy chỉnh sáu GUI bằng ma trận 1–6 hàng × 9 ô. Phân trang theo ô nội dung và giữ menu bán mở sau khi xác nhận.','Customize six menus with 1–6 rows × 9 slots. Pagination follows content slots, and the selling menu stays open after confirmation.')+'</p>'+
    '<h2 id="vat-pham">'+t('Vật phẩm','Items')+'</h2><p>'+t('Cập nhật bảng giá Sulfur Minecraft 26.2 và 121 vật phẩm theo Paper 26.3.','Price updates include Minecraft 26.2 Sulfur items and 121 items from Paper 26.3.')+'</p>'+
    '<div class="cards">'+card('solarworth-changelog','↻','Changelog',t('Ba DevLog và chi tiết cập nhật.','Three DevLogs and release details.'))+'</div>'});
  docs.push({id:'solarworth-changelog',product:'solarworth',group:t('CẬP NHẬT','UPDATES'),icon:'↻',title:'Changelog',updatedAt:'2026-11-09',lead:t('Lịch sử cập nhật SolarWorth 1.5, xếp theo ngày phát hành.','SolarWorth 1.5 release history, ordered by release date.'),html:releaseHtml});
  docs.find(d=>d.id==='solarshards-api').updatedAt='2026-11-09';
  const home=docs.find(d=>d.id==='wiki');
  const logo='<span class="product-logo-frame"><img src="assets/images/solarworth.png" alt="SolarWorth" width="1920" height="1080" loading="lazy"></span>';
  const worthCard=card('solarworth-home','◇','SolarWorth',t('Bán đồ, bảng giá và GUI tùy chỉnh.','Item selling, prices and customizable menus.')).replace('<span class="card-icon">◇</span>',logo);
  home.html=home.html.replace(/<a class="card planned" href="#solarworth-home"[\s\S]*?<\/a>/,worthCard);
}

'use strict';
const onicSusProduct = window.ONIC_PLUGINS.find(product => product.id === 'onicsus');
Object.assign(onicSusProduct, {version:'1.0-C01', updatedAt:'2026-11-11'});
delete onicSusProduct.status;

const onicSusImages = [
  ['item-checker','Danh sách Item Checker','Item Checker list'],
  ['item-filter','Lọc theo loại vật phẩm','Filter by tracked item'],
  ['player-sort','Sắp xếp theo số lượng','Sort players by quantity'],
  ['player-summary','Số lượng và thời điểm lưu hồ sơ','Recorded counts and save time'],
  ['player-menu','Menu quản lý người chơi offline','Offline player management'],
  ['inventory-log','Lịch sử túi đồ kèm tọa độ và thời gian','Inventory history with coordinates and time'],
  ['inventory-snapshot','Túi đồ tại một mốc đã lưu','Inventory at a saved point in time'],
  ['axvault','Chọn vault để xem qua AxVaults','Select a vault to view in AxVaults'],
  ['freeze','Nút Freeze và trạng thái hiện tại','Freeze control and current state']
];

for (const [docs, en] of [[window.SOLAR_DOCS,false],[window.ONIC_ENGLISH,true]]) {
  const t = (vi, english) => en ? english : vi;
  const heading = (id, vi, english) => '<h2 id="'+id+'">'+t(vi,english)+'</h2>';
  const paragraph = (vi, english) => '<p>'+t(vi,english)+'</p>';
  const steps = items => '<ol>'+items.map(pair=>'<li>'+t(...pair)+'</li>').join('')+'</ol>';
  const rows = items => items.map(([key,vi,english])=>[key,t(vi,english)]);
  const gallery = items => '<div class="cards screenshots natural-screenshots">'+items.map(([id,vi,english])=>{
    const path = 'assets/images/onicsus/'+id+'.png';
    const caption = esc(t(vi,english));
    return '<figure class="card"><a href="'+path+'" target="_blank" rel="noopener"><img src="'+path+'" alt="'+caption+'" loading="lazy"></a><figcaption>'+caption+'</figcaption></figure>';
  }).join('')+'</div>';
  const page = (id,title,icon,lead,html) => docs.push({
    id:'onicsus-'+id, product:'onicsus', group:t('HƯỚNG DẪN','GUIDES'), title, icon, lead, html, updatedAt:'2026-11-11'
  });
  Object.assign(docs.find(doc=>doc.id==='onicsus-home'), {
    updatedAt:'2026-11-11',
    subtitle:t('Kiểm tra vật phẩm và lịch sử túi đồ','Inspect items and inventory history'),
    lead:t('OnicSus giúp staff theo dõi vật phẩm đã chọn, xem lịch sử túi đồ và Ender Chest, rồi kiểm tra hồ sơ người chơi trong game.','OnicSus lets staff track selected items, view inventory and Ender Chest history, and inspect player records in-game.'),
    html:'<div class="pills"><span class="pill">1.0-C01</span>'+javaBadge(21)+platformBadges+'</div>'+
      '<div class="hero-art product-hero"><div class="hero-caption">ONICSUS<strong>'+t('Mở Item Checker bằng /sus','Open Item Checker with /sus')+'</strong>Item Checker · Inventory Log · Freeze</div><img class="hero-shot" src="assets/images/onicsus/item-checker.png" alt="Item Checker"></div>'+
      heading('bat-dau','Bắt đầu','Get started')+'<div class="cards">'+
      card('onicsus-setup','↓',t('Cài đặt & lệnh','Installation & commands'),t('Java, quyền và lệnh quản trị.','Java, permissions and staff commands.'))+
      card('onicsus-review','◇',t('Kiểm tra hồ sơ','Review player records'),t('Đọc số liệu, xem log và dùng Freeze.','Read counts, review logs and use Freeze.'))+
      card('onicsus-config','{}',t('Cấu hình','Configuration'),t('Chọn vật phẩm theo dõi trong settings.yml.','Choose tracked items in settings.yml.'))+
      card('onicsus-gallery','▣',t('Ảnh trong game','In-game screenshots'),t('Xem 9 ảnh của các menu.','View nine menu screenshots.'))+'</div>'+
      heading('dung-nhanh','Dùng nhanh','Quick workflow')+steps([
        ['Mở <code>/sus</code> bằng tài khoản có quyền <code>onicsus.admin</code>.','Open <code>/sus</code> with an account that has <code>onicsus.admin</code>.'],
        ['Chọn vật phẩm ở Items Filter và dùng Sort Players để sắp xếp kết quả.','Choose an item in Items Filter and use Sort Players to order the results.'],
        ['Bấm đầu người chơi để mở hồ sơ, rồi chọn Inventory Log hoặc Ender Chest Log để xem mốc đã lưu.','Select a player head to open the record, then choose Inventory Log or Ender Chest Log to review a saved point in time.']
      ])
  });

  page('setup',t('Cài đặt & lệnh','Installation & commands'),'↓',
    t('Cài OnicSus, cấp quyền và kiểm tra dữ liệu đầu tiên.','Install OnicSus, grant permissions and check the first record.'),
    heading('cai-dat','Cài đặt','Installation')+steps([
      ['Dùng Java 21 và JAR phù hợp Paper/Folia 1.21. Bản 1.0-C01 được biên dịch với Paper API 1.21.1.','Use Java 21 and a JAR matching Paper/Folia 1.21. Release 1.0-C01 is built against Paper API 1.21.1.'],
      ['Chép JAR vào thư mục <code>plugins/</code> và khởi động server. Chỉnh vật phẩm theo dõi trong <code>plugins/OnicSus/settings.yml</code>.','Place the JAR in <code>plugins/</code> and start the server. Edit tracked items in <code>plugins/OnicSus/settings.yml</code>.'],
      ['Cấp <code>onicsus.admin</code> cho staff. Thử với một vật phẩm trong danh sách rồi mở <code>/sus</code> để xem hồ sơ.','Grant <code>onicsus.admin</code> to staff. Test with a tracked item and open <code>/sus</code> to inspect the record.']
    ])+heading('lenh','Lệnh quản trị','Staff commands')+table([t('Lệnh','Command'),t('Công dụng','Purpose')],rows([
      ['/sus','Mở Item Checker trong game.','Open Item Checker in-game.'],
      ['/sus reload','Lưu dữ liệu rồi nạp lại settings.yml.','Save records and reload settings.yml.'],
      ['/sus freeze &lt;player&gt;','Đóng băng người chơi đang online.','Freeze an online player.'],
      ['/sus unfreeze &lt;player&gt;','Gỡ Freeze cho người chơi đang online.','Unfreeze an online player.']
    ]))+heading('luu-tru','Lưu trữ','Storage')+
    paragraph('OnicSus lưu hồ sơ và lịch sử vào SQLite tại <code>plugins/OnicSus/database/Storage.db</code>. Khi chuyển máy chủ, dừng server rồi sao lưu thư mục dữ liệu OnicSus.','OnicSus stores records and history in SQLite at <code>plugins/OnicSus/database/Storage.db</code>. Stop the server before backing up the OnicSus data folder for a migration.'));

  page('review',t('Kiểm tra hồ sơ','Review player records'),'◇',
    t('Đọc Item Checker, mở lịch sử và quản lý người chơi.','Read Item Checker, open history and manage players.'),
    heading('doc-so-lieu','Đọc số liệu','Read the counts')+
    paragraph('Ở bộ lọc All, Số lượng lấy từ lần kiểm tra được ghi nhận trong hồ sơ. Tổng số lượng là bộ đếm tích lũy của hồ sơ. Với bộ lọc một vật phẩm, Số lượng đếm từ hai bản lưu mới nhất, còn Tổng số lượng cộng mức cao nhất từng ghi trong túi đồ và mức cao nhất từng ghi trong Ender Chest. Hai mức này có thể đến từ các thời điểm khác nhau.','With the All filter, the current count comes from the record’s last tracked scan and the total is the record’s cumulative counter. For a specific item, the current count uses the latest snapshots, while the total adds the highest recorded inventory count and highest recorded Ender Chest count. Those maxima can come from different times.')+
    paragraph('OnicSus kiểm tra khi vào/rời server và ở một số thao tác vật phẩm như nhặt đồ hoặc bấm inventory. Log được tạo khi có dữ liệu cần ghi và giữ tối đa 54 bản cho mỗi loại. Dùng số lượng và lịch sử để xác minh trước khi xử lý vi phạm.','OnicSus checks on join/leave and on item actions such as pickups and inventory clicks. Logs are saved when a record needs writing and retain up to 54 snapshots per storage type. Review the counts and history before taking moderation action.')+
    heading('lich-su','Lịch sử túi đồ','Inventory history')+steps([
      ['Mở hồ sơ từ đầu người chơi, rồi chọn Inventory Log hoặc Ender Chest Log.','Open the record from the player head, then choose Inventory Log or Ender Chest Log.'],
      ['Di chuột lên bản lưu để xem thời gian và tọa độ. Bấm để xem vật phẩm tại mốc đó. Shift + click để dịch chuyển đến tọa độ đã lưu khi world khả dụng.','Hover a snapshot for the save time and coordinates. Click to view its items. Shift-click to teleport to the saved location when its world is available.']
    ])+heading('freeze','Freeze','Freeze')+
    paragraph('Dùng nút Freeze trong hồ sơ hoặc lệnh /sus freeze. Khi bật, plugin chặn di chuyển ngang, lệnh, tương tác, thả đồ và bấm inventory. Bấm nút lần nữa hoặc dùng /sus unfreeze để gỡ. Trạng thái Freeze được giữ trong bộ nhớ của phiên chạy server.','Use Freeze in the record or /sus freeze. While active, the plugin blocks horizontal movement, commands, interactions, item drops and inventory clicks. Toggle the button again or use /sus unfreeze to clear it. Freeze state is kept in memory for the current server run.')+
    heading('tich-hop','Tích hợp','Integrations')+table([t('Plugin','Plugin'),t('Cách dùng','Usage')],rows([
      ['AxVaults','Nút vault mở lệnh vaultadmin view. Staff cần quyền của AxVaults. Số vault của người online có thể lấy từ %axvaults_vault_count%.','The vault button runs vaultadmin view. Staff need AxVaults permissions. Online vault counts can come from %axvaults_vault_count%.'],
      ['AxInventoryRestore','Nút shulker chạy axinventoryrestore view bằng quyền của staff đang mở menu.','The shulker button runs axinventoryrestore view with the inspecting staff member’s permissions.'],
      ['PlaceholderAPI','%onicsus_status_freeze% hiển thị ON/OFF có màu cho người chơi đang được tra.','%onicsus_status_freeze% displays colored ON/OFF for the player context.']
    ])));

  page('config',t('Cấu hình','Configuration'),'{}',t('Chọn vật phẩm vanilla và custom để theo dõi.','Select vanilla and custom items to track.'),
    heading('vat-pham','Vật phẩm theo dõi','Tracked items')+
    paragraph('<code>tracked-items</code> khớp theo Material, kể cả khi item có tên hoặc lore riêng. Với <code>customitems</code>, đặt Material và thêm điều kiện tên, lore hoặc enchant nếu cần. Mỗi dòng lore cấu hình phải xuất hiện trong lore item và từng enchant đã liệt kê phải đúng cấp.','<code>tracked-items</code> matches by Material even when an item has a custom name or lore. For <code>customitems</code>, choose a Material and add name, lore or enchantment conditions as needed. Each configured lore line must be present and every listed enchantment must match its level.')+
    paragraph('Tên và lore được so khớp theo đoạn chữ. Dùng tên Material in hoa và enchant dạng <code>MENDING:1</code>. Sau khi lưu tệp, chạy <code>/sus reload</code>.','Names and lore use text containment. Use uppercase Material names and enchantments such as <code>MENDING:1</code>. Save the file and run <code>/sus reload</code>.')+
    heading('yaml','YAML mẫu','Sample YAML')+
    '<p><a href="assets/examples/onicsus/settings.yml" download>'+t('Tải settings.yml','Download settings.yml')+'</a></p>'+code('settings.yml',window.ONIC_SUS_SETTINGS));

  page('gallery',t('Ảnh trong game','In-game screenshots'),'▣',t('9 ảnh minh họa quy trình kiểm tra bằng OnicSus.','Nine screenshots illustrating the OnicSus review workflow.'),
    heading('item-checker','Item Checker','Item Checker')+gallery(onicSusImages.slice(0,4))+
    heading('ho-so','Hồ sơ và lịch sử','Records and history')+gallery(onicSusImages.slice(4,7))+
    heading('axvault-freeze','AxVault & Freeze','AxVault & Freeze')+gallery(onicSusImages.slice(7)));

  const wiki = docs.find(doc=>doc.id==='wiki');
  wiki.html = wiki.html.replace(/<a class="card[^"]*" href="#onicsus-home"[\s\S]*?<\/a>/g,
    card('onicsus-home','◈','OnicSus',t('Kiểm tra vật phẩm, lịch sử túi đồ và Freeze.','Inspect tracked items, inventory history and Freeze.')));
}

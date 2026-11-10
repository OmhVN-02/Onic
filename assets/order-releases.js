'use strict';
const orderReleases=[
  {number:181,date:'2026-07-17',version:'SolarOrder-1.0-R03',subtitle:'Shulker Box, Lang Refactor, KMBT Input & GUI Fixes',sections:[
    ['Nhập K, M, B, T','K, M, B, T input',[
      ['Nhập nhanh số lượng và giá bằng K (nghìn), M (triệu), B (tỷ), T (nghìn tỷ), ví dụ 100k = 100,000 và 1.5m = 1,500,000.','Enter quantities and prices with K (thousand), M (million), B (billion) and T (trillion), for example 100k = 100,000 and 1.5m = 1,500,000.'],
      ['Áp dụng cho Dialog của Java và Floodgate Form dành cho Bedrock/Geyser.','Available in Java dialogs and Floodgate forms for Bedrock/Geyser.']]],
    ['Thư mục ngôn ngữ','Language directory',[
      ['Chuyển messages.yml và vi_vn.json vào plugins/SolarOrder/lang/.','Moves messages.yml and vi_vn.json into plugins/SolarOrder/lang/.'],
      ['Rút gọn vi_vn.json từ 6,722 xuống 2,577 dòng, chỉ giữ khóa dịch vật phẩm, block, thực thể và phù phép.','Reduces vi_vn.json from 6,722 to 2,577 lines, retaining item, block, entity and enchantment translations.']]],
    ['Giao hàng bằng Shulker Box','Shulker Box delivery',[
      ['Đặt Shulker Box chứa vật phẩm vào GUI giao hàng; trích xuất đồ khớp đơn và trả hộp cùng đồ thừa về túi đồ.','Place a filled Shulker Box in the delivery GUI; matching contents are extracted and the box and excess items return to the inventory.'],
      ['Định giá Shulker Box bằng giá vỏ hộp cộng tổng giá vật phẩm bên trong theo cấu hình.','Values a Shulker Box as its shell price plus the configured value of its contents.']]],
    ['Sửa lỗi GUI','GUI fixes',[
      ['Sửa lỗi nhận một phần rồi đóng bằng ESC khiến vật phẩm vừa rơi ra vừa còn trong đơn.','Fixes partially collected items being dropped while also remaining in the order after closing with ESC.'],
      ['Sửa phân trang nhận hàng khi số stack vượt dung lượng trang.','Fixes collection pagination when item stacks exceed a page’s capacity.'],
      ['Đồng bộ âm thanh click trong Item Picker, Spawner, Enchantment, Potion và các menu chọn lựa.','Synchronizes click sounds across Item Picker, Spawner, Enchantment, Potion and other selection menus.'],
      ['Sửa ký hiệu tiền tệ lặp $$ và lỗi dịch thông báo.','Fixes duplicated $$ currency symbols and message translations.']]]]},
  {number:188,date:'2026-07-20',version:'SolarOrder-1.0-R04',subtitle:'Database Persistence & Safe GUI Close Update',sections:[
    ['Lưu dữ liệu giao và nhận hàng','Delivery and collection persistence',[
      ['Thêm bảng contributions và owner_collected; MySQL dùng so_contributions và so_owner_collected để lưu giao hàng và nhận hàng từng phần.','Adds contributions and owner_collected tables, named so_contributions and so_owner_collected in MySQL, for partial delivery and collection data.'],
      ['Tải lại dữ liệu từ database vào cache khi reload/khởi động lại, khắc phục mất dữ liệu đơn chưa hoàn thành.','Restores database data into cache on reload/restart, fixing data loss for unfinished orders.']]],
    ['Đóng GUI an toàn','Safe GUI closure',[
      ['Thêm cờ disabling để đóng GUI của người chơi online đồng bộ trực tiếp khi tắt plugin.','Adds a disabling flag to close online players’ GUIs synchronously inline during shutdown.'],
      ['Hoàn trả hoặc lưu vật phẩm đang trong GUI giao/nhận trước khi ngắt kết nối database.','Returns or persists items in delivery/collection GUIs before disconnecting the database.']]],
    ['Hoàn thiện bản R04','R04 improvements',[
      ['Nâng phiên bản lên 1.0-R04; sửa layout và nút Back/Next khi cập nhật đơn có nhiều vật phẩm.','Updates to 1.0-R04 and fixes layouts and Back/Next buttons for orders containing large item quantities.']]]]},
  {number:195,date:'2026-07-24',version:'SolarOrder-1.0-R05',subtitle:'Matrix GUI, Collect Custom Amount & Hotfix Update',sections:[
    ['Ma trận GUI','GUI matrices',[
      ['collect_items.yml, orders.yml và your_orders.yml hỗ trợ ma trận ký tự viết liền để tùy chỉnh bố cục, tương tự SolarElo.','collect_items.yml, orders.yml and your_orders.yml support contiguous character matrices for customizable layouts, similar to SolarElo.']]],
    ['Nhận số lượng tùy chọn','Custom collection amounts',[
      ['Thêm nút chiếc đe custom_amount để nhập số lượng cần nhận, hỗ trợ k, m, b, t.','Adds an anvil custom_amount button for entering collection quantities, supporting k, m, b and t.'],
      ['Thêm nút hoa hướng dương refresh để tải lại danh sách nhận hàng ngay trong GUI.','Adds a sunflower refresh button to reload collectible items without reopening the GUI.']]],
    ['Trả vật phẩm theo hướng nhìn','Line-of-sight item drops',[
      ['Khi trả vật phẩm do đầy túi hoặc khi thu hoạch, ném đồ về phía trước theo hướng mắt nhìn thay vì thả dưới chân.','Returned items, including inventory-full or collection drops, are thrown forward along the player’s view rather than dropped at their feet.']]]]},
  {number:200,date:'2026-07-30',version:'SolarOrder-1.0-R05',subtitle:'Libraries Upgrade, Performance & Design Revamp',sections:[
    ['Thiết kế menu','Menu design',[
      ['Tiêu đề GUI phân trang hiển thị ({currentPage}/{maxPages}) với kiểu chữ small caps.','Paginated GUI titles display ({currentPage}/{maxPages}) using small-caps styling.'],
      ['Bỏ kính lót dư ở hàng điều hướng; đặt Sắp xếp, Lọc và Làm mới sát nhau ở giữa.','Removes excess navigation-row fillers and groups Sort, Filter and Refresh in the center.']]],
    ['Sửa dupe và Adventure API','Duplication and Adventure API fixes',[
      ['Sửa lỗi lấy hết đồ rồi bấm Drop All; flushCollectPage() đồng bộ trạng thái đơn trước khi xử lý tiếp.','Fixes taking all items and then using Drop All; flushCollectPage() synchronizes order state before further processing.'],
      ['Thay PlainTextComponentSerializer bằng ItemUtils.toPlainText() để khắc phục IncompatibleClassChangeError và xung đột Adventure API trên Spigot/Paper/Folia.','Replaces PlainTextComponentSerializer with ItemUtils.toPlainText() to fix IncompatibleClassChangeError and Adventure API conflicts on Spigot/Paper/Folia.'],
      ['Ghi chú R05 đề cập phạm vi tương thích Spigot/Paper/Folia 1.16–1.21+.','The R05 release notes describe Spigot/Paper/Folia 1.16–1.21+ compatibility.']]]]},
  {number:203,date:'2026-08-01',version:'SolarOrder-1.0-R06',subtitle:'Security Anti-Dupe Patch & GUI Design Polish',sections:[
    ['Bảo vệ thao tác GUI','GUI interaction protection',[
      ['Chặn đổi tay phụ bằng phím F khi mở GUI, qua PlayerSwapHandItemsEvent và ClickType.SWAP_OFFHAND.','Blocks offhand swaps with F while a GUI is open through PlayerSwapHandItemsEvent and ClickType.SWAP_OFFHAND.'],
      ['Chặn phím hotbar 1–9 và các thao tác HOTBAR_SWAP, SWAP_WITH_CURSOR, COLLECT_TO_CURSOR trên slot GUI.','Blocks hotbar keys 1–9 and HOTBAR_SWAP, SWAP_WITH_CURSOR and COLLECT_TO_CURSOR actions on GUI slots.'],
      ['Các slot COLLECT_ITEMS chỉ cho rút vật phẩm, không cho đặt hoặc tráo đồ từ con trỏ/túi đồ vào.','COLLECT_ITEMS slots permit withdrawals only and reject inserting or swapping cursor/inventory items.']]]]},
  {number:205,date:'2026-08-02',version:'SolarOrder-1.0-R07',subtitle:'Deep Security Audit & Comprehensive Anti-Dupe Shield',sections:[
    ['Direct Pickup và con trỏ','Direct Pickup and cursor safety',[
      ['Trong COLLECT_ITEMS, bấm ô vật phẩm sẽ rút thẳng vào túi đồ thay vì cầm trên con trỏ.','Clicking an item in COLLECT_ITEMS sends it directly to the inventory instead of the cursor.'],
      ['Chặn các nút Anvil, Drop All, Refresh và chuyển trang khi con trỏ đang giữ vật phẩm.','Blocks Anvil, Drop All, Refresh and page controls while the cursor holds an item.'],
      ['Truy vấn freshOrder từ database trước khi cấp vật phẩm.','Queries freshOrder from the database before issuing items.']]],
    ['Hủy đơn, hết hạn và ngắt kết nối','Cancellation, expiration and disconnects',[
      ['cancelOrder và expireOrder chỉ hoàn tiền/trả đồ cho đơn đang OPEN để tránh xử lý lặp.','cancelOrder and expireOrder only refund/return items for OPEN orders to prevent repeated processing.'],
      ['Khi Disconnect/Kick, gọi forceCloseGUISync(player, session) để hoàn trả vật phẩm còn trong GUI.','On disconnect/kick, calls forceCloseGUISync(player, session) to return items remaining in the GUI.']]]]},
  {number:210,date:'2026-08-12',version:'SolarOrder-1.0-R08',subtitle:'Leaf startup fix',sections:[
    ['Khởi động plugin','Plugin startup',[
      ['Khắc phục lỗi nạp plugin trên fork Leaf.','Fixes plugin loading on the Leaf fork.']]]]},
  {number:239,date:'2026-10-04',version:'SolarOrder-1.0-R08',subtitle:'Sửa lỗi không tự động xóa đơn hết thời gian lưu',sections:[
    ['Dọn đơn đúng thời hạn','Timely order cleanup',[
      ['Sửa đơn hiển thị Xóa sau: 0m nhưng vẫn còn trong danh sách.','Fixes orders displaying Delete after: 0m while remaining in the list.'],
      ['Đơn hết hạn, đã hủy hoặc đã nhận hết hàng được xóa khi hết duration.expiration trong config.yml, tính từ thời điểm hết hạn công khai của đơn.','Expired, cancelled or fully collected orders are deleted after duration.expiration in config.yml, measured from the order’s public expiration time.'],
      ['Giữ lại đơn đã giao đủ nhưng người mua chưa nhận hàng.','Retains fully delivered orders whose items have not yet been collected by the buyer.'],
      ['Khi xóa đơn, dọn cả dữ liệu đóng góp và lịch sử nhận hàng; hỗ trợ SQLite và MySQL.','Deleting an order also removes contribution and collection records, with SQLite and MySQL support.']]]]}
].sort((a,b)=>b.date.localeCompare(a.date)||b.number-a.number);
for(const [docs,en] of [[window.SOLAR_DOCS,false],[window.ONIC_ENGLISH,true]]) {
  const t=(vi,english)=>en?english:vi;
  docs.push({id:'solarorder-changelog',product:'solarorder',group:t('CẬP NHẬT','UPDATES'),icon:'↻',title:'Changelog',updatedAt:'2026-11-10',lead:t('Tám DevLog SolarOrder, bản mới nhất ở trên.','Eight SolarOrder DevLogs, newest first.'),html:
    '<nav class="release-index" aria-label="'+t('Bản cập nhật','Updates')+'">'+orderReleases.map(release=>'<a href="#solarorder-changelog/devlog-'+release.number+'">#'+release.number+' · '+release.date.split('-').reverse().join('/')+'</a>').join('')+'</nav>'+
    orderReleases.map(release=>'<section class="release-card"><h2 id="devlog-'+release.number+'">'+esc(release.version)+'</h2><p class="release-meta">DevLog Plugins #'+release.number+' · <time datetime="'+release.date+'">'+release.date.split('-').reverse().join(' / ')+'</time></p><p>'+esc(en && release.number===239?'Expired-order retention cleanup fix':release.subtitle)+'</p>'+release.sections.map(([vi,english,items])=>'<h3>'+esc(t(vi,english))+'</h3><ul>'+items.map(([vi,english])=>'<li>'+esc(t(vi,english))+'</li>').join('')+'</ul>').join('')+'</section>').join('')});
  docs.find(doc=>doc.id==='solarorder-home').html+='<div class="file-index"><a href="#solarorder-changelog">Changelog →</a></div>';
}

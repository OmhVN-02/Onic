'use strict';
const kitsProduct=window.ONIC_PLUGINS.find(product=>product.id==='onickits');
Object.assign(kitsProduct,{version:'2.0.9',updatedAt:'2026-11-09'});
delete kitsProduct.status;
for(const [docs,en] of [[window.SOLAR_DOCS,false],[window.ONIC_ENGLISH,true]]) {
  const t=(vi,english)=>en?english:vi;
  const linkCards='<div class="cards">'+[
    ['setup','↓',t('Cài đặt','Installation'),t('Java 21, Paper/Folia và lần chạy đầu.','Java 21, Paper/Folia and first launch.')],
    ['commands','>_',t('Lệnh & quyền','Commands'),t('Kit, Ender Chest và quản trị.','Kits, Ender Chests and administration.')],
    ['menus','▣',t('Menu','Menus'),t('Bốn ảnh giao diện và cách sử dụng.','Four interface screenshots and usage.')],
    ['config','{}',t('Cấu hình','Configuration'),t('9 tệp YAML, lưu trữ và thông báo.','9 YAML files, storage and messages.')],
    ['api','◇','API',t('Lắng nghe và hủy sự kiện kit.','Listen for and cancel kit events.')]
  ].map(([id,icon,title,lead])=>card('onickits-'+id,icon,title,lead)).join('')+'</div>';
  const sourceNote='<p>'+t('Tài liệu đối chiếu bản 2.0.9: tên trong plugin.yml là <code>EthanKit</code>, tác giả Ethan, thư mục dữ liệu <code>plugins/EthanKit/</code>.','Documentation covers version 2.0.9: plugin.yml names the plugin <code>EthanKit</code>, by Ethan, with data in <code>plugins/EthanKit/</code>.')+'</p>';
  const home=docs.find(doc=>doc.id==='onickits-home');
  Object.assign(home,{updatedAt:'2026-11-09',lead:t('Kit CrystalPvP, Ender Chest, Kit Room và chia sẻ bộ trang bị.','CrystalPvP kits, Ender Chests, Kit Room and loadout sharing.'),html:
    '<div class="pills"><span class="pill">2.0.9</span><span class="pill">Java 21</span>'+platformBadges+'</div>'+sourceNote+
    '<h2 id="tinh-nang">'+t('Tính năng','Features')+'</h2><ul>'+[
      t('Lưu và tải kit cá nhân, kit Premium và bố cục Ender Chest.','Save and load personal kits, Premium kits and Ender Chest layouts.'),
      t('Kit Room theo danh mục, nhập đồ từ túi đồ, lưu và khôi phục trong trình chỉnh sửa.','Categorized Kit Room, inventory imports, save and reset controls in editors.'),
      t('Premade Kit cho bộ trang bị mặc định; chia sẻ kit bằng mã có thời hạn.','Premade Kit for a default loadout and expiring kit-sharing codes.'),
      t('Auto Kit khi hồi sinh/hạ gục, bật/tắt thông báo kit và giới hạn world.','Auto Kit on respawn/kills, configurable kit messages and world restrictions.'),
      t('Lưu trữ YAML, SQLite hoặc MySQL. Bản mẫu bật SQLite.','YAML, SQLite or MySQL storage. SQLite is enabled by default.')
    ].map(text=>'<li>'+text+'</li>').join('')+'</ul><h2 id="huong-dan">'+t('Hướng dẫn','Guides')+'</h2>'+linkCards});
  const page=(slug,title,icon,lead,html)=>docs.push({id:'onickits-'+slug,product:'onickits',group:t('HƯỚNG DẪN','GUIDES'),title,icon,lead,html,updatedAt:'2026-11-09'});
  page('setup',t('Cài đặt','Installation'),'↓',t('Chuẩn bị server và tạo kit đầu tiên.','Prepare your server and create your first kit.'),sourceNote+
    '<h2 id="yeu-cau">'+t('Yêu cầu','Requirements')+'</h2>'+table([t('Thành phần','Component'),t('Thông tin','Details')],[['Java','21'],['Server','Paper / Folia · API 1.21'],[t('Tên plugin','Plugin name'),'EthanKit 2.0.9']])+
    '<h2 id="cai-dat">'+t('Cài plugin','Install')+'</h2><ol>'+[
      t('Đặt JAR vào plugins/ rồi khởi động server. Kiểm tra EthanKit bật trong console.','Place the JAR in plugins/ and start the server. Check the console for EthanKit startup.'),
      t('Mở plugins/EthanKit/config.yml; bản mặc định dùng SQLite.','Open plugins/EthanKit/config.yml; the default configuration uses SQLite.'),
      t('Dùng /kit menu, chuột phải vào một kit để chỉnh sửa, nhập đồ từ túi đồ và bấm Save Kit.','Run /kit menu, right-click a kit to edit it, import your inventory and select Save Kit.'),
      t('Chuột trái vào kit hoặc dùng /kit load kit 1 để kiểm tra bộ đã lưu.','Left-click the kit or use /kit load kit 1 to test the saved loadout.')
    ].map(text=>'<li>'+esc(text)+'</li>').join('')+'</ol><h2 id="premade">Premade Kit</h2><p>'+t('Chuẩn bị bộ đồ, dùng <code>/kitadmin savepremadekit</code> để lưu kit mặc định; người chơi dùng <code>/kit premade</code>.','Prepare the loadout and run <code>/kitadmin savepremadekit</code> to save the default kit; players use <code>/kit premade</code>.')+'</p>'+
    '<h2 id="reload">Reload</h2><p>'+t('Dùng <code>/kitadmin reload</code> sau khi chỉnh cấu hình. Thay JAR hoặc đổi backend dữ liệu thì khởi động lại server.','Run <code>/kitadmin reload</code> after configuration edits. Restart the server after replacing the JAR or changing storage backends.')+'</p>');
  page('commands',t('Lệnh & quyền','Commands'),'>_',t('Lệnh và quyền được đối chiếu với bản 2.0.9.','Commands and permissions checked against version 2.0.9.'),
    '<h2 id="lenh">'+t('Lệnh','Commands')+'</h2>'+table([t('Lệnh','Command'),t('Tác dụng','Behavior')],[
      ['/kit menu · /k menu',t('Mở menu kit chính.','Open the main kit menu.')],
      ['/kit room',t('Mở Kit Room.','Open Kit Room.')],
      ['/kit premade',t('Trang bị kit mặc định. Bí danh: premadekit, default.','Equip the default loadout. Aliases: premadekit, default.')],
      ['/kit load &lt;kit|ec&gt; &lt;số&gt;',t('Tải kit hoặc Ender Chest đã lưu; ec còn có tên enderchest.','Load a saved kit or Ender Chest; ec also accepts enderchest.')],
      ['/kit edit &lt;kit|ec&gt; &lt;số&gt;',t('Mở trình chỉnh sửa kit hoặc Ender Chest.','Open a kit or Ender Chest editor.')],
      ['/kit copy &lt;số&gt; &lt;mã&gt;',t('Chép bộ từ mã chia sẻ vào số kit đích.','Copy a shared loadout into the destination kit number.')],
      ['/kit auto &lt;số|on|off&gt;',t('Chọn kit tự động hoặc bật/tắt Auto Kit.','Choose the automatic kit or toggle Auto Kit.')],
      ['/kit messages &lt;on|off&gt;',t('Bật/tắt thông báo trang bị kit.','Toggle kit equip messages.')],
      ['/kitadmin savepremadekit',t('Lưu trang bị hiện tại làm Premade Kit; cần người chơi.','Save the current loadout as Premade Kit; requires a player.')],
      ['/kitadmin reload',t('Nạp lại cấu hình và cache.','Reload configuration and caches.')]
    ])+'<h2 id="quyen">'+t('Quyền','Permissions')+'</h2>'+table([t('Quyền','Permission'),t('Mặc định','Default'),t('Tác dụng','Behavior')],[
      ['kits.kit_command','true',t('Truy cập /kit và /k.','Access /kit and /k.')],
      ['kits.premium','false',t('Truy cập kit Premium.','Access Premium kits.')],
      ['kits.admin','OP',t('Dùng /kitadmin và chỉnh Kit Room.','Use /kitadmin and edit Kit Room.')]
    ]));
  const screenshots=[['main-menu','Menu Kits','Kits menu'],['kit-room','Kit Room','Kit Room'],['kit-editor','Chỉnh sửa kit','Kit editor'],['ender-chest-editor','Chỉnh sửa Ender Chest','Ender Chest editor']];
  page('menus',t('Menu','Menus'),'▣',t('Các thao tác trong menu và hình ảnh thực tế.','Menu controls and in-game screenshots.'),
    '<h2 id="thao-tac">'+t('Thao tác','Controls')+'</h2>'+table([t('Menu','Menu'),t('Cách dùng','Usage')],[
      ['Kits',t('Chuột trái tải, chuột phải chỉnh sửa. Mẫu có 6 kit thường, 6 kit Premium và 3 Ender Chest.','Left-click to load and right-click to edit. The sample provides 6 normal kits, 6 Premium kits and 3 Ender Chests.')],
      ['Kit Room',t('Chọn danh mục, lấy đồ hoặc refill trang; quản trị viên bấm nút chỉnh sửa và đóng menu để lưu.','Choose a category, take items or refill the page; administrators use the edit button and close the menu to save.')],
      ['Kit Editor',t('Nhập đồ từ túi đồ, Save Kit, Reset Kit hoặc tạo mã chia sẻ.','Import inventory, Save Kit, Reset Kit or generate a sharing code.')],
      ['Ender Chest Editor',t('Nhập đồ, lưu Ender Chest hoặc khôi phục thay đổi chưa lưu.','Import items, save the Ender Chest or reset unsaved changes.')]
    ])+'<h2 id="hinh-anh">'+t('Hình ảnh','Screenshots')+'</h2><div class="cards screenshots">'+screenshots.map(([id,vi,english])=>'<figure class="card"><a href="assets/images/onickits/'+id+'.png" target="_blank" rel="noopener"><img src="assets/images/onickits/'+id+'.png" alt="'+t(vi,english)+'" loading="lazy"></a><figcaption>'+t(vi,english)+'</figcaption></figure>').join('')+'</div>');
  page('config',t('Cấu hình','Configuration'),'{}',t('9 tệp YAML trong plugins/EthanKit/.','9 YAML files in plugins/EthanKit/.'),
    '<h2 id="luu-tru">'+t('Lưu trữ','Storage')+'</h2><p>'+t('SQLite mặc định tạo kits.db và ender_chests.db. YAML có các tên type: yml, yaml, disk, file, legacy; MySQL dùng ip, port, db, user, pass. Tên mục dưới storage được tùy chỉnh.','SQLite defaults to kits.db and ender_chests.db. YAML accepts the types yml, yaml, disk, file and legacy; MySQL uses ip, port, db, user and pass. Section names under storage are customizable.')+'</p>'+
    '<h2 id="tuy-chinh">'+t('Tùy chỉnh chính','Main settings')+'</h2>'+table(['Key',t('Ý nghĩa','Meaning')],[
      ['storage.&lt;tên&gt;.enabled / type',t('Bật backend và chọn loại lưu trữ.','Enable a backend and choose its storage type.')],
      ['copy_kit_expiration.unit / time',t('Hạn mã chia sẻ; mẫu là seconds / 15.','Sharing-code expiry; defaults to seconds / 15.')],
      ['blocked_worlds',t('World bị chặn với các thao tác được plugin kiểm tra, gồm Auto Kit.','Blocked worlds for checked actions, including Auto Kit.')],
      ['kit_messages_disabled_entirely',t('Tắt toàn bộ thông báo trang bị kit khi true.','Disable all equip messages when true.')],
      ['kit_messages_receive_radius',t('Bán kính nhận thông báo; mẫu 50, -1 bỏ giới hạn khoảng cách.','Message radius; defaults to 50, or -1 for no distance limit.')],
      ['title / size / items',t('Tiêu đề, số ô và các nút menu.','Menu title, slot count and buttons.')],
      ['kit_button.normal_slots / premium_slots',t('Vị trí các nút kit thường/Premium.','Normal/Premium kit button positions.')],
      ['ender_chest_button.slots',t('Vị trí các nút Ender Chest.','Ender Chest button positions.')],
      ['text / type / sounds',t('Thông báo MiniMessage, kênh chat/action_bar/both và âm thanh.','MiniMessage text, chat/action_bar/both channels and sounds.')]
    ])+'<h2 id="tep">'+t('Tệp YAML','YAML files')+'</h2><p>'+t('categories.yml và premade_kit.yml trong bản cung cấp đang trống; tạo dữ liệu bằng GUI Kit Room và lệnh lưu Premade Kit.','The supplied categories.yml and premade_kit.yml are empty; populate them through the Kit Room editor and the Premade Kit save command.')+'</p><div class="file-index">'+window.ONIC_KITS_CONFIGS.map((f,i)=>'<a href="#onickits-config/file-'+i+'">'+esc(f.path)+'</a>').join('')+'</div>'+window.ONIC_KITS_CONFIGS.map((f,i)=>'<h2 id="file-'+i+'">'+esc(f.path)+'</h2><p><a href="assets/examples/onickits/'+f.path+'" download>'+t('Tải YAML','Download YAML')+'</a></p>'+(f.content.trim()?code(f.path,f.content):'<p>'+t('Tệp ban đầu trống.','Initially empty file.')+'</p>')).join(''));
  const hook='import dev.ethankit.kits.api.event.Events;\nimport dev.ethankit.kits.api.event.impl.load.KitLoadEvent;\n\npublic final class KitHooks {\n    public KitHooks() {}\n\n    @Events.Subscribe\n    public void onKitLoad(KitLoadEvent event) {\n        if (!event.player().hasPermission("myplugin.kits.load")) {\n            event.cancel();\n        }\n    }\n}';
  page('api','API','◇',t('API sự kiện riêng của EthanKit 2.0.9.','The custom event API in EthanKit 2.0.9.'),
    '<h2 id="phu-thuoc">'+t('Phụ thuộc','Dependency')+'</h2>'+code('plugin.yml','depend: [EthanKit]')+code('build.gradle.kts','dependencies {\n    compileOnly(files("libs/EthanKit.jar"))\n}')+
    '<h2 id="dang-ky">'+t('Đăng ký','Registration')+'</h2><p>'+t('API dùng <code>@Events.Subscribe</code> và đăng ký lớp listener có constructor public không tham số. Mỗi hàm nhận một KitsEvent cụ thể và trả void.','Use <code>@Events.Subscribe</code> and register a listener class with a public no-argument constructor. Each handler accepts one concrete KitsEvent and returns void.')+'</p>'+code('Java · onEnable','import dev.ethankit.kits.api.KitsAPI;\n\nKitsAPI.api().listeners().register(KitHooks.class);')+code('Java · KitHooks.java',hook)+
    '<p>'+t('Ví dụ yêu cầu quyền myplugin.kits.load khi tải kit. Đăng ký một lần khi plugin tích hợp bật; hệ thống này dùng registry sự kiện riêng, không dùng @EventHandler của Bukkit.','The example requires myplugin.kits.load when loading a kit. Register once when the integration enables; this API uses its own event registry rather than Bukkit @EventHandler.')+'</p>'+
    '<h2 id="su-kien">'+t('Sự kiện','Events')+'</h2>'+table([t('Nhóm','Group'),t('Các lớp','Classes')],[
      [t('Tải','Load'),'KitLoadEvent, EnderChestLoadEvent, PremadeKitLoadEvent'],
      [t('Chỉnh sửa','Edit'),'KitEditEvent, EnderChestEditEvent'],
      [t('Nhập đồ','Import'),'KitImportEvent, EnderChestImportEvent'],
      [t('Lưu','Save'),'KitSaveEvent, EnderChestSaveEvent'],
      ['Menu','KitMenuEvent, KitRoomMenuEvent, AutoKitEvent']
    ])+'<p>'+t('KitsEvent có player(); các sự kiện kế thừa CancellableEvent có cancel(), cancelled() và cancelled(boolean). KitLoadEvent có kit(); KitSaveEvent có kit(), contents(), copiedKit()/copied().','KitsEvent exposes player(); CancellableEvent subclasses expose cancel(), cancelled() and cancelled(boolean). KitLoadEvent has kit(); KitSaveEvent has kit(), contents() and copiedKit()/copied().')+'</p>');
  const wiki=docs.find(doc=>doc.id==='wiki');
  wiki.html=wiki.html.replace(/<a class="card[^\"]*" href="#onickits-home"[\s\S]*?<\/a>/,card('onickits-home','▣','OnicKits',t('Kit PvP, Ender Chest, menu và chia sẻ trang bị.','PvP kits, Ender Chests, menus and loadout sharing.')));
}

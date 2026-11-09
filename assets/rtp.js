'use strict';
// Product pages are added after the shared beginner overview has been assembled.
const rtpProduct={id:'solarrtp', name:'SolarRTP', version:'1.0', route:'solarrtp-home', icon:'⤨'};
const rtpProductIndex=window.ONIC_PLUGINS.findIndex(product=>product.id==='solarrtp');
if (rtpProductIndex===-1) window.ONIC_PLUGINS.push(rtpProduct);
else window.ONIC_PLUGINS[rtpProductIndex]=rtpProduct;
for (const [docs,en] of [[window.SOLAR_DOCS,false],[window.ONIC_ENGLISH,true]]) {
  const t=(vi,english)=>en?english:vi;
  const page=(slug,title,icon,lead,html)=>docs.push({id:'solarrtp-'+slug,product:'solarrtp',group:t('HƯỚNG DẪN','GUIDES'),icon,title,lead,html});
  const summary=t('Dịch chuyển ngẫu nhiên an toàn, chọn thế giới qua menu.','Safe random teleportation with world selection menus.');
  const home=docs.find(doc=>doc.id==='wiki');
  const productCard=card('solarrtp-home','⤨','SolarRTP',summary).replace('<span class="card-icon">⤨</span>','<span class="product-symbol" aria-hidden="true">⤨</span>');
  const productCards='<div class="cards plugin-cards">';
  if (!home.html.includes(productCards)) throw new Error('Product overview grid missing');
  home.html=home.html.replace(productCards,productCards+productCard);

  const sections=[
    [t('Giới thiệu','Overview'),[
      t('Tách chức năng dịch chuyển ngẫu nhiên từ SolarCore thành plugin riêng, dành cho Paper/Folia 1.21.11 và Java 21.','Random teleportation from SolarCore is available as a standalone plugin for Paper/Folia 1.21.11 and Java 21.'),
      t('Hỗ trợ <code>/rtp</code>, bí danh <code>/ertp</code>, <code>/rtp &lt;world&gt;</code>, <code>/rtp current</code> và <code>/solarrtp reload</code>.','Supports <code>/rtp</code>, <code>/ertp</code>, <code>/rtp &lt;world&gt;</code>, <code>/rtp current</code> and <code>/solarrtp reload</code>.')]],
    [t('Menu','Menus'),[
      t('Menu chính có Overworld, Nether và The End. Bấm vào nhóm để mở menu chọn các thế giới bên trong.','The main menu offers Overworld, Nether and The End. Select a group to view its worlds.'),
      t('Tùy chỉnh qua <code>gui/rtp-gui.yml</code> và <code>gui/worlds-gui.yml</code>, hỗ trợ nút quay lại và đóng menu.','Customize <code>gui/rtp-gui.yml</code> and <code>gui/worlds-gui.yml</code>, including back and close buttons.'),
      t('RTP nhanh qua <code>/rtp quick</code> hoặc nút trong GUI, dùng thế giới hiện tại, bỏ đếm ngược và thông báo/hiệu ứng, vẫn kiểm tra an toàn, cooldown và blacklist.','Quick RTP through <code>/rtp quick</code> or its menu button uses the current world without countdown or notification effects, while applying safety, cooldown and blacklist checks.')]],
    [t('Cấu hình','Configuration'),[
      t('Bật/tắt riêng title, subtitle, âm thanh, particle, chat và actionbar.','Control titles, subtitles, sounds, particles, chat and actionbar separately.'),
      t('Blacklist không phân biệt hoa/thường, chặn cả thế giới đang đứng và thế giới đích, áp dụng cho lệnh, GUI, RTP nhanh và API, kể cả OP.','The case-insensitive blacklist checks both source and destination worlds for commands, menus, quick RTP and API calls, including OP players.'),
      t('Kiểm tra địa hình nguy hiểm, world border và WorldGuard khi có tích hợp. Di chuyển lúc đếm ngược sẽ hủy RTP.','Checks dangerous terrain, world borders and WorldGuard regions when integrated. Moving during the countdown cancels RTP.')]],
    [t('Tải chunk','Chunk loading'),[
      t('Dùng NMS/Moonrise trên Paper/Folia 1.21.11, cache reflection và chuyển sang Paper async nếu không tương thích hoặc báo lỗi.','Uses NMS/Moonrise on Paper/Folia 1.21.11, caches reflection and falls back to Paper async on incompatibility or errors.'),
      t('Tải trước vùng kiểm tra 3x3 chunk, gộp yêu cầu cùng chunk. Có thể chỉnh ưu tiên, tạo chunk mới, timeout và bán kính tải trước đích.','Preloads a 3×3 search area and combines requests for the same chunk. Configure priority, generation, timeout and destination preload radius.'),
      t('Dịch chuyển bằng teleportAsync và scheduler theo entity/region.','Teleports through teleportAsync and entity/region scheduling.')]]
  ];
  const featureHtml=sections.map(([title,items],i)=>'<h2 id="feature-'+i+'">'+title+'</h2><ul>'+items.map(item=>'<li>'+item+'</li>').join('')+'</ul>').join('');
  const screenshots=[
    ['group-menu','Menu chọn nhóm thế giới','World group menu'],
    ['group-tooltip','Thông tin nhóm Overworld','Overworld group tooltip'],
    ['world-menu','Menu chọn thế giới','World selection menu'],
    ['world-tooltip','Thông tin thế giới, người chơi và độ trễ','World, player count and latency information']
  ];
  const gallery='<h2 id="hinh-anh">'+t('Hình ảnh','Screenshots')+'</h2><div class="cards screenshots">'+screenshots.map(([file,vi,english])=>{
    const path='assets/images/solarrtp/'+file+'.png';
    return '<figure class="card"><a href="'+path+'" target="_blank" rel="noopener"><img src="'+path+'" alt="'+t(vi,english)+'" loading="lazy"></a><figcaption>'+t(vi,english)+'</figcaption></figure>';
  }).join('')+'</div><h2 id="demo">'+t('Demo','Demo')+'</h2><figure class="card"><a href="assets/images/solarrtp/demo.gif" target="_blank" rel="noopener"><img src="assets/images/solarrtp/demo.gif" alt="'+t('Demo dịch chuyển SolarRTP','SolarRTP teleport demo')+'" width="720" height="381" loading="lazy" style="width:100%;height:auto"></a><figcaption>'+t('Demo khoảng 17 giây. Nhấn ảnh để mở GIF.','About 17 seconds. Click to open the GIF.')+'</figcaption></figure>';
  page('home',t('Tổng quan','Overview'),'⌂',summary,
    '<div class="pills"><span class="pill">1.0</span>'+javaBadge(21)+platformBadges+'</div><div class="hero-art product-hero"><div class="hero-caption">SOLARRTP<strong>'+t('Chọn thế giới.<br>Khám phá vùng đất mới.','Choose a world.<br>Explore new terrain.')+'</strong>Overworld · Nether · The End</div><img class="hero-shot" src="assets/images/solarrtp/group-menu.png" alt="'+t('Menu SolarRTP','SolarRTP menu')+'"></div><h2 id="bat-dau">'+t('Bắt đầu','Get started')+'</h2><div class="cards">'+card('solarrtp-setup','↓',t('Cài đặt lần đầu','First installation'),t('Java, cài JAR và thử dịch chuyển.','Java, installation and your first teleport.'))+card('solarrtp-commands','>_',t('Lệnh & quyền','Commands'),t('Lệnh RTP, chọn thế giới và reload.','RTP, world selection and reload.'))+card('solarrtp-config','{}',t('Cấu hình','Configuration'),t('Tra cứu và tải tệp YAML.','Browse and download YAML files.'))+card('solarrtp-changelog','↻','Changelog','DevLog Plugins #141')+'</div>'+featureHtml+gallery);
  page('setup',t('Cài đặt lần đầu','First installation'),'↓',t('Cài SolarRTP trên Paper/Folia 1.21.11 với Java 21.','Install SolarRTP on Paper/Folia 1.21.11 with Java 21.'),
    '<h2 id="cai-dat">'+t('Cài và kiểm tra','Install and verify')+'</h2><ol><li>'+t('Dừng server. Chọn bản JAR phù hợp với hệ điều hành của server.','Stop the server and select the JAR for its operating system.')+'</li><li>'+t('Đặt JAR trong plugins/ và khởi động server bằng Java 21 hoặc bản Java server yêu cầu.','Place the JAR in plugins/ and start the server with Java 21 or the Java version required by your server.')+'</li><li>'+t('Kiểm tra console và thư mục plugins/SolarRTP/.','Check the console and plugins/SolarRTP/.')+'</li><li>'+t('Chạy /rtp, chọn nhóm rồi chọn thế giới, đứng yên chờ dịch chuyển.','Run /rtp, select a group and world, then stand still until teleported.')+'</li></ol>'+code('Minecraft','/rtp\n/rtp current\n/solarrtp reload')+'<h2 id="worldguard">WorldGuard</h2><p>'+t('WorldGuard là tích hợp tùy chọn để kiểm tra vùng.','WorldGuard is optional for region checks.')+'</p>');
  page('commands',t('Lệnh & quyền','Commands'),'>_',t('Các lệnh SolarRTP 1.0.','SolarRTP 1.0 commands.'),
    '<h2 id="lenh">'+t('Lệnh','Commands')+'</h2>'+table([t('Lệnh','Command'),t('Tác dụng','Behavior')],[
      ['/rtp · /ertp',t('Mở menu chọn nhóm và thế giới.','Open group and world menus.')],
      ['/rtp &lt;world&gt;',t('Dịch chuyển ngẫu nhiên trong thế giới được chỉ định.','Randomly teleport within the specified world.')],
      ['/rtp current',t('RTP trong thế giới hiện tại.','RTP in the current world.')],
      ['/rtp quick',t('RTP nhanh trong thế giới hiện tại, vẫn kiểm tra an toàn và giới hạn.','Quick RTP in the current world with safety and limit checks.')],
      ['/solarrtp reload',t('Tải lại cấu hình, thông báo, âm thanh và GUI.','Reload configuration, messages, sounds and menus.')]])+
    '<h2 id="quyen">'+t('Quyền','Permissions')+'</h2>'+table([t('Quyền','Permission'),t('Tác dụng','Behavior')],[
      ['solarrtp.rtp.use',t('Dùng RTP, mặc định cho mọi người chơi.','Use RTP, granted by default to all players.')],
      ['solarrtp.rtp.bypass-cooldown',t('Bỏ cooldown, mặc định OP.','Bypass cooldown, OP by default.')],
      ['solarrtp.admin',t('Reload, mặc định OP.','Reload, OP by default.')]]));
  page('config',t('Cấu hình','Configuration'),'{}',t('Các tệp trong plugins/SolarRTP/.','Files in plugins/SolarRTP/.'),
    '<h2 id="tep">'+t('Tệp YAML','YAML files')+'</h2><p>'+t('Chỉnh YAML bằng dấu cách, lưu rồi dùng /solarrtp reload.','Indent YAML with spaces, save and run /solarrtp reload.')+'</p><div class="file-index">'+window.ONIC_RTP_CONFIGS.map((f,i)=>'<a href="#solarrtp-config/file-'+i+'">'+esc(f.path)+'</a>').join('')+'</div>'+window.ONIC_RTP_CONFIGS.map((f,i)=>configSection(f,i,'solarrtp')).join(''));
  page('changelog','Changelog','↻','SolarRTP-1.0 · 07 / 10 / 2026',
    '<section class="release-card"><h2 id="devlog-141">SolarRTP-1.0</h2><p class="release-meta">DevLog Plugins #141 · <time datetime="2026-10-07">07 / 10 / 2026</time></p>'+featureHtml.replace(/<h2 id="feature-(\d+)">/g,'<h3 id="release-feature-$1">').replaceAll('</h2>','</h3>')+'</section>');
}

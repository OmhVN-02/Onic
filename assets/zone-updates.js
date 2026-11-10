'use strict';
const zoneScreenshots=[
  ['main-menu','Menu RTP Queue','RTP Queue menu','main'],
  ['settings-dialog','Dialog cài đặt cá nhân','Personal settings dialog','dialog'],
  ['world-menu','Menu chọn thế giới','World selection menu','world'],
  ['invite-menu','Menu lời mời','Invitation menu','invite'],
  ['search-dialog','Dialog tìm người chơi','Player search dialog','dialog'],
  ['invite-player','Danh sách mời người chơi','Player invitation list','invite'],
  ['join-tooltip','Nút tham gia hàng chờ','Join queue button','main'],
  ['settings-tooltip','Nút mở cài đặt','Settings button','main'],
  ['selected-world-tooltip','Thế giới đã chọn','Selected world','main'],
  ['invite-request-tooltip','Nút yêu cầu lời mời','Invitation request button','main'],
  ['leave-tooltip','Nút rời hàng chờ','Leave queue button','main'],
  ['world-tooltip','Thông tin thế giới đích','Destination world details','world'],
  ['received-invites-tooltip','Xem lời mời đã nhận','View received invitations','invite'],
  ['search-player-tooltip','Tìm người chơi theo tên','Search players by name','invite'],
  ['refresh-tooltip','Làm mới danh sách người chơi','Refresh player list','invite']
];
const zoneDevlogs=[
  {number:208,date:'2026-08-03',version:'SolarRTPZone-1.3-R06',subtitle:'Paper Dialog System',sections:[
    ['Paper Dialog','Paper Dialog',[
      ['Dialog Settings UI dùng Paper Dialog API trên Paper 1.21.6+, cấu hình qua dialog_settings.yml.','Dialog Settings UI uses the Paper Dialog API on Paper 1.21.6+, configured through dialog_settings.yml.'],
      ['Tùy chỉnh tiêu đề, nhãn và màu trạng thái riêng từng nút; màu BẬT &#DDFF00&l và TẮT &#FF020B&l.','Customize titles, labels and per-button state colors: ON &#DDFF00&l and OFF &#FF020B&l.'],
      ['Dialog Search dùng ô nhập tên native của Minecraft Client, thay cho nhập bằng bảng hiệu.','Dialog Search uses a native Minecraft client name input instead of sign input.'],
      ['Tự nhận diện khả năng hỗ trợ, chuyển sang Chest GUI/Sign GUI khi Dialog không khả dụng.','Detects dialog support and falls back to Chest GUI/Sign GUI when unavailable.']]]]},
  {number:207,date:'2026-08-03',version:'SolarRTPZone-1.3-R06',subtitle:'Modular API, GUI File Splitting & Paper Adventure Migration',sections:[
    ['Sáu tệp GUI','Six GUI files',[
      ['Tách cấu hình sang gui/main_menu.yml, settings_menu.yml, select_player_menu.yml, select_player_gui.yml, invite_gui.yml và select_world_menu.yml; giữ tương thích với gui/gui.yml cũ.','Splits menus into gui/main_menu.yml, settings_menu.yml, select_player_menu.yml, select_player_gui.yml, invite_gui.yml and select_world_menu.yml; retains compatibility with the older gui/gui.yml.']]],
    ['Public API','Public API',[
      ['Cung cấp me.omhvn.solarRtpZone.api.SolarRtpZoneAPI với hàm tĩnh truy vấn hàng chờ, dữ liệu người chơi, combat và đếm ngược.','Exposes me.omhvn.solarRtpZone.api.SolarRtpZoneAPI with static queries for queues, player data, combat and countdowns.'],
      ['Bảy sự kiện Bukkit: PlayerJoinQueueEvent, PlayerLeaveQueueEvent, PlayerMatchFoundEvent, PlayerPreTeleportEvent, PlayerPostTeleportEvent, PlayerZoneEnterEvent và PlayerZoneLeaveEvent. JoinQueue, MatchFound và PreTeleport có thể hủy.','Seven Bukkit events: PlayerJoinQueueEvent, PlayerLeaveQueueEvent, PlayerMatchFoundEvent, PlayerPreTeleportEvent, PlayerPostTeleportEvent, PlayerZoneEnterEvent and PlayerZoneLeaveEvent. JoinQueue, MatchFound and PreTeleport support cancellation.']]],
    ['Adventure, PvP và reload','Adventure, PvP and reload',[
      ['Actionbar chuyển sang Paper Kyori Adventure player.sendActionBar, bỏ ChatMessageType, TextComponent và ChatColor của BungeeCord Chat API.','Actionbars migrate to Paper Kyori Adventure player.sendActionBar, removing BungeeCord Chat API ChatMessageType, TextComponent and ChatColor.'],
      ['Nhận diện PvpManager và JustCombat API (Deltura/Lowunity) qua reflection, khắc phục lỗi bytecode truncation trên Folia/Paper 1.21.','Detects PvpManager and JustCombat API (Deltura/Lowunity) through reflection, addressing bytecode truncation on Folia/Paper 1.21.'],
      ['Tự nạp mẫu YML UTF-8 có chú thích khi file chưa có hoặc rỗng; /rtpq reload áp dụng cấu hình động.','Loads commented UTF-8 YML defaults when files are missing or empty; /rtpq reload applies configuration changes.']]]]},
  {number:206,date:'2026-08-03',version:'SolarRTPZone-1.3-R06',subtitle:'Multi-GUI Split, Custom Countdowns & New PAPI Placeholders',sections:[
    ['Cấu trúc GUI ban đầu','Initial GUI split',[
      ['Đưa sáu giao diện main-menu, settings-menu, select-player-menu, select-player-gui, invite-gui, select-world-menu vào gui/gui.yml; giữ config.yml cho thiết lập lõi. Bản cập nhật #207 tiếp tục tách thành sáu tệp riêng.','Moves main-menu, settings-menu, select-player-menu, select-player-gui, invite-gui and select-world-menu into gui/gui.yml, leaving core settings in config.yml. Update #207 subsequently splits these into six files.']]],
    ['Đếm ngược','Countdowns',[
      ['countdown.rtpq-match: 8 giây; countdown.zone-match: 5 giây; countdown.title-display-seconds: 5 giây cuối hiển thị Title và âm thanh.','countdown.rtpq-match: 8 seconds; countdown.zone-match: 5 seconds; countdown.title-display-seconds: titles and sounds during the final 5 seconds.'],
      ['Thêm /rtpq zone countdown <name> <seconds> để lưu đếm ngược riêng từng vùng trong zones.yml.','Adds /rtpq zone countdown <name> <seconds> for per-zone countdowns stored in zones.yml.']]],
    ['Ghép trận và phản hồi','Matching and feedback',[
      ['Người chơi khác world vẫn có thể ghép trận; đích dùng thế giới đã chọn của Participant #1 cho cả hai.','Players in different worlds can match; both use Participant #1’s selected destination world.'],
      ['Bật/tắt qua /rtpq settings, /rtpq toggle hoặc /rtpq autojoin có thông báo BẬT/TẮT trên Actionbar và chat, kèm âm thanh.','Changes through /rtpq settings, /rtpq toggle or /rtpq autojoin show ON/OFF feedback in actionbar and chat, with sounds.']]],
    ['PlaceholderAPI','PlaceholderAPI',[
      ['%solarrtpzone_time% / %solarrtpzone_countdown% / %solarrtpzone_second%: số giây đếm ngược thực tế.','%solarrtpzone_time% / %solarrtpzone_countdown% / %solarrtpzone_second%: active countdown seconds.'],
      ['%solarrtpzone_zone_time% / %solarrtpzone_zone_countdown%: đếm ngược vùng người chơi đang đứng.','%solarrtpzone_zone_time% / %solarrtpzone_zone_countdown%: countdown for the player’s zone.'],
      ['%solarrtpzone_zone_time_<zoneName>% / %solarrtpzone_zone_countdown_<zoneName>%: đếm ngược đã cấu hình của vùng chỉ định.','%solarrtpzone_zone_time_<zoneName>% / %solarrtpzone_zone_countdown_<zoneName>%: configured countdown for a named zone.'],
      ['%solarrtpzone_p1_world% / %solarrtpzone_selected_world% / %solarrtpzone_match_world%: world người thứ nhất đã chọn.','%solarrtpzone_p1_world% / %solarrtpzone_selected_world% / %solarrtpzone_match_world%: Participant #1’s selected world.']]]]},
  {number:202,date:'2026-07-30',version:'SolarRTPZone-1.3-R06',subtitle:'RTP Void, Water & Lava Teleport Safety Fix',sections:[
    ['Nước, lava và khối nguy hiểm','Liquids and hazardous blocks',[
      ['Sửa việc chỉ dùng Block.isPassable(), vốn có thể coi nước/lava là đi qua được và chọn điểm đáp dưới đáy hồ.','Fixes reliance on Block.isPassable(), which may treat water/lava as passable and select lake-bottom landing points.'],
      ['Thêm isHazardousOrLiquid và kiểm tra cả hai khối thân/đầu y+1, y+2; chặn chất lỏng và khối gây hại.','Adds isHazardousOrLiquid and checks both body/head blocks at y+1 and y+2, rejecting liquids and harmful blocks.'],
      ['Bộ lọc gồm WATER, LAVA, BUBBLE_COLUMN, FIRE, SOUL_FIRE, MAGMA_BLOCK, CACTUS, CAMPFIRE, SOUL_CAMPFIRE, POWDER_SNOW, SWEET_BERRY_BUSH, WITHER_ROSE, POINTED_DRIPSTONE, LAVA_CAULDRON, WATER_CAULDRON, TRIPWIRE, NETHER_PORTAL, END_PORTAL.','The filter includes WATER, LAVA, BUBBLE_COLUMN, FIRE, SOUL_FIRE, MAGMA_BLOCK, CACTUS, CAMPFIRE, SOUL_CAMPFIRE, POWDER_SNOW, SWEET_BERRY_BUSH, WITHER_ROSE, POINTED_DRIPSTONE, LAVA_CAULDRON, WATER_CAULDRON, TRIPWIRE, NETHER_PORTAL and END_PORTAL.']]],
    ['Chống rơi void','Void and ledge safeguards',[
      ['hasSurroundingGround kiểm tra bốn khối lân cận x±1, z±1, yêu cầu ít nhất hai khối nền cứng.','hasSurroundingGround checks four neighbors at x±1, z±1 and requires at least two solid ground blocks.'],
      ['Sau 20 lần thử không có điểm đáp, quét quanh spawn thay vì cưỡng chế Y=64.0; vẫn không an toàn thì hủy trận với thông báo/âm thanh.','After 20 unsuccessful attempts, searches near spawn instead of forcing Y=64.0; cancels with feedback if no safe point is found.']]],
    ['Độ cao Nether và End','Nether and End height bounds',[
      ['Nether quét từ Y=120 xuống Y=32, tránh mái Bedrock Y≥124 và biển lava Y≤31.','Nether searches from Y=120 down to Y=32, avoiding the Bedrock roof at Y≥124 and lava seas at Y≤31.'],
      ['The End quét từ Y=120 xuống Y=10; chênh lệch độ cao giữa hai người không vượt quá 20 block.','The End searches from Y=120 down to Y=10; player landing heights differ by no more than 20 blocks.']]]]},
  {number:184,date:'2026-07-19',version:'SolarRTPZone-1.3-R05',subtitle:'Default World Auto-Select, Custom Dialog Config & Namespaced World Recognition',sections:[
    ['World mặc định','Default world',[
      ['Tự chọn world theo default-world trong config.yml; để trống sẽ lấy world đầu tiên trong region.yml. Người mới có thể ghép trận mà không phải chọn world thủ công.','Selects default-world from config.yml, or the first world in region.yml when empty. New players can match without manually selecting a world.'],
      ['Bỏ biểu tượng Barrier báo chưa chọn world.','Removes the Barrier icon reporting an unselected world.']]],
    ['Dialog tìm kiếm','Search dialog',[
      ['Thêm dialog.yml để chỉnh tiêu đề, mô tả, nhãn nhập liệu, nút Tìm kiếm/Hủy; có mặc định Eng/Vie theo language.','Adds dialog.yml for titles, descriptions, input labels and Search/Cancel buttons, with Eng/Vie defaults following language.'],
      ['Hỗ trợ màu legacy & và hex &#; Paper 1.21.6+ dùng Dialog, phiên bản không hỗ trợ dùng SignGUI dự phòng.','Supports legacy & and hex &# colors; Paper 1.21.6+ uses Dialog, with SignGUI fallback when unsupported.']]],
    ['Nhận diện world','World recognition',[
      ['Cập nhật matchWorld và resolveWorld để nhận dạng tên thường và namespaced key, ví dụ world và minecraft:overworld.','Updates matchWorld and resolveWorld to recognize plain names and namespaced keys such as world and minecraft:overworld.']]]]}
];
for(const [docs,en] of [[window.SOLAR_DOCS,false],[window.ONIC_ENGLISH,true]]) {
  const t=(vi,english)=>en?english:vi;
  const gallery=items=>'<div class="cards screenshots">'+items.map(([id,vi,english])=>'<figure class="card"><a href="assets/images/solarrtpzone/'+id+'.png" target="_blank" rel="noopener"><img src="assets/images/solarrtpzone/'+id+'.png" alt="'+esc(t(vi,english))+'" loading="lazy"></a><figcaption>'+esc(t(vi,english))+'</figcaption></figure>').join('')+'</div>';
  const overview=docs.find(doc=>doc.id==='solarrtpzone-home');
  overview.html+='<h2 id="menu">'+t('Menu & hình ảnh','Menus & screenshots')+'</h2>'+gallery(zoneScreenshots.filter(([id])=>['main-menu','settings-dialog','search-dialog','invite-menu'].includes(id)))+'<div class="cards">'+card('solarrtpzone-menus','▣',t('Xem toàn bộ menu','All menus'),t('15 ảnh và hướng dẫn các nút.','15 screenshots and button guidance.'))+card('solarrtpzone-changelog','↻','Changelog',t('DevLog #208, #207, #206, #202 và #184.','DevLogs #208, #207, #206, #202 and #184.'))+'</div>';
  const groups=[['main','Menu RTP Queue','RTP Queue menu','Dùng nút Searching để vào hàng chờ, Leave để rời; các nút còn lại mở cài đặt, chọn world và lời mời.','Use Searching to join and Leave to exit; the other buttons open settings, world selection and invitations.'],['dialog','Dialog','Dialogs','Cài đặt có Auto Join, Notify, Actionbar và Potion. Dialog Search nhận tên người chơi để tìm kiếm.','Settings offers Auto Join, Notify, Actionbar and Potion. Dialog Search accepts a player name.'],['world','Chọn thế giới','World selection','Bấm biểu tượng world để chọn thế giới đích. Thông tin hiện khi rê chuột lên nút.','Click a world icon to select a destination. Hover over a button for details.'],['invite','Lời mời','Invitations','Dùng Search Player để tìm theo tên, Invitations để xem lời mời đã nhận và Refresh để nạp lại danh sách.','Use Search Player to search by name, Invitations to view received invitations and Refresh to reload the list.']];
  docs.push({id:'solarrtpzone-menus',product:'solarrtpzone',group:t('HƯỚNG DẪN','GUIDES'),icon:'▣',title:t('Menu & hình ảnh','Menus & screenshots'),lead:t('Hình ảnh giao diện và thao tác của SolarRTPZone.','SolarRTPZone interfaces and controls.'),updatedAt:'2026-11-10',html:groups.map(([id,vi,english,viBody,enBody])=>'<h2 id="menu-'+id+'">'+t(vi,english)+'</h2><p>'+t(viBody,enBody)+'</p>'+gallery(zoneScreenshots.filter(item=>item[3]===id))).join('')});
  docs.push({id:'solarrtpzone-changelog',product:'solarrtpzone',group:t('CẬP NHẬT','UPDATES'),icon:'↻',title:'Changelog',lead:t('Lịch sử cập nhật, bản mới nhất ở trên.','Release history, newest first.'),updatedAt:'2026-11-10',html:'<nav class="release-index" aria-label="'+t('Bản cập nhật','Updates')+'">'+zoneDevlogs.map(release=>'<a href="#solarrtpzone-changelog/devlog-'+release.number+'">#'+release.number+' · '+release.date.split('-').reverse().join('/')+'</a>').join('')+'</nav>'+zoneDevlogs.map(release=>'<section class="release-card"><h2 id="devlog-'+release.number+'">'+esc(release.version)+'</h2><p class="release-meta">DevLog Plugins #'+release.number+' · <time datetime="'+release.date+'">'+release.date.split('-').reverse().join(' / ')+'</time></p><p>'+esc(release.subtitle)+'</p>'+release.sections.map(([vi,english,items])=>'<h3>'+esc(t(vi,english))+'</h3><ul>'+items.map(([vi,english])=>'<li>'+esc(t(vi,english))+'</li>').join('')+'</ul>').join('')+'</section>').join('')});
}

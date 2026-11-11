'use strict';
const toolDuelReleases={
  solartools:[
    {n:159,date:'2026-11-11',version:'1.0-C03',label:'SolarTool',title:'Sửa kích thước và hướng đào',titleEn:'Mining size and direction fixes',items:[
      ['Cho phép đặt size theo dạng 1x1, 1x3, 2x3, 3x3… trong cấu hình Drill, Shovel, Hoe và Multitool.','Configure size as 1x1, 1x3, 2x3, 3x3 and similar dimensions for Drill, Shovel, Hoe and Multitool.'],
      ['Với 1x3, khi nhìn ngang, mặt đào rộng 1 khối và cao 3 khối ở cả bốn hướng.','When mining horizontally with 1x3, the face is one block wide and three blocks high in all four directions.'],
      ['Với 3x3, khi nhìn ngang, mặt đào rộng 3 và cao 3. Khi nhìn xuống, vùng đào tạo rãnh rộng 3, dài 1 và sâu 3 khối.','When mining horizontally with 3x3, the face is three blocks wide and three blocks high. Looking down creates a trench three blocks wide, one block long and three blocks deep.'],
      ['Cấu hình cũ size: 3 vẫn tương đương 3x3.','The legacy setting size: 3 still means 3x3.']]},
    {n:158,date:'2026-11-11',version:'1.0-C03',label:'SolarTool',title:'Kích thước vùng đào và âm thanh công cụ',titleEn:'Mining dimensions and tool sounds',items:[
      ['Drill, Shovel, Hoe và Multitool hỗ trợ kích thước 1x1, 1x3, 2x2, 2x3, 3x3… Mỗi chiều từ 1 đến 64.','Drill, Shovel, Hoe and Multitool support sizes such as 1x1, 1x3, 2x2, 2x3 and 3x3. Each dimension ranges from 1 to 64.'],
      ['Bỏ giới hạn tối thiểu 3 và cơ chế ép kích thước thành số lẻ. Cấu hình cũ size: 3 vẫn tương đương 3x3.','Removes the minimum size of 3 and odd-number rounding. Existing size: 3 still means 3x3.'],
      ['Drill, Treechopper, Shovel, Hoe, Waterbucket, Rocket và Multitool có âm thanh riêng trong tool/*.yml. Có thể bật/tắt, chọn âm thanh, chỉnh âm lượng và cao độ.','Drill, Treechopper, Shovel, Hoe, Waterbucket, Rocket and Multitool have individual sound settings in tool/*.yml. Toggle playback or set the sound, volume and pitch.'],
      ['Hỗ trợ tên âm thanh Bukkit và khóa âm thanh từ resource pack. Drill mặc định phát tiếng Amethyst khi đào hợp lệ, kể cả 1x1.','Supports Bukkit sound names and resource-pack sound keys. Drill plays an amethyst sound by default on valid mining actions, including 1x1.']]},
    {n:180,date:'2026-07-16',version:'1.0-R09',title:'Config Refactor, GUI & Directional Mining',items:[
      ['Thêm /tool với quyền solartools.admin: GUI 27 ô, 3 hàng, click nhận bản sao mới kèm âm thanh. Bản R09 có 6 tool: Drill, TreeChopper, Shovel, Hoe, WaterBucket, MultiTool.','Adds /tool with solartools.admin: a 27-slot, three-row GUI gives a new copy with sound. R09 includes six tools: Drill, TreeChopper, Shovel, Hoe, WaterBucket and MultiTool.'],
      ['Tách từng tool sang tool/drill.yml, treechopper.yml, shovel.yml, hoe.yml, waterbucket.yml, multitool.yml; chứa display-name, enchantment-text, duration, size, enchantments và breakable-blocks. config.yml giữ UnBreakable, SoilBlocks và blacklist.','Splits tools into tool/drill.yml, treechopper.yml, shovel.yml, hoe.yml, waterbucket.yml and multitool.yml with display-name, enchantment-text, duration, size, enchantments and breakable-blocks. config.yml retains UnBreakable, SoilBlocks and blacklist.'],
      ['Drill, Shovel và MultiTool phá theo hướng nhìn: lên/xuống là mặt phẳng X–Z, nhìn ngang là X–Y hoặc Y–Z. Hoe luôn cày ngang.','Drill, Shovel and MultiTool follow the view: up/down uses X–Z; horizontal views use X–Y or Y–Z. Hoe always tills horizontally.']]},
    {n:189,date:'2026-07-21',version:'1.0-R10',title:'Uses Mode, Config Refactor & GUI',items:[
      ['Thêm expiration-mode: time hoặc uses. Uses trừ một lượt cho mỗi thao tác đào/chặt/cuốc/đặt nước; hết lượt tự xóa tool và gửi thông báo.','Adds expiration-mode: time or uses. Uses deducts one per mining/chopping/tilling/water action; exhausted tools are removed with feedback.'],
      ['Lore phân biệt số lượt còn lại và thời gian tự hủy. Mở rộng /givetools <tool> <player> [amount] [duration|uses], ví dụ /givetools drill Steve 1 500u hoặc uses:100.','Lore distinguishes remaining uses from expiration time. Extends /givetools <tool> <player> [amount] [duration|uses], for example /givetools drill Steve 1 500u or uses:100.'],
      ['Tab complete gợi ý 500u, 100u, uses:500 và uses:100; bỏ giá trị để dùng mặc định từ tool/*.yml.','Tab completion suggests 500u, 100u, uses:500 and uses:100; omit the value to use tool/*.yml defaults.']]},
    {n:194,date:'2026-07-24',version:'1.0-C01',title:'Infinite Rocket & Interactive GUI',items:[
      ['Thêm Amethyst Rocket bứt tốc Elytra không tiêu hao rocket thường; chỉnh power và cooldown-ms trong tool/rocket.yml. Vẫn áp dụng giới hạn thời gian/lượt dùng.','Adds Amethyst Rocket for Elytra boosts without consuming regular rockets; configure power and cooldown-ms in tool/rocket.yml. Time/use limits still apply.'],
      ['GUI Chest /tool ở bản C01 dùng tiêu đề small caps, đủ 7 tool; ô 20 chuyển time ↔ uses, ô 24 chọn preset bằng chuột trái/phải. Chọn thông số rồi click tool để nhận.','The C01 chest /tool GUI uses a small-caps title and seven tools; slot 20 switches time ↔ uses and slot 24 cycles presets with left/right clicks. Configure values, then click a tool.'],
      ['Cấp bằng /givetools rocket Steve 1 500u hoặc /givetools drill Steve 1 7d.','Give tools with /givetools rocket Steve 1 500u or /givetools drill Steve 1 7d.']]},
    {n:199,date:'2026-07-29',version:'1.0-C02',title:'Vanilla Water, GUI & Directional Mining',url:'https://github.com/OmhVN/SolarTools/commit/6ffc95a',items:[
      ['WaterBucket hỗ trợ waterlogging theo cơ chế vanilla cho slab, stair, trapdoor, fence và wall. Nước bốc hơi tại Nether/ultra-warm với tiếng fizz và hạt khói.','WaterBucket supports vanilla waterlogging for slabs, stairs, trapdoors, fences and walls. Water evaporates in Nether/ultra-warm worlds with fizz and smoke.'],
      ['GUI Admin /tool có tiêu đề small caps không in đậm, chọn chế độ và giá trị hết hạn tương tác.','The /tool admin GUI uses an unbolded small-caps title and interactive expiration mode/value controls.'],
      ['Giữ hai chế độ time/uses, cấu hình riêng tool/*.yml và đào theo hướng nhìn cho Drill, Shovel, MultiTool.','Includes dual time/uses expiration, per-tool tool/*.yml configuration and directional mining for Drill, Shovel and MultiTool.']]},
    {n:233,date:'2026-08-31',version:'1.0-C02',title:'Configurable Materials & MultiTool Forms',items:[
      ['Thêm material cho cả 7 tool trong tool/*.yml. Tool nhận từ /givetools, /tool và API đều dùng material đã cấu hình, không còn cố định Netherite.','Adds material to all seven tool/*.yml files. /givetools, /tool and the API use configured materials instead of hardcoded Netherite.'],
      ['MultiTool tự đổi cúp/rìu/xẻng/cuốc theo tier Wooden, Stone, Iron, Golden, Diamond hoặc Netherite; form-materials.pickaxe/axe/shovel/hoe cho phép ghi đè riêng từng dạng.','MultiTool derives pickaxe/axe/shovel/hoe forms for Wooden, Stone, Iron, Golden, Diamond or Netherite tiers; form-materials.pickaxe/axe/shovel/hoe can override each form.'],
      ['Rocket và WaterBucket giữ chức năng khi đổi item hiển thị. WaterBucket trừ lượt/xóa đúng tay chính hoặc tay phụ đang dùng.','Rocket and WaterBucket preserve functionality with custom display materials. WaterBucket consumes/removes the item from the hand actually used.'],
      ['Material sai hoặc không dùng làm item sẽ cảnh báo một lần mỗi reload rồi dùng mặc định; cấu hình cũ chưa có material vẫn hoạt động.','Invalid or non-item materials warn once per reload and use defaults; older configurations without material continue working.']]},
    {n:145,date:'2026-11-03',version:'1.0-C02',title:'MultiTool & Folia Cache Fix',items:[
      ['Sửa ConcurrentModificationException khi MultiTool đổi dạng trong tương tác và đào block. Tách lấy material gốc khỏi tạo cache từng dạng, tránh cập nhật lồng nhau trên cùng HashMap.','Fixes ConcurrentModificationException during MultiTool form changes on block interaction/mining. Separates base material lookup from per-form cache creation to avoid nested HashMap updates.'],
      ['Đồng bộ cache material và block cho phép phá trên Folia; bảo vệ khi nhiều người dùng đồng thời và khi reload cấu hình.','Synchronizes material and allowed-block caches on Folia, protecting concurrent players and configuration reloads.']]}
  ],
  solarduels:[
    {n:201,date:'2026-07-30',version:'1.0-R07',title:'Gradle Migration, Obfuscation Hardening & GUI Polish',items:[
      ['Sửa tiêu đề GUI và ký tự small caps trong gui/duel.yml, gui/queue.yml, gui/select_region.yml.','Fixes GUI titles and small-caps characters in gui/duel.yml, gui/queue.yml and gui/select_region.yml.'],
      ['Nút Decline trong gui/accept.yml với ACTION: DECLINE gửi đúng thông báo từ chối tới đối thủ.','The gui/accept.yml Decline button with ACTION: DECLINE sends correct rejection feedback to the opponent.'],
      ['Actionbar hướng dẫn rời hàng chờ bằng /queue leave.','Queue actionbar instructions use /queue leave.']]},
    {n:209,date:'2026-08-12',version:'1.0-R08',title:'Folia Multi-threading & Spectator Recovery',items:[
      ['Sửa kẹt Spectator sau trận hoặc /spec leave. Khôi phục GameMode.SURVIVAL; người tham gia duel trở về sảnh SpawnLocation. Xóa dữ liệu spectate khi trận hoặc thời gian loot kết thúc.','Fixes stuck Spectator mode after a match or /spec leave. Restores GameMode.SURVIVAL and returns duel participants to the SpawnLocation lobby. Clears spectator data at match/loot completion.'],
      ['Sửa Region Watchdog/Canvas Tick Freeze trong ArenaRegenManager khi /dd savemap hoặc reset arena.','Fixes ArenaRegenManager Region Watchdog/Canvas Tick Freeze during /dd savemap or arena reset.'],
      ['Đọc, xóa và đặt block được lập lịch theo chunk (cx, cz) trên region tương ứng bằng Bukkit.getRegionScheduler().run(plugin, world, cx, cz, ...), phục vụ Folia 1.21.4+.','Block reads, deletion and placement are scheduled per chunk (cx, cz) on its region using Bukkit.getRegionScheduler().run(plugin, world, cx, cz, ...), for Folia 1.21.4+.']]},
    {n:229,date:'2026-08-27',version:'1.0-R08',title:'Real Region Ping',items:[
      ['RegionPingManager đo latency từ server/proxy tới IP/Domain đại diện region; không phải ping riêng từ máy người chơi. Cấu hình IP:Port hoặc Hostname:Port tại SETTINGS.REGION-HOSTS trong config.yml.','RegionPingManager measures latency from server/proxy to representative region IPs/domains, not from individual players. Set IP:Port or Hostname:Port in config.yml under SETTINGS.REGION-HOSTS.'],
      ['gui/select_region.yml hiển thị %ping%, %region_ping%, %ping_color%: xanh dưới 80ms, vàng dưới 160ms, đỏ từ 160ms hoặc offline.','gui/select_region.yml shows %ping%, %region_ping% and %ping_color%: green below 80ms, yellow below 160ms, red at 160ms or offline.'],
      ['Thêm PlaceholderAPI %solarduels_region_ping% và %solarduels_region_ping_color%.','Adds PlaceholderAPI %solarduels_region_ping% and %solarduels_region_ping_color%.']]},
    {n:144,date:'2026-11-03',version:'1.0-R08',title:'Wand & Sound Compatibility Fix',items:[
      ['Sửa ClassCastException khi dùng wand chọn góc trên 1.21.11. Wand và lệnh quản trị dùng chung dữ liệu vùng; chặn thao tác khi sản phẩm chưa chạy hoặc đã dừng.','Fixes ClassCastException when selecting wand corners on 1.21.11. Wand and administration commands share selection data; interactions are blocked when the product is inactive.'],
      ['Sửa IncompatibleClassChangeError khi tra cứu Sound trên Paper/Folia 1.21.11, áp dụng cho bắt đầu/kết thúc trận, lên hạng và hàng chờ. Hỗ trợ Sound dạng enum cũ và interface mới.','Fixes Sound lookup IncompatibleClassChangeError on Paper/Folia 1.21.11 for match start/end, rank-up and queues. Supports both older enum and newer interface Sound APIs.']]}
  ]
};
for(const [product,releases] of Object.entries(toolDuelReleases)) {
  releases.sort((a,b)=>b.date.localeCompare(a.date)||b.n-a.n);
  for(const [docs,en] of [[window.SOLAR_DOCS,false],[window.ONIC_ENGLISH,true]]) {
    const name=product==='solartools'?'SolarTools':'SolarDuels';
    docs.push({id:product+'-changelog',product,group:en?'UPDATES':'CẬP NHẬT',title:'Changelog',icon:'↻',updatedAt:product==='solartools'?releases[0].date:'2026-11-10',lead:en?'Release history, newest first.':'Lịch sử cập nhật, bản mới nhất ở trên.',html:
      '<nav class="release-index" aria-label="DevLog">'+releases.map(r=>'<a href="#'+product+'-changelog/devlog-'+r.n+'">#'+r.n+' · '+r.date.split('-').reverse().join('/')+'</a>').join('')+'</nav>'+
      releases.map(r=>'<section class="release-card"><h2 id="devlog-'+r.n+'">'+(r.label||name)+'-'+r.version+'</h2><p class="release-meta">DevLog Plugins #'+r.n+' · <time datetime="'+r.date+'">'+r.date.split('-').reverse().join(' / ')+'</time></p><p>'+esc(en && r.titleEn ? r.titleEn : r.title)+'</p><ul>'+r.items.map(pair=>'<li>'+esc(pair[en?1:0])+'</li>').join('')+'</ul>'+(r.url?'<p><a href="'+r.url+'" target="_blank" rel="noopener">Commit 6ffc95a ↗</a></p>':'')+'</section>').join('')});
    docs.find(d=>d.id===product+'-home').html+='<div class="file-index"><a href="#'+product+'-changelog">Changelog →</a></div>';
  }
}

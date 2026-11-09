'use strict';

// Placeholder products are kept separate so each can grow into its own guide later.
const upcomingProducts = [
  {id:'solarworth', name:'SolarWorth', icon:'◇', image:'solarworth.png'},
  {id:'solarchat', name:'SolarChat', icon:'✉', image:'solarchat.png'},
  {id:'solarduels', name:'SolarDuels', icon:'⚔', image:'solarduels.png'},
  {id:'solarrtpzone', name:'SolarRTPZone', icon:'◎', image:'solarrtpzone.png'},
  {id:'solarcore', name:'SolarCore', icon:'✳', image:'solarcore.png'},
  {id:'solarafk', name:'SolarAFK', icon:'☾', image:'solarafk.png'},
  {id:'solarelo', name:'SolarElo', icon:'◆', image:'solarelo.png', width:1680, height:512},
  {id:'solarcrate', name:'SolarCrate', icon:'▣', image:'solarcrate.png', width:1929, height:1085},
  {id:'solartools', name:'SolarTools', icon:'⚒', image:'solartools.png'}
];
for (const product of upcomingProducts) {
  window.ONIC_PLUGINS.push({...product, route:product.id+'-home', status:'planned'});
}

for (const [docs,en] of [[window.SOLAR_DOCS,false],[window.ONIC_ENGLISH,true]]) {
  const t=(vi,english)=>en?english:vi;
  const home=docs.find(doc=>doc.id==='wiki');
  const cards=upcomingProducts.map(product=>{
    const path='assets/images/'+product.image;
    const logo='<span class="product-logo-frame"><img src="'+path+'" alt="'+product.name+'" width="'+(product.width||1920)+'" height="'+(product.height||1080)+'" loading="lazy"></span>';
    const status='<span class="product-status">'+t('Sắp cập nhật','Coming soon')+'</span>';
    return card(product.id+'-home',product.icon,product.name,t('Tài liệu sẽ được bổ sung.','Documentation will be added.'))
      .replace('<span class="card-icon">'+product.icon+'</span>',logo)
      .replace('<a class="card"','<a class="card planned"')
      .replace('</p>','</p>'+status);
  }).join('');
  const endOfCards='</div><h2 id="lo-trinh">';
  if (!home.html.includes(endOfCards)) throw new Error('Product grid boundary missing');
  home.html=home.html.replace(endOfCards,cards+endOfCards);

  for (const product of upcomingProducts) {
    docs.push({
      id:product.id+'-home', product:product.id, group:t('BẮT ĐẦU','GET STARTED'), icon:product.icon,
      title:t('Tổng quan','Overview'), lead:t('Tài liệu '+product.name+' sẽ được bổ sung tại đây.',product.name+' documentation will be added here.'),
      html:'<div class="pills"><span class="pill">'+t('Sắp cập nhật','Coming soon')+'</span></div>'+
        '<div class="hero-art"><span class="product-logo-frame"><img src="assets/images/'+product.image+'" alt="'+product.name+'" width="'+(product.width||1920)+'" height="'+(product.height||1080)+'"></span></div>'+
        '<h2 id="cap-nhat">'+t('Đang cập nhật','Coming soon')+'</h2><p>'+t('Chuyên mục đã sẵn sàng. Hướng dẫn và hình ảnh sẽ được bổ sung khi có nội dung.','This product section is ready. Guides and screenshots will be added when available.')+'</p>'
    });
  }

  const dependency='dependencies {\n    compileOnly(files("libs/SolarShards-1.3.jar"))\n}';
  const service='import com.OmhVN.solarshards.api.SolarShardsAPI;\nimport com.OmhVN.solarshards.api.SolarShardsProvider;\n\nSolarShardsAPI api = getServer().getServicesManager().load(SolarShardsAPI.class);\nif (api == null) api = SolarShardsProvider.getAPI();\nif (api == null) return;';
  const example='import com.OmhVN.solarshards.api.SolarShardsAPI;\nimport com.OmhVN.solarshards.api.SolarShardsProvider;\n\nplayer.getScheduler().execute(this, () -> {\n    SolarShardsAPI api = SolarShardsProvider.getAPI();\n    if (api == null) return;\n    api.addShards(player.getUniqueId(), 100L);\n    long balance = api.getShards(player.getUniqueId());\n    player.sendMessage(api.formatShards(balance) + " Shards");\n}, null, 1L);';
  const signatures='long getShards(UUID uuid);\nvoid setShards(UUID uuid, long amount);\nvoid addShards(UUID uuid, long amount);\nvoid takeShards(UUID uuid, long amount);\nboolean hasShards(UUID uuid, long amount);\nboolean canAddShards(UUID uuid, long amount);\nlong getMaxShards();\nvoid resetShards(UUID uuid);\nString formatShards(long amount);\nString formatShardsCompact(long amount);\nlong getTotalServerShards();\nCompletableFuture<Long> getShardsAsync(UUID uuid);\nCompletableFuture<Void> addShardsAsync(UUID uuid, long amount);\nCompletableFuture<Void> takeShardsAsync(UUID uuid, long amount);\nCompletableFuture<Void> setShardsAsync(UUID uuid, long amount);';
  docs.push({
    id:'solarshards-api', product:'solarshards', group:t('TÍCH HỢP','INTEGRATION'), icon:'◇', title:'API',
    lead:t('Tích hợp Java với SolarShards 1.3 qua service hoặc provider.','Integrate with SolarShards 1.3 through its Java service or provider.'),
    html:'<h2 id="cai-dat">'+t('Khai báo','Dependency')+'</h2>'+code('build.gradle.kts',dependency)+code('plugin.yml','softdepend: [SolarShards]')+
      '<p>'+t('Thêm JAR SolarShards vào libs của plugin tích hợp. Dùng depend nếu SolarShards là bắt buộc. Server cần cài SolarShards và plugin tích hợp cần tải sau SolarShards. Giữ đúng chữ hoa trong package com.OmhVN.solarshards.api.','Add the SolarShards JAR to the integration plugin’s libs folder. Use depend when SolarShards is required. Install SolarShards on the server and load your integration after it. Preserve the exact package casing com.OmhVN.solarshards.api.')+'</p>'+
      '<h2 id="service">'+t('Lấy API','Get the API')+'</h2>'+code('Java · onEnable',service)+
      '<p>'+t('Service hoặc provider có thể trả null khi SolarShards chưa bật hoặc đã tắt. Plugin tích hợp dùng API do SolarShards cung cấp tại thời điểm chạy.','The service or provider may return null before SolarShards starts or after it stops. Use the API supplied by the running SolarShards plugin.')+'</p>'+
      '<h2 id="so-du">'+t('Số dư','Balances')+'</h2>'+table([t('Phương thức','Method'),t('Tác dụng','Behavior')],[
        ['getShards(uuid)',t('Đọc số dư, trả 0 nếu chưa có dữ liệu. Có thể đọc database khi chưa có cache.','Read the balance, or 0 when no account data exists. May read the database on a cache miss.')],
        ['setShards(uuid, amount)',t('Đặt số dư, chuẩn hóa đầu vào từ 0 đến mức tối đa nếu có.','Set the balance, clamping the input to zero and the configured maximum when enabled.')],
        ['addShards(uuid, amount)',t('Cộng số dương, áp dụng hạn mức số dư.','Add a positive amount, applying the balance cap.')],
        ['takeShards(uuid, amount)',t('Trừ số dương khi tài khoản đủ Shards. Hàm trả void.','Deduct a positive amount when funds are sufficient. Returns void.')],
        ['hasShards(uuid, amount)',t('Kiểm tra có đủ số dư.','Check available funds.')],
        ['canAddShards(uuid, amount)',t('Kiểm tra cộng thêm có vượt trần hay không.','Check whether the amount fits within the balance cap.')],
        ['getMaxShards()',t('Đọc trần số dư từ cấu hình.','Read the configured balance cap.')],
        ['resetShards(uuid)',t('Đặt về số dư khởi tạo trong cấu hình.','Reset to the configured starting balance.')],
        ['formatShards(amount)',t('Định dạng số có phân cách hàng nghìn.','Format with thousands separators.')],
        ['formatShardsCompact(amount)',t('Định dạng số rút gọn.','Format a compact amount.')],
        ['getTotalServerShards()',t('Đọc tổng Shards từ database. Dữ liệu trong RAM chờ tự lưu có thể chưa được tính.','Read the database total. Unsaved in-memory changes may not be included.')]
      ])+'<p>'+t('getShards, setShards, addShards, takeShards và hasShards còn có overload nhận Player hoặc OfflinePlayer. Các hàm thay đổi trả void, nên việc gọi hàm chưa xác nhận giao dịch thành công. Sự kiện có thể hủy hoặc sửa số lượng.','getShards, setShards, addShards, takeShards and hasShards also accept Player or OfflinePlayer. Mutation methods return void. A method call alone does not confirm a successful transaction because events may cancel or change its amount.')+'</p>'+
      '<h2 id="vi-du">'+t('Ví dụ','Example')+'</h2><p>'+t('Ví dụ cộng 100 Shards cho người chơi. Gọi trong một JavaPlugin, với biến player là người nhận. Entity scheduler dùng được trên Paper và Folia.','Add 100 Shards to a player. Use this inside a JavaPlugin, with player referencing the recipient. The entity scheduler supports both Paper and Folia.')+'</p>'+code('Java',example)+
      '<h2 id="su-kien">'+t('Sự kiện','Events')+'</h2><p><code>com.OmhVN.solarshards.api.events</code></p>'+table([t('Sự kiện','Event'),t('Dữ liệu và thời điểm','Data and timing')],[
        ['ShardsAddEvent',t('Trước khi cộng, có thể hủy và sửa amount.','Before adding. Supports cancellation and amount changes.')],
        ['ShardsTakeEvent',t('Trước khi trừ, có thể hủy và sửa amount.','Before deducting. Supports cancellation and amount changes.')],
        ['ShardsSetEvent',t('Trước khi đặt, có thể hủy và sửa newShards.','Before setting. Supports cancellation and newShards changes.')],
        ['ShardsPayEvent',t('Lệnh chuyển tiền. Đọc payer, target, amount, tax, received và có thể hủy.','Payment command. Read payer, target, amount, tax and received, and cancel the payment.')],
        ['ShardsChangeEvent',t('Thông báo sau khi đổi số dư với oldShards, newShards và reason. Hủy sự kiện này không hoàn tác số dư trong bản đang đối chiếu.','Notification after a balance change, carrying oldShards, newShards and reason. Cancelling it does not roll back the balance in the reviewed implementation.')]
      ])+'<p>'+t('add, take và set có thể bị chặn bởi sự kiện trước thao tác. Khi tạo tài khoản mới qua add/set, nhánh hiện tại không phát ShardsChangeEvent.','add, take and set may be blocked by their pre-operation events. Creating an account through add/set does not currently emit ShardsChangeEvent.')+'</p>'+
      '<h2 id="async">Async</h2><p>'+t('getShardsAsync(uuid) đọc dữ liệu qua cache hoặc database bất đồng bộ. Các hàm thêm/trừ/đặt Async hiện chạy bản đồng bộ bằng CompletableFuture.runAsync, trong khi các sự kiện của thao tác là đồng bộ. Dùng thao tác thay đổi trên main thread của Paper hoặc entity thread của Folia như ví dụ trên. Future hoàn tất không phải cam kết database đã lưu xong.','getShardsAsync(uuid) reads from cache or asynchronously from the database. The Async mutation wrappers currently call synchronous methods through CompletableFuture.runAsync, while their events are synchronous. Run mutations on the Paper main thread or Folia entity thread as shown above. Future completion does not guarantee that database persistence has finished.')+'</p>'+
      '<h2 id="tham-chieu">'+t('Tham chiếu','Reference')+'</h2>'+code('SolarShardsAPI',signatures)
  });
  const shards=docs.find(doc=>doc.id==='solarshards-home');
  shards.html+='<h2 id="api-plugin">API</h2><p>'+t('Tích hợp số dư, cộng/trừ Shards và lắng nghe sự kiện từ plugin khác.','Integrate balances, Shards mutations and events into other plugins.')+'</p>'+card('solarshards-api','◇','API',t('Service, provider, phương thức và ví dụ Java.','Service, provider, methods and Java examples.'));
}

'use strict';
const beginnerProducts = [
  {id:'solarshop',name:'SolarShop',home:'bat-dau',setup:'cai-dat',folder:'SolarShop',java:21,config:'solarshop-config',command:'/solarshop'},
  {id:'solartpa',name:'SolarTPA',home:'solartpa-home',setup:'solartpa-setup',folder:'SolarTPA',java:21,config:'solartpa-config',command:'/tpa TenNguoiChoi'},
  {id:'solarshards',name:'SolarShards',home:'solarshards-home',setup:'solarshards-setup',folder:'SolarShards',java:21,config:'solarshards-config',command:'/shardsbal'},
  {id:'solarbounty',name:'SolarBounty',home:'solarbounty-home',setup:'solarbounty-setup',folder:'SolarBounty',java:25,config:'solarbounty-config',command:'/bounty'},
  {id:'solarquest',name:'SolarQuest',home:'solarquest-home',setup:'solarquest-setup',folder:'SolarQuest',java:21,config:'solarquest-config',command:'/quest'}
];
const javaBadge = version => '<a class="pill platform-badge" href="https://adoptium.net/installation/" target="_blank" rel="noopener"><span><img src="assets/images/java.svg" alt="" width="18" height="18"></span>Java '+version+'+</a>';
const productLogos={solarshop:'assets/images/solarshop-logo.png',solarshards:'assets/images/solarshards-logo.png'};
const productLogo=p=>productLogos[p.id]?'<span class="product-logo-frame"><img src="'+productLogos[p.id]+'" alt="'+p.name+'" width="1920" height="1080"></span>':'<span class="product-symbol" aria-hidden="true">'+(window.ONIC_PLUGINS.find(item=>item.id===p.id)||{}).icon+'</span>';
const productSummaries={solarshop:['Tạo cửa hàng và bán vật phẩm.','Create shops and sell items.'],solartpa:['Gửi yêu cầu dịch chuyển giữa người chơi.','Send teleport requests between players.'],solarshards:['Quản lý tiền tệ Shards.','Manage the Shards currency.'],solarbounty:['Tự động tăng tiền thưởng truy nã.','Build automatic player bounties.'],solarquest:['Nhiệm vụ, phần thưởng và bảng xếp hạng.','Quests, rewards and leaderboards.']};
const productFeatures={
  solarquest:[
    ['✎','Nhiệm vụ theo loại và độ khó','Quest categories and difficulty','Thu thập vật phẩm hoặc hạ mob; lọc theo loại và 4 mức Easy, Normal, Hard, Hardcore.','Collect items or kill mobs, with category filters and four difficulty levels.'],
    ['✓','Nhận và theo dõi qua menu','Accept and track through menus','Xem yêu cầu, thời hạn và thưởng trước khi nhận. Mỗi người có một nhiệm vụ đang làm.','Check requirements, time limits and rewards before accepting. Each player holds one active quest.'],
    ['$','Thưởng theo cấp nhiệm vụ','Tier-based rewards','Phát tiền, Shards bằng lệnh và kinh nghiệm trực tiếp; thêm lệnh thưởng cho từng tier.','Grant money and Shards through commands and experience directly, with extra commands per tier.'],
    ['↗','Điểm và bảng xếp hạng','Points and leaderboards','Hoàn thành nhiệm vụ để có điểm; xem bảng xếp hạng và hồ sơ người chơi trong game.','Earn points by completing quests and view in-game leaderboards and player profiles.'],
    ['◷','Chu kỳ và hạn mức','Renewal cycles and limits','Mặc định làm mới nhiệm vụ trống sau 7 ngày; hoàn thành 10 nhiệm vụ thì chờ 24 giờ.','By default, renew unclaimed tasks every seven days and wait 24 hours after ten completions.'],
    ['⚙','Lịch sử và tùy chọn cá nhân','History and personal settings','Xem nhiệm vụ đã làm, bật/tắt âm thanh, thông báo và gợi ý nhiệm vụ tiếp theo.','Review completed tasks and control sounds, broadcasts and suggestions for the next quest.']
  ],
  solarshop:[
    ['▦','Shop theo danh mục','Category shops','Sắp xếp mặt hàng thành nhiều danh mục và trang, để người chơi tìm nhanh đồ cần mua.','Organize items into categories and pages so players can find what they need.'],
    ['$','Nhiều loại tiền','Multiple currencies','Bán bằng Vault, PlayerPoints hoặc SolarShards; mỗi mặt hàng có thể chọn loại tiền riêng.','Sell with Vault, PlayerPoints or SolarShards. Choose a currency for each item.'],
    ['✓','Xác nhận số lượng','Quantity confirmation','Người chơi chọn số lượng trong menu xác nhận và có thể mua tiếp sau khi giao dịch hoàn tất.','Players choose a quantity in the confirmation menu and can continue shopping after checkout.'],
    ['◷','Giới hạn lượt mua','Purchase limits','Đặt hạn mức cho từng người hoặc toàn server, theo ngày, tuần, tháng hoặc vĩnh viễn.','Set per-player or server-wide limits that reset daily, weekly, monthly or never.'],
    ['◇','Spawner và phần thưởng','Spawners and rewards','Phát spawner qua SmartSpawner bằng ss-id, hoặc dùng lệnh để trao phần thưởng khác.','Deliver spawners through SmartSpawner with ss-id, or use commands for other rewards.'],
    ['⚙','Chỉnh menu theo ý bạn','Customize your menus','Chỉnh bố cục, tên, mô tả, âm thanh và thông báo; có trình chỉnh sửa danh mục trong game.','Customize layouts, names, lore, sounds and messages, with an in-game category editor.']
  ],
  solartpa:[
    ['⇄','Xin đến hoặc mời đến','Visit or invite','Dùng /tpa để xin đến chỗ người khác; /tpahere để mời họ đến chỗ bạn.','Use /tpa to request a visit, or /tpahere to invite another player to you.'],
    ['✓','Quản lý yêu cầu','Manage requests','Chấp nhận, từ chối hoặc hủy bằng lệnh, nút chat và menu danh sách yêu cầu.','Accept, deny or cancel requests using commands, chat buttons and the request-list menu.'],
    ['◷','Đếm ngược và hạn mức','Countdowns and limits','Tùy chỉnh thời gian chờ, hạn yêu cầu, cooldown và hạn mức gửi hằng ngày.','Configure teleport countdowns, request expiry, cooldowns and daily request limits.'],
    ['⚔','Chặn khi combat','Combat protection','Tích hợp PvPManager để chặn và hủy yêu cầu liên quan khi người chơi đang combat.','Integrate with PvPManager to block and cancel requests involving players in combat.'],
    ['◎','Tự chấp nhận có kiểm soát','Control auto-accept','Bật /tpauto khi cần; chết hoặc bị tag combat sẽ tắt tự chấp nhận và hủy yêu cầu liên quan.','Enable /tpauto when needed. Death or a combat tag disables it and cancels related requests.'],
    ['⚙','Tích hợp plugin khác','Plugin integrations','API cho phép plugin khác gửi, xử lý yêu cầu và kiểm tra trạng thái combat.','The API lets other plugins send and handle requests and check combat state.']
  ],
  solarshards:[
    ['◇','Tiền tệ Shards riêng','A dedicated Shards currency','Quản lý số dư riêng cho server, tùy chỉnh tên tiền, ký hiệu và số dư khởi đầu.','Manage a separate server currency with configurable name, symbol and starting balance.'],
    ['⇄','Chuyển tiền giữa người chơi','Player transfers','Người chơi chuyển Shards cho nhau; quản trị viên có thể cấu hình mức tối thiểu và thuế chuyển.','Players can transfer Shards, with configurable minimum amounts and transfer tax.'],
    ['⚙','Quản lý số dư','Balance administration','Quản trị viên dùng lệnh để cộng, trừ hoặc đặt số dư cho người chơi.','Administrators can add, remove or set player balances with commands.'],
    ['▦','Thanh toán SolarShop','SolarShop payments','SolarShop đọc số dư và trừ Shards trực tiếp qua API khi dùng currency: shards.','SolarShop reads and deducts balances through the API when using currency: shards.'],
    ['%','Hiện số dư bằng PAPI','Display balances with PAPI','Đưa số dư vào TAB hoặc scoreboard bằng PlaceholderAPI, với dạng số hoặc rút gọn.','Use PlaceholderAPI to show raw or formatted balances in TAB and scoreboards.'],
    ['◷','Lưu dữ liệu và thông báo','Storage and notifications','Tùy chỉnh lưu trữ, chu kỳ tự lưu, âm thanh và thông báo khi giao dịch.','Configure storage, automatic saving, sounds and transaction notifications.']
  ],
  solarbounty:[
    ['◷','Bounty tăng tự động','Automatic bounty growth','Tăng tiền thưởng truy nã theo thời gian sống online và số lần hạ gục hợp lệ.','Grow bounties through online survival time and eligible player kills.'],
    ['$','Nhận thưởng khi hạ mục tiêu','Earn rewards for kills','Killer hợp lệ nhận tiền qua Vault; bounty, thời gian sống và kills của nạn nhân được reset.','Eligible killers receive Vault payouts. The victim’s bounty, survival time and kills reset.'],
    ['↗','Kế thừa bounty','Inherit bounty','Mặc định cộng thêm 40% bounty nạn nhân vào bounty killer, ngoài phần thưởng kill cố định.','By default, add 40% of the victim’s bounty to the killer’s bounty, on top of the fixed kill bonus.'],
    ['▦','Bảng xếp hạng trong game','In-game leaderboard','Mở /bounty để xem bảng truy nã; tùy chỉnh bố cục menu bằng ma trận ký tự.','Open /bounty to view the leaderboard and customize its menu using a character matrix.'],
    ['↓','Giảm bounty khi offline','Offline bounty decay','Mặc định chờ 15 ngày offline, sau đó mỗi 24 giờ giảm 10% bounty còn lại; có thể tùy chỉnh.','By default, wait 15 offline days, then reduce the remaining bounty by 10% each day. These settings are configurable.'],
    ['✓','Giữ dữ liệu qua restart','Persist data across restarts','Lưu SQLite/MySQL, giữ khoản thưởng đang chờ; hỗ trợ nhập và hiển thị số tiền K/M/B/T.','Store data in SQLite/MySQL, retain pending payouts and use K/M/B/T money amounts.']
  ]
};
for (const [docs,en] of [[window.SOLAR_DOCS,false],[window.ONIC_ENGLISH,true]]) {
  const t=(vi,english)=>en?english:vi;
  const steps=items=>'<ol class="steps">'+items.map(([title,body])=>'<li><h3>'+title+'</h3><p>'+body+'</p></li>').join('')+'</ol>';
  const home=docs.find(doc=>doc.id==='wiki');
  home.subtitle=t('Bắt đầu cùng Onic','Get started with Onic');
  home.lead=t('Chọn plugin bạn đang dùng. Nếu cài lần đầu, mở hướng dẫn cài đặt trước rồi mới chỉnh cấu hình.','Choose your plugin. Start with installation, then move on to configuration.');
  home.html='<div class="beginner-intro"><strong>'+t('Mới làm server Minecraft?','New to Minecraft servers?')+'</strong><p>'+t('Bạn cần một server đang chạy, Java phù hợp và file plugin .jar. Mỗi hướng dẫn bên dưới chỉ rõ cần chuẩn bị gì và kiểm tra ra sao.','You need a running server, a suitable Java version and the plugin .jar file. Each guide explains what to prepare and how to check your setup.')+'</p></div><h2 id="plugins">'+t('Chọn sản phẩm','Choose a product')+'</h2><div class="cards plugin-cards">'+beginnerProducts.map(p=>card(p.home,(window.ONIC_PLUGINS.find(item=>item.id===p.id)||{}).icon||'◇',p.name,t(...productSummaries[p.id]))).join('')+'</div><h2 id="lo-trinh">'+t('Đọc theo thứ tự này','Follow this order')+'</h2>'+steps([
    [t('Cài đặt lần đầu','First installation'),t('Chọn sản phẩm → Cài đặt lần đầu. Kiểm tra Java, chép JAR và khởi động server.','Choose a product → First installation. Check Java, add the JAR and start your server.')],
    [t('Thử tính năng cơ bản','Try the basics'),t('Làm thử theo hướng dẫn trước khi thay nhiều tùy chọn. Mỗi plugin có một lệnh để kiểm tra.','Try the guide’s example before changing multiple settings. Each plugin has a command to check it works.')],
    [t('Chỉnh theo nhu cầu','Customize your setup'),t('Mở Cấu hình để tìm file cần sửa. PlaceholderAPI dành cho hiển thị; API dành cho người viết plugin.','Open Configuration to find the right file. PlaceholderAPI is for display text; API pages are for plugin developers.')]
  ]);
  for(const p of beginnerProducts){
    const icon=(window.ONIC_PLUGINS.find(item=>item.id===p.id)||{}).icon||'◇';
    home.html=home.html.replace('<span class="card-icon">'+icon+'</span>',productLogo(p));
  }
  for (const p of beginnerProducts) {
    const requirements=t('Java '+p.java+' trở lên là mức tối thiểu của plugin; server có thể yêu cầu bản cao hơn.','Java '+p.java+' or newer is the plugin minimum; your server may require a newer version.');
    const dependency={
      solarshop:t('Chọn loại tiền trước: SolarShards; PlayerPoints; hoặc Vault kèm plugin quản lý tiền như EssentialsX Economy. Vault chỉ làm cầu nối, không tự quản lý số dư. SmartSpawner chỉ cần khi bán spawner.','Choose a currency: SolarShards, PlayerPoints, or Vault with an economy plugin such as EssentialsX Economy. Vault connects plugins and does not store balances. SmartSpawner is needed only for spawner sales.'),
      solartpa:t('Có thể thử TPA cơ bản bằng hai người chơi. PvPManager là tùy chọn nếu muốn chặn dịch chuyển trong combat.','Use two players to try basic TPA. PvPManager is optional for blocking teleport requests during combat.'),
      solarshards:t('Có thể dùng Shards độc lập. Chỉ cài PlaceholderAPI nếu muốn hiển thị số dư trên TAB hoặc scoreboard; không cần bật Vault để dùng với SolarShop.','Shards can run on its own. Add PlaceholderAPI for TAB or scoreboard balances. Vault does not need to be enabled for SolarShop integration.'),
      solarbounty:t('Cài Vault và một plugin quản lý tiền nếu muốn killer nhận thưởng. Khi chưa có nơi trả tiền, khoản thưởng được giữ chờ xử lý.','Install Vault and an economy plugin to pay killers. Rewards remain pending when no payout provider is available.'),
      solarquest:t('Dùng bản phù hợp Paper/Folia 1.21.11 hoặc server của bạn. Thưởng tiền/Shards chạy qua lệnh: cần plugin kinh tế tương ứng và sửa commands.give_money / give_shard trong settings.yml. PlaceholderAPI chỉ cần khi hiển thị thời gian nhiệm vụ ngoài menu.','Use a build compatible with Paper/Folia 1.21.11 or your server. Money and Shards rewards run commands, so install the corresponding economy plugins and configure commands.give_money / give_shard in settings.yml. PlaceholderAPI is optional for displaying quest time outside the menus.')
    }[p.id];
    const expected={
      solarshop:t('Menu shop mở. Tiếp theo, làm theo Shop đầu tiên để tạo một mặt hàng và thử mua.','The shop menu opens. Next, follow First shop to create an item and test a purchase.'),
      solartpa:t('Thay TenNguoiChoi bằng tên người đang online. Người đó dùng /tpaccept để đồng ý; chờ hết đếm ngược để kiểm tra dịch chuyển.','Replace TenNguoiChoi with an online player’s name. That player runs /tpaccept; wait for the countdown and check the teleport.'),
      solarshards:t('Chat hiển thị số dư Shards. Nếu là tài khoản mới, số dư theo currency.starting-balance trong config.yml.','Chat shows your Shards balance. New accounts use currency.starting-balance from config.yml.'),
      solarbounty:t('Bảng xếp hạng bounty mở. Server mới có thể chưa có nhiều dữ liệu; thử /bounty info TenNguoiChoi để xem một người chơi.','The bounty leaderboard opens. A new server may have little data; try /bounty info TenNguoiChoi to inspect a player.'),
      solarquest:t('Menu nhiệm vụ mở. Rê chuột xem yêu cầu và thưởng, chọn một nhiệm vụ rồi xác nhận. Làm tiếp theo trang Nhiệm vụ đầu tiên.','The quest menu opens. Hover to check requirements and rewards, choose a task and confirm. Continue with Your first quest.')
    }[p.id];
    const html='<div class="pills">'+javaBadge(p.java)+platformBadges+'</div><h2 id="yeu-cau">'+t('1. Chuẩn bị','1. Prepare')+'</h2><p>'+requirements+'</p>'+table([t('Bạn đang chạy gì?','Your setup'),t('Chọn Java nào?','Which Java?')],[
      ['Paper 1.20–1.21.11',p.java===25?t('SolarBounty bản này cần Java 25 và server API 26.3; không dùng bản này trên nhánh 1.21.','This SolarBounty build needs Java 25 and server API 26.3; do not use it on 1.21.'):t('Java 21, với bản plugin tương thích server.','Java 21, with a plugin build compatible with your server.')],
      ['Paper / Folia 26.1+',t('Java 25. Riêng SolarBounty bản đang hướng dẫn nhắm API 26.3.','Java 25. This SolarBounty guide targets API 26.3.')]
    ])+'<p><a href="https://docs.papermc.io/paper/getting-started/" target="_blank" rel="noopener">'+t('Yêu cầu Java chính thức của PaperMC','Official PaperMC Java requirements')+' ↗</a> · <a href="https://adoptium.net/installation/" target="_blank" rel="noopener">'+t('Tải và cài Java','Download and install Java')+' ↗</a></p>'+steps([
      [t('Dùng hosting?','Using a hosting panel?'),t('Mở mục Startup / Java / Docker Image trong bảng quản lý, chọn bản Java server cần rồi lưu. Tên mục tùy nhà cung cấp.','Open Startup / Java / Docker Image in your panel, select the required Java version and save. Labels vary by host.')],
      [t('Chạy trên máy riêng?','Running your own machine?'),t('Cài Java từ liên kết bên trên. Mở terminal mới, nhập java -version và kiểm tra số phiên bản. Server phải dùng đúng Java đó trong lệnh khởi động.','Install Java using the link above. Open a new terminal and run java -version. Make sure the server start command uses that Java installation.')]
    ])+code(t('Terminal của máy chạy server','Server machine terminal'),'java -version')+'<h2 id="plugin-can-them">'+t('2. Plugin cần thêm','2. Extra plugins')+'</h2><p>'+dependency+'</p><h2 id="cac-buoc">'+t('3. Cài plugin','3. Install the plugin')+'</h2>'+steps([
      [t('Dừng server','Stop the server'),t('Nhấn Stop trên hosting hoặc nhập stop ở console. Chờ server dừng hẳn trước khi chép file.','Click Stop in your panel or enter stop in the console. Wait for the server to finish shutting down.')],
      [t('Chép file .jar','Upload the .jar file'),t('Mở thư mục plugins/ nằm cạnh file server .jar, rồi chép JAR '+p.name+' vào đó. Nếu cập nhật, thay JAR cũ để chỉ còn một bản.','Open plugins/ next to your server .jar and upload the '+p.name+' JAR. When updating, replace the old JAR so only one copy remains.')],
      [t('Khởi động và xem console','Start and check the console'),t('Nhấn Start. Kiểm tra không có lỗi khi bật '+p.name+' và thư mục plugins/'+p.folder+'/ đã được tạo.','Click Start. Check that '+p.name+' enables without errors and plugins/'+p.folder+'/ has been created.')]
    ])+'<h2 id="thu-lenh">'+t('4. Thử trong game','4. Try it in game')+'</h2>'+code(t('Lệnh trong chat','In-game chat'),p.command)+'<p>'+expected+'</p><h2 id="sua-config">'+t('5. Chỉnh cấu hình đầu tiên','5. Make your first configuration change')+'</h2>'+steps([
      [t('Tạo bản sao','Make a backup'),t('Sao chép thư mục plugins/'+p.folder+'/ ra chỗ khác trước khi sửa.','Copy plugins/'+p.folder+'/ somewhere safe before editing.')],
      [t('Chỉ sửa một tùy chọn','Change one setting'),t('Mở trang Cấu hình ở liên kết dưới, tìm đúng file và key. Key là tên tùy chọn nằm trước dấu hai chấm, ví dụ enabled: true.','Open Configuration below and find the file and key. A key is the setting name before a colon, for example enabled: true.')],
      [t('Lưu và kiểm tra lại','Save and check again'),t('Dùng khoảng trắng, không dùng Tab khi sửa YAML. Lưu file rồi khởi động lại server để áp dụng; thử lại lệnh ở bước 4.','Indent YAML with spaces, not tabs. Save the file, restart the server to apply it, then repeat step 4.')]
    ])+'<div class="wiki-cta"><a class="primary-cta" href="#'+p.config+'">'+t('Mở cấu hình','Open configuration')+' →</a>'+(p.id==='solarshop'?'<a href="#shop-dau-tien">'+t('Tạo shop đầu tiên','Create your first shop')+' →</a>':'')+'</div><h2 id="loi-thuong-gap">'+t('Nếu chưa chạy được','If it does not work')+'</h2>'+table([t('Hiện tượng','Symptom'),t('Cách kiểm tra','What to check')],[
      ['UnsupportedClassVersionError',t('Java đang chạy quá cũ. Kiểm tra Java của lệnh khởi động/hosting, không chỉ Java trên máy cá nhân.','The server Java is too old. Check the Java used by your startup command or hosting panel.')],
      [t('Không có thư mục cấu hình','Configuration folder missing'),t('Kiểm tra JAR nằm đúng plugins/ và xem lỗi đầu tiên liên quan plugin trong console khi khởi động.','Check that the JAR is in plugins/ and read the first plugin error in the startup console.')],
      [t('Không dùng được lệnh','Command does not work'),t('Kiểm tra plugin đã bật, gõ đúng lệnh và xem trang Lệnh & quyền. Nếu trùng lệnh, đọc hướng dẫn của sản phẩm.','Check the plugin is enabled, verify the command and read Commands & permissions. For command conflicts, see the product guide.')]
    ])+'<h2 id="tu-dien">'+t('Một vài từ thường gặp','Useful terms')+'</h2>'+table([t('Từ','Term'),t('Hiểu đơn giản','Plain meaning')],[
      ['Console',t('Màn hình log và nhập lệnh của server. Thường nhập lệnh không có dấu / ở đây.','The server log and command screen. Commands usually omit the leading / here.')],
      ['JAR',t('File .jar của plugin; chép vào plugins/, không giải nén.','The plugin .jar file. Place it in plugins/ without extracting it.')],
      ['GUI',t('Menu trong game, như cửa hàng hoặc danh sách yêu cầu.','An in-game menu, such as a shop or request list.')],
      ['YAML / key',t('File .yml chứa tùy chọn; key là tên tùy chọn, giá trị nằm sau dấu :.','A .yml configuration file; a key names the setting and its value follows the colon.')]
    ]);
    const existing=docs.find(doc=>doc.id===p.setup);
    if(existing){existing.html=html;existing.title=t('Cài đặt lần đầu','First installation');existing.lead=t('Làm lần lượt từ chuẩn bị Java đến lần chạy thử đầu tiên.','Go step by step from Java setup to your first working command.');}
    else docs.splice(docs.findIndex(doc=>doc.id===p.home)+1,0,{id:p.setup,product:p.id,group:t('BẮT ĐẦU','GET STARTED'),icon:'↓',title:t('Cài đặt lần đầu','First installation'),lead:t('Chuẩn bị, cài đặt và kiểm tra '+p.name+' theo từng bước.','Prepare, install and verify '+p.name+' step by step.'),html});
    const overview=docs.find(doc=>doc.id===p.home);
    const features='<h2 id="tinh-nang">'+t('Tính năng chính','Main features')+'</h2><ul class="product-features">'+productFeatures[p.id].map(([,viTitle,enTitle,viBody,enBody])=>'<li><strong>'+t(viTitle,enTitle)+'.</strong> '+t(viBody,enBody)+'</li>').join('')+'</ul>';
    overview.html='<div class="pills">'+javaBadge(p.java)+'</div>'+features+'<div class="beginner-intro"><strong>'+t('Lần đầu dùng '+p.name+'?','New to '+p.name+'?')+'</strong><p>'+t('Bắt đầu từ cài đặt. Chỉ chỉnh cấu hình sau khi plugin đã chạy và lệnh thử hoạt động.','Start with installation. Change settings once the plugin starts and its test command works.')+'</p><a class="beginner-link" href="#'+p.setup+'">'+t('Cài đặt từng bước','Step-by-step installation')+' →</a></div>'+overview.html;
    const config=docs.find(doc=>doc.id===p.config);
    config.html='<div class="beginner-intro"><strong>'+t('Chưa biết sửa file nào?','Not sure which file to edit?')+'</strong><p>'+t('Tìm tính năng muốn đổi trong bảng, mở đúng file trong plugins/'+p.folder+'/, rồi sửa một key mỗi lần. Các giá trị bên dưới là mẫu để tham khảo.','Find the feature in the table, open the matching file in plugins/'+p.folder+'/, then change one key at a time. Values below are examples.')+'</p><a href="#'+p.setup+'/sua-config">'+t('Xem cách sửa YAML lần đầu','How to edit your first YAML setting')+' →</a></div>'+config.html;
    const releaseIndex=docs.findIndex(doc=>doc.id===p.id+'-changelog');
    if(releaseIndex!==-1){
      const release=docs.splice(releaseIndex,1)[0];
      docs.splice(docs.findLastIndex(doc=>doc.product===p.id)+1,0,release);
    }
  }
}

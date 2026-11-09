const docsList = window.SOLAR_DOCS;
const gallery = [['main-menu','Menu chính'],['farm-shop','Danh mục Farm'],['confirm-amount','Xác nhận số lượng'],['confirm-spawner','Xác nhận spawner'],['shop-manager','Quản lý shop'],['category-editor','Chỉnh danh mục End']];
const shop = docsList.find(d=>d.id==='bat-dau');
shop.html += '<h2 id="anh-gui">Ảnh trong game</h2><div class="cards screenshots">'+gallery.map(([id,title])=>{
 const path='assets/images/solarshop/'+id+'.png';
 return '<figure class="card"><a href="'+path+'" target="_blank" rel="noopener"><img src="'+path+'" alt="'+title+'" loading="lazy"></a><figcaption>'+title+'</figcaption></figure>';
}).join('')+'</div>';
const tpa={id:'solartpa',name:'SolarTPA',version:'1.1',route:'solartpa-home',icon:'⇄'};
window.ONIC_PLUGINS.splice(2,0,tpa);
docsList[0].html=docsList[0].html.replace('<div class="cards plugin-cards">','<div class="cards plugin-cards">'+card(tpa.route,tpa.icon,tpa.name,'Dịch chuyển, lệnh, cấu hình và API.'));
const tpaFiles=window.ONIC_TPA_CONFIGS;
function tpaPage(id,title,icon,lead,html){ docsList.push({id:'solartpa-'+id,product:'solartpa',group:'HƯỚNG DẪN',icon,title,lead,html}); }
tpaPage('home','Tổng quan','⌂','Yêu cầu dịch chuyển giữa người chơi trên Paper và Folia.',
 '<h2 id="cai-dat">Cài đặt</h2><ol><li>Dừng server, đặt JAR SolarTPA 1.1 vào plugins/ rồi khởi động lại.</li><li>Kiểm tra console và các file trong plugins/SolarTPA/.</li><li>Dùng hai tài khoản thử /tpa và /tpahere.</li><li>Dùng /solartpa reload sau khi chỉnh cấu hình; thay JAR thì restart.</li></ol>'+
 '<h2 id="su-dung">Sử dụng</h2><p>/tpa xin đến chỗ người khác; /tpahere mời họ đến chỗ bạn. Người nhận có thể chấp nhận hoặc từ chối. PvPManager là hook tùy chọn; combat hoặc chết có thể hủy yêu cầu và tắt tpauto.</p>'+
 '<div class="cards">'+card('solartpa-commands','>_','Lệnh & quyền','Lệnh người chơi và quản trị.')+card('solartpa-config','{}','Cấu hình','8 YAML mặc định.')+card('solartpa-api','◇','API','Tích hợp Java và sự kiện.')+'</div>');
tpaPage('commands','Lệnh & quyền','>_','Lệnh của SolarTPA 1.1.',
 '<h2 id="lenh">Lệnh</h2>'+table(['Lệnh','Tác dụng'],[
 ['/tpa &lt;player&gt; / /tpa list','Xin dịch chuyển đến người chơi hoặc mở danh sách.'],['/tpahere &lt;player&gt;','Mời người khác đến bạn.'],
 ['/tpaccept [player|*]','Chấp nhận hoặc mở danh sách tùy cấu hình.'],['/tpdeny [player|*]','Từ chối yêu cầu.'],['/tpacancel [player]','Hủy yêu cầu đã gửi.'],
 ['/tptoggle [on|off]','Đổi nhận cả hai loại yêu cầu.'],['/tpatoggle / /tpaheretoggle','Đổi nhận riêng từng loại.'],['/tpauto','Đổi tự chấp nhận.'],
 ['/gui','Đổi tùy chọn GUI nếu gui.enabled và gui.command-enabled đều bật.'],['/solartpa reload','Tải lại cấu hình.']])+
 '<h2 id="quyen">Quyền</h2>'+table(['Quyền (mặc định OP)','Tác dụng'],[['solartpa.admin','Reload.'],['solartpa.cooldown.bypass','Bỏ cooldown.'],['solartpa.limit.bypass','Bỏ hạn mức.']])+
 '<h2 id="essentials">EssentialsX</h2><p>Dùng <code>/solartpa:tpa</code> hoặc <code>/essentials:tpa</code> để gọi rõ plugin khi lệnh trùng. /tp, /tphere và /tpaall không thuộc SolarTPA.</p>');
tpaPage('config','Cấu hình','{}','Tra cứu key, mặc định và tải YAML SolarTPA 1.1.',
 '<h2 id="tep">Chọn file</h2><div class="file-index">'+tpaFiles.map((f,i)=>'<a href="#solartpa-config/file-'+i+'">'+esc(f.path)+'</a>').join('')+'</div>'+
 '<h2 id="key">Key thường chỉnh</h2>'+table(['Key','Tác dụng'],[
 ['teleport.countdown','Thời gian chờ theo giây.'],['teleport.allowed-walk-range','Khoảng đi khi đếm ngược; -1 cho đi tự do.'],['teleport.safe-teleport','Kiểm tra chỗ đứng an toàn.'],
 ['request.expiration-time / cooldown','Hạn và cooldown theo giây.'],['request.daily-limit','Hạn theo cặp người gửi–nhận; -1 không giới hạn. Bộ đếm lưu trong RAM và xóa khi người gửi thoát.'],
 ['gui.enabled / open-list-on-accept / command-enabled','GUI xác nhận, ưu tiên danh sách và lệnh /gui.'],['boss-bar','Thanh hiển thị khi bật tpauto.'],
 ['blacklisted-worlds','Chặn yêu cầu từ/đến các thế giới được liệt kê.'],['messages.use-action-bar-only','Chỉ hiện ActionBar.'],['chunk-loading.timeout-ms / preload-radius','Timeout theo ms và bán kính tải trước.']])+
 tpaFiles.map((f,i)=>configSection(f,i,'solartpa')).join(''));
tpaPage('api','API','◇','Tích hợp Java qua Bukkit ServicesManager.',
 '<h2 id="phu-thuoc">Phụ thuộc</h2>'+code('build.gradle.kts','dependencies {\n    compileOnly(files("libs/SolarTPA-1.1-api.jar"))\n}')+code('plugin.yml','softdepend: [SolarTPA]')+
 '<p>Dùng depend nếu bắt buộc. Không đóng gói lại lớp API; server cần cài SolarTPA thật. Tạo API JAR bằng tác vụ apiJar nếu có mã nguồn.</p>'+
 '<h2 id="service">Lấy service</h2>'+code('Java','import org.bukkit.Bukkit;\nimport org.omhvn.solartpa.api.SolarTpaAPI;\nimport org.omhvn.solartpa.api.tpa.RequestResult;\n\nSolarTpaAPI api = Bukkit.getServicesManager().load(SolarTpaAPI.class);\nif (api == null) return;\nRequestResult result = api.sendRequest(sender, target);\nif (!result.isSuccess()) sender.sendMessage(result.name());')+
 note('Paper và Folia','Gọi thao tác thay đổi trạng thái từ main thread trên Paper hoặc entity scheduler của người thao tác trên Folia, không gọi từ async. Với accept/deny, tham số đầu là người nhận; cancel thì là người gửi.')+
 '<h2 id="methods">Phương thức</h2>'+code('SolarTpaAPI',"boolean isTpaEnabled(Player player);\r\n    void setTpaEnabled(Player player, boolean enabled);\r\n    boolean isTpaHereEnabled(Player player);\r\n    void setTpaHereEnabled(Player player, boolean enabled);\r\n    boolean isAutoAcceptEnabled(Player player);\r\n    void setAutoAcceptEnabled(Player player, boolean enabled);\r\n    RequestResult sendRequest(Player sender, Player target);\r\n    RequestResult sendHereRequest(Player sender, Player target);\r\n    boolean sendRequestForce(Player sender, Player target, boolean tpaHere);\r\n    RequestResult validate(Player sender, Player target, boolean tpaHere);\r\n    boolean acceptRequest(Player target, Player sender);\r\n    boolean acceptLatestRequest(Player target);\r\n    void acceptAllRequests(Player target);\r\n    boolean denyRequest(Player target, Player sender);\r\n    boolean denyLatestRequest(Player target);\r\n    void denyAllRequests(Player target);\r\n    boolean cancelRequest(Player sender, Player target);\r\n    void cancelAllOutgoingRequests(Player sender);\r\n    void cancelPendingTeleport(Player player);\r\n    boolean hasPendingRequest(Player target);\r\n    int getPendingRequestCount(Player target);\r\n    List<TpaRequest> getPendingRequests(Player target);\r\n    List<TpaRequest> getOutgoingRequests(Player sender);\r\n    Optional<TpaRequest> getRequest(Player sender, Player target);\r\n    boolean hasRequestTo(Player sender, Player target);\r\n    boolean hasPendingTeleport(Player player);\r\n    boolean isOnCooldown(Player sender, Player target);\r\n    long getRemainingCooldown(Player sender, Player target);\r\n    int getRemainingDailyLimit(Player sender, Player target);\r\n    int getRequestExpirationTime();\r\n    int getTeleportCountdown();\r\n    int getCooldownTime();\r\n    int getDailyLimit();\r\n    boolean isInCombat(Player player);\r\n    void cancelAllRequestsForPlayer(Player player);\r\n    boolean isWorldBlacklisted(String worldName);")+
 '<p>TpaRequest chứa UUID, loại yêu cầu và timestamp. Getter Player có thể trả null khi offline. sendRequestForce bỏ xác thực thường nhưng vẫn chặn combat/người chết và phát event yêu cầu.</p>'+
 '<h2 id="ket-qua">Kết quả</h2><p>SUCCESS nghĩa là gửi được, không phải đã dịch chuyển. Xử lý các trạng thái như INVALID_PLAYER, IN_COMBAT, ON_COOLDOWN, DAILY_LIMIT_REACHED, REQUEST_CANCELLED và các trạng thái khác qua RequestResult.</p>'+
 '<h2 id="events">Sự kiện</h2><p>Package: <code>org.omhvn.solartpa.api.events</code>.</p>'+table(['Sự kiện','Có thể hủy?'],[
 ['TPARequestEvent, TPAAcceptEvent, TPADenyEvent','Có'],['TPAToggleEvent, TPAutoToggleEvent','Có'],['TPACancelEvent, TPAExpireEvent','Không'],['TeleportCompleteEvent','Không; báo dịch chuyển hoàn tất.']]));
const shortTitles={'solarshop-config':'Cấu hình','solarshards-config':'Cấu hình','solarshards-home':'Tổng quan','smartspawner':'SmartSpawner','thu-muc':'Thư mục','cai-dat':'Cài đặt','giao-dien':'GUI','phat-hanh':'Checklist'};
for(const d of docsList) if(shortTitles[d.id]) d.title=shortTitles[d.id];

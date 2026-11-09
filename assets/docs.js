/* Public documentation only. Examples are illustrative; no server credentials. */
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function highlightYaml(text) {
  const mark = (kind,value) => '<span class="yaml-'+kind+'">'+esc(value)+'</span>';
  return text.split('\n').map(line => {
    const key = /^(\s*(?:-\s+)?)([\w.-]+)(:)(?=\s|$)/.exec(line);
    const prefix = key ? esc(key[1])+mark('key',key[2])+mark('punct',key[3]) : '';
    const rest = key ? line.slice(key[0].length) : line;
    const tokens = /"(?:\\.|[^"\\])*"|'(?:''|[^'])*'|(?:^|\s)#[^\n]*|\b(?:true|false|null)\b|(?<![\w.])-?\d+(?:\.\d+)?(?![\w.])/gi;
    let out = prefix, cursor = 0;
    for (const match of rest.matchAll(tokens)) {
      const value = match[0], trimmed = value.trimStart();
      const kind = trimmed.startsWith('#') ? 'comment' : /^["']/.test(trimmed) ? 'string' : /^(true|false|null)$/i.test(trimmed) ? 'literal' : 'number';
      out += esc(rest.slice(cursor,match.index)) + mark(kind,value);
      cursor = match.index + value.length;
    }
    return out + esc(rest.slice(cursor));
  }).join('\n');
}
const code = (label, value) => {
  const text = value.replace(/\r\n/g,'\n').trim();
  const yaml = /ya?ml/i.test(label) || /^(?:\s*)[\w.-]+:(?:\s|$)/m.test(text);
  return `<div class="code-block"><div class="code-header"><span>${esc(label)}</span><button class="copy" type="button" aria-label="Sao chép ${esc(label)}">Sao chép ⧉</button></div><pre><code>${yaml ? highlightYaml(text) : esc(text)}</code></pre></div>`;
};
const platformBadges = '<a class="pill platform-badge" href="https://papermc.io/software/paper/" target="_blank" rel="noopener"><span><img src="assets/images/paper.svg" alt="" width="16" height="16"></span>Paper</a><a class="pill platform-badge" href="https://papermc.io/software/folia/" target="_blank" rel="noopener"><span class="folia-mark"><img src="assets/images/folia.svg" alt="" width="16" height="16"></span>Folia</a>';
const note = (title, text, warning = false) => `<div class="callout ${warning ? 'warning' : ''}"><strong>${title}</strong>${text}</div>`;
const table = (headers, rows) => `<div class="table-wrap"><table><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const card = (id, icon, title, text) => `<a class="card" href="#${id}"><span class="card-icon">${icon}</span><strong>${title}<span>↗</span></strong><p>${text}</p></a>`;
window.SOLAR_DOCS = [
{id:'bat-dau',group:'BẮT ĐẦU',icon:'⌂',title:'Tổng quan',subtitle:'Một cửa hàng. Nhiều khả năng.',lead:'Từ chiếc shop đầu tiên đến hệ thống nhiều loại tiền. Hướng dẫn thực hành SolarShop cho quản trị viên Minecraft — bắt đầu nhỏ, cấu hình rõ, vận hành an toàn.',html:`
<div class="pills"><span class="pill">2.0-C05</span>${platformBadges}</div>
<div class="hero-art"><div class="hero-caption">HỆ THỐNG CỬA HÀNG MINECRAFT<strong>Shop của bạn.<br>Cách chơi của bạn.</strong>Vật phẩm · Shards · Spawner</div><img class="hero-shot" src="assets/images/solarshop/main-menu.png" alt="Menu chính SolarShop trong Minecraft" width="345" height="170"></div>
${note('Bạn đang đọc tài liệu cho bản nào?','SolarShop <b>2.0-C05</b>, gồm hook SolarShards và SmartSpawner. Tài liệu phản ánh mã nguồn đã build ngày 09/11/2026.')}
<h2 id="lo-trinh">Chọn điểm bắt đầu</h2><div class="cards">${card('cai-dat','01','Cài đặt lần đầu','Chuẩn bị server, plugin phụ thuộc và kiểm tra khởi động.')}${card('shop-dau-tien','02','Tạo shop đầu tiên','Một file YAML, một danh mục và một vật phẩm để thử.')}${card('solarshards','03','Thanh toán SolarShards','Dùng API trực tiếp, không cần lệnh trừ Shards.')}${card('smartspawner','04','Shop SmartSpawner','Bán spawner đúng dữ liệu API bằng ss-id.')}</div>
<h2 id="cach-doc">Lộ trình từ A–Z</h2><ol><li>Cài plugin và kiểm tra các file được tạo.</li><li>Tạo một danh mục nhỏ, thử bằng tài khoản không OP.</li><li>Thêm loại tiền, quyền và giới hạn theo nhu cầu.</li><li>Chỉnh giao diện, sao lưu rồi mới mở shop chính thức.</li></ol>
<h2 id="pham-vi">Khả năng & giới hạn</h2><p>SolarShop hỗ trợ menu danh mục, xác nhận số lượng, mua vật phẩm hoặc chạy lệnh, nhiều loại tiền và giới hạn mua cá nhân/toàn server.</p><p>Tài liệu không cung cấp JAR tải công khai, không cam kết tương thích mọi plugin kinh tế và không thay thế kiểm thử trên server thật.</p>`},
{id:'cai-dat',group:'BẮT ĐẦU',icon:'↓',title:'Cài đặt & nâng cấp',lead:'Cài đúng bản, khởi động sạch và kiểm tra một giao dịch trước khi đưa shop vào sử dụng.',html:`
<h2 id="yeu-cau">Chuẩn bị</h2>${table(['Thành phần','Cần chuẩn bị'],[['Server','Paper hoặc Folia phù hợp với bản JAR. Cấu hình mẫu hướng đến Minecraft 1.21.4+.'],['Java','Mã nguồn được build bằng Java 21. Nếu bản server yêu cầu Java mới hơn, dùng Java theo yêu cầu server.'],['JAR','JAR SolarShop từ nguồn phát hành của bạn.'],['Tiền tệ','Vault + economy provider, PlayerPoints hoặc SolarShards tùy shop.'],['Tùy chọn','SmartSpawner cho ss-id; PlaceholderAPI cho placeholder trong GUI và tiền custom.']])}
<h2 id="cac-buoc">Các bước cài</h2><ol class="steps"><li><h3>Dừng server hoàn toàn</h3><p>Không nạp JAR mới qua PlugManX hay Bukkit /reload.</p></li><li><h3>Chép các plugin cần dùng</h3><p>Đặt SolarShop vào <code>plugins/</code>. Thêm provider kinh tế nếu sử dụng Vault; riêng Vault không giữ số dư.</p></li><li><h3>Khởi động server</h3><p>SolarShop tạo thư mục cấu hình khi chạy. Xem console và tìm thông báo <code>SolarShop enabled</code>.</p></li><li><h3>Thử shop</h3><p>Dùng <code>/solarshop</code>, kiểm tra số dư trước/sau và vật phẩm nhận được. Kiểm tra lại bằng tài khoản không OP.</p></li></ol>
<h2 id="nang-cap">Nâng cấp từ C04</h2><p>Dừng server → sao lưu toàn bộ <code>plugins/SolarShop/</code> → thay duy nhất JAR SolarShop cũ bằng C05 → khởi động → kiểm tra giao dịch mẫu.</p>${note('Không ghi đè cấu hình hiện có','Các file mặc định thiếu được tạo khi chạy; không giả định mọi khóa mới tự chèn vào file cũ. So sánh tài liệu rồi thêm khóa cần dùng. Shop spawner cũ phải chuyển thủ công từ commands sang ss-id.')}
`},
{id:'thu-muc',group:'BẮT ĐẦU',icon:'▤',title:'Thư mục & cấu hình',lead:'Biết chính xác file nào điều khiển phần nào trước khi bắt đầu chỉnh sửa.',html:`
<h2 id="cau-truc">Cấu trúc sau lần chạy đầu</h2>${code('plugins/SolarShop/',`SolarShop/
├── config.yml
├── currency.yml
├── sounds.yml
├── lang/
│   ├── vi.yml
│   └── en.yml
├── gui/
│   ├── main-menu.yml
│   ├── category-menu.yml
│   ├── buy-confirm.yml
│   └── admin.yml
└── shop/
    ├── farm.yml
    └── shards.yml`)}<p>Cấu trúc trên lược bỏ file database và các danh mục mẫu khác. File shop thực tế nằm ở <code>shop/</code>, không chỉnh đường dẫn resource nội bộ <code>gui/shop/</code>.</p>
<h2 id="config-chinh">Cấu hình chính</h2>${code('config.yml — trích đoạn',`debug: false
language: vi
command-aliases:
  - shop
# Không dùng ss nếu muốn giữ /ss cho SmartSpawner.
messages:
  action-bar-messages: true
  chat-messages: false
  use-action-bar-only: true
  translate-item-names: true`)}
<h2 id="nguyen-tac-yaml">Quy tắc YAML</h2><ul><li>Dùng khoảng trắng, không dùng tab. Giữ cùng mức thụt lề trong một khối.</li><li>Đặt chuỗi màu <code>&amp;a</code>, <code>#AABBCC</code> hoặc nội dung có dấu <code>:</code> trong dấu nháy.</li><li>Không trùng tên khóa trong cùng một khối.</li><li>Sao lưu trước khi chỉnh. Khi báo lỗi, đọc cả tên file và dòng trong console.</li></ul>
<h2 id="reload">Khi nào reload, khi nào restart?</h2><p>Dùng <code>/solarshop reload</code> sau khi chỉnh shop, GUI, ngôn ngữ hoặc tiền tệ. Thay JAR, plugin phụ thuộc, Java hoặc database: dừng và khởi động lại server.</p>`},
{id:'shop-dau-tien',group:'XÂY DỰNG SHOP',icon:'▦',title:'Shop đầu tiên',lead:'Tạo một shop bán kim cương bằng Vault. Làm đủ hai phần: file danh mục và ký tự mở danh mục trong menu chính.',html:`
<h2 id="tao-file">1. Tạo danh mục</h2><p>Tạo <code>plugins/SolarShop/shop/tutorial.yml</code>. Tên file không có đuôi là ID danh mục: <code>tutorial</code>.</p>${code('shop/tutorial.yml',`main:
  name: '&aCửa hàng thử nghiệm'
  material: CHEST
  title: 'Cửa hàng thử nghiệm'
  lore:
    - '&7Nhấn để xem vật phẩm'

items:
  diamond:
    material: DIAMOND
    price: 100
    currency: vault
    max-amount: 64
    slots: 0`)}
<h2 id="noi-menu">2. Thêm vào menu chính</h2><p>Ví dụ bố cục tối giản dưới đây thay thế menu chính để thử nghiệm. Nếu giữ menu có sẵn, chọn một ký tự còn trống rồi bổ sung mapping, không xóa danh mục khác.</p>${code('gui/main-menu.yml',`config-version: "1.5"
title: 'SolarShop'
gui-disposition:
  - '#########'
  - '####a####'
  - '#########'
categories:
  a: tutorial
filler:
  enabled: true
  material: GRAY_STAINED_GLASS_PANE
  name: ' '`)}
<h2 id="thu-mua">3. Reload & thử mua</h2>${code('Lệnh trong game',`/solarshop reload
/solarshop open tutorial
/solarshop`)}<p>Với số dư ít nhất 100, mua 1 kim cương. Kỳ vọng số dư giảm 100 và nhận đúng 1 vật phẩm. Bán vật phẩm thông thường thì <strong>không khai báo commands</strong>; plugin sẽ phát trực tiếp.</p>${note('Nếu không có Vault','Dùng <code>currency: shards</code> với SolarShards đã bật, hoặc <code>currency: points</code> với PlayerPoints. Không dùng giá 0 để kiểm chứng việc trừ tiền. Giá 0 chỉ thử luồng phát hàng.')}`},
{id:'vat-pham',group:'XÂY DỰNG SHOP',icon:'◇',title:'Vật phẩm & lệnh',lead:'Hiểu sự khác nhau giữa vật phẩm được phát trực tiếp, phần thưởng bằng lệnh và spawner qua API.',html:`
<h2 id="truong">Các trường thường dùng</h2>${table(['Khóa','Ý nghĩa'],[['material','Tên Material của Minecraft, ví dụ DIAMOND, SPAWNER.'],['name / lore','Tên hiển thị và các dòng mô tả. Nếu bỏ name, có thể dịch tên vật phẩm theo client.'],['price / currency','Đơn giá và khóa tiền tệ trong currency.yml. Giá trong ví dụ là số, không phải chuỗi 1M.'],['max-amount','Số lượng tối đa cho một lượt chọn. Không thay thế giới hạn mua theo ngày.'],['slots','Vị trí vật phẩm trong danh mục, bắt đầu từ 0.'],['permission','Quyền cần có để mua mặt hàng. Cấp riêng cho nhóm phù hợp.'],['commands','Danh sách lệnh phát phần thưởng; không viết dấu / ở đầu.'],['ss-id','Tạo spawner qua SmartSpawner API; thay thế đường phát hàng bằng commands.']])}
<h2 id="vat-pham-thuong">Phát vật phẩm thông thường</h2>${code('shop/tutorial.yml — trong items',`  emerald:
    material: EMERALD
    name: '&aNgọc lục bảo'
    lore:
      - '&7Vật phẩm thử nghiệm'
    price: 50
    currency: vault
    max-amount: 64
    slots: 1`)}
<h2 id="thuong-lenh">Phần thưởng bằng lệnh</h2>${code('Ví dụ cho plugin crate — cần sửa theo plugin thực tế',`  common_key:
    material: TRIPWIRE_HOOK
    name: '&eChìa khóa thường'
    price: 500
    currency: shards
    max-amount: 1
    slots: 2
    commands:
      - 'crate give {player} common {amount}'`)}<p><code>{player}</code> được thay bằng tên người mua; <code>{amount}</code> và <code>{quantity}</code> là số lượng xử lý; <code>{price}</code> là tổng giá làm tròn. Với vật phẩm có nhiều commands, mỗi lệnh đều có thể được thực thi.</p>${note('Lệnh không phải giao dịch nguyên tử','Khi có commands, plugin không phát thêm vật phẩm material thông thường. Một lệnh chạy thất bại không đảm bảo tự hoàn tiền. Tránh lệnh trao quyền OP, nội dung không tin cậy hoặc nhiều lệnh trừ tiền. Đặt max-amount: 1 với phần thưởng chỉ nên nhận một lần mỗi lượt.',true)}
<h2 id="nhieu-trang">Danh mục nhiều trang</h2><p>Thay <code>items:</code> ở cấp gốc bằng <code>page1.items</code>, <code>page2.items</code>… Mã nguồn đọc tối đa 10 trang. Không trộn hai kiểu trong cùng file: khi có page1…page10, items cấp gốc không còn là luồng được dùng.</p>${code('shop/tutorial.yml — thay khối items',`page1:
  items:
    diamond:
      material: DIAMOND
      price: 100
      currency: vault
      slots: 0
page2:
  items:
    emerald:
      material: EMERALD
      price: 50
      currency: vault
      slots: 0`)}`},
{id:'tien-te',group:'XÂY DỰNG SHOP',icon:'$',title:'Tiền tệ & Vault',lead:'Mỗi vật phẩm chọn loại tiền bằng currency. Khóa này trỏ đến một mục trong currency.yml.',html:`
<h2 id="loai-tien">Các tích hợp trong bản C05</h2>${table(['Khóa ví dụ','Loại','Cách thanh toán'],[['vault','vault','Vault API, phải có economy provider và kết quả trừ thành công.'],['shards','solarshards','SolarShards API; khóa shards luôn dùng hook trực tiếp.'],['points','playerpoints','PlayerPoints API; giá nguyên trong khoảng int.'],['gems','custom','Số dư PlaceholderAPI + take-command. Không có receipt xác nhận.'],['token','excellenteconomy','Hook ExcellentEconomy; cần đúng currency ID của plugin đó.']])}
<h2 id="vault">Cấu hình Vault</h2>${code('currency.yml',`currencies:
  vault:
    type: vault
    name: Coins
    format: '\${amount}'
    price-color: '&a'
    unit-name: '$'
    unit-color: '&a'
  points:
    type: playerpoints
    name: Points
    format: '{amount} Points'
    price-color: '&b'
    unit-name: ' Points'
    unit-color: '&b'`)}<p>Đây là ví dụ tối giản, không thay cả file nếu bạn đã có shards hoặc tiền khác. <code>currency: points</code> dùng PlayerPoints trực tiếp. Tránh đổi tên các khóa có ý nghĩa tích hợp sẵn khi chưa kiểm thử.</p>
<h2 id="tien-custom">Tiền custom qua lệnh</h2>${code('currency.yml — bổ sung dưới currencies',`  gems:
    type: custom
    placeholder: '%gems_balance%'
    take-command: 'gems take {player} {price}'
    price-color: '&a'
    unit-name: ' Gems'
    unit-color: '&a'
    format: '{amount} Gems'`)}<p><code>%gems_balance%</code> và <code>gems take</code> chỉ là mẫu; phải đổi theo plugin tiền thực tế. Kiểm tra placeholder trả số, không phải nguyên tên placeholder. Sau đó đặt <code>currency: gems</code> cho mặt hàng.</p>${note('Cân nhắc trước khi dùng custom','Số dư có thể cập nhật trễ. Lệnh chạy không chứng minh đã trừ tiền; không có hoàn tiền tự động nếu phần thưởng lỗi. Ưu tiên API trực tiếp cho tiền có tích hợp sẵn.',true)}
<h2 id="excellent">ExcellentEconomy</h2><p>Tạo mục tiền có <code>type: excellenteconomy</code>, dùng khóa trùng currency ID bên ExcellentEconomy. Cần thử với phiên bản đang cài; tên gọi CoinsEngine trong chú thích cũ không phải cam kết mọi API cũ đều tương thích.</p>`},
{id:'solarshards',group:'TÍCH HỢP',icon:'✧',title:'SolarShards',lead:'Đọc số dư và trừ Shards trực tiếp qua SolarShardsProvider / SolarShardsAPI. Không cần chạy lệnh trừ Shards.',html:`
<h2 id="dieu-kien">Chuẩn bị SolarShards</h2><p>Cài và bật SolarShards trước SolarShop. C05 khai báo softdepend để hỗ trợ thứ tự tải. API cần cung cấp <code>getShards(UUID)</code>, <code>takeShards(UUID,long)</code> và <code>SolarShardsProvider.getAPI()</code>.</p>
<h2 id="cau-hinh-shards">Cấu hình</h2>${code('currency.yml — dưới currencies',`  shards:
    type: solarshards
    price-color: '&d'
    unit-name: ' Shards'
    unit-color: '&d'
    format: '{amount} Shards'`)}${code('Trong mục vật phẩm',`currency: shards
price: 200
max-amount: 1`)}
<h2 id="di-chuyen">Chuyển từ cấu hình cũ</h2><p>Vẫn dùng <code>currency: shards</code>. Nếu mục shards cũ còn <code>type: custom</code>, placeholder hoặc take-command, đường thanh toán Shards vẫn ưu tiên API và bỏ qua lệnh cũ. Có thể dọn lại file theo mẫu sau khi sao lưu.</p><p>Không thêm lệnh <code>shards take</code> vào commands phần thưởng; nếu còn, lệnh đó có thể khiến người chơi bị trừ thêm.</p>
<h2 id="xac-nhan">Kiểm tra kết quả</h2><ul><li>Giá phải là số nguyên không âm và nằm trong giới hạn long.</li><li>Thiếu SolarShards hoặc API chưa sẵn sàng: không giao hàng.</li><li>Đọc số dư trước/sau lời gọi takeShards; chỉ tiếp tục khi quan sát đúng khoản trừ.</li><li>Nếu không xác nhận được: không phát hàng, không thử trừ lại qua console.</li></ul>${note('Giới hạn xác nhận','API hiện tại trả void và có thể bị event hủy. Kiểm tra trước/sau không phải receipt hay transaction ID. Nếu plugin khác sửa cùng số dư đúng lúc, không thể đảm bảo tính nguyên tử toàn hệ sinh thái. Kiểm tra thực tế trước khi mở shop lớn.',true)}
<h2 id="kiem-thu-shards">Bài thử trước khi mở bán</h2><ol><li>Mua khi đủ tiền: số dư giảm đúng và nhận đủ hàng.</li><li>Mua khi thiếu tiền: không bị trừ và không nhận hàng.</li><li>Nếu có plugin hủy event trừ Shards, thử trường hợp bị hủy.</li><li>Thử lại sau restart và xác nhận không còn lệnh trừ trùng.</li></ol>`},
{id:'smartspawner',group:'TÍCH HỢP',icon:'⬡',title:'SmartSpawner · ss-id',lead:'Bán spawner đúng dữ liệu SmartSpawner bằng API, thay vì phụ thuộc cú pháp lệnh give.',html:`
<h2 id="spawner-mau">Một mục spawner hoàn chỉnh</h2>${code('shop/shards.yml — trong items',`  zombie_spawner:
    material: SPAWNER
    name: '&dZombie Spawner'
    lore:
      - '&7Spawner được tạo qua SmartSpawner API'
    ss-id: zombie
    currency: shards
    price: 200
    max-amount: 1
    slots: 9`)}
<h2 id="id">ss-id nhận giá trị gì?</h2><ul><li>Tên mob: <code>zombie</code>, <code>cow</code>, <code>iron_golem</code>, <code>zombified_piglin</code>.</li><li>Dạng namespace: <code>minecraft:zombie</code>.</li><li>ID một spawner đã đăng ký: tra qua <code>getSpawnerById</code> để tạo vật phẩm mới cùng loại. Đây không phải lệnh di chuyển spawner gốc.</li></ul>${note('Không sao chép dữ liệu spawner đã đặt','ID đã đăng ký chỉ dùng để lấy loại mob hoặc loại item spawner. Kho đồ, XP, vị trí và các thuộc tính tùy chỉnh khác của spawner gốc không được sao chép.')}
<h2 id="doi-give">Chuyển từ lệnh give</h2><p>Xóa danh sách commands phát spawner trong mục đó và thêm <code>ss-id</code>. Giá, currency và giới hạn vẫn giữ. Khi có ss-id, <strong>danh sách commands của mặt hàng bị bỏ qua</strong>; không đặt các phần thưởng bổ sung ở đó.</p>${code('Trước',`commands:
  - 'smartspawner give spawner {player} Zombie {amount}'`)}${code('Sau',`ss-id: zombie`)}
<h2 id="an-toan">Trước khi trừ tiền</h2><p>SolarShop kiểm tra plugin SmartSpawner đang bật, tạo được vật phẩm SPAWNER qua API và túi đồ đủ chỗ. Nếu ID không hợp lệ hoặc API không tương thích, giao dịch dừng trước thanh toán.</p><p>Shop mẫu mới đã dùng ss-id; file shop đang chạy không tự chuyển đổi. Thử mua một spawner, đặt xuống và xác nhận SmartSpawner nhận đúng loại.</p>
<h2 id="tai-lieu-api">Tham khảo</h2><p><a href="https://docs.smartspawner.site/developer-api/creation" target="_blank" rel="noopener">API tạo vật phẩm</a> · <a href="https://docs.smartspawner.site/developer-api/data-access" target="_blank" rel="noopener">API đọc spawner theo ID</a>.</p>`},
{id:'gioi-han',group:'XÂY DỰNG SHOP',icon:'◷',title:'Giới hạn mua',lead:'Phân biệt số lượng mỗi lượt mua với hạn mức tích lũy theo người chơi hoặc toàn server.',html:`
<h2 id="vi-du-limit">Cấu hình mẫu</h2>${code('Trong mục vật phẩm',`max-amount: 16
limits:
  personal:
    max: 32
    type: daily
  global:
    max: 256
    type: weekly`)}<p>Người chơi chọn tối đa 16 mỗi lần; tổng cá nhân tối đa 32/ngày; toàn server tối đa 256/tuần. <code>max</code> phải lớn hơn 0 để bật loại giới hạn tương ứng.</p>
<h2 id="chu-ky">Chu kỳ giới hạn</h2>${table(['type','Ý nghĩa'],[['permanent','Tích lũy lâu dài, không reset theo lịch.'],['daily','Reset theo ngày lịch trên môi trường server.'],['weekly','Theo tuần ISO, không phải đúng 7 × 24 giờ từ lần mua.'],['monthly','Theo tháng lịch, không phải 30 ngày cố định.']])}
<h2 id="du-lieu-limit">Lưu dữ liệu & mua đồng thời</h2><p>Giới hạn được lưu qua database. Giữ nguyên ID danh mục, ID mặt hàng khi nâng cấp để không tạo một định danh thống kê khác.</p><p>Với mặt hàng có global limit, SolarShop chỉ cho một lượt checkout cho cùng khóa danh mục/mặt hàng tại một thời điểm. Lượt đến cùng lúc nhận thông báo thử lại. Nếu database giới hạn chưa sẵn sàng, giao dịch có giới hạn bị chặn.</p>${note('Đừng xóa database để reset thử','Sao lưu trước mọi thao tác quản trị dữ liệu. Giới hạn theo lịch không đồng nghĩa plugin có lệnh /cooldown reset hoạt động. Không dùng lệnh không được liệt kê trong mục Lệnh & quyền.',true)}`},
{id:'giao-dien',group:'TÙY CHỈNH',icon:'▧',title:'GUI & trình chỉnh sửa',lead:'Menu dùng các hàng ký tự để xác định vị trí. Mỗi hàng tương ứng chín ô inventory.',html:`
<h2 id="bo-cuc">Bố cục menu chính</h2>${code('gui/main-menu.yml — trích đoạn',`gui-disposition:
  - '#########'
  - 'a##b##c##'
  - '#########'
categories:
  a: farm
  b: shards
  c: tutorial`)}<p>Mỗi ký tự gắn một category ID là tên file trong shop/. Duy trì độ dài 9 ký tự mỗi hàng. Không gán hai danh mục vào cùng một ký tự.</p>
<h2 id="xac-nhan-gui">Màn hình xác nhận mua</h2>${code('gui/buy-confirm.yml — trích đoạn',`close-after-purchase: false
gui-disposition:
  - '#########'
  - 'zyx d XYZ'
  - '###c#a###'`)}<p><code>a</code> là nút xác nhận, <code>c</code> hủy, <code>d</code> vật phẩm hiển thị. Các ký tự x/y/z và X/Y/Z điều chỉnh số lượng. Giữ các nút thiết yếu trong bố cục.</p><p><code>close-after-purchase: true</code> đưa người chơi trở lại danh mục sau khi mua theo luồng hiện tại; không diễn giải là cam kết đóng mọi inventory.</p>
<h2 id="editor">Trình chỉnh sửa trong game</h2><p>Dùng <code>/solarshop edit</code> với quyền <code>solarshop.admin</code>. Sao lưu YAML trước khi thay vật phẩm/giá/layout; editor có thể ghi lại file theo dạng chuẩn và không giữ nguyên comment.</p><p>Với ss-id, có hỗ trợ đọc/lưu trường này. Sau thay đổi trong editor, kiểm tra lại YAML và thử mua. Giá, lệnh, giới hạn và metadata phức tạp nên được kiểm tra thủ công trước khi mở bán.</p>
<h2 id="gui-an-toan">Kiểm tra giao diện</h2><ul><li>Tài khoản không OP thấy đúng danh mục và bị chặn đúng quyền.</li><li>Nút chuyển trang và tăng/giảm số lượng không đè lên vật phẩm.</li><li>Vật phẩm stackable/non-stackable, túi đầy, item có tên hoặc enchant đều được thử.</li><li>Người đang ở màn hình xác nhận cũ sau reload cần mở lại shop.</li></ul>`},
{id:'tin-nhan',group:'TÙY CHỈNH',icon:'≋',title:'Ngôn ngữ & thông báo',lead:'Điều khiển chat và action bar riêng, hoặc chọn chế độ chỉ hiển thị action bar.',html:`
<h2 id="chi-action">Chỉ dùng action bar</h2>${code('config.yml',`language: vi
messages:
  action-bar-messages: false
  chat-messages: false
  use-action-bar-only: true
  translate-item-names: true`)}<p><code>use-action-bar-only: true</code> ưu tiên cao hơn hai cờ trước: ép bật action bar và tắt chat cho thông báo được định tuyến qua cấu hình.</p>
<h2 id="tat-het">Tắt cả hai kênh</h2>${code('config.yml — dưới messages',`action-bar-messages: false
chat-messages: false
use-action-bar-only: false`)}${note('Không phải công tắc tắt toàn bộ output','Thông báo lệnh quản trị, console hoặc thông báo trực tiếp từ plugin khác có thể không đi qua hai cờ này. Nếu vẫn thấy chat, ghi lại nguyên nội dung để xác định ai gửi.')}
<h2 id="ngon-ngu">Ngôn ngữ & tên vật phẩm</h2><p>Sửa <code>lang/vi.yml</code> hoặc <code>lang/en.yml</code> và chọn <code>language</code> phù hợp. Giữ nguyên placeholder của từng câu.</p><p><code>translate-item-names: true</code> dùng tên theo ngôn ngữ client khi vật phẩm không có tên tùy chỉnh. Nếu đã khai báo name, tên tùy chỉnh được ưu tiên.</p>
<h2 id="am-thanh">Âm thanh</h2><p>Chỉnh <code>sounds.yml</code> theo các mục có sẵn, dùng tên Sound hợp lệ cho phiên bản server. Không xóa cấu trúc chỉ vì muốn đổi một âm thanh. Reload cấu hình và thử mở menu, mua thành công và mua thất bại.</p>`},
{id:'lenh-quyen',group:'VẬN HÀNH',icon:'>_',title:'Lệnh & quyền',lead:'Lệnh, alias và cây quyền được đăng ký khi plugin chạy. Không cần thêm chúng vào plugin.yml.',html:`
<h2 id="lenh">Danh sách lệnh</h2>${table(['Lệnh','Mục đích / quyền'],[['/solarshop','Mở menu chính — solarshop.use'],['/solarshop help','Xem trợ giúp.'],['/solarshop version','Thông tin phiên bản.'],['/solarshop open &lt;category&gt;','Tự mở danh mục — solarshop.use + quyền danh mục nếu có.'],['/solarshop open &lt;category&gt; &lt;player&gt;','Mở cho người khác — solarshop.admin.open hoặc solarshop.admin.'],['/solarshop edit','Mở editor — solarshop.admin; chỉ người chơi.'],['/solarshop reload','Reload cấu hình — solarshop.admin.reload.'],['/solarshop stats','Thống kê — solarshop.admin.stats.'],['/solarshop debug &lt;on|off&gt;','Lệnh debug — solarshop.admin.debug; xem lưu ý bên dưới.'],['/solarshop import &lt;economyshopgui|shopguiplus|zshop&gt;','Chuyển cấu hình — solarshop.admin.import hoặc solarshop.admin.*.']])}
<h2 id="quyen">Cấp quyền</h2><p><code>solarshop.use</code> mặc định true. Các quyền quản trị mặc định OP; chỉ cấp cho nhóm đáng tin cậy. Ví dụ dưới đây dành cho server dùng LuckPerms.</p>${code('Ví dụ lệnh LuckPerms',`/lp group default permission set solarshop.use true
/lp group admin permission set solarshop.admin true
/lp group admin permission set solarshop.admin.reload true
/lp group admin permission set solarshop.admin.stats true`)}<p><code>solarshop.admin.*</code> bao gồm các quyền admin; <code>solarshop.*</code> bao gồm cả use và admin.*. Dùng quyền hẹp hơn wildcard khi có thể.</p>
<h2 id="alias">Tránh xung đột /ss</h2><p>Alias mẫu có <code>shop</code> và <code>ss</code>, nhưng SmartSpawner cũng dùng /ss. Khi cài cả hai, bỏ ss khỏi command-aliases của SolarShop, rồi reload. Ưu tiên <code>/solarshop</code> hoặc <code>/solarshop:solarshop</code> để chẩn đoán xung đột.</p>
<h2 id="gioi-han-lenh">Lưu ý theo mã nguồn</h2><p>Quyền <code>solarshop.admin.cooldown</code> và <code>solarshop.admin.bypass</code> được đăng ký nhưng không nên xem là bằng chứng có lệnh reset/bypass tương ứng. Dispatcher hiện không có subcommand cooldown.</p><p>Lệnh debug ghi <code>general.debug</code> trong khi cấu hình chính dùng <code>debug</code>; nếu cần chẩn đoán, chỉnh <code>debug</code> trực tiếp và kiểm tra log thay vì chỉ dựa vào phản hồi của lệnh.</p>`},
{id:'database',group:'VẬN HÀNH',icon:'▱',title:'Database & sao lưu',lead:'Chọn nơi lưu dữ liệu trước khi mở server. Giữ cấu hình và database cùng một bộ backup.',html:`
<h2 id="sqlite">SQLite</h2>${code('config.yml',`database:
  type: sqlite`)}<p>Phù hợp để bắt đầu trên một server. Backup toàn bộ thư mục plugin khi server đã dừng; cách này giữ cả file database và các file liên quan thay vì đoán một tên database cố định.</p>
<h2 id="mysql">MySQL</h2>${code('config.yml — ví dụ, không phải thông tin thật',`database:
  type: mysql
  mysql:
    host: db.example.internal
    port: 3306
    database: solarshop
    user: solarshop_app
    password: 'THAY_BANG_MAT_KHAU_RIENG'
    max-pool: 15
    use-ssl: true`)}<p>Dùng tài khoản chỉ có quyền trên database SolarShop. Xác nhận cấu hình TLS và kết nối theo hệ thống MySQL của bạn. Không đăng file có mật khẩu lên GitHub.</p>${note('Đổi loại database không tự di chuyển dữ liệu','Chuyển type từ sqlite sang mysql không đồng nghĩa dữ liệu cũ được migrate. Sao lưu, chuẩn bị kế hoạch chuyển dữ liệu và kiểm tra trước trên môi trường thử.',true)}
<h2 id="backup">Checklist backup</h2><ol><li>Dừng server và chờ plugin đóng kết nối.</li><li>Sao lưu plugins/SolarShop/ và JAR phát hành đang dùng.</li><li>Nếu dùng MySQL, tạo database dump riêng.</li><li>Ghi lại phiên bản Java, server và plugin phụ thuộc.</li><li>Thử phục hồi vào môi trường riêng, không ghi đè dữ liệu production để thử.</li></ol>
<h2 id="dong-bo">Giới hạn vận hành</h2><p>Ghi database dùng hàng đợi. Nếu storage chậm kéo dài, backlog có thể tăng. Không kill tiến trình server ngay khi vừa phát stop. Mã đóng kết nối có thời gian chờ hữu hạn; timeout có thể khiến phần ghi đang chờ không được lưu.</p>`},
{id:'import',group:'VẬN HÀNH',icon:'⇄',title:'Import shop cũ',lead:'Chuyển cấu hình là bước khởi đầu, không phải bảo đảm mọi tính năng của plugin cũ được giữ nguyên.',html:`
<h2 id="nguon">Nguồn được dispatcher hỗ trợ</h2>${code('Chọn một lệnh theo plugin nguồn',`/solarshop import economyshopgui
/solarshop import shopguiplus
/solarshop import zshop`)}<p>Cần quyền <code>solarshop.admin.import</code> hoặc <code>solarshop.admin.*</code>. Đặt cấu hình plugin nguồn ở vị trí nó dùng trên server; xem phản hồi console để biết file nào đọc/chuyển thành công.</p>
<h2 id="quy-trinh-import">Quy trình an toàn</h2><ol><li>Backup cấu hình cả hai plugin và database.</li><li>Chạy import trên server thử.</li><li>Đọc lại file được tạo trong shop/ và mapping menu chính.</li><li>Kiểm tra material, giá, currency, commands, quyền, giới hạn và trang.</li><li>Với spawner, chuyển lệnh give thành ss-id nếu dùng SmartSpawner.</li><li>Thử đủ tiền/thiếu tiền/túi đầy, rồi mới áp dụng production.</li></ol>
<h2 id="khong-tu-dong">Không giả định tương đương</h2><p>Không coi import cấu hình là chuyển lịch sử mua, số dư người chơi hoặc dữ liệu thống kê của plugin cũ. Placeholder, custom item và lệnh ngoài phải được kiểm tra theo plugin thực tế.</p>`},
{id:'xu-ly-loi',group:'VẬN HÀNH',icon:'⊙',title:'Xử lý lỗi thường gặp',lead:'Bắt đầu từ thông báo đầu tiên trong console. Ghi lại bước tái hiện trước khi đổi cấu hình.',html:`
<h2 id="khong-mo">Không mở được shop</h2><ul><li>Kiểm tra SolarShop có enable thành công; đừng chỉ nhìn tên JAR trong thư mục.</li><li>Dùng /solarshop thay vì alias đang xung đột.</li><li>Kiểm tra solarshop.use, quyền danh mục và category ID trùng tên file.</li><li>Đối chiếu mapping trong gui/main-menu.yml.</li></ul>
<h2 id="thanh-toan-loi">Không mua được hoặc không nhận hàng</h2>${table(['Triệu chứng','Kiểm tra'],[['Economy system is not available','Vault và economy provider có đăng ký thành công không?'],['Shards payment failed or was cancelled','Số dư nguyên, event SolarShards, API/provider đã sẵn sàng. Không tự thêm take-command để thử lại.'],['This spawner is unavailable','SmartSpawner đã bật, ss-id hợp lệ, API đúng bản. Xem chi tiết warning trong console.'],['This item is busy','Giao dịch cùng mặt hàng giới hạn đang chạy; thử lại.'],['Shop changed','Đóng màn hình xác nhận và mở shop lại sau reload.'],['Mất tiền nhưng lệnh phần thưởng lỗi','Kiểm tra lệnh bằng console với tài khoản thử. Không có cam kết rollback lệnh ngoài.']])}
<h2 id="bao-loi">Thông tin cần gửi khi báo lỗi</h2><p>Phiên bản SolarShop, server, Java, hệ điều hành, plugin tiền/spawner; bước tái hiện, kỳ vọng, kết quả thực tế và cấu hình tối thiểu đã ẩn thông tin riêng. Không gửi mật khẩu, token, IP nội bộ hay database dump công khai.</p>`},
{id:'phat-hanh',group:'VẬN HÀNH',icon:'✓',title:'Checklist trước mở bán',lead:'Một vòng kiểm tra ngắn giúp tránh phần lớn sự cố cấu hình trên server thật.',html:`
<h2 id="checklist">Checklist quản trị</h2><ul><li>Đã backup cấu hình và dữ liệu, biết cách phục hồi.</li><li>Chỉ có một JAR SolarShop, không nạp lại JAR qua công cụ ngoài.</li><li>Danh mục và từng nút mở đúng bằng tài khoản không OP.</li><li>Mua đủ tiền, thiếu tiền, giá 0 và giá nguyên Shards/Points đã thử.</li><li>Túi đồ đầy không làm mất vật phẩm ngoài kỳ vọng.</li><li>SolarShards không bị trừ trùng qua commands cũ.</li><li>Spawner qua ss-id đặt xuống nhận đúng loại trong SmartSpawner.</li><li>Giới hạn cá nhân/toàn server được giữ sau restart.</li><li>Reload không khiến màn hình cũ mua sai mặt hàng.</li><li>Các lệnh phần thưởng chạy đúng và không có quyền nguy hiểm.</li><li>Không public file chứa mật khẩu database.</li></ul>
<h2 id="can-test">Những gì vẫn cần kiểm tra thực tế</h2><p>SmartSpawner trên server thật, event/plugin khác sửa số dư đồng thời, luồng giao dịch đa vùng Folia, MySQL thực tế. Không xem kiểm thử cục bộ là bảo đảm tương thích mọi môi trường.</p>
<h2 id="nguon">Nguồn đối chiếu</h2><p>Tài liệu này được đối chiếu với cấu hình và mã nguồn SolarShop C05, API SolarShards trong workspace và <a href="https://docs.smartspawner.site/developer-api/" target="_blank" rel="noopener">tài liệu API SmartSpawner</a>. Với yêu cầu Java/server cụ thể, xem <a href="https://docs.papermc.io/paper/getting-started/" target="_blank" rel="noopener">hướng dẫn PaperMC</a>.</p>`}
];

/* Multi-product registry. Existing SolarShop hashes remain valid. */
window.SOLAR_DOCS.forEach(doc => { doc.product = 'solarshop'; });
const meaning = {
 'debug':'Bật log debug; false khi vận hành bình thường.',
 'language':'Chọn mã ngôn ngữ, ví dụ vi hoặc en.',
 'command-aliases':'Danh sách alias cho /solarshop. Bỏ ss nếu dùng SmartSpawner.',
 'database.type':'sqlite hoặc mysql. Đổi backend cần restart và kế hoạch chuyển dữ liệu.',
 'database.mysql.host':'Máy chủ MySQL, không phải URL website.',
 'database.mysql.port':'Cổng MySQL, mặc định 3306.',
 'database.mysql.database':'Tên database của SolarShop.',
 'database.mysql.user':'Tài khoản MySQL dùng cho plugin.',
 'database.mysql.password':'Mật khẩu riêng của database. Không đưa giá trị thật lên GitHub.',
 'database.mysql.max-pool':'Số kết nối tối đa trong pool.',
 'database.mysql.use-ssl':'Bật SSL cho kết nối MySQL; đối chiếu cấu hình server DB.',
 'messages.action-bar-messages':'Bật thông báo theo cấu hình qua action bar.',
 'messages.chat-messages':'Bật thông báo theo cấu hình qua chat.',
 'messages.use-action-bar-only':'Khi true: ép bật action bar, tắt chat, ghi đè hai cờ phía trên.',
 'messages.translate-item-names':'Dịch tên theo client khi vật phẩm không có tên tùy chỉnh.',
 'config-version':'Phiên bản cấu trúc file mẫu, không phải phiên bản JAR.',
 'title':'Tiêu đề inventory/menu.', 'gui-disposition':'Bố cục GUI; mỗi chuỗi là 9 ô. Các ký tự được ánh xạ tới nút/danh mục.',
 'categories':'Ánh xạ ký tự bố cục tới ID danh mục (tên file shop, không có .yml).',
 'close-after-purchase':'Sau mua quay lại danh mục theo luồng hiện tại khi bật.',
 'enabled':'Công tắc bật/tắt chức năng ở khối tương ứng.', 'master-volume':'Hệ số âm lượng chung.',
 'material':'Tên Material Minecraft. Dùng tên hợp lệ trên bản server.',
 'name':'Tên hiển thị; chuỗi màu cần đặt trong dấu nháy.', 'lore':'Danh sách dòng mô tả.',
 'price':'Đơn giá dạng số. Shards/Points dùng số nguyên.', 'currency':'Khóa tiền tệ trong currency.yml.',
 'ss-id':'Loại mob hoặc ID đăng ký của SmartSpawner; phát qua API thay cho commands.',
 'commands':'Danh sách lệnh phần thưởng, không bắt đầu bằng /. Bị bỏ qua nếu có ss-id.',
 'max-amount':'Số lượng tối đa mỗi lần chọn mua; khác limits tích lũy.',
 'permission':'Quyền cần để mở danh mục/mua vật phẩm tương ứng.',
 'slots':'Vị trí vật phẩm, bắt đầu từ 0.', 'glow':'Hiệu ứng phát sáng vật phẩm.',
 'hide-attributes':'Ẩn thuộc tính vật phẩm.', 'enchantments':'Danh sách enchantment theo mẫu của file.',
 'type':'Loại tích hợp/chu kỳ của khối; xem hướng dẫn tương ứng.',
 'placeholder':'Placeholder trả về số dư cho tiền custom. Không cần cho SolarShards API.',
 'take-command':'Lệnh trừ tiền custom; không dùng khi currency: shards đi qua API SolarShards.',
 'format':'Mẫu hiển thị tiền với {amount}.', 'price-color':'Mã màu phần giá.',
 'unit-name':'Tên/hậu tố đơn vị.', 'unit-color':'Màu đơn vị.',
 'max':'Hạn mức, lớn hơn 0 để bật giới hạn.',
 'stack-increments':'Các bước tăng giảm số lượng theo cấu hình GUI.',
 'lore-format':'Các dòng lore theo định dạng và placeholder của màn hình.',
 'nbt-data':'Dữ liệu vật phẩm serialized của plugin; nên tạo bằng editor, không gõ Base64 tùy ý.',
 'open-gui':'Luồng mở GUI ngoài; cần đối chiếu plugin tích hợp và thử thực tế.',
 'storage.type':'Backend lưu dữ liệu SolarShards; chọn theo cấu hình mẫu và môi trường.',
 'currency.starting-balance':'Số dư khởi tạo cho người mới.', 'currency.max-balance':'Số dư tối đa; 0 là không giới hạn.',
 'currency.pay.tax-rate':'Tỷ lệ thuế chuyển tiền; 0.05 là 5%.',
 'auto-save.interval':'Khoảng tự động lưu, tính bằng giây.',
 'vault.hook-as-primary-economy':'Chỉ bật nếu muốn Shards làm economy chính của Vault trên server.'
};
function keyRows(yaml) {
  const rows = [], stack = [];
  for (const line of yaml.split(/\r?\n/)) {
    const match = /^( *)([A-Za-z0-9_.-]+):(?:\s+(.*))?$/.exec(line);
    if (!match) continue;
    const indent = match[1].length, key = match[2], value = (match[3] || '').trim();
    while (stack.length && stack[stack.length - 1].indent >= indent) stack.pop();
    const path = [...stack.map(x=>x.key), key].join('.');
    if (!value || value.startsWith('#')) {
      rows.push([`<code>${esc(path)}</code>`, 'Khối / danh sách', meaning[path] || meaning[key] || 'Nhóm key con hoặc danh sách; xem YAML có chú thích.']);
      stack.push({indent,key}); continue;
    }
    rows.push([`<code>${esc(path)}</code>`, `<code>${esc(value)}</code>`, meaning[path] || meaning[key] || 'Giá trị mẫu trong ngữ cảnh khối này; xem comment và YAML đầy đủ bên dưới.']);
  }
  return rows;
}
function configSection(file, index, product = 'solarshop') {
  const path = `assets/examples/${product}/${file.path}`;
  return `<h2 id="file-${index}">${esc(file.path)}</h2><p><a href="${path}" download>Tải YAML mẫu ↓</a> · Tệp mặc định công khai, không phải cấu hình production.</p><details open><summary>Tra cứu key & giá trị mẫu</summary>${table(['Key','Mặc định / mẫu','Ý nghĩa'],keyRows(file.content))}</details><details><summary>Xem toàn bộ YAML có chú thích</summary>${code(file.path,file.content)}</details>`;
}
const configs = window.ONIC_CONFIGS;
const shardsConfig = window.ONIC_SHARDS_CONFIG;
window.SOLAR_DOCS.push({id:'solarshards-config',product:'solarshards',group:'SOLARSHARDS',icon:'{}',title:'Key config & YAML mẫu',lead:'Cấu hình SolarShards NoKey: storage, currency, pay, auto-save, sounds, notifications và Vault.',html:note('Cấu hình mặc định, không phải dữ liệu server','Chỉ chứa file mặc định công khai. Mật khẩu mẫu để trống. Đừng thay backend đang có dữ liệu mà chưa sao lưu/migrate.') + configSection({path:'config.yml',content:shardsConfig},0,'solarshards')});
const order = ['config.yml','currency.yml','sounds.yml','gui/main-menu.yml','gui/category-menu.yml','gui/buy-confirm.yml','gui/admin.yml'];
configs.sort((a,b)=>(order.indexOf(a.path)<0?100:order.indexOf(a.path))-(order.indexOf(b.path)<0?100:order.indexOf(b.path))||a.path.localeCompare(b.path));
const reference = {
 id:'solarshop-config',product:'solarshop',group:'TRA CỨU CẤU HÌNH',icon:'{}',title:'Tất cả key & YAML mẫu',
 lead:'Tra cứu cấu hình SolarShop C05 NoKey: key, giá trị mặc định, chú thích và toàn bộ YAML gốc. Tìm bằng Ctrl/Cmd + F hoặc ô tìm kiếm wiki.',
 html:note('Đọc trước khi chép cấu hình','19 file mẫu được chụp từ source mặc định C05. Sao lưu file đang dùng, chỉ lấy phần cần chỉnh; không ghi đè database credentials. File shop mẫu bổ sung như limited_shop/keys không nhất thiết tự được tạo ở lần chạy đầu.')+
 `<h2 id="chon-file">Chọn file</h2><div class="file-index">${configs.map((f,i)=>`<a href="#solarshop-config/file-${i}">${esc(f.path)}</a>`).join('')}</div>`+
 `<h2 id="schema-shop">Key vật phẩm không có trong mọi file mẫu</h2>`+table(['Đường dẫn ví dụ','Ý nghĩa'],[
 ['items.&lt;id&gt;.material / name / lore','Loại vật phẩm, tên và mô tả.'],
 ['items.&lt;id&gt;.price / currency / max-amount / slots','Giá, loại tiền, số lượng mỗi lượt và ô GUI.'],
 ['items.&lt;id&gt;.ss-id','Hook SmartSpawner. Bỏ commands give cũ khi chuyển sang ss-id.'],
 ['items.&lt;id&gt;.commands','Lệnh phần thưởng; có commands thì không phát thêm material thông thường.'],
 ['items.&lt;id&gt;.limits.personal.max / type','Hạn mức cá nhân. type: permanent, daily, weekly, monthly.'],
 ['items.&lt;id&gt;.limits.global.max / type','Hạn mức toàn server; max phải lớn hơn 0.'],
 ['items.&lt;id&gt;.permission / glow / hide-attributes','Quyền mua, phát sáng, ẩn thuộc tính.'],
 ['items.&lt;id&gt;.enchantments / nbt-data / disname','Enchant, dữ liệu serialized và tên hiển thị bổ sung.'],
 ['items.&lt;id&gt;.open-gui / open_gui','Cấu hình mở GUI ngoài. Kiểm tra tích hợp thực tế.'],
 ['items.&lt;id&gt;.shards / isShard / isShards / points','Cờ tương thích cấu hình cũ; ưu tiên dùng currency rõ ràng.'],
 ['items.&lt;id&gt;.conditional-commands','Có được đọc/lưu; không coi việc tồn tại key là bảo đảm luồng thực thi.'],
 ['page1.items … page10.items','Cấu trúc nhiều trang; không trộn với items cấp gốc.']
 ])+configs.map((file,i)=>configSection(file,i)).join('')
};
window.SOLAR_DOCS.splice(3,0,reference);
// Keep each product together in global navigation; overview before configuration.
const shardsReferenceIndex = window.SOLAR_DOCS.findIndex(d => d.id === 'solarshards-config');
const shardsReference = window.SOLAR_DOCS.splice(shardsReferenceIndex, 1)[0];
const registry = [
 {id:'solarshop',name:'SolarShop',version:'2.0-C05 NoKey',route:'bat-dau',icon:'▦',text:'Cửa hàng, nhiều loại tiền, giới hạn mua và SmartSpawner.',status:'16 hướng dẫn + 19 YAML mẫu'},
 {id:'solarshards',name:'SolarShards',version:'NoKey · source hiện có',route:'solarshards-home',icon:'✧',text:'Tiền tệ Shards, cấu hình lưu trữ và hook với SolarShop.',status:'Tổng quan + tra cứu config'},
 {id:'solarbounty',name:'SolarBounty',icon:'◎',text:'Chuyên mục được dành sẵn. Chưa xuất bản hướng dẫn đã đối chiếu.',status:'Chưa có tài liệu'},
 {id:'solarrtp',name:'SolarRTP / SolarRTPZone',icon:'⌁',text:'Chuyên mục được dành sẵn. Chưa xuất bản hướng dẫn đã đối chiếu.',status:'Chưa có tài liệu'}
];
window.ONIC_PLUGINS = registry;
window.SOLAR_DOCS.unshift({id:'wiki',product:'wiki',group:'ONIC WIKI',icon:'⌂',title:'Tất cả plugin',subtitle:'Một wiki. Cả hệ sinh thái.',lead:'Tài liệu plugin Minecraft của Onic: chọn sản phẩm, tìm key cấu hình và làm theo hướng dẫn đúng phiên bản. Không phải mỗi plugin một website.',html:
 `<div class="pills"><span class="pill">ONIC KNOWLEDGE BASE</span><span class="pill">Hướng dẫn tiếng Việt</span><span class="pill">Cấu hình có thể sao chép</span></div><h2 id="plugins">Chọn plugin của bạn</h2><div class="cards plugin-cards">${registry.map(p=>p.route?card(p.route,p.icon,p.name,`${p.text}<br><span class="product-status">${p.status}</span>`):`<div class="card planned"><span class="card-icon">${p.icon}</span><strong>${p.name}</strong><p>${p.text}</p><span class="product-status">${p.status}</span></div>`).join('')}</div>`+
 `<h2 id="config-hub">Bạn đang tìm key config?</h2><div class="cards">${card('solarshop-config','{}','SolarShop · cấu hình','config.yml, currency.yml, sounds, toàn bộ GUI, ngôn ngữ và shop mẫu.')}${card('solarshards-config','{}','SolarShards · cấu hình','Storage, tiền tệ, chuyển tiền, tự lưu, âm thanh, thông báo và Vault.')}</div>`+
 note('Cấu hình phải đi cùng phiên bản','Mỗi chuyên mục ghi rõ phạm vi và nguồn đối chiếu. Không sao chép config SolarShop sang SolarShards; không giả định một key tồn tại trong mọi bản.')+
 `<h2 id="dieu-huong">Cách dùng wiki</h2><ol><li>Chọn plugin ở các thẻ hoặc bộ chọn bên trái.</li><li>Dùng tìm kiếm để tìm nội dung/key, hỗ trợ tiếng Việt không dấu.</li><li>Trong trang cấu hình, chọn file, xem bảng key hoặc mở toàn bộ YAML có chú thích.</li><li>Copy phần cần dùng hoặc tải tệp mẫu. Backup trước khi áp dụng.</li></ol><h2 id="dong-gop">Tài liệu cho các plugin khác</h2><p>Wiki hỗ trợ nhiều chuyên mục. SolarBounty, SolarRTP và các sản phẩm khác sẽ có nội dung riêng khi được đối chiếu nguồn; các thẻ chưa có tài liệu không dẫn tới trang trống hoặc nội dung suy đoán.</p>`});
window.SOLAR_DOCS.push({id:'solarshards-home',product:'solarshards',group:'SOLARSHARDS',icon:'✧',title:'Tổng quan & tích hợp',lead:'Chuyên mục riêng cho SolarShards, không phải chỉ là một trang con của SolarShop.',html:
 `<h2 id="nguon-shards">Phạm vi tài liệu</h2><p>Cấu hình được đối chiếu với bản NoKey trong source SolarShards hiện có ngày 09/11/2026. Đây là hướng dẫn tổng quan và tra cứu config, chưa phải tài liệu A–Z đầy đủ cho SolarShards.</p>`+
 `<h2 id="bat-dau-shards">Bắt đầu</h2><ol><li>Sao lưu server, cài bản SolarShards phù hợp với môi trường.</li><li>Khởi động và kiểm tra plugin enable thành công.</li><li>Chỉnh storage và currency trong config.yml; dùng mật khẩu DB riêng.</li><li>Thay storage/backend thì restart và kiểm tra dữ liệu trước khi mở bán.</li></ol>`+
 `<h2 id="shop-shards">Dùng cùng SolarShop</h2><p>SolarShop C05 dùng API SolarShards cho <code>currency: shards</code>. Không cần bật Shards làm economy chính của Vault. Xem <a href="#solarshards">hướng dẫn thanh toán trong SolarShop</a>.</p>`+
 note('Vault không nên bật tùy tiện','<code>vault.hook-as-primary-economy</code> mặc định false. Chỉ bật nếu muốn Shards trở thành nền kinh tế chính cho các plugin dùng Vault.',true)+
 `<h2 id="shards-config-link">Tra cứu cấu hình</h2><p><a href="#solarshards-config">Mở bảng key và YAML SolarShards →</a></p>`});
window.SOLAR_DOCS.push(shardsReference);

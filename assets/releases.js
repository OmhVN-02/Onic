'use strict';
window.ONIC_MOVED_GUIDES = {
  solarshards: 'tien-te',
  smartspawner: 'vat-pham'
};

const onicReleaseNotes = [
  {
    product:'solarshop', number:156, version:'SolarShop-2.0-C06',
    sections:[
      ['Hook trực tiếp SolarShards','Direct SolarShards integration',[
        ['<code>currency: shards</code> dùng API SolarShards để đọc số dư và trừ Shards, không cần PlaceholderAPI hay chạy <code>take-command</code> khi thanh toán.','<code>currency: shards</code> reads balances and deducts Shards through the SolarShards API, without PlaceholderAPI or a <code>take-command</code> during checkout.'],
        ['Cấu hình Shards cũ vẫn dùng được; các trường placeholder và lệnh trừ tiền cũ được bỏ qua.','Existing Shards configurations still work. Legacy placeholder and debit command fields are ignored.'],
        ['Hỗ trợ <code>type: solarshards</code> cho mục tiền tệ tùy chỉnh.','Custom currency entries support <code>type: solarshards</code>.']
      ]]
    ],
    link:'#tien-te/solarshards'
  },
  {
    product:'solartpa', number:157, version:'SolarTPA-1.1',
    sections:[
      ['Sửa xung đột lệnh với EssentialsX','EssentialsX command conflicts',[
        ['Bổ sung bí danh <code>/etpa</code>, <code>/etpahere</code>, <code>/etpaccept</code>, <code>/etpdeny</code>, <code>/etpacancel</code> và <code>/etpauto</code>.','Added <code>/etpa</code>, <code>/etpahere</code>, <code>/etpaccept</code>, <code>/etpdeny</code>, <code>/etpacancel</code> and <code>/etpauto</code> aliases.'],
        ['Thêm <code>/tptoggle [on|off]</code> để bật/tắt nhận cả TPA và TPAHere.','Use <code>/tptoggle [on|off]</code> to toggle both TPA and TPAHere requests.'],
        ['Hỗ trợ <code>/tpaccept *</code>, <code>/tpdeny *</code> và <code>/tpacancel &lt;người_chơi&gt;</code>.','Supports <code>/tpaccept *</code>, <code>/tpdeny *</code> and <code>/tpacancel &lt;player&gt;</code>.']
      ]],
      ['Tích hợp PvPManager','PvPManager integration',[
        ['Chặn gửi và chấp nhận yêu cầu khi một trong hai người đang combat.','Sending and accepting requests are blocked when either player is in combat.'],
        ['Khi bị tag, hủy yêu cầu đến/đi và dịch chuyển liên quan, tắt tpauto và đóng menu TPA.','A combat tag cancels related incoming and outgoing requests and teleports, disables auto-accept and closes the TPA menu.'],
        ['Kiểm tra lại trước khi dịch chuyển, kể cả yêu cầu đang đếm ngược hoặc chờ tải chunk.','Combat is checked again before teleporting, including during countdown or chunk loading.']
      ]],
      ['Sửa tpauto khi chết','Auto-accept on death',[
        ['Chết sẽ tắt tpauto, ẩn BossBar và hủy các yêu cầu/dịch chuyển liên quan.','Death disables auto-accept, hides the boss bar and cancels related requests and teleports.'],
        ['Người chưa hồi sinh không thể tự chấp nhận TPA hoặc TPAHere, kể cả qua API.','Players who have not respawned cannot auto-accept TPA or TPAHere, even through the API.'],
        ['Không báo chấp nhận thành công hoặc tính cooldown/hạn mức cho yêu cầu bị chặn vì người chơi đã chết.','Requests blocked because a player is dead do not report acceptance or count toward cooldowns and limits.'],
        ['Yêu cầu cũ không tiếp tục dịch chuyển sau khi hồi sinh. Người chơi cần tự bật lại <code>/tpauto</code>.','Old teleports do not resume after respawn. Players must re-enable <code>/tpauto</code> manually.']
      ]],
      ['API cho plugin tích hợp','Plugin API',[
        ['Cung cấp <code>SolarTpaAPI</code> qua Bukkit ServicesManager cùng <code>SolarTPA-1.1-api.jar</code>.','Exposes <code>SolarTpaAPI</code> through Bukkit ServicesManager and provides <code>SolarTPA-1.1-api.jar</code>.'],
        ['Hỗ trợ gửi, chấp nhận, từ chối, hủy yêu cầu và kiểm tra trạng thái combat.','Supports sending, accepting, denying and cancelling requests, plus combat-state checks.']
      ]]
    ],
    link:'#solartpa-api'
  },
  {
    product:'solarshop', number:154, version:'SolarShop-2.0-C05', date:'2026-11-08',
    sections:[
      ['Tích hợp trực tiếp SmartSpawner','Direct SmartSpawner integration',[
        ['Thêm <code>ss-id</code> để shop phát vật phẩm spawner qua API SmartSpawner, không cần chạy lệnh <code>give</code>.','Use <code>ss-id</code> to deliver spawners through the SmartSpawner API without a <code>give</code> command.'],
        ['Hỗ trợ tên mob như <code>ss-id: zombie</code> hoặc ID spawner đã đăng ký trong SmartSpawner.','Supports mob names such as <code>ss-id: zombie</code> or a registered SmartSpawner ID.'],
        ['Khi dùng ID đã đăng ký, shop tạo spawner mới cùng loại, không sao chép kho đồ hay kinh nghiệm của spawner gốc.','A registered ID creates a new spawner of the same type, without copying stored items or experience.'],
        ['Nếu ID sai, SmartSpawner chưa bật hoặc túi đồ không đủ chỗ, giao dịch dừng trước khi trừ tiền.','Checkout stops before payment if the ID is invalid, SmartSpawner is disabled, or the inventory lacks space.']
      ]],
      ['Cập nhật cấu hình shop','Shop configuration',[
        ['Các mục spawner trong shop Shards mẫu đã chuyển sang <code>ss-id</code>.','Spawner entries in the sample Shards shop now use <code>ss-id</code>.'],
        ['Với shop đang chạy, thay <code>commands</code> chứa lệnh <code>give</code> bằng <code>ss-id</code> và giữ nguyên giá, loại tiền.','For existing shops, replace the <code>commands</code> that contain <code>give</code> with <code>ss-id</code>, keeping the price and currency.']
      ]]
    ],
    link:'#vat-pham/smartspawner'
  },
  {
    product:'solarshop', number:153, version:'SolarShop-2.0-C05', date:'2026-11-08',
    sections:[
      ['Sửa lỗi thanh toán và giao hàng','Payment and delivery fixes',[
        ['Vault phải xác nhận trừ tiền thành công trước khi SolarShop giao hàng và ghi nhận lượt mua.','Vault must confirm a successful debit before SolarShop delivers items and records the purchase.'],
        ['Nếu shop đang dùng kiểu thanh toán không xác nhận được khoản trừ, hãy chuyển sang tích hợp có API phù hợp như Vault, PlayerPoints hoặc ExcellentEconomy.','For payment methods that cannot confirm a debit, use a suitable API integration such as Vault, PlayerPoints or ExcellentEconomy.']
      ]],
      ['Sửa giới hạn mua trên Folia','Folia purchase limits',[
        ['Chỉ xử lý một lượt mua tại một thời điểm cho mỗi mặt hàng có giới hạn toàn server.','Only one checkout at a time is processed for each item with a server-wide limit.'],
        ['Nếu hai người cùng mua suất cuối, lượt đến trong lúc giao dịch đang xử lý sẽ được yêu cầu thử lại.','If two players try to buy the last unit, the checkout arriving while another is processing must retry.']
      ]]
    ],
    link:'#gioi-han'
  },
  {
    product:'solarshop', number:228, version:'SolarShop-2.0-C04', date:'2026-08-27',
    subtitle:'Personal & Global Limits, Click Shop Importer',
    sections:[
      ['Giữ giao diện xác nhận khi mua liên tiếp','Stay in the confirmation menu',[
        ['Sau khi mua thành công, người chơi vẫn ở Buy Confirm Menu để mua tiếp.','After a successful purchase, players stay in the Buy Confirm Menu for the next purchase.'],
        ['Tính lại số lượng tối đa và chỗ trống túi đồ, rồi cập nhật lore ngay.','Recalculates the maximum quantity and inventory space, then updates the lore immediately.'],
        ['Thêm <code>close-after-purchase: false</code> trong <code>gui/buy-confirm.yml</code> để tùy chỉnh hành vi sau khi mua.','Adds <code>close-after-purchase: false</code> in <code>gui/buy-confirm.yml</code> to configure post-purchase behavior.'],
        ['Tự quay về danh mục nếu đã hết hạn mức cá nhân/toàn server hoặc túi đồ đầy.','Returns to the category when the personal or server-wide limit is exhausted or the inventory is full.']
      ]],
      ['Phản hồi khi nhấp nhanh','Rapid-click confirmation',[
        ['Bản C04 bỏ debounce 200 ms trên nút xác nhận để phản hồi ngay khi người chơi nhấp liên tiếp trên luồng chính.','C04 removes the 200 ms confirmation debounce so repeated clicks respond immediately on the main thread.']
      ]]
    ],
    link:'#giao-dien'
  }
];

for (const [docs, english] of [[window.SOLAR_DOCS,false],[window.ONIC_ENGLISH,true]]) {
  for (const [id, parentId] of Object.entries(window.ONIC_MOVED_GUIDES)) {
    const index = docs.findIndex(doc => doc.id === id);
    const moved = docs[index], parent = docs.find(doc => doc.id === parentId);
    parent.html += `<h2 id="${id}">${id === 'solarshards' ? 'SolarShards' : 'SmartSpawner'}</h2><p>${esc(moved.lead)}</p>` +
      moved.html.replace(/\bid="([^"]+)"/g, (_,section)=>`id="${id}-${section}"`);
    docs.splice(index,1);
  }
  for (const product of new Set(onicReleaseNotes.map(release=>release.product))) {
    const locale = english ? 1 : 0;
    const id = product + '-changelog';
    const releaseDate = release => release.date || '2026-11-09';
    const releases = onicReleaseNotes.filter(release=>release.product===product).sort((a,b)=>releaseDate(b).localeCompare(releaseDate(a)) || b.number-a.number);
    docs.push({id, product,group:english?'OPERATIONS':'VẬN HÀNH',icon:'↻',title:'Changelog',
      lead:english?'Release notes for this product.':'Ghi chú cập nhật của sản phẩm.',
      html:releases.map(release=>{
        const date=releaseDate(release);
        return `<h2 id="devlog-${release.number}">${release.version} · #${release.number}</h2><p>DevLog Plugins #${release.number} · <time datetime="${date}">${date.split('-').reverse().join(' / ')}</time></p>` +
        (release.subtitle ? '<p>'+esc(release.subtitle)+'</p>' : '') +
        release.sections.map(([vi,en,items])=>'<h3>'+esc(english?en:vi)+'</h3><ul>'+items.map(pair=>'<li>'+pair[locale]+'</li>').join('')+'</ul>').join('') +
        `<p><a href="${release.link}">${english?'Read the guide':'Xem hướng dẫn'} ↗</a></p>`;
      }).join('')
    });
  }
}

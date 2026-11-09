'use strict';
// Keep historic deep links working after moving these guides into their parent pages.
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
  for (const release of onicReleaseNotes) {
    const locale = english ? 1 : 0;
    const id = release.product + '-changelog';
    docs.push({id, product:release.product,group:english?'OPERATIONS':'VẬN HÀNH',icon:'↻',title:'Changelog',
      lead:english?'Release notes for this product.':'Ghi chú cập nhật của sản phẩm.',
      html:`<p><time datetime="2026-11-09">09 / 11 / 2026</time> · DevLog Plugins #${release.number}</p><h2 id="devlog-${release.number}">${release.version}</h2>` +
        release.sections.map(([vi,en,items])=>'<h3>'+esc(english?en:vi)+'</h3><ul>'+items.map(pair=>'<li>'+pair[locale]+'</li>').join('')+'</ul>').join('') +
        `<p><a href="${release.link}">${english?'Read the integration guide':'Xem hướng dẫn tích hợp'} ↗</a></p>`
    });
  }
}

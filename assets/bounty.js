'use strict';
for (const [docs,en] of [[window.SOLAR_DOCS,false],[window.ONIC_ENGLISH,true]]) {
  const t=(vi,english)=>en?english:vi;
  const page=(slug,title,icon,lead,html)=>docs.push({id:'solarbounty-'+slug,product:'solarbounty',group:t('HƯỚNG DẪN','GUIDES'),title,icon,lead,html});
  const screenshots=[
    ['bounty-menu',t('Bảng xếp hạng truy nã','Bounty leaderboard')],
    ['bounty-tooltip',t('Xem số bounty trên vật phẩm','View the bounty on hover')]
  ].map(([file,title])=>{
    const src='assets/images/solarbounty/'+file+'.png';
    return '<figure class="card"><a href="'+src+'" target="_blank" rel="noopener"><img src="'+src+'" alt="'+title+'" loading="lazy"></a><figcaption>'+title+'</figcaption></figure>';
  }).join('');
  page('home',t('Tổng quan','Overview'),'◎',t('Tiền thưởng truy nã theo thời gian sống và hạ gục người chơi.','Automatic bounties based on survival time and player kills.'),
    '<h2 id="cai-dat">'+t('Cài đặt','Installation')+'</h2><p>'+t('Bản 1.0-dev hướng tới Paper 26.3 và Java 25. Đặt JAR vào plugins/, cài Vault cùng một economy provider nếu muốn phát thưởng, rồi khởi động server. Dùng /bounty reload sau khi chỉnh cấu hình; thay database hoặc JAR cần khởi động lại.','Version 1.0-dev targets Paper 26.3 and Java 25. Place the JAR in plugins/, install Vault and an economy provider for payouts, then start the server. Run /bounty reload after configuration edits. Restart after database or JAR changes.')+'</p>'+
    '<h2 id="gui">'+t('Giao diện trong game','In-game screenshots')+'</h2><div class="cards screenshots">'+screenshots+'</div>'+
    '<h2 id="co-che">'+t('Cách tính bounty','How bounties work')+'</h2><p>'+t('Mặc định mỗi phút sống online hoàn chỉnh cộng 100 Coins; mỗi lần hạ gục hợp lệ cộng 5.000 và 40% bounty của nạn nhân. Tiền nhận qua Vault là khoản riêng; không trừ tiền tài khoản nạn nhân. Khi thiếu provider, khoản thưởng được lưu chờ xử lý.','By default, each full minute alive online adds 100 coins. An eligible kill adds 5,000 plus 40% of the victim’s bounty. The Vault payout is separate and never charges the victim. Without a provider, payouts remain pending.')+'</p>'+
    '<p>'+t('Hỗ trợ K/M/B/T, ví dụ /bounty set OmhVN 1.5M. Mặc định sau 15 ngày offline, mỗi 24 giờ tiếp theo giảm 10% số bounty còn lại.','Supports K/M/B/T, for example /bounty set OmhVN 1.5M. By default, after 15 offline days, each additional full day reduces the remaining bounty by 10%.')+'</p>'+
    '<div class="cards">'+card('solarbounty-commands','>_',t('Lệnh & quyền','Commands & permissions'),t('Lệnh người chơi và quản trị.','Player and admin commands.'))+card('solarbounty-config','{}',t('Cấu hình','Configuration'),t('Tra cứu key và tải YAML mẫu.','Browse keys and download YAML.'))+'</div>');
  page('commands',t('Lệnh & quyền','Commands & permissions'),'>_',t('Lệnh SolarBounty và quyền tương ứng.','SolarBounty commands and permission nodes.'),
    '<h2 id="lenh">'+t('Lệnh','Commands')+'</h2>'+table([t('Lệnh','Command'),t('Quyền','Permission'),t('Tác dụng','Purpose')],[
      ['/bounty / /bounty top','solarbounty.use, solarbounty.top',t('Mở bảng xếp hạng; console in top 10.','Opens the leaderboard; console prints the top 10.')],
      ['/bounty info &lt;player&gt;','solarbounty.use',t('Xem bounty người chơi.','View a player’s bounty.')],
      ['/bounty reload','solarbounty.admin',t('Tải lại cấu hình.','Reload configuration.')],
      ['/bounty set &lt;player&gt; &lt;amount&gt;','solarbounty.admin',t('Đặt bounty, giữ thời gian và kills.','Set the bounty without resetting time or kills.')],
      ['/bounty reset &lt;player&gt;','solarbounty.admin',t('Xóa tiến trình bounty.','Reset bounty progress.')],
      ['/bounty payments','solarbounty.admin',t('Xem khoản thưởng cần đối soát.','Inspect payouts needing review.')],
      ['/bounty resolve &lt;id&gt; &lt;paid|retry&gt;','solarbounty.admin',t('Đánh dấu đã trả hoặc thử trả lại.','Mark as paid or retry.')]])+
    '<p>'+t('Bí danh: <code>/bounties</code>. Chỉ dùng <code>retry</code> sau khi xác nhận economy chưa chuyển tiền.','Alias: <code>/bounties</code>. Use <code>retry</code> only after confirming the economy did not pay.')+'</p>');
  const files=window.ONIC_BOUNTY_CONFIGS;
  page('config',t('Cấu hình','Configuration'),'{}',t('Ba file cấu hình mặc định của SolarBounty.','The three default SolarBounty configuration files.'),
    '<h2 id="key">'+t('Key thường chỉnh','Common keys')+'</h2>'+table(['Key',t('Ý nghĩa','Description')],[
      ['bounty.time.money / minutes',t('Tiền và độ dài mỗi chu kỳ sống online.','Reward and duration of each online survival interval.')],
      ['bounty.kill.money / inherit-percent',t('Tiền cố định và tỷ lệ bounty kế thừa mỗi lần hạ gục hợp lệ.','Fixed kill bonus and inherited bounty percentage.')],
      ['bounty.max / decay',t('Giới hạn và quy tắc giảm bounty khi offline.','Cap and offline decay settings.')],
      ['economy.queue-failed / retry',t('Cách xử lý giao dịch thất bại và thời gian thử lại.','Failed payout handling and retry interval.')],
      ['anti-farm.cooldown / same-ip',t('Cooldown theo cặp và tùy chọn chặn cùng IP.','Per-pair cooldown and optional same-IP protection.')],
      ['top.refresh',t('Chu kỳ làm mới bảng xếp hạng tính theo giây.','Leaderboard refresh interval in seconds.')]])+
    files.map((f,i)=>en?'<h2 id="file-'+i+'">'+esc(f.path)+'</h2><p><a href="assets/examples/solarbounty/'+f.path+'" download>Download YAML ↓</a></p>'+code(f.path,f.content):configSection(f,i,'solarbounty')).join(''));
}

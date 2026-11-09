'use strict';
const papiDocs = {
  solarshop:[
    ['%solarshop_categories_count% · %solarshop_items_count%','Tổng số danh mục và mặt hàng.','Category and item counts.'],
    ['%solarshop_category_items_farm% · %solarshop_category_name_farm%','Số mặt hàng và tên danh mục; thay farm bằng ID danh mục.','Item count and display name; replace farm with the category ID.'],
    ['%solarshop_total_spent% · %solarshop_total_spent_compact%','Tổng tiền đã chi; compact hoặc formatted hiển thị rút gọn.','Total spent; compact and formatted return abbreviated values.'],
    ['%solarshop_total_items%','Tổng số vật phẩm đã mua.','Total items purchased.'],
    ['%solarshop_rank_spent% · %solarshop_rank_items%','Thứ hạng theo chi tiêu hoặc số vật phẩm đã mua.','Rank by spending or purchased items.'],
    ['%solarshop_top_spent_name_1% · %solarshop_top_spent_value_1% · %solarshop_top_spent_compact_1%','Tên, giá trị hoặc giá trị rút gọn của hạng 1 theo chi tiêu.','Top spender name, value, or abbreviated value.'],
    ['%solarshop_top_items_name_1% · %solarshop_top_items_value_1%','Tên hoặc số vật phẩm của hạng 1; thứ hạng bắt đầu từ 1.','Top buyer name or item count; ranking starts at 1.'],
    ['%solarshop_balance_vault% · %solarshop_balance_points%','Số dư làm tròn, phụ thuộc hook. Với Shards ưu tiên %solarshards_balance_raw%.','Rounded balance, dependent on the currency hook. For Shards use %solarshards_balance_raw%.'],
    ['%solarshop_limit_personal_left_farm_seed%','Còn lại theo người chơi. Thay farm và seed bằng ID danh mục/mặt hàng không chứa dấu gạch dưới.','Remaining personal limit. Replace farm and seed with category and item IDs without underscores.'],
    ['%solarshop_limit_global_bought_farm_seed%','Số đã mua toàn server. Scope: personal/global; action: bought, max/limit, left/remaining.','Server-wide purchased count. Scopes: personal/global; actions: bought, max/limit, left/remaining.']
  ],
  solarshards:[
    ['%solarshards_balance% · %solarshards_balance_raw%','Số dư dạng số; có bí danh shards và shards_raw.','Raw balance; aliases shards and shards_raw are also available.'],
    ['%solarshards_balance_commas% · %solarshards_balance_formatted%','Số dư phân nhóm hoặc rút gọn; có bí danh shards_commas và shards_formatted.','Grouped or compact balance; aliases shards_commas and shards_formatted are available.'],
    ['%solarshards_currency_name% · %solarshards_currency_symbol%','Tên và ký hiệu tiền tệ.','Currency name and symbol.'],
    ['%solarshards_total% · %solarshards_total_raw%','Tổng Shards trên server, định dạng hoặc số thô.','Server-wide Shards total, formatted or raw.']
  ],
  solarbounty:[
    ['%solarbounty_bounty% · %solarbounty_bounty_formatted% · %solarbounty_bounty_short%','Bounty số thô, định dạng theo locale hoặc dạng K/M/B/T.','Raw bounty, locale-formatted bounty, or compact K/M/B/T.'],
    ['%solarbounty_rank% · %solarbounty_kills%','Thứ hạng và số lần hạ gục hợp lệ.','Rank and eligible kills.'],
    ['%solarbounty_name% · %solarbounty_uuid%','Tên và UUID người chơi.','Player name and UUID.'],
    ['%solarbounty_survival% · %solarbounty_survival_ms% · %solarbounty_survival_seconds% · %solarbounty_survival_minutes%','Thời gian sống dạng hiển thị, mili giây, giây hoặc phút.','Display duration, milliseconds, seconds or minutes.'],
    ['%solarbounty_total%','Số hồ sơ trong snapshot bảng xếp hạng.','Number of profiles in the leaderboard snapshot.'],
    ['%solarbounty_top_1_name% · %solarbounty_top_1_bounty_short%','Tên và bounty rút gọn của hạng 1; thay 1 bằng vị trí cần xem. Có thể dùng các trường trên trừ total.','Name and compact bounty at rank 1; replace 1 with the rank you need. The fields above except total can be used.']
  ]
};
for (const [docs,en] of [[window.SOLAR_DOCS,false],[window.ONIC_ENGLISH,true]]) {
  const t=(vi,english)=>en?english:vi;
  for (const [product,rows] of Object.entries(papiDocs)) {
    const examples={solarshop:'total_items',solarshards:'balance_raw',solarbounty:'bounty_short'};
    docs.push({id:product+'-papi',product,group:t('TÍCH HỢP','INTEGRATIONS'),icon:'%',title:'PlaceholderAPI',
      lead:t('Tra cứu placeholder dùng trong scoreboard, TAB hoặc plugin hỗ trợ PAPI.','Reference for placeholders used in scoreboards, TAB and other PAPI-enabled plugins.'),
      html:'<h2 id="su-dung">'+t('Cách dùng','Usage')+'</h2><p>'+t('Cài PlaceholderAPI và plugin tương ứng, rồi khởi động lại server. Expansion được plugin đăng ký trực tiếp, không cần tải qua eCloud.','Install PlaceholderAPI and the product plugin, then restart. The product registers its own expansion; no eCloud download is needed.')+'</p>'+
        code('PlaceholderAPI','/papi parse me %'+product+'_'+examples[product]+'%')+
        '<h2 id="danh-sach">'+t('Danh sách','Reference')+'</h2>'+table(['Placeholder',t('Kết quả','Result')],rows.map(([key,vi,english])=>['<code>'+esc(key)+'</code>',t(vi,english)]))
    });
  }
}

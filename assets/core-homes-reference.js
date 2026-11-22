window.ONIC_CORE_HOMES_REFERENCE = {
  "solarcore": {
    "commands": {
      "pvp": {
        "description": "Bật hoặc tắt PvP cá nhân",
        "usage": "/pvp [on|off]"
      },
      "combat": {
        "description": "Xem hoặc quản lý trạng thái combat",
        "usage": "/combat [tag <player> [seconds]|clear <player>]"
      },
      "friends": {
        "description": "Bạn bè và lời mời kết bạn",
        "aliases": [
          "friend"
        ],
        "usage": "/friends [add|accept|deny|cancel|remove|follow|unfollow|list|requests|following] [player]"
      },
      "nightvision": {
        "description": "Bật hoặc tắt nhìn trong bóng tối",
        "aliases": [
          "nv"
        ],
        "usage": "/nightvision [on|off]"
      },
      "hide": {
        "description": "Ẩn hoặc hiển thị tên",
        "usage": "/hide [on|off]"
      },
      "settings": {
        "description": "Cài đặt cá nhân tích hợp trong SolarCore",
        "usage": "/settings"
      },
      "leaderboard": {
        "description": "Bảng xếp hạng dạng Dialog",
        "usage": "/leaderboard"
      },
      "servermenu": {
        "description": "Mở menu máy chủ dạng Dialog",
        "usage": "/servermenu [menu]"
      },
      "tpa": {
        "description": "Gửi yêu cầu teleport đến người chơi hoặc xem danh sách yêu cầu",
        "usage": "/tpa [player|list]"
      },
      "tpahere": {
        "description": "Yêu cầu người chơi teleport đến bạn",
        "usage": "/tpahere <player>"
      },
      "tpaccept": {
        "description": "Chấp nhận yêu cầu teleport hoặc mở danh sách yêu cầu",
        "aliases": [
          "tpyes",
          "yes",
          "y"
        ],
        "usage": "/tpaccept [player]"
      },
      "tpdeny": {
        "description": "Từ chối yêu cầu teleport",
        "aliases": [
          "tpno",
          "no",
          "n"
        ],
        "usage": "/tpdeny [player]"
      },
      "tpacancel": {
        "description": "Hủy yêu cầu teleport đang gửi",
        "usage": "/tpacancel"
      },
      "tpatoggle": {
        "description": "Bật/tắt nhận yêu cầu TPA",
        "usage": "/tpatoggle"
      },
      "tpaheretoggle": {
        "description": "Bật/tắt nhận yêu cầu TPAHere",
        "usage": "/tpaheretoggle"
      },
      "tpauto": {
        "description": "Bật/tắt tự động chấp nhận TPA",
        "usage": "/tpauto"
      },
      "setspawn": {
        "description": "Đặt điểm spawn",
        "usage": "/setspawn [number]"
      },
      "spawn": {
        "description": "Teleport về spawn",
        "usage": "/spawn [number]"
      },
      "delspawn": {
        "description": "Xóa điểm spawn",
        "usage": "/delspawn [number]"
      },
      "warp": {
        "description": "Teleport đến warp",
        "usage": "/warp <name>"
      },
      "setwarp": {
        "description": "Tạo warp mới",
        "usage": "/setwarp <name>"
      },
      "delwarp": {
        "description": "Xóa warp",
        "usage": "/delwarp <name>"
      },
      "warps": {
        "description": "Xem danh sách warp",
        "usage": "/warps"
      },
      "rtp": {
        "description": "Teleport ngẫu nhiên",
        "usage": "/rtp [world]"
      },
      "home": {
        "description": "Teleport về home",
        "usage": "/home [name]"
      },
      "sethome": {
        "description": "Đặt home",
        "usage": "/sethome [name]"
      },
      "delhome": {
        "description": "Xóa home",
        "usage": "/delhome [name]"
      },
      "homes": {
        "description": "Xem danh sách home",
        "usage": "/homes"
      },
      "balance": {
        "description": "Xem số dư qua Vault Economy",
        "aliases": [
          "bal"
        ],
        "usage": "/balance [người_chơi]"
      },
      "eco": {
        "description": "Quản lý tiền tài khoản online và offline qua Vault",
        "usage": "/eco <give|take|set|reset> <người_chơi|**> [số_tiền]"
      },
      "baltop": {
        "description": "Xem bảng xếp hạng tiền qua GUI",
        "usage": "/baltop"
      },
      "pay": {
        "description": "Mở dialog pay hoặc chuyển tiền nhanh",
        "usage": "/pay [người_chơi] [số_tiền]"
      },
      "paytoggle": {
        "description": "Bật/tắt cho phép người khác chuyển tiền cho bạn",
        "usage": "/paytoggle"
      },
      "paynotify": {
        "description": "Bật/tắt thông báo khi nhận tiền",
        "usage": "/paynotify"
      },
      "gm": {
        "description": "Đổi chế độ chơi",
        "aliases": [
          "gamemode"
        ],
        "usage": "/gm <survival|creative|adventure|spectator> [người_chơi]"
      },
      "gms": {
        "description": "Chuyển sang Sinh tồn",
        "usage": "/gms [người_chơi]"
      },
      "gmc": {
        "description": "Chuyển sang Sáng tạo",
        "usage": "/gmc [người_chơi]"
      },
      "gma": {
        "description": "Chuyển sang Phiêu lưu",
        "usage": "/gma [người_chơi]"
      },
      "gmsp": {
        "description": "Chuyển sang Khán giả",
        "usage": "/gmsp [người_chơi]"
      },
      "fly": {
        "description": "Bật hoặc tắt bay",
        "usage": "/fly [on|off] [người_chơi]"
      },
      "feed": {
        "description": "Hồi đầy thanh thức ăn",
        "usage": "/feed [người_chơi]"
      },
      "ban": {
        "description": "Cấm người chơi vĩnh viễn",
        "usage": "/ban <người_chơi> [lý_do]"
      },
      "tempban": {
        "description": "Cấm người chơi có thời hạn",
        "usage": "/tempban <người_chơi> <thời_gian> [lý_do]"
      },
      "kick": {
        "description": "Đuổi người chơi khỏi máy chủ",
        "usage": "/kick <người_chơi> [lý_do]"
      },
      "mute": {
        "description": "Cấm hoặc mở chat của người chơi",
        "usage": "/mute <người_chơi> [thời_gian] [lý_do]"
      },
      "unmute": {
        "description": "Gỡ cấm chat",
        "usage": "/unmute <người_chơi>"
      },
      "unban": {
        "description": "Gỡ cấm vào máy chủ",
        "usage": "/unban <người_chơi>"
      },
      "banip": {
        "description": "Cấm địa chỉ IP vĩnh viễn",
        "usage": "/banip <ip|người_chơi_online> [lý_do]"
      },
      "tempbanip": {
        "description": "Cấm địa chỉ IP có thời hạn",
        "usage": "/tempbanip <ip|người_chơi_online> <thời_gian> [lý_do]"
      },
      "unbanip": {
        "description": "Gỡ cấm địa chỉ IP",
        "usage": "/unbanip <ip|người_chơi_online>"
      },
      "flyspeed": {
        "description": "Đổi tốc độ bay từ 0 đến 10",
        "usage": "/flyspeed <tốc_độ> [người_chơi]"
      },
      "solarcore": {
        "description": "Lệnh quản trị SolarCore",
        "usage": "/solarcore [help|reload]"
      },
      "inspect": {
        "description": "Xem danh sách và theo dõi người chơi vi phạm Anti-Cheat",
        "usage": "/inspect"
      },
      "spawnstash": {
        "description": "Tạo stash mồi cấu hình động để phát hiện X-Ray và ESP",
        "usage": "/spawnstash [type|spawn|list|remove]"
      },
      "fakeplayer": {
        "description": "Tạo người chơi mồi bằng packet để phát hiện nhìn xuyên khối",
        "usage": "/fakeplayer"
      },
      "craft": {
        "description": "Mở bàn chế tạo ảo",
        "aliases": [
          "wb"
        ],
        "usage": "/craft"
      },
      "enderchest": {
        "description": "Mở rương Ender ảo",
        "aliases": [
          "ec"
        ],
        "usage": "/enderchest"
      },
      "spawner": {
        "description": "Xem hoặc đổi loại mob trong lồng spawner đang nhìn",
        "usage": "/spawner [tên_mob]"
      },
      "freeze": {
        "description": "Đóng băng người chơi nghi vấn để kiểm tra screenshare",
        "usage": "/freeze <player>"
      },
      "staffmode": {
        "description": "Bật hoặc tắt chế độ staff",
        "usage": "/staffmode [người_chơi]"
      },
      "stafflist": {
        "description": "Xem danh sách staff đang trực tuyến",
        "usage": "/stafflist"
      },
      "vanish": {
        "description": "Bật hoặc tắt tàng hình trong Staff Mode",
        "aliases": [
          "v"
        ],
        "usage": "/vanish [người_chơi]"
      }
    },
    "permissions": {
      "solarcore.pvp": {
        "description": "Cho phép bật/tắt PvP cá nhân",
        "default": true
      },
      "solarcore.combat.admin": {
        "description": "Quản lý combat tag của người chơi",
        "default": "op"
      },
      "solarcore.combat.cooldown.bypass": {
        "description": "Bỏ qua cooldown ngọc Ender, đinh ba và giáo",
        "default": false
      },
      "solarcore.combat.bypass": {
        "description": "Không bị combat tag",
        "default": false
      },
      "solarcore.combat.bypass.commands": {
        "description": "Cho dùng lệnh bị chặn trong combat",
        "default": false
      },
      "solarcore.combat.bypass.teleport": {
        "description": "Cho dịch chuyển trong combat",
        "default": false
      },
      "solarcore.combat.bypass.safezone": {
        "description": "Bỏ lớp chặn ranh giới an toàn trong combat (không bỏ cờ WorldGuard)",
        "default": false
      },
      "solarcore.feed": {
        "default": "op"
      },
      "solarcore.feed.others": {
        "default": "op"
      },
      "solarcore.punishment.ban": {
        "default": "op"
      },
      "solarcore.punishment.tempban": {
        "default": "op"
      },
      "solarcore.punishment.banip": {
        "default": "op"
      },
      "solarcore.punishment.tempbanip": {
        "default": "op"
      },
      "solarcore.punishment.unbanip": {
        "default": "op"
      },
      "solarcore.economy.admin.all": {
        "description": "Cho phép /eco tác động tất cả tài khoản bằng **",
        "default": "op"
      },
      "solarcore.punishment.kick": {
        "default": "op"
      },
      "solarcore.punishment.mute": {
        "default": "op"
      },
      "solarcore.punishment.unban": {
        "default": "op"
      },
      "solarcore.punishment.unmute": {
        "default": "op"
      },
      "solarcore.punishment.notify": {
        "default": "op"
      },
      "solarcore.punishment.exempt": {
        "default": "op"
      },
      "solarcore.punishment.override": {
        "default": false
      },
      "solarcore.fly": {
        "default": "op"
      },
      "solarcore.fly.others": {
        "default": "op"
      },
      "solarcore.flyspeed": {
        "default": "op"
      },
      "solarcore.flyspeed.others": {
        "default": "op"
      },
      "solarcore.social": {
        "default": true
      },
      "solarcore.nightvision": {
        "default": true
      },
      "solarcore.hide": {
        "default": true
      },
      "solarcore.hide.bypass": {
        "default": "op"
      },
      "solarcore.economy.balance": {
        "description": "Xem số dư của mình",
        "default": true
      },
      "solarcore.economy.balance.others": {
        "description": "Xem số dư người chơi khác",
        "default": "op"
      },
      "solarcore.economy.top": {
        "description": "Xem top tiền",
        "default": true
      },
      "solarcore.economy.pay": {
        "description": "Chuyển tiền cho người khác",
        "default": true
      },
      "solarcore.gamemode.survival": {
        "description": "Chuyển sang chế độ Sinh tồn",
        "default": "op"
      },
      "solarcore.economy.admin": {
        "description": "Quản lý số dư qua /eco",
        "default": "op"
      },
      "solarcore.gamemode.creative": {
        "description": "Chuyển sang chế độ Sáng tạo",
        "default": "op"
      },
      "solarcore.gamemode.adventure": {
        "description": "Chuyển sang chế độ Phiêu lưu",
        "default": "op"
      },
      "solarcore.gamemode.spectator": {
        "description": "Chuyển sang chế độ Khán giả",
        "default": "op"
      },
      "solarcore.gamemode.others": {
        "description": "Đổi chế độ chơi của người khác",
        "default": "op"
      },
      "solarcore.staff.mode": {
        "description": "Cho phép bật và sử dụng Staff Mode",
        "default": "op"
      },
      "solarcore.admin.staffmode": {
        "description": "Cho phép quản trị Staff Mode",
        "default": "op"
      },
      "solarcore.staff.mode.vanish": {
        "description": "Cho phép dùng tàng hình trong Staff Mode",
        "default": "op"
      },
      "solarcore.staff.mode.betterview": {
        "description": "Cho phép dùng chế độ quan sát tốt hơn",
        "default": "op"
      },
      "solarcore.staff.mode.stafflist": {
        "description": "Cho phép xem danh sách staff trực tuyến",
        "default": "op"
      },
      "solarcore.staff.mode.randomtp": {
        "description": "Cho phép dịch chuyển đến người chơi ngẫu nhiên",
        "default": "op"
      },
      "solarcore.staff.mode.seevanished": {
        "description": "Cho phép nhìn thấy staff đang tàng hình",
        "default": "op"
      },
      "solarcore.staff.mode.others": {
        "description": "Cho phép bật tắt Staff Mode hoặc vanish cho người khác",
        "default": "op"
      },
      "solarcore.admin.freeze": {
        "description": "Cho phép đóng băng người chơi kiểm tra hack",
        "default": "op"
      },
      "solarcore.inspect.view": {
        "description": "Cho phép mở menu kiểm tra người chơi vi phạm Anti-Cheat",
        "default": "op"
      },
      "solarcore.inspect.alert": {
        "description": "Nhận cảnh báo Sus ngắn gọn khi Anti-Cheat phát hiện vi phạm",
        "default": "op"
      },
      "solarcore.sus.view": {
        "description": "Alias permission for solarcore.inspect.view",
        "default": "op"
      },
      "solarcore.admin.inspect": {
        "description": "Cho phép quản trị và xử lý người chơi vi phạm Anti-Cheat",
        "default": "op"
      },
      "solarcore.warp.use": {
        "description": "Allows using all warps",
        "default": "op"
      },
      "solarcore.warp.list": {
        "description": "Allows listing available warps",
        "default": true
      },
      "solarcore.admin": {
        "description": "Allows access to admin commands",
        "default": "op"
      },
      "solarcore.admin.setspawn": {
        "description": "Allows setting the spawn point",
        "default": "op"
      },
      "solarcore.admin.delspawn": {
        "description": "Allows deleting the spawn point",
        "default": "op"
      },
      "solarcore.command.spawn": {
        "description": "Allows using /spawn command",
        "default": true
      },
      "solarcore.spawn.bypass": {
        "description": "Bypasses spawn teleport countdown",
        "default": "op"
      },
      "solarcore.use": {
        "description": "Allows using TPA commands",
        "default": true
      },
      "solarcore.cooldown.bypass": {
        "description": "Bypasses teleport request cooldowns",
        "default": "op"
      },
      "solarcore.limit.bypass": {
        "description": "Bypasses daily teleport request limits",
        "default": "op"
      },
      "solarcore.rtp.use": {
        "description": "Allows using /rtp command",
        "default": true
      },
      "solarcore.rtp.bypass-cooldown": {
        "description": "Bypasses RTP cooldown",
        "default": "op"
      },
      "solarcore.home.use": {
        "description": "Allows using /home command",
        "default": true
      },
      "solarcore.home.set": {
        "description": "Allows using /sethome command",
        "default": true
      },
      "solarcore.home.delete": {
        "description": "Allows using /delhome command",
        "default": true
      },
      "solarcore.home.list": {
        "description": "Allows using /homes command",
        "default": true
      },
      "solarcore.home.bypass-cooldown": {
        "description": "Bypasses home teleport cooldown",
        "default": "op"
      },
      "solarcore.home.bypass-countdown": {
        "description": "Bypasses home teleport countdown",
        "default": "op"
      },
      "solarcore.sus.tp": {
        "description": "Teleport đến sus player từ GUI",
        "default": "op"
      },
      "solarcore.sus.ban": {
        "description": "Ban sus player từ GUI",
        "default": "op"
      },
      "solarcore.sus.banip": {
        "description": "BanIP sus player từ GUI",
        "default": "op"
      },
      "solarcore.sus.tempban": {
        "description": "Tempban sus player từ GUI",
        "default": "op"
      },
      "solarcore.region.fly": {
        "description": "Cho phép bay trong các khu vực WorldGuard được cấu hình",
        "default": "op"
      },
      "solarcore.region.doublejump": {
        "description": "Cho phép nhảy 2 lần trong các khu vực WorldGuard được cấu hình",
        "default": "op"
      },
      "solarcore.staff.spawnstash": {
        "description": "Cho phép tạo, xem và gỡ SpawnStash",
        "default": "op"
      },
      "solarcore.staff.spawnstash.alert": {
        "description": "Nhận cảnh báo khi người chơi kích hoạt SpawnStash",
        "default": "op"
      },
      "solarcore.staff.spawnstash.bypass": {
        "description": "Bỏ qua phát hiện SpawnStash",
        "default": "op"
      },
      "solarcore.admin.spawnstash": {
        "description": "Cho phép quản trị và gỡ toàn bộ SpawnStash",
        "default": "op"
      },
      "solarcore.staff.fakeplayer": {
        "description": "Cho phép tạo FakePlayer mồi",
        "default": "op"
      },
      "solarcore.staff.fakeplayer.alert": {
        "description": "Nhận cảnh báo phát hiện từ FakePlayer",
        "default": "op"
      },
      "solarcore.staff.fakeplayer.bypass": {
        "description": "Bỏ qua phát hiện FakePlayer",
        "default": "op"
      },
      "solarcore.command.craft": {
        "description": "Cho phép mở bàn chế tạo ảo (/craft)",
        "default": "op"
      },
      "solarcore.command.enderchest": {
        "description": "Cho phép mở rương Ender ảo (/enderchest)",
        "default": "op"
      },
      "solarcore.command.spawner": {
        "description": "Cho phép xem và đổi loại mob trong lồng spawner (/spawner)",
        "default": "op"
      }
    },
    "files": [
      "config.yml",
      "dialog/friends-dialog.yml",
      "dialog/home-dialog.yml",
      "dialog/leaderboard-dialog.yml",
      "dialog/pay-dialog.yml",
      "dialog/server-menu.yml",
      "dialog/settings-dialog.yml",
      "gui/economy-gui.yml",
      "gui/home-gui.yml",
      "gui/inspect-gui.yml",
      "gui/leaderboard-gui.yml",
      "gui/rtp-gui.yml",
      "gui/settings-gui.yml",
      "gui/spawn-gui.yml",
      "gui/staff-mode-gui.yml",
      "gui/tpa-gui.yml",
      "gui/tpa-list-gui.yml",
      "gui/tpahere-gui.yml",
      "messages.yml",
      "modules/combat.yml",
      "modules/command_hide.yml",
      "modules/freeze.yml",
      "modules/hide.yml",
      "modules/home.yml",
      "modules/inspect.yml",
      "modules/nightvision.yml",
      "modules/region_flight.yml",
      "modules/rtp.yml",
      "modules/server_links.yml",
      "modules/settings.yml",
      "modules/social.yml",
      "modules/spawn-stash.yml",
      "modules/spawn.yml",
      "modules/staff-mode.yml",
      "modules/tpa.yml",
      "modules/warps.yml",
      "sounds.yml"
    ]
  },
  "onichomes": {
    "commands": {
      "home": {
        "description": "Dịch chuyển tới nhà hoặc mở menu quản lý.",
        "usage": "/home [tên]",
        "aliases": [
          "h"
        ]
      },
      "homes": {
        "description": "Mở giao diện menu danh sách nhà.",
        "usage": "/homes [tên]"
      },
      "sethome": {
        "description": "Thiết lập vị trí hiện tại thành nhà của bạn.",
        "usage": "/sethome <tên>"
      },
      "delhome": {
        "description": "Xóa dữ liệu một nhà đã lưu.",
        "usage": "/delhome <tên>"
      },
      "onichomes": {
        "description": "Lệnh quản trị cấu hình plugin OnicHomes.",
        "usage": "/onichomes reload",
        "aliases": [
          "oh",
          "ethanhome"
        ]
      }
    },
    "permissions": {
      "home.admin": {
        "description": "Quyền quản trị plugin OnicHomes và không giới hạn số lượng home.",
        "default": "op"
      },
      "home.default": {
        "description": "Quyền giới hạn home mặc định cho người chơi.",
        "default": true
      }
    },
    "files": [
      "Gui/delete.yml",
      "Gui/mainmenu.yml",
      "Gui/manage.yml",
      "Gui/materials.yml",
      "Gui/rename.yml",
      "Language/Vi.yml",
      "settings.yml"
    ]
  },
  "services": {
    "CombatAPI": [
      "boolean isTagged(UUID player)",
      "int remainingSeconds(UUID player)",
      "String opponentName(UUID player)",
      "CompletableFuture<Boolean> clear(Player player)"
    ],
    "HomeAPI": [
      "Map<String, Location> getHomes(Player player)",
      "Location getHome(Player player, String name)",
      "boolean hasHome(Player player, String name)",
      "int getHomeCount(Player player)",
      "int getMaxHomes(Player player)",
      "boolean canSetMoreHomes(Player player)",
      "SetHomeResult setHome(Player player, String name)",
      "boolean setHomeForce(Player player, String name, Location location)",
      "boolean deleteHome(Player player, String name)",
      "void teleportHome(Player player, String name)",
      "boolean isOnCooldown(Player player)",
      "long getRemainingCooldown(Player player)",
      "void setCooldown(Player player)",
      "void loadHomes(Player player)",
      "void unloadHomes(Player player)"
    ],
    "RtpAPI": [
      "void startRtp(Player player, String worldName)",
      "void findRandomLocation(String worldName, LocationCallback callback)",
      "void onSuccess(Location location)",
      "void onFail(RTPManager.FailReason reason)",
      "boolean isActive(Player player)",
      "int getActiveCount()",
      "boolean isOnCooldown(Player player, String worldName)",
      "long getRemainingCooldown(Player player, String worldName)",
      "void setCooldown(Player player, String worldName)",
      "int getMaxActivePlayers()",
      "boolean isWorldConfigured(String worldName)",
      "int getMaxRadius(String worldName)",
      "int getMinRadius(String worldName)",
      "int getCooldown(String worldName)"
    ],
    "SpawnAPI": [
      "Location getSpawnLocation()",
      "Location getSpawnLocation(int number)",
      "boolean hasSpawn()",
      "boolean hasSpawn(int number)",
      "int getPlayersNearSpawn(int spawnNumber, double radius)",
      "void setSpawn(int number, Location location, Player player)",
      "void deleteSpawn(int number, Player player)",
      "void teleport(Player player)",
      "void teleport(Player player, int number)"
    ],
    "SusAPI": [
      "void recordFlag(String uuid, String playerName, String checkName)",
      "CompletableFuture<List<SusEntry>> getSortedEntries(SortMode mode)",
      "void invalidateCache()",
      "String getUuid()",
      "String getPlayerName()",
      "int getTotalFlags()",
      "String getTopCheck()",
      "long getFirstFlag()",
      "long getLastFlag()",
      "java.util.Map<String, Integer> getCheckCounts()"
    ],
    "TpaAPI": [
      "boolean isTpaEnabled(Player player)",
      "void setTpaEnabled(Player player, boolean enabled)",
      "boolean isTpaHereEnabled(Player player)",
      "void setTpaHereEnabled(Player player, boolean enabled)",
      "boolean isAutoAcceptEnabled(Player player)",
      "void setAutoAcceptEnabled(Player player, boolean enabled)",
      "RequestResult sendRequest(Player sender, Player target)",
      "RequestResult sendHereRequest(Player sender, Player target)",
      "boolean sendRequestForce(Player sender, Player target, boolean tpaHere)",
      "RequestResult validate(Player sender, Player target, boolean tpaHere)",
      "boolean acceptRequest(Player target, Player sender)",
      "boolean acceptLatestRequest(Player target)",
      "void acceptAllRequests(Player target)",
      "boolean denyRequest(Player target, Player sender)",
      "boolean denyLatestRequest(Player target)",
      "void denyAllRequests(Player target)",
      "boolean cancelRequest(Player sender, Player target)",
      "void cancelAllOutgoingRequests(Player sender)",
      "void cancelPendingTeleport(Player player)",
      "boolean hasPendingRequest(Player target)",
      "int getPendingRequestCount(Player target)",
      "List<TpaRequest> getPendingRequests(Player target)",
      "List<TpaRequest> getOutgoingRequests(Player sender)",
      "Optional<TpaRequest> getRequest(Player sender, Player target)",
      "boolean hasRequestTo(Player sender, Player target)",
      "boolean hasPendingTeleport(Player player)",
      "boolean isOnCooldown(Player sender, Player target)",
      "long getRemainingCooldown(Player sender, Player target)",
      "int getRemainingDailyLimit(Player sender, Player target)",
      "int getRequestExpirationTime()",
      "int getTeleportCountdown()",
      "int getCooldownTime()",
      "int getDailyLimit()",
      "boolean isWorldBlacklisted(String worldName)"
    ],
    "WarpAPI": [
      "boolean exists(String name)",
      "Location getWarp(String name)",
      "Set<String> getWarpNames()",
      "int getWarpCount()",
      "void setWarp(String name, Location location)",
      "void deleteWarp(String name)",
      "void teleport(Player player, String name)"
    ]
  },
  "events": [
    "TPAAcceptEvent",
    "TPACancelEvent",
    "TPADenyEvent",
    "TPAExpireEvent",
    "TPARequestEvent",
    "TPAToggleEvent",
    "TPAutoToggleEvent",
    "TeleportCompleteEvent"
  ]
};

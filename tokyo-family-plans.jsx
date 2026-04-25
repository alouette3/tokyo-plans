import { useState } from "react";

// 110+ spots covering all keywords including 東京 and 本
const spots = [
  // ===== 本日限定 (TODAY ONLY) =====
  { id: 1, name: "KK線 Roof Park Fes", area: "銀座・汐留", time: "終日", duration: 3, kw: ["東京","非日常","運動","散歩","音楽","自然","新しい","本日","新規"], emoji: "🛣️", url: "https://www.metro.tokyo.lg.jp/information/press/2026/03/2026031914", desc: "旧高速道路を歩行者開放する2日間限定イベント。朝ヨガ・ライブ・夜シネマ", color: "#FF6B35", today: true, family: 4, cost: "無料" },
  { id: 2, name: "エリック・カール展 開幕初日", area: "東京", time: "10:00〜", duration: 2, kw: ["東京","アート","非日常","新規","オープン","本日","空間"], emoji: "🐛", url: "https://www.tokyofes.info/", desc: "本日4/25が開幕初日！はらぺこあおむしの世界に飛び込む", color: "#4CAF50", today: true, family: 5, cost: "有料" },
  { id: 3, name: "代々木公園 SHIBUYA CROSS-CULTURE FEST", area: "代々木", time: "12:00〜22:00", duration: 3, kw: ["東京","音楽","自然","散歩","食事","リフレッシュ","非日常","本日"], emoji: "🎪", url: "https://www.yoyogikoen.info/", desc: "新緑の公園で音楽・カルチャー・グルメが融合した無料フェス", color: "#2196F3", today: true, family: 5, cost: "無料" },
  { id: 4, name: "隅田公園 サルサストリート2026", area: "両国・浅草", time: "10:00〜19:00", duration: 2, kw: ["東京","音楽","散歩","食事","非日常","自然","リフレッシュ","本日"], emoji: "💃", url: "https://report.iko-yo.net/articles/31042", desc: "ラテン音楽生演奏！川辺の春風を感じる屋台フェス", color: "#FF9800", today: true, family: 5, cost: "無料" },
  { id: 5, name: "全肉祭 in 東京 (大島小松川公園)", area: "江東区", time: "10:00〜21:00", duration: 3, kw: ["東京","食事","音楽","自然","運動","散歩","本日"], emoji: "🥩", url: "https://report.iko-yo.net/articles/31042", desc: "全国グルメ屋台＋ライブ＋子ども向け遊具", color: "#F44336", today: true, family: 5, cost: "無料" },
  { id: 6, name: "昭和記念公園 シャボン玉フォトジェニック", area: "立川", time: "時間限定", duration: 4, kw: ["東京","自然","運動","散歩","リフレッシュ","本日","空間"], emoji: "🫧", url: "https://www.showakinen-koen.jp/event/", desc: "本日限定シャボン玉演出×菜の花畑×広大な芝生", color: "#9C27B0", today: true, family: 5, cost: "入園料" },
  { id: 7, name: "アーク・ヒルズマルシェ", area: "六本木一丁目", time: "10:00〜14:00", duration: 1.5, kw: ["東京","食事","散歩","自然","本日","新しい"], emoji: "🥦", url: "https://www.arkhills.com/hillsmarche/", desc: "毎週土曜のマルシェ。本日も開催。旬の野菜・パン・花", color: "#F57F17", today: true, family: 4, cost: "無料" },
  { id: 8, name: "銀座ぽちっと蚤の市", area: "銀座", time: "10:00〜", duration: 1.5, kw: ["東京","雑貨","散歩","本日","商業施設"], emoji: "🐠", url: "https://antique-leaves.com/", desc: "本日・明日開催のヴィンテージ雑貨蚤の市", color: "#AD1457", today: true, family: 4, cost: "無料" },
  { id: 9, name: "下北沢フリーマーケット", area: "下北沢", time: "10:00〜", duration: 2, kw: ["東京","雑貨","散歩","本日","商業施設"], emoji: "🎸", url: "https://antique-leaves.com/", desc: "本日〜日曜開催。古着・古本・ハンドメイド", color: "#4E342E", today: true, family: 3, cost: "無料" },
  { id: 10, name: "お江戸レトロ市 (日本橋)", area: "日本橋", time: "11:00〜18:00", duration: 1.5, kw: ["東京","雑貨","散歩","本日","アート"], emoji: "🏮", url: "https://antique-leaves.com/", desc: "本日まで日本橋地下歩道でレトロ雑貨マーケット", color: "#795548", today: true, family: 3, cost: "無料" },
  { id: 11, name: "AmberS 初日公演 (有明)", area: "有明", time: "夕〜夜", duration: 3, kw: ["東京","音楽","非日常","新規","オープン","食事","本日"], emoji: "🎬", url: "https://tdp.tv-asahi.co.jp/", desc: "EXシアター有明 こけら落とし作品が本日初日", color: "#4A148C", today: true, family: 2, cost: "有料" },
  { id: 12, name: "HIBIYA LIVE FESTIVAL 2026 開幕", area: "日比谷", time: "終日", duration: 2.5, kw: ["東京","音楽","非日常","新規","本日","商業施設","食事"], emoji: "🎤", url: "https://tabiiro.jp/higaeri/article/kantou-gw-event/", desc: "東京ミッドタウン日比谷で本日開幕！屋根付特設ステージで音楽ライブ", color: "#1E88E5", today: true, family: 4, cost: "無料〜" },
  { id: 13, name: "VR火星旅行『THE SUNSET OF MARS』", area: "お台場", time: "終日", duration: 1.5, kw: ["東京","非日常","新しい","新規","本日","空間","アート"], emoji: "🚀", url: "https://www.tokyo-odaiba.net/pickup/gw/", desc: "本日4/25スタート！最新VRで火星探索体験", color: "#D84315", today: true, family: 4, cost: "有料" },
  { id: 14, name: "アイスクリーム万博 あいぱく Premium", area: "新宿", time: "11:00〜19:30", duration: 1.5, kw: ["東京","食事","商業施設","新規","空間"], emoji: "🍦", url: "https://report.iko-yo.net/articles/31055", desc: "新宿住友ビル三角広場で全国アイスが集結", color: "#26C6DA", today: false, family: 5, cost: "有料" },
  { id: 15, name: "東京都現代美術館「100年連れ添う家具」展", area: "清澄白河", time: "10:00〜18:00", duration: 2, kw: ["東京","アート","空間","散歩","新規"], emoji: "🪑", url: "https://www.mot-art-museum.jp/", desc: "宇宙×量子×芸術の没入型展覧会も同時開催中", color: "#311B92", today: false, family: 4, cost: "1,800円" },

  // ===== 新規オープン 2026 =====
  { id: 16, name: "MoN Takanawa ミュージアム本体", area: "高輪ゲートウェイ", time: "10:00〜18:00", duration: 2.5, kw: ["東京","アート","新規","オープン","空間","本","非日常"], emoji: "🏛️", url: "https://montakanawa.jp/", desc: "3/28開館。隈研吾設計の螺旋ミュージアム。ぐるぐる展開催中", color: "#607D8B", today: false, family: 4, cost: "有料" },
  { id: 17, name: "MoN Park Cafe by Spiral", area: "高輪ゲートウェイ", time: "9:00〜20:00", duration: 1, kw: ["東京","カフェ","新規","オープン","散歩","食事"], emoji: "☕", url: "https://montakanawa.jp/facilities/park_cafe/", desc: "公園隣接のテイクアウトカフェ。スパイラルコロネが名物", color: "#5D4037", today: false, family: 5, cost: "1,000円〜" },
  { id: 18, name: "MoN ルーフトップ LAUBE", area: "高輪ゲートウェイ", time: "11:00〜23:00", duration: 2, kw: ["東京","食事","高級","空間","新規","オープン","リラックス"], emoji: "🌆", url: "https://montakanawa.jp/", desc: "草陰の小屋がコンセプト。線路ビューと薬草モクテル", color: "#263238", today: false, family: 3, cost: "高め" },
  { id: 19, name: "MoNライブラリー (巨大本棚)", area: "高輪ゲートウェイ", time: "10:00〜18:00", duration: 1, kw: ["東京","本","アート","新規","オープン","空間","リラックス"], emoji: "📚", url: "https://montakanawa.jp/", desc: "Box1000の壁2面を使った巨大本棚で読書空間体験", color: "#37474F", today: false, family: 3, cost: "館内" },
  { id: 20, name: "TOKYO STATION CAFE -THE NORTH DOME-", area: "東京駅", time: "8:00〜21:00", duration: 1.5, kw: ["東京","カフェ","高級","空間","新規","オープン","アート","食事"], emoji: "🚂", url: "https://prtimes.jp/main/html/rd/p/000001069.000082978.html", desc: "4/21オープン！1914年竣工の重要文化財空間カフェ", color: "#8D6E63", today: false, family: 3, cost: "中〜高" },
  { id: 21, name: "東京駅 ステーションギャラリー", area: "東京駅", time: "10:00〜18:00", duration: 1.5, kw: ["東京","アート","空間","散歩"], emoji: "🖼️", url: "https://www.ejrcf.or.jp/gallery/", desc: "東京駅丸の内駅舎の煉瓦壁が美しいアートスペース", color: "#6D4C41", today: false, family: 3, cost: "有料" },
  { id: 22, name: "TOKYO DREAM PARK (有明)", area: "有明", time: "終日", duration: 3, kw: ["東京","音楽","アート","非日常","新規","オープン","食事","商業施設"], emoji: "🎭", url: "https://tdp.tv-asahi.co.jp/", desc: "テレ朝の新エンタメ拠点。100体ドラえもん展示中", color: "#3F51B5", today: false, family: 5, cost: "一部有料" },
  { id: 23, name: "100％ドラえもん＆フレンズ in 東京", area: "有明", time: "終日", duration: 2, kw: ["東京","アート","非日常","新規","オープン","空間"], emoji: "🐱", url: "https://tdp.tv-asahi.co.jp/", desc: "TOKYO DREAM PARK内、史上最大級ドラえもんイベント", color: "#1976D2", today: false, family: 5, cost: "有料" },
  { id: 24, name: "大井町トラックス", area: "大井町", time: "終日", duration: 3, kw: ["東京","商業施設","食事","散歩","新規","オープン","リラックス"], emoji: "🏙️", url: "https://www.fashion-press.net/news/137171", desc: "3/28 開業。約80店舗＋映画館＋緑のパーク", color: "#009688", today: false, family: 4, cost: "無料〜" },
  { id: 25, name: "品川インターシティ よなよな東京ブルワリー", area: "品川", time: "11:00〜23:00", duration: 2, kw: ["東京","食事","新規","オープン","商業施設","非日常"], emoji: "🍺", url: "https://www.fashion-press.net/news/137171", desc: "駅直結ブルワリー日本最大級。36種クラフトビール", color: "#00897B", today: false, family: 3, cost: "中〜高" },
  { id: 26, name: "六本木ヒルズ 春のリニューアル", area: "六本木", time: "10:00〜20:00", duration: 2, kw: ["東京","商業施設","新規","オープン","高級","食事","散歩"], emoji: "🛍️", url: "https://www.fashion-press.net/news/137171", desc: "新店舗続々オープン。日本初出店ブランドも", color: "#0097A7", today: false, family: 3, cost: "無料〜" },
  { id: 27, name: "代官山 カフェディオール バンブー", area: "代官山", time: "11:00〜", duration: 1.5, kw: ["東京","カフェ","高級","空間","食事","新規","オープン"], emoji: "🌺", url: "https://www.fashion-press.net/news/145190", desc: "ミシュラン女性シェフ監修。竹林に囲まれた幻想空間", color: "#BF360C", today: false, family: 3, cost: "高め" },
  { id: 28, name: "西武池袋 ラルフズコーヒー", area: "池袋", time: "10:00〜21:00", duration: 1, kw: ["東京","カフェ","新規","オープン","商業施設","空間","高級"], emoji: "🐎", url: "https://www.fashion-press.net/news/145190", desc: "ラルフローレンのコーヒーショップが2026年オープン", color: "#1B5E20", today: false, family: 3, cost: "中〜高" },
  { id: 29, name: "虎ノ門ヒルズ マグマブックス", area: "虎ノ門", time: "10:00〜21:00", duration: 2, kw: ["東京","本","新規","空間","リラックス","商業施設","カフェ"], emoji: "🌋", url: "https://www.timeout.jp/tokyo/ja/things-to-do/7-book-lounge-in-tokyo", desc: "丸善ジュンク堂の新業態。テーマ別編集型本棚＋ラウンジ", color: "#E65100", today: false, family: 3, cost: "1,800〜" },
  { id: 30, name: "豊洲千客万来 万葉倶楽部", area: "豊洲", time: "終日", duration: 3, kw: ["東京","リラックス","リフレッシュ","食事","空間","新規","非日常","高級"], emoji: "♨️", url: "https://www.toyosu-senkyakubanrai.jp/", desc: "豊洲市場直送の鮮魚＋天然温泉でリフレッシュ", color: "#0D47A1", today: false, family: 4, cost: "高め" },

  // ===== アート/美術館 =====
  { id: 31, name: "アーティゾン美術館 モネ展", area: "京橋", time: "10:00〜18:00", duration: 2, kw: ["東京","アート","高級","空間","散歩"], emoji: "🎨", url: "https://www.artizon.museum/", desc: "オルセー美術館からモネ傑作140点が来日。5/24まで", color: "#E91E63", today: false, family: 3, cost: "2,100円" },
  { id: 32, name: "国立新美術館 テート美術館展", area: "六本木", time: "10:00〜18:00", duration: 2, kw: ["東京","アート","散歩","空間"], emoji: "🖼️", url: "https://www.nact.jp/", desc: "90s英国アート60名100点展示。5/11まで", color: "#880E4F", today: false, family: 3, cost: "2,300円" },
  { id: 33, name: "六本木ヒルズ「チ。」展望台", area: "六本木", time: "10:00〜22:00", duration: 2, kw: ["東京","アート","非日常","空間","音楽","高級"], emoji: "⭐", url: "https://www.roppongihills.com/", desc: "MEGASTAR星空シアター×マンガ展示×夜景", color: "#1A237E", today: false, family: 4, cost: "有料" },
  { id: 34, name: "アートアクアリウム美術館 GINZA", area: "銀座", time: "10:00〜19:00", duration: 1.5, kw: ["東京","アート","空間","非日常","音楽"], emoji: "🐠", url: "https://artaquarium.jp/", desc: "光と音楽と金魚の幻想的アート空間", color: "#26A69A", today: false, family: 5, cost: "有料" },
  { id: 35, name: "東京都美術館 開館100周年", area: "上野", time: "9:30〜17:30", duration: 2, kw: ["東京","アート","新しい","空間","散歩","自然"], emoji: "🏛️", url: "https://tabiiro.jp/higaeri/article/kantou-gw-event/", desc: "1926年開館の名美術館。アンドリュー・ワイエス展も", color: "#5E35B1", today: false, family: 3, cost: "有料" },
  { id: 36, name: "国立科学博物館 危険生物特別展", area: "上野", time: "9:00〜17:00", duration: 2.5, kw: ["東京","アート","非日常","空間","本"], emoji: "🦂", url: "https://www.walkerplus.com/event_list/0425/ar0313/", desc: "危険生物の必殺技を科学的視点で。6/14まで", color: "#33691E", today: false, family: 5, cost: "有料" },
  { id: 37, name: "ピクサーの世界展 in 豊洲", area: "豊洲", time: "10:00〜21:00", duration: 2, kw: ["東京","アート","非日常","空間","新規"], emoji: "🎬", url: "https://www.fashion-press.net/news/133184", desc: "映画のワンシーン実物大再現。日本初上陸", color: "#0288D1", today: false, family: 5, cost: "有料" },
  { id: 38, name: "東京都庭園美術館", area: "目黒", time: "10:00〜18:00", duration: 2, kw: ["東京","アート","自然","散歩","空間","リラックス","高級"], emoji: "🌳", url: "https://www.teien-art-museum.ne.jp/", desc: "アール・デコ建築×日本庭園の優雅な空間", color: "#558B2F", today: false, family: 3, cost: "有料" },
  { id: 39, name: "森美術館", area: "六本木", time: "10:00〜22:00", duration: 2, kw: ["東京","アート","空間","非日常","高級"], emoji: "🗻", url: "https://www.mori.art.museum/", desc: "六本木ヒルズ最上階の現代アート美術館", color: "#4A148C", today: false, family: 3, cost: "有料" },
  { id: 40, name: "21_21 DESIGN SIGHT", area: "六本木", time: "10:00〜19:00", duration: 1.5, kw: ["東京","アート","空間","散歩","新しい"], emoji: "🔷", url: "http://www.2121designsite.jp/", desc: "安藤忠雄＋三宅一生のデザインミュージアム", color: "#01579B", today: false, family: 3, cost: "有料" },
  { id: 41, name: "すみだ北斎美術館", area: "両国", time: "9:30〜17:30", duration: 1.5, kw: ["東京","アート","空間","散歩","本"], emoji: "🌊", url: "https://hokusai-museum.jp/", desc: "葛飾北斎の世界を体感する近未来建築", color: "#0277BD", today: false, family: 4, cost: "有料" },

  // ===== カフェ・ブックカフェ =====
  { id: 42, name: "六本木 文喫", area: "六本木", time: "9:00〜23:00", duration: 3, kw: ["東京","本","カフェ","空間","リラックス","高級"], emoji: "📖", url: "https://bunkitsu.jp/", desc: "3万冊のブックカフェ。入場料制でゆったり", color: "#3E2723", today: false, family: 3, cost: "1,650円〜" },
  { id: 43, name: "代官山 蔦屋書店", area: "代官山", time: "9:00〜22:00", duration: 2, kw: ["東京","本","カフェ","空間","リラックス","散歩"], emoji: "📕", url: "https://store.tsite.jp/daikanyama/", desc: "森に囲まれた書店×カフェ。Anjinラウンジも", color: "#4E342E", today: false, family: 3, cost: "無料〜" },
  { id: 44, name: "下北沢 BONUS TRACK", area: "下北沢", time: "10:00〜22:00", duration: 2, kw: ["東京","本","カフェ","散歩","雑貨","新しい","リラックス"], emoji: "🎵", url: "https://bonus-track.net/", desc: "本屋B&B＋個性派カフェが集まる新スポット", color: "#6A1B9A", today: false, family: 3, cost: "無料〜" },
  { id: 45, name: "神保町 ブックハウスカフェ", area: "神保町", time: "11:00〜18:00", duration: 1.5, kw: ["東京","本","カフェ","空間","リラックス"], emoji: "👶", url: "https://bookhousecafe.jp/", desc: "神保町唯一の子どもの本専門店＆カフェ", color: "#FF6F00", today: false, family: 5, cost: "中" },
  { id: 46, name: "神保町 さぼうる/ラドリオ", area: "神保町", time: "11:00〜21:00", duration: 1, kw: ["東京","カフェ","リラックス","本","散歩"], emoji: "☕", url: "https://jimbou.info/", desc: "神保町の老舗珈琲店。古書街散策のお供に", color: "#5D4037", today: false, family: 3, cost: "中" },
  { id: 47, name: "渋谷 森の図書室", area: "渋谷", time: "11:00〜23:00", duration: 2, kw: ["東京","本","カフェ","空間","リラックス","食事"], emoji: "🌲", url: "https://www.enjoytokyo.jp/article/106793/", desc: "1万冊の本×フリードリンク。ぐりとぐらのカステラ", color: "#1B5E20", today: false, family: 4, cost: "1,500円〜" },
  { id: 48, name: "高円寺 アール座読書館", area: "高円寺", time: "13:30〜22:30", duration: 2, kw: ["東京","本","カフェ","空間","リラックス","自然"], emoji: "🌿", url: "https://www.enjoytokyo.jp/article/106793/", desc: "私語厳禁の緑あふれる癒し空間。1500冊", color: "#33691E", today: false, family: 2, cost: "中" },
  { id: 49, name: "蔵前 カキモリ", area: "蔵前", time: "12:00〜18:00", duration: 1, kw: ["東京","雑貨","散歩","リラックス","本"], emoji: "✒️", url: "https://kakimori.com/", desc: "オリジナルノート作り体験ができる文具店", color: "#33691E", today: false, family: 4, cost: "中" },
  { id: 50, name: "蔵前 ダンデライオンチョコレート", area: "蔵前", time: "10:00〜20:00", duration: 1, kw: ["東京","カフェ","食事","新しい","空間"], emoji: "🍫", url: "https://dandelionchocolate.jp/", desc: "Bean to Barのクラフトチョコ専門店", color: "#3E2723", today: false, family: 4, cost: "中" },
  { id: 51, name: "丸の内 SHARE LOUNGE", area: "丸の内", time: "8:00〜23:00", duration: 2, kw: ["東京","本","カフェ","空間","リラックス","新しい"], emoji: "📰", url: "https://www.timeout.jp/tokyo/ja/things-to-do/7-book-lounge-in-tokyo", desc: "TSUTAYAの本×ラウンジ×ワーク空間", color: "#37474F", today: false, family: 2, cost: "1,650円〜" },
  { id: 52, name: "兜町 Book Lounge Kable", area: "茅場町", time: "10:00〜21:00", duration: 2, kw: ["東京","本","空間","リラックス","新しい"], emoji: "💼", url: "https://www.timeout.jp/tokyo/ja/things-to-do/7-book-lounge-in-tokyo", desc: "3000冊のビジネス系ブックラウンジ", color: "#1A237E", today: false, family: 2, cost: "880円〜" },
  { id: 53, name: "原宿 Books Bunny", area: "原宿", time: "11:00〜23:00", duration: 1.5, kw: ["東京","本","カフェ","食事","空間","リラックス"], emoji: "🐰", url: "https://www.timeout.jp/tokyo/ja/restaurant/bookcafe", desc: "ウサギ看板の異色ブックカフェ＆バー", color: "#AD1457", today: false, family: 2, cost: "中" },
  { id: 54, name: "自由が丘 BLUE BOOKS cafe", area: "自由が丘", time: "11:00〜23:00", duration: 1.5, kw: ["東京","本","カフェ","音楽","食事","空間","リラックス"], emoji: "🎶", url: "https://www.enjoytokyo.jp/theme/ranking/cat010102/", desc: "音楽×本×食が融合する大人の食堂", color: "#0D47A1", today: false, family: 3, cost: "中〜高" },

  // ===== 自然・公園 =====
  { id: 55, name: "新宿御苑", area: "新宿", time: "9:00〜18:00", duration: 2, kw: ["東京","自然","散歩","運動","リフレッシュ","リラックス","空間"], emoji: "🌸", url: "https://fng.or.jp/shinjuku/", desc: "都心とは思えない広大な日本庭園", color: "#43A047", today: false, family: 5, cost: "500円" },
  { id: 56, name: "上野恩賜公園", area: "上野", time: "終日", duration: 2, kw: ["東京","自然","散歩","運動","リフレッシュ","アート"], emoji: "🌳", url: "https://www.uenopark.info/", desc: "美術館・博物館・動物園が集まる文化公園", color: "#558B2F", today: false, family: 5, cost: "無料" },
  { id: 57, name: "代々木公園", area: "原宿", time: "終日", duration: 2, kw: ["東京","自然","散歩","運動","リフレッシュ","音楽"], emoji: "🌲", url: "https://www.yoyogikoen.info/", desc: "都心最大級の公園。広い芝生でピクニック", color: "#689F38", today: false, family: 5, cost: "無料" },
  { id: 58, name: "皇居外苑ランニング", area: "皇居", time: "終日", duration: 1.5, kw: ["東京","運動","自然","散歩","リフレッシュ"], emoji: "🏃", url: "https://www.env.go.jp/garden/kokyogaien/", desc: "東京を代表する5kmランニングコース", color: "#1B5E20", today: false, family: 3, cost: "無料" },
  { id: 59, name: "井の頭恩賜公園", area: "吉祥寺", time: "終日", duration: 2.5, kw: ["東京","自然","散歩","運動","リフレッシュ","リラックス"], emoji: "🦢", url: "https://www.kensetsu.metro.tokyo.lg.jp/jimusho/seibuk/inokashira/", desc: "ボート＆動物園あり。家族の定番散歩", color: "#388E3C", today: false, family: 5, cost: "無料" },
  { id: 60, name: "等々力渓谷", area: "等々力", time: "終日", duration: 1.5, kw: ["東京","自然","散歩","リフレッシュ","リラックス","非日常"], emoji: "🍃", url: "https://www.city.setagaya.lg.jp/", desc: "23区唯一の渓谷。都心とは思えない自然空間", color: "#2E7D32", today: false, family: 4, cost: "無料" },
  { id: 61, name: "浜離宮恩賜庭園", area: "汐留", time: "9:00〜17:00", duration: 1.5, kw: ["東京","自然","散歩","リラックス","空間","高級"], emoji: "🌷", url: "https://www.tokyo-park.or.jp/teien/contents/hama-rikyu.html", desc: "潮入の池がある江戸の大名庭園。お茶屋も", color: "#1565C0", today: false, family: 4, cost: "300円" },
  { id: 62, name: "六義園", area: "駒込", time: "9:00〜17:00", duration: 1.5, kw: ["東京","自然","散歩","リラックス","空間","高級"], emoji: "🍵", url: "https://www.tokyo-park.or.jp/teien/contents/rikugien.html", desc: "回遊式日本庭園の最高峰。茶会も", color: "#827717", today: false, family: 3, cost: "300円" },
  { id: 63, name: "明治神宮", area: "原宿", time: "5:30〜18:00", duration: 1.5, kw: ["東京","自然","散歩","リフレッシュ","空間","非日常"], emoji: "⛩️", url: "https://www.meijijingu.or.jp/", desc: "都心の鎮守の杜。原始林のような厳かな空間", color: "#3E2723", today: false, family: 4, cost: "無料" },
  { id: 64, name: "高尾山", area: "高尾", time: "終日", duration: 5, kw: ["東京","自然","運動","散歩","リフレッシュ","非日常"], emoji: "⛰️", url: "https://www.takaotozan.co.jp/", desc: "ミシュラン三つ星！家族で気軽に登山", color: "#1B5E20", today: false, family: 5, cost: "無料〜" },
  { id: 65, name: "葛西臨海公園", area: "葛西", time: "終日", duration: 3, kw: ["東京","自然","散歩","運動","リフレッシュ"], emoji: "🌊", url: "https://www.tokyo-park.or.jp/park/format/index030.html", desc: "東京湾を望む大規模公園＋水族園", color: "#0277BD", today: false, family: 5, cost: "無料" },
  { id: 66, name: "昭和記念公園", area: "立川", time: "9:30〜17:00", duration: 4, kw: ["東京","自然","運動","散歩","リフレッシュ","空間"], emoji: "🌼", url: "https://www.showakinen-koen.jp/", desc: "東京ドーム約40個分の広大な国営公園", color: "#558B2F", today: false, family: 5, cost: "入園料" },

  // ===== 商業施設 =====
  { id: 67, name: "東京ミッドタウン日比谷", area: "日比谷", time: "11:00〜21:00", duration: 2, kw: ["東京","商業施設","食事","散歩","新しい","音楽"], emoji: "🏢", url: "https://www.hibiya.tokyo-midtown.com/", desc: "HIBIYA LIVE FESTIVAL 2026開幕！本日4/25", color: "#0277BD", today: false, family: 4, cost: "無料〜" },
  { id: 68, name: "GINZA SIX", area: "銀座", time: "10:30〜20:30", duration: 2, kw: ["東京","商業施設","高級","食事","散歩","アート"], emoji: "💎", url: "https://ginza6.tokyo/", desc: "銀座最大の商業施設＋屋上庭園", color: "#FFC107", today: false, family: 3, cost: "無料〜" },
  { id: 69, name: "東京駅 グランスタ", area: "東京駅", time: "8:00〜22:00", duration: 1.5, kw: ["東京","商業施設","食事","新しい"], emoji: "🍱", url: "https://www.gransta.jp/", desc: "東京駅構内の食とおみやげの大型エリア", color: "#D84315", today: false, family: 4, cost: "中〜高" },
  { id: 70, name: "渋谷スカイ", area: "渋谷", time: "10:00〜22:30", duration: 1.5, kw: ["東京","非日常","空間","新規","商業施設"], emoji: "🌃", url: "https://www.shibuya-scramble-square.com/sky/", desc: "渋谷スクランブルスクエアの絶景展望台", color: "#01579B", today: false, family: 4, cost: "有料" },
  { id: 71, name: "東京ソラマチ", area: "押上", time: "10:00〜21:00", duration: 2, kw: ["東京","商業施設","食事","散歩","非日常"], emoji: "🗼", url: "https://www.tokyo-solamachi.jp/", desc: "東京スカイツリー直下の商業施設", color: "#1976D2", today: false, family: 5, cost: "無料〜" },
  { id: 72, name: "豊洲千客万来", area: "豊洲", time: "10:00〜22:00", duration: 2, kw: ["東京","商業施設","食事","新規","非日常"], emoji: "🐟", url: "https://www.toyosu-senkyakubanrai.jp/", desc: "豊洲市場直結の食×温泉複合施設", color: "#0288D1", today: false, family: 5, cost: "無料〜" },
  { id: 73, name: "ニュウマン高輪", area: "高輪ゲートウェイ", time: "10:00〜21:00", duration: 1.5, kw: ["東京","商業施設","新規","オープン","食事","散歩"], emoji: "🛒", url: "https://www.takanawagateway-city.com/", desc: "高輪ゲートウェイシティの商業施設", color: "#455A64", today: false, family: 3, cost: "中〜高" },
  { id: 74, name: "コレド室町", area: "日本橋", time: "10:00〜21:00", duration: 1.5, kw: ["東京","商業施設","食事","散歩","空間","高級"], emoji: "🏯", url: "https://mitsui-shopping-park.com/urban/muromachi/", desc: "日本橋の伝統と新しさが融合する商業施設", color: "#5D4037", today: false, family: 4, cost: "中〜高" },
  { id: 75, name: "中目黒 ガレリア", area: "中目黒", time: "10:00〜21:00", duration: 1.5, kw: ["東京","商業施設","散歩","カフェ","新しい"], emoji: "🌸", url: "https://nakameguro-galeria.jp/", desc: "目黒川沿いのおしゃれ商業施設", color: "#E91E63", today: false, family: 3, cost: "中" },
  { id: 76, name: "二子玉川 蔦屋家電", area: "二子玉川", time: "9:30〜22:30", duration: 2, kw: ["東京","本","商業施設","空間","新しい","リラックス"], emoji: "📺", url: "https://store.tsite.jp/futakotamagawa/", desc: "本×家電×ライフスタイル提案空間", color: "#3E2723", today: false, family: 4, cost: "無料〜" },

  // ===== 食事 =====
  { id: 77, name: "両国 ちゃんこ霧島", area: "両国", time: "11:30〜22:00", duration: 1.5, kw: ["東京","食事","非日常","空間"], emoji: "🍲", url: "https://www.chankokirishima.com/", desc: "元横綱が手がける本格ちゃんこ料理", color: "#BF360C", today: false, family: 4, cost: "中〜高" },
  { id: 78, name: "築地場外市場", area: "築地", time: "5:00〜14:00", duration: 1.5, kw: ["東京","食事","散歩","運動","非日常"], emoji: "🍣", url: "https://www.tsukiji.or.jp/", desc: "新鮮な魚介と食べ歩きグルメの聖地", color: "#0288D1", today: false, family: 5, cost: "中" },
  { id: 79, name: "浅草 大黒家天麩羅", area: "浅草", time: "11:00〜20:30", duration: 1, kw: ["東京","食事","非日常","空間"], emoji: "🍤", url: "https://www.tempura.co.jp/", desc: "1887年創業の老舗天ぷら店", color: "#F57F17", today: false, family: 5, cost: "中" },
  { id: 80, name: "麻布台ヒルズ レストラン群", area: "麻布台", time: "11:00〜23:00", duration: 2, kw: ["東京","食事","高級","新規","空間","商業施設"], emoji: "🍽️", url: "https://www.azabudai-hills.com/", desc: "麻布台ヒルズの最先端ダイニング", color: "#37474F", today: false, family: 3, cost: "高" },
  { id: 81, name: "渋谷 横丁グルメ", area: "渋谷", time: "17:00〜26:00", duration: 2, kw: ["東京","食事","非日常","音楽"], emoji: "🍻", url: "https://www.shibuya-yokocho.com/", desc: "47都道府県の郷土料理が集まる横丁", color: "#D84315", today: false, family: 3, cost: "中" },
  { id: 82, name: "丸の内 ブリックスクエア", area: "丸の内", time: "11:00〜23:00", duration: 1.5, kw: ["東京","食事","高級","空間","散歩","商業施設","自然"], emoji: "🌹", url: "https://www.marunouchi.com/building/marubrick/", desc: "中庭のあるレンガ建築のレストラン群", color: "#C62828", today: false, family: 4, cost: "中〜高" },

  // ===== リフレッシュ・温泉 =====
  { id: 83, name: "後楽園 ラクーア スパ", area: "後楽園", time: "11:00〜翌9:00", duration: 3, kw: ["東京","リラックス","リフレッシュ","空間","非日常"], emoji: "🛁", url: "https://www.laqua.jp/", desc: "都心の温泉スパ。観覧車も近い", color: "#26A69A", today: false, family: 3, cost: "高" },
  { id: 84, name: "両国 江戸遊", area: "両国", time: "11:00〜翌9:00", duration: 3, kw: ["東京","リラックス","リフレッシュ","空間","食事"], emoji: "♨️", url: "https://www.edoyu.com/ryogoku/", desc: "本格フィンランド式サウナ＋温泉", color: "#0277BD", today: false, family: 3, cost: "中" },
  { id: 85, name: "大江戸温泉物語 (お台場)", area: "お台場", time: "11:00〜21:00", duration: 3, kw: ["東京","リラックス","リフレッシュ","非日常","空間","食事"], emoji: "🎎", url: "https://daiba.ooedoonsen.jp/", desc: "江戸の街並みを再現した温泉テーマパーク", color: "#AD1457", today: false, family: 5, cost: "中〜高" },
  { id: 86, name: "高輪ゲートウェイ 足湯テラス", area: "高輪ゲートウェイ", time: "10:00〜18:00", duration: 0.5, kw: ["東京","リラックス","リフレッシュ","新規","空間"], emoji: "👣", url: "https://montakanawa.jp/", desc: "MoN内の足湯テラス。線路を眺めながら", color: "#00695C", today: false, family: 4, cost: "無料" },

  // ===== 散歩・建築 =====
  { id: 87, name: "隅田川テラス 散歩", area: "両国〜浅草", time: "終日", duration: 1.5, kw: ["東京","散歩","運動","自然","リフレッシュ"], emoji: "🚶", url: "https://www.gotokyo.org/jp/", desc: "両国から浅草まで春の川辺を3kmウォーク", color: "#006064", today: false, family: 5, cost: "無料" },
  { id: 88, name: "谷根千 (谷中・根津・千駄木)", area: "谷中", time: "終日", duration: 3, kw: ["東京","散歩","雑貨","食事","本","空間","リラックス"], emoji: "🐈", url: "https://www.gotokyo.org/jp/", desc: "下町情緒あふれるレトロエリア散策", color: "#FF8F00", today: false, family: 4, cost: "無料〜" },
  { id: 89, name: "神保町古書街", area: "神保町", time: "10:00〜18:00", duration: 2.5, kw: ["東京","本","散歩","雑貨","空間","リラックス"], emoji: "📚", url: "https://jimbou.info/", desc: "世界最大の古書街。1点ものとの出会い", color: "#3E2723", today: false, family: 3, cost: "無料" },
  { id: 90, name: "目黒川 桜並木 (新緑散歩)", area: "中目黒", time: "終日", duration: 1.5, kw: ["東京","散歩","自然","リフレッシュ","空間"], emoji: "🌿", url: "https://www.tokyo-park.or.jp/", desc: "桜の季節を過ぎた新緑の散歩道", color: "#388E3C", today: false, family: 4, cost: "無料" },
  { id: 91, name: "東京駅 丸の内駅舎", area: "東京駅", time: "終日", duration: 0.5, kw: ["東京","散歩","空間","アート","高級"], emoji: "🏛️", url: "https://www.tokyostationcity.com/", desc: "1914年竣工の重要文化財。夜のライトアップも", color: "#5D4037", today: false, family: 4, cost: "無料" },
  { id: 92, name: "汐留〜浜離宮 散策", area: "汐留", time: "終日", duration: 2, kw: ["東京","散歩","自然","リフレッシュ","空間"], emoji: "🌷", url: "https://www.tokyo-park.or.jp/", desc: "汐留の高層ビル群から大名庭園へ", color: "#0277BD", today: false, family: 3, cost: "300円" },
  { id: 93, name: "築地〜銀座 散歩", area: "築地", time: "終日", duration: 1.5, kw: ["東京","散歩","食事","商業施設"], emoji: "🚶", url: "https://www.gotokyo.org/jp/", desc: "築地で食事→歌舞伎座→銀座という王道散歩", color: "#0288D1", today: false, family: 4, cost: "無料〜" },
  { id: 94, name: "清澄白河 アート＆カフェ巡り", area: "清澄白河", time: "終日", duration: 3, kw: ["東京","散歩","カフェ","アート","新しい"], emoji: "☕", url: "https://www.gotokyo.org/jp/", desc: "ブルーボトル発祥の地。MOTと組み合わせて", color: "#5D4037", today: false, family: 3, cost: "無料〜" },
  { id: 95, name: "羽田イノベーションシティ", area: "羽田", time: "10:00〜22:00", duration: 2, kw: ["東京","新規","新しい","空間","非日常","食事","商業施設"], emoji: "✈️", url: "https://haneda-innovation-city.com/", desc: "未来感あふれる新スポット。露天風呂も", color: "#1565C0", today: false, family: 4, cost: "無料〜" },

  // ===== 音楽 =====
  { id: 96, name: "東京オペラシティ", area: "初台", time: "夜", duration: 2.5, kw: ["東京","音楽","高級","空間","非日常"], emoji: "🎼", url: "https://www.operacity.jp/", desc: "クラシック音楽の殿堂。本日も公演あり", color: "#1A237E", today: false, family: 2, cost: "高" },
  { id: 97, name: "サントリーホール", area: "六本木一丁目", time: "夜", duration: 2.5, kw: ["東京","音楽","高級","空間","非日常"], emoji: "🎻", url: "https://www.suntory.co.jp/suntoryhall/", desc: "世界的に有名なクラシックコンサートホール", color: "#3E2723", today: false, family: 2, cost: "高" },
  { id: 98, name: "ブルーノート東京", area: "青山", time: "18:30〜22:30", duration: 2, kw: ["東京","音楽","食事","高級","非日常","空間"], emoji: "🎷", url: "https://www.bluenote.co.jp/jp/", desc: "本格ジャズライブ＋食事の大人空間", color: "#0D47A1", today: false, family: 2, cost: "高" },
  { id: 99, name: "MoN Box1000 火の鳥公演", area: "高輪ゲートウェイ", time: "夜", duration: 2, kw: ["東京","音楽","アート","非日常","新規","オープン"], emoji: "🔥", url: "https://montakanawa.jp/", desc: "1000席LEDシアターのこけら落とし公演", color: "#B71C1C", today: false, family: 3, cost: "有料" },
  { id: 100, name: "新国立劇場", area: "初台", time: "夜", duration: 3, kw: ["東京","音楽","非日常","高級","空間","アート"], emoji: "🎭", url: "https://www.nntt.jac.go.jp/", desc: "オペラ・バレエ・演劇の専用劇場", color: "#4A148C", today: false, family: 2, cost: "高" },

  // ===== 雑貨 =====
  { id: 101, name: "中目黒 雑貨店巡り", area: "中目黒", time: "11:00〜20:00", duration: 2, kw: ["東京","雑貨","散歩","新しい","商業施設"], emoji: "🎀", url: "https://www.gotokyo.org/jp/", desc: "個性派セレクトショップと雑貨店", color: "#EC407A", today: false, family: 3, cost: "中" },
  { id: 102, name: "自由が丘 雑貨めぐり", area: "自由が丘", time: "11:00〜20:00", duration: 2, kw: ["東京","雑貨","散歩","カフェ","商業施設"], emoji: "🌷", url: "https://jiyugaoka-abc.com/", desc: "ヨーロピアンな街並み×可愛い雑貨", color: "#F06292", today: false, family: 4, cost: "中" },
  { id: 103, name: "吉祥寺 中道通り", area: "吉祥寺", time: "11:00〜20:00", duration: 2, kw: ["東京","雑貨","散歩","商業施設","食事","本"], emoji: "🛍️", url: "https://kichijoji.tokyo/", desc: "古着・雑貨・本が集まる商店街", color: "#7B1FA2", today: false, family: 4, cost: "中" },
  { id: 104, name: "OLD NEW MARKET 日本橋", area: "日本橋", time: "11:00〜18:00", duration: 1.5, kw: ["東京","雑貨","散歩","新しい","アート"], emoji: "🎨", url: "https://antique-leaves.com/", desc: "コレド室町で開催のクラフトマーケット", color: "#827717", today: false, family: 3, cost: "無料" },
  { id: 105, name: "アンティークモール銀座", area: "銀座", time: "11:00〜19:00", duration: 1, kw: ["東京","雑貨","空間","散歩","商業施設"], emoji: "🕰️", url: "https://www.gotokyo.org/jp/", desc: "国内外のアンティーク約60店舗", color: "#6A1B9A", today: false, family: 2, cost: "無料" },
  { id: 106, name: "蔵前 雑貨ストリート", area: "蔵前", time: "11:00〜19:00", duration: 2, kw: ["東京","雑貨","散歩","新しい","カフェ","本"], emoji: "📐", url: "https://kakimori.com/", desc: "東京の新ブルックリンと言われる職人街", color: "#33691E", today: false, family: 4, cost: "無料〜" },

  // ===== 江戸東京博物館エリア =====
  { id: 107, name: "江戸東京博物館", area: "両国", time: "9:30〜17:30", duration: 2.5, kw: ["東京","アート","空間","新規","オープン","本"], emoji: "🏯", url: "https://www.edo-tokyo-museum.or.jp/", desc: "リニューアルオープンした江戸東京の歴史博物館", color: "#5D4037", today: false, family: 5, cost: "有料" },
  { id: 108, name: "旧安田庭園", area: "両国", time: "9:00〜19:30", duration: 1, kw: ["東京","自然","散歩","リラックス","空間"], emoji: "🐢", url: "https://www.city.sumida.lg.jp/", desc: "両国にある江戸の大名庭園", color: "#2E7D32", today: false, family: 4, cost: "無料" },
  { id: 109, name: "両国 江戸のれん", area: "両国", time: "11:00〜23:00", duration: 1.5, kw: ["東京","食事","非日常","空間","商業施設"], emoji: "🍱", url: "https://www.jrtk.jp/edonoren/", desc: "江戸の街並みを再現した食事処街", color: "#BF360C", today: false, family: 5, cost: "中" },
  { id: 110, name: "両国国技館", area: "両国", time: "−", duration: 2.5, kw: ["東京","非日常","空間","運動"], emoji: "🤼", url: "https://www.sumo.or.jp/", desc: "相撲の聖地。場所開催時は本場所観戦", color: "#C62828", today: false, family: 5, cost: "有料" },
  { id: 111, name: "東京たま大恐竜博", area: "立川", time: "10:00〜18:00", duration: 2, kw: ["東京","非日常","新しい","空間","アート"], emoji: "🦕", url: "https://www.tokyofes.info/", desc: "4/29〜開催。GW期間中の家族向け人気イベント", color: "#33691E", today: false, family: 5, cost: "有料" },
  { id: 112, name: "ふるさと東京応援祭 (上野)", area: "上野", time: "11:00〜21:00", duration: 1.5, kw: ["東京","食事","新しい","非日常","商業施設","散歩"], emoji: "🥟", url: "https://tokyofesta.com/tag/food/", desc: "4/29〜上野不忍池で全国ご当地グルメ集結", color: "#E65100", today: false, family: 5, cost: "中" },
  { id: 113, name: "オクトーバーフェスト お台場", area: "お台場", time: "11:00〜21:30", duration: 2, kw: ["東京","食事","音楽","非日常","商業施設"], emoji: "🍻", url: "https://www.oktober-fest.jp/odaiba_spring/", desc: "4/24〜ドイツビール×音楽フェス。プレッツェル名物", color: "#D84315", today: false, family: 4, cost: "中〜高" },
];

const allKeywords = ["全て","東京","本日","新規","オープン","新しい","アート","音楽","カフェ","食事","本","雑貨","散歩","運動","自然","非日常","高級","空間","商業施設","リラックス","リフレッシュ"];

const keywordColors = {
  "東京": "#E91E63",
  "本日": "#FF6B35",
  "新規": "#4CAF50",
  "オープン": "#4CAF50",
  "新しい": "#66BB6A",
  "アート": "#9C27B0",
  "音楽": "#2196F3",
  "カフェ": "#795548",
  "食事": "#F44336",
  "本": "#3F51B5",
  "雑貨": "#EC407A",
  "散歩": "#009688",
  "運動": "#FF9800",
  "自然": "#8BC34A",
  "非日常": "#673AB7",
  "高級": "#FFC107",
  "空間": "#607D8B",
  "商業施設": "#9E9E9E",
  "リラックス": "#00BCD4",
  "リフレッシュ": "#4DB6AC",
};

const presets = [
  { name: "🥇 本日限定欲張り", ids: [7, 107, 8, 20, 16, 18, 11] },
  { name: "👨‍👩‍👧 家族で自然満喫", ids: [3, 5, 87, 41, 109] },
  { name: "🎨 アート×カフェ", ids: [31, 20, 32, 39, 42] },
  { name: "📚 本＆静寂", ids: [89, 45, 42, 46, 88] },
  { name: "💎 高級リフレッシュ", ids: [27, 30, 18, 33, 96] },
  { name: "🌿 公園と散歩", ids: [55, 87, 61, 91, 82] },
  { name: "🆕 新規オープン巡り", ids: [16, 17, 18, 19, 20] },
];

export default function App() {
  const [filter, setFilter] = useState("全て");
  const [search, setSearch] = useState("");
  const [todayOnly, setTodayOnly] = useState(false);
  const [familyMin, setFamilyMin] = useState(0);
  const [myDay, setMyDay] = useState([]);
  const [view, setView] = useState("planner");

  const filtered = spots.filter(s => {
    const kw = filter === "全て" || s.kw.includes(filter);
    const sr = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.area.toLowerCase().includes(search.toLowerCase());
    const td = !todayOnly || s.today;
    const fm = s.family >= familyMin;
    return kw && sr && td && fm;
  });

  const addToDay = (spot) => {
    if (!myDay.find(s => s.id === spot.id)) {
      setMyDay([...myDay, spot]);
    }
  };
  const removeFromDay = (id) => setMyDay(myDay.filter(s => s.id !== id));
  const moveUp = (idx) => {
    if (idx === 0) return;
    const a = [...myDay];
    [a[idx-1], a[idx]] = [a[idx], a[idx-1]];
    setMyDay(a);
  };
  const moveDown = (idx) => {
    if (idx === myDay.length - 1) return;
    const a = [...myDay];
    [a[idx], a[idx+1]] = [a[idx+1], a[idx]];
    setMyDay(a);
  };
  const loadPreset = (ids) => {
    setMyDay(ids.map(id => spots.find(s => s.id === id)).filter(Boolean));
  };

  const totalDuration = myDay.reduce((sum, s) => sum + s.duration, 0);
  const allDayKw = [...new Set(myDay.flatMap(s => s.kw))];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0e27 0%, #1a1d4e 50%, #2c1654 100%)",
      fontFamily: "'Hiragino Sans', 'Noto Sans JP', sans-serif",
      color: "#fff",
      paddingBottom: 80,
    }}>
      {/* Header */}
      <div style={{
        background: "rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        padding: "20px 24px",
      }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: "#FF6B35", fontWeight: 700, marginBottom: 4 }}>
            📅 2026年4月25日（土）東京 家族の1日
          </div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 900, background: "linear-gradient(90deg, #fff, #FF6B35, #E91E63)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            自由に組み立てる 110+ スポットプランナー
          </h1>
          <div style={{ marginTop: 8, fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
            ✨ 全{spots.length}スポット ・ 21キーワード対応 ・ ボタンで自由に並び替え
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "16px 24px 0", display: "flex", gap: 8 }}>
        {[
          { key: "planner", label: "🗓️ 1日プランを作る", count: myDay.length },
          { key: "catalog", label: "📋 全スポット一覧", count: filtered.length },
        ].map(t => (
          <button key={t.key} onClick={() => setView(t.key)} style={{
            padding: "10px 20px",
            borderRadius: 10,
            border: view === t.key ? "2px solid #FF6B35" : "1px solid rgba(255,255,255,0.15)",
            background: view === t.key ? "rgba(255,107,53,0.2)" : "rgba(255,255,255,0.04)",
            color: "#fff",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 700,
          }}>
            {t.label} <span style={{ background: "rgba(255,255,255,0.2)", padding: "1px 8px", borderRadius: 10, marginLeft: 4, fontSize: 11 }}>{t.count}</span>
          </button>
        ))}
      </div>

      {view === "planner" && (
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "20px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* LEFT: My Day */}
          <div style={{
            background: "rgba(255,107,53,0.08)",
            border: "2px solid rgba(255,107,53,0.3)",
            borderRadius: 16,
            padding: 20,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 900 }}>🗓️ あなたの1日</h2>
              <button onClick={() => setMyDay([])} style={{
                background: "rgba(244,67,54,0.2)",
                border: "1px solid rgba(244,67,54,0.5)",
                color: "#fff",
                padding: "5px 12px",
                borderRadius: 8,
                fontSize: 11,
                cursor: "pointer",
              }}>🗑️ クリア</button>
            </div>

            {myDay.length > 0 && (
              <div style={{
                background: "rgba(0,0,0,0.3)",
                borderRadius: 10,
                padding: "10px 14px",
                fontSize: 12,
                marginBottom: 14,
                display: "flex",
                gap: 18,
                flexWrap: "wrap",
              }}>
                <span>📍 {myDay.length}スポット</span>
                <span>⏱️ 約{totalDuration}時間</span>
                <span>🏷️ {allDayKw.length}キーワード</span>
              </div>
            )}

            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 6 }}>📌 プリセット読込</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {presets.map(p => (
                  <button key={p.name} onClick={() => loadPreset(p.ids)} style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#fff",
                    padding: "5px 10px",
                    borderRadius: 8,
                    fontSize: 11,
                    cursor: "pointer",
                  }}>{p.name}</button>
                ))}
              </div>
            </div>

            {myDay.length === 0 ? (
              <div style={{
                textAlign: "center",
                padding: "40px 20px",
                color: "rgba(255,255,255,0.4)",
                fontSize: 13,
                lineHeight: 1.7,
              }}>
                右側のスポットから「➕ 追加」<br />
                またはプリセットを読み込んでスタート
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {myDay.map((spot, idx) => (
                  <div key={spot.id} style={{
                    background: `linear-gradient(135deg, ${spot.color}22, rgba(0,0,0,0.4))`,
                    border: `1px solid ${spot.color}66`,
                    borderRadius: 10,
                    overflow: "hidden",
                  }}>
                    {/* Top row: number + emoji + title + controls */}
                    <div style={{
                      padding: "10px 12px",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      borderBottom: `1px solid ${spot.color}33`,
                    }}>
                      <div style={{
                        background: spot.color,
                        width: 28, height: 28,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        fontWeight: 900,
                        flexShrink: 0,
                      }}>{idx + 1}</div>
                      <div style={{ fontSize: 24, flexShrink: 0 }}>{spot.emoji}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 800, lineHeight: 1.3, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                          {spot.name}
                          {spot.today && <span style={{ background: "#FF6B35", padding: "1px 6px", borderRadius: 4, fontSize: 9, fontWeight: 700 }}>本日限定</span>}
                        </div>
                        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginTop: 3, display: "flex", gap: 10, flexWrap: "wrap" }}>
                          <span>📍 {spot.area}</span>
                          <span>🕐 {spot.time}</span>
                          <span>⏱️ {spot.duration}h</span>
                          <span>💴 {spot.cost}</span>
                          <span>👨‍👩‍👧 {"★".repeat(spot.family)}</span>
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <button onClick={() => moveUp(idx)} disabled={idx === 0} style={{
                          background: idx === 0 ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.15)",
                          border: "none",
                          color: "#fff",
                          width: 24, height: 18,
                          borderRadius: 4,
                          cursor: idx === 0 ? "not-allowed" : "pointer",
                          fontSize: 10,
                        }}>▲</button>
                        <button onClick={() => moveDown(idx)} disabled={idx === myDay.length - 1} style={{
                          background: idx === myDay.length - 1 ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.15)",
                          border: "none",
                          color: "#fff",
                          width: 24, height: 18,
                          borderRadius: 4,
                          cursor: idx === myDay.length - 1 ? "not-allowed" : "pointer",
                          fontSize: 10,
                        }}>▼</button>
                      </div>
                    </div>

                    {/* Body: description + keywords + actions */}
                    <div style={{ padding: "10px 12px" }}>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.78)", lineHeight: 1.55, marginBottom: 8 }}>
                        {spot.desc}
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginBottom: 10 }}>
                        {spot.kw.map(kw => (
                          <span key={kw} style={{
                            background: `${keywordColors[kw] || "#666"}26`,
                            border: `1px solid ${keywordColors[kw] || "#666"}55`,
                            color: keywordColors[kw] || "#aaa",
                            padding: "1px 7px",
                            borderRadius: 10,
                            fontSize: 9,
                            fontWeight: 600,
                          }}>{kw}</span>
                        ))}
                      </div>
                      <div style={{ display: "flex", gap: 6 }}>
                        <a href={spot.url} target="_blank" rel="noopener noreferrer" style={{
                          flex: 1,
                          background: "rgba(255,255,255,0.1)",
                          border: "1px solid rgba(255,255,255,0.2)",
                          color: "#fff",
                          padding: "6px 12px",
                          borderRadius: 6,
                          fontSize: 11,
                          textDecoration: "none",
                          fontWeight: 600,
                          textAlign: "center",
                        }}>🔗 公式サイトへ</a>
                        <button onClick={() => removeFromDay(spot.id)} style={{
                          background: "rgba(244,67,54,0.3)",
                          border: "1px solid rgba(244,67,54,0.5)",
                          color: "#fff",
                          padding: "6px 12px",
                          borderRadius: 6,
                          cursor: "pointer",
                          fontSize: 11,
                          fontWeight: 600,
                        }}>× 削除</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {allDayKw.length > 0 && (
              <div style={{
                marginTop: 14,
                paddingTop: 14,
                borderTop: "1px solid rgba(255,255,255,0.1)",
              }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 6 }}>🏷️ 含まれるキーワード</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {allDayKw.map(kw => (
                    <span key={kw} style={{
                      background: `${keywordColors[kw] || "#666"}33`,
                      border: `1px solid ${keywordColors[kw] || "#666"}66`,
                      color: keywordColors[kw] || "#aaa",
                      padding: "2px 8px",
                      borderRadius: 12,
                      fontSize: 10,
                      fontWeight: 600,
                    }}>{kw}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Quick Browse */}
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 16,
            padding: 20,
            maxHeight: "80vh",
            overflowY: "auto",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 900 }}>📋 スポットを選ぶ</h2>
              <button onClick={() => setTodayOnly(!todayOnly)} style={{
                background: todayOnly ? "#FF6B35" : "rgba(255,255,255,0.06)",
                border: `1px solid ${todayOnly ? "#FF6B35" : "rgba(255,255,255,0.15)"}`,
                color: "#fff",
                padding: "5px 12px",
                borderRadius: 8,
                fontSize: 11,
                cursor: "pointer",
                fontWeight: todayOnly ? 800 : 400,
              }}>⚡ 本日限定のみ</button>
            </div>

            <input
              type="text"
              placeholder="🔍 スポット名・エリア検索..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(0,0,0,0.3)",
                color: "#fff",
                fontSize: 13,
                marginBottom: 10,
                boxSizing: "border-box",
              }}
            />

            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 14 }}>
              {allKeywords.map(kw => (
                <button key={kw} onClick={() => setFilter(kw)} style={{
                  padding: "3px 10px",
                  borderRadius: 12,
                  border: `1px solid ${keywordColors[kw] || "rgba(255,255,255,0.2)"}`,
                  background: filter === kw ? (keywordColors[kw] || "#FF6B35") : "rgba(255,255,255,0.04)",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: 10,
                  fontWeight: filter === kw ? 700 : 400,
                }}>{kw}</button>
              ))}
            </div>

            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>
              {filtered.length}件のスポット
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {filtered.map(spot => {
                const isAdded = myDay.find(s => s.id === spot.id);
                return (
                  <div key={spot.id} style={{
                    background: isAdded ? "rgba(76,175,80,0.1)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${isAdded ? "rgba(76,175,80,0.4)" : `${spot.color}55`}`,
                    borderRadius: 10,
                    overflow: "hidden",
                  }}>
                    {/* Header row: emoji + title + today badge */}
                    <div style={{
                      background: `linear-gradient(135deg, ${spot.color}33, ${spot.color}0a)`,
                      padding: "10px 14px",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      borderBottom: `1px solid ${spot.color}22`,
                    }}>
                      <div style={{ fontSize: 28, lineHeight: 1, flexShrink: 0 }}>{spot.emoji}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 800, lineHeight: 1.3, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                          {spot.name}
                          {spot.today && <span style={{ background: "#FF6B35", padding: "1px 7px", borderRadius: 4, fontSize: 9, fontWeight: 700 }}>本日限定</span>}
                        </div>
                        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.65)", marginTop: 4, display: "flex", gap: 10, flexWrap: "wrap" }}>
                          <span>📍 {spot.area}</span>
                          <span>🕐 {spot.time}</span>
                          <span>⏱️ {spot.duration}h</span>
                          <span>💴 {spot.cost}</span>
                          <span>👨‍👩‍👧 {"★".repeat(spot.family)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Body: description */}
                    <div style={{ padding: "10px 14px" }}>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.78)", lineHeight: 1.55, marginBottom: 8 }}>
                        {spot.desc}
                      </div>

                      {/* Keywords */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginBottom: 10 }}>
                        {spot.kw.map(kw => (
                          <span key={kw} style={{
                            background: `${keywordColors[kw] || "#666"}26`,
                            border: `1px solid ${keywordColors[kw] || "#666"}55`,
                            color: keywordColors[kw] || "#aaa",
                            padding: "1px 7px",
                            borderRadius: 10,
                            fontSize: 9,
                            fontWeight: 600,
                          }}>{kw}</span>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => isAdded ? removeFromDay(spot.id) : addToDay(spot)} style={{
                          flex: 1,
                          background: isAdded ? "#4CAF50" : spot.color,
                          border: "none",
                          color: "#fff",
                          padding: "6px 10px",
                          borderRadius: 6,
                          fontSize: 11,
                          fontWeight: 700,
                          cursor: "pointer",
                        }}>{isAdded ? "✓ プランに追加済" : "➕ 1日プランに追加"}</button>
                        <a href={spot.url} target="_blank" rel="noopener noreferrer" style={{
                          background: "rgba(255,255,255,0.1)",
                          border: "1px solid rgba(255,255,255,0.2)",
                          color: "#fff",
                          padding: "6px 12px",
                          borderRadius: 6,
                          fontSize: 11,
                          textDecoration: "none",
                          whiteSpace: "nowrap",
                          fontWeight: 600,
                        }}>🔗 公式</a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {view === "catalog" && (
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "20px 24px" }}>
          <div style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 14,
            padding: 16,
            marginBottom: 20,
          }}>
            <input
              type="text"
              placeholder="🔍 スポット名・エリア検索..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(0,0,0,0.3)",
                color: "#fff",
                fontSize: 13,
                marginBottom: 10,
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
              {allKeywords.map(kw => (
                <button key={kw} onClick={() => setFilter(kw)} style={{
                  padding: "5px 12px",
                  borderRadius: 16,
                  border: `1px solid ${keywordColors[kw] || "rgba(255,255,255,0.2)"}`,
                  background: filter === kw ? (keywordColors[kw] || "#FF6B35") : "rgba(255,255,255,0.04)",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: 11,
                  fontWeight: filter === kw ? 700 : 400,
                }}>{kw}</button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <button onClick={() => setTodayOnly(!todayOnly)} style={{
                background: todayOnly ? "#FF6B35" : "rgba(255,255,255,0.06)",
                border: `1px solid ${todayOnly ? "#FF6B35" : "rgba(255,255,255,0.15)"}`,
                color: "#fff",
                padding: "5px 12px",
                borderRadius: 8,
                fontSize: 11,
                cursor: "pointer",
              }}>⚡ 本日限定のみ</button>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginLeft: 8 }}>家族向け度:</span>
              {[0,3,4,5].map(v => (
                <button key={v} onClick={() => setFamilyMin(v)} style={{
                  background: familyMin === v ? "#FF9800" : "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                  padding: "5px 10px",
                  borderRadius: 8,
                  fontSize: 11,
                  cursor: "pointer",
                }}>{v === 0 ? "全て" : "★".repeat(v) + "+"}</button>
              ))}
              <span style={{ marginLeft: "auto", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
                {filtered.length}件
              </span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
            {filtered.map(spot => {
              const isAdded = myDay.find(s => s.id === spot.id);
              return (
                <div key={spot.id} style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${spot.color}55`,
                  borderRadius: 12,
                  overflow: "hidden",
                }}>
                  <div style={{
                    background: `linear-gradient(135deg, ${spot.color}44, ${spot.color}11)`,
                    padding: "12px 16px",
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                  }}>
                    <div style={{ fontSize: 32 }}>{spot.emoji}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 800, lineHeight: 1.3 }}>
                        {spot.name}
                        {spot.today && <span style={{ background: "#FF6B35", padding: "1px 6px", borderRadius: 4, fontSize: 9, marginLeft: 6 }}>本日</span>}
                      </div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 3 }}>
                        📍{spot.area} ・ 🕐{spot.time}
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: "10px 16px" }}>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", lineHeight: 1.5, marginBottom: 8 }}>
                      {spot.desc}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginBottom: 10 }}>
                      {spot.kw.slice(0, 5).map(kw => (
                        <span key={kw} style={{
                          background: `${keywordColors[kw] || "#666"}33`,
                          color: keywordColors[kw] || "#aaa",
                          padding: "1px 7px",
                          borderRadius: 10,
                          fontSize: 9,
                          fontWeight: 600,
                        }}>{kw}</span>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={() => isAdded ? removeFromDay(spot.id) : addToDay(spot)} style={{
                        flex: 1,
                        background: isAdded ? "#4CAF50" : spot.color,
                        border: "none",
                        color: "#fff",
                        padding: "7px 12px",
                        borderRadius: 8,
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}>{isAdded ? "✓ プランに追加済" : "➕ 1日プランに追加"}</button>
                      <a href={spot.url} target="_blank" rel="noopener noreferrer" style={{
                        background: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        color: "#fff",
                        padding: "7px 10px",
                        borderRadius: 8,
                        fontSize: 11,
                        textDecoration: "none",
                        whiteSpace: "nowrap",
                      }}>🔗</a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Floating action */}
      {myDay.length > 0 && view === "catalog" && (
        <div style={{
          position: "fixed",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(255,107,53,0.95)",
          padding: "10px 20px",
          borderRadius: 30,
          color: "#fff",
          fontSize: 13,
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(255,107,53,0.5)",
          zIndex: 50,
        }} onClick={() => setView("planner")}>
          🗓️ あなたの1日 ({myDay.length}スポット・{totalDuration}h) を見る →
        </div>
      )}
    </div>
  );
}

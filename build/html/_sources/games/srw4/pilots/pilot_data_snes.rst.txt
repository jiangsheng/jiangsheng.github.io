:html_theme.sidebar_secondary.remove: true

机师数据 （第四次超级机器人大战）
================================================

点击列头排序，Shift+点击列头添加排序条件。

标题打型号的列为99级数据，不打的为1级。

.. container::
   :name: display_options
   
   .. raw:: html
      
       <input type="checkbox" id="checkboxPlayerOnly" name="checkboxPlayerOnly" value="unchecked">
       <label for="checkboxPlayerOnly">只看自军</label>
       <label for="comboboxSeries">选择登场作品</label>
       <select name="comboboxSeries" id="comboboxSeries">
         <option value="1" selected>全部</option>
         <option value="2">机动战士系</option>
         <option value="3">魔神系</option>
         <option value="4">重战机系</option>
         <option value="5">圣战士系</option>
       </select>
       
       <a class="toggle-vis" data-column="1">显示1级能力</a>
       <a class="toggle-vis" data-column="2">显示99级能力</a>
       <a class="toggle-vis" data-column="3">显示精神和技能</a>
       <a class="toggle-vis" data-column="0">恢复默认</a>


.. flat-table:: 机师数据 （第四次超级机器人大战）
   :class: text-center, align-items-center, compact, display,dataTables_no_scroll_x
   :name: srw_pilots_snes_table
   :header-rows: 1
   :fill-cells:

   * - 码
     - 属
     - 图
     - 名
     - 作
     - 性
     - 近攻
     - 远攻
     - 回
     - 命
     - 直
     - 技
     - 近
     - 远
     - 回
     - 命
     - 直
     - 技
     - SP
     - 空
     - 陆
     - 海
     - 宇
     - 精神1
     - 精神2
     - 精神3
     - 精神4
     - 精神5
     - 精神6
     - 技能
   * - 01
     - 自
     - .. image:: ../pilots/images/srw4_pilot_01.png
     - チャム＝ファウ
     - :ref:`圣战士丹拜因 <srw4_pilots_dunbine>`
     - 普通
     - 0
     - 0
     - 0
     - 0
     - 0
     - 0
     - 52
     - 52
     - 99
     - 99
     - 99
     - 99
     - 50
     - 🚫
     - 🚫
     - 🚫
     - 🚫
     - ひらめき 10
     - 信頼 2
     - 鉄壁 12
     - 気合 15
     - 再動 20
     - 奇跡 56
   * - 02
     - 自
     - .. image:: ../pilots/images/srw4_pilot_02.png
     - ベル＝アール
     - :ref:`圣战士丹拜因 <srw4_pilots_dunbine>`
     - 弱気
     - 0
     - 0
     - 0
     - 0
     - 0
     - 0
     - 52
     - 52
     - 99
     - 99
     - 99
     - 99
     - 50
     - 🚫
     - 🚫
     - 🚫
     - 🚫
     - 偵察 9
     - 根性 14
     - 気合 39
     - 幸運 8
     - 友情 36
     - 復活 50
   * - 03
     - 自
     - .. image:: ../pilots/images/srw4_pilot_03.png
     - エル＝フィノ
     - :ref:`圣战士丹拜因 <srw4_pilots_dunbine>`
     - 弱気
     - 0
     - 0
     - 0
     - 0
     - 0
     - 0
     - 52
     - 52
     - 99
     - 99
     - 99
     - 99
     - 50
     - 🚫
     - 🚫
     - 🚫
     - 🚫
     - 偵察 5
     - 足かせ 8
     - 根性 1
     - 脱力	12
     - 隠れ身 20
     - 補給 50
   * - 04
     - 自
     - .. image:: ../pilots/images/srw4_pilot_04.png
     - リリス＝ファウ
     - :ref:`重战机 <srw4_pilots_heavy_metal_l_gaim>`
     - 弱気
     - 0
     - 0
     - 0
     - 0
     - 0
     - 0
     - 52
     - 52
     - 99
     - 99
     - 99
     - 99
     - 50
     - 🚫
     - 🚫
     - 🚫
     - 🚫
     - 必中 5
     - 鉄壁 12
     - 信頼 2
     - 幸運 7
     - 激励 3
     - 愛 34
   * - 05
     - 自
     - .. image:: ../pilots/images/srw4_pilot_05.png
     - シルキー＝マウ
     - :ref:`圣战士丹拜因 <srw4_pilots_dunbine>`
     - 弱気
     - 0
     - 0
     - 0
     - 0
     - 0
     - 0
     - 52
     - 52
     - 99
     - 99
     - 99
     - 99
     - 50
     - 🚫
     - 🚫
     - 🚫
     - 🚫
     - 探索 11
     - 信頼 13
     - 気合 21
     - 幸運 10
     - 隠れ身 7
     - かく乱 2
   * - 07
     - 自
     - .. image:: ../pilots/images/srw4_pilot_07.png
     - ジャック＝キング
     - :ref:`盖塔 <srw4_pilots_getter_robo>`
     - 強気
     - 95
     - 113
     - 94
     - 95
     - 72
     - 90
     - 157
     - 170
     - 193
     - 194
     - 171
     - 189
     - 70
     - A
     - A
     - A
     - C
     - ひらめき 6
     - てかげん 1
     - 根性 5
     - 必中 2
     - 熱血 3
     - かく乱 7
   * - 08
     - 自
     - .. image:: ../pilots/images/srw4_pilot_08.png
     - メリー＝キング
     - :ref:`盖塔 <srw4_pilots_getter_robo>`
     - 普通
     - 0
     - 0
     - 0
     - 0
     - 0
     - 0
     - 52
     - 52
     - 99
     - 99
     - 99
     - 99
     - 60
     - 🚫
     - 🚫
     - 🚫
     - 🚫
     - 加速 4
     - 偵察 7
     - 探索 2
     - 信頼 6
     - ド根性 1
     - 幸運 2
   * - 09
     - 自
     - .. image:: ../pilots/images/srw4_pilot_09.png
     - 流竜馬
     - :ref:`盖塔 <srw4_pilots_getter_robo>`
     - 強気
     - 120
     - 90
     - 90
     - 96
     - 85
     - 99
     - 182
     - 147
     - 189
     - 200
     - 184
     - 198
     - 70
     - A
     - B
     - C
     - B
     - ひらめき 20
     - 根性 1
     - 必中 1
     - 熱血 10
     - 覚醒 35
     - 愛 33
     - 底力 1
   * - 0A
     - 自
     - .. image:: ../pilots/images/srw4_pilot_0A.png
     - 神隼人
     - :ref:`盖塔 <srw4_pilots_getter_robo>`
     - 強気
     - 113
     - 95
     - 98
     - 98
     - 87
     - 101
     - 175
     - 152
     - 197
     - 202
     - 186
     - 200
     - 50
     - C
     - A
     - B
     - B
     - 加速 1
     - ひらめき 1
     - てかげん 5
     - 集中 4
     - 幸運 9
     - 友情 25
   * - 0B
     - 自
     - .. image:: ../pilots/images/srw4_pilot_0B.png
     - 車弁慶
     - :ref:`盖塔 <srw4_pilots_getter_robo>`
     - 普通
     - 118
     - 93
     - 82
     - 90
     - 80
     - 90
     - 180
     - 150
     - 181
     - 194
     - 179
     - 189
     - 70
     - C
     - B
     - A
     - B
     - 偵察 10
     - 探索 40
     - 必中 8
     - 気合 5
     - ド根性 1
     - 友情 28
     - 底力 1
   * - 0C
     - 自
     - .. image:: ../pilots/images/srw4_pilot_0C.png
     - 北条真吾
     - :ref:`战国魔神 <srw4_pilots_goshogun>`
     - 強気
     - 115
     - 108
     - 94
     - 95
     - 84
     - 102
     - 172
     - 165
     - 193
     - 199
     - 183
     - 201
     - 60
     - A
     - A
     - C
     - B
     - 集中 10
     - 必中 1
     - 熱血 14
     - ド根性 3
     - 気合 6
     - 友情 37
     - 底力 4
   * - 0D
     - 自
     - .. image:: ../pilots/images/srw4_pilot_0D.png
     - レミー島田
     - :ref:`战国魔神 <srw4_pilots_goshogun>`
     - 超強気
     - 0
     - 0
     - 0
     - 0
     - 0
     - 0
     - 52
     - 52
     - 99
     - 99
     - 99
     - 99
     - 60
     - 🚫
     - 🚫
     - 🚫
     - 🚫
     - 加速 1
     - ひらめき 7
     - 脱力 12
     - 信頼 21
     - 幸運 8
     - 愛 53
   * - 0E
     - 自
     - .. image:: ../pilots/images/srw4_pilot_0E.png
     - キリー=ギャグレー
     - :ref:`战国魔神 <srw4_pilots_goshogun>`
     - 普通
     - 0
     - 0
     - 0
     - 0
     - 0
     - 0
     - 52
     - 52
     - 99
     - 99
     - 99
     - 99
     - 60
     - 🚫
     - 🚫
     - 🚫
     - 🚫
     - てかげん 19
     - 探索 2
     - 根性 4
     - 覚醒 34
     - 魂 45
     - 友情 29
   * - 0F
     - 自
     - .. image:: ../pilots/images/srw4_pilot_0F.png
     - 神勝平
     - :ref:`赞波3 <srw4_pilots_zambot_3>`
     - 超強気
     - 112
     - 102
     - 92
     - 90
     - 88
     - 83
     - 174
     - 159
     - 196
     - 194
     - 88
     - 187
     - 70
     - A
     - A
     - C
     - A
     - 必中 10
     - 熱血 8
     - ド根性 1
     - 気合 11
     - 覚醒 29
     - 愛 41
     - 底力 12
   * - 10
     - 自
     - .. image:: ../pilots/images/srw4_pilot_10.png
     - 神江宇宙太
     - :ref:`赞波3 <srw4_pilots_zambot_3>`
     - 強気
     - 100
     - 100
     - 90
     - 92
     - 84
     - 85
     - 162
     - 157
     - 194
     - 196
     - 183
     - 189
     - 60
     - C
     - A
     - B
     - A
     - 加速 4
     - ひらめき 3
     - てかげん 20
     - 集中 2
     - かく乱 22
     - 友情 31
   * - 11
     - 自
     - .. image:: ../pilots/images/srw4_pilot_11.png
     - 神北恵子
     - :ref:`赞波3 <srw4_pilots_zambot_3>`
     - 強気
     - 95
     - 100
     - 93
     - 90
     - 87
     - 80
     - 157
     - 157
     - 197
     - 194
     - 186
     - 184
     - 50
     - A
     - C
     - A
     - A
     - 偵察 1
     - 探索 1
     - 足かせ 19
     - 再動 27
     - 愛 42
     - 復活 55
   * - 12
     - 自
     - .. image:: ../pilots/images/srw4_pilot_12.png
     - 藤原忍
     - :ref:`断空我 <srw4_pilots_dancouga>`
     - 超強気
     - 105
     - 104
     - 104
     - 92
     - 85
     - 88
     - 172
     - 171
     - 208
     - 186
     - 184
     - 192
     - 40
     - A
     - B
     - B
     - B
     - 加速 15
     - 必中 10
     - 熱血 1
     - ド根性 2
     - 気合 3
     - 激怒 1
   * - 13
     - 自
     - .. image:: ../pilots/images/srw4_pilot_13.png
     - 結城沙羅
     - :ref:`断空我 <srw4_pilots_dancouga>`
     - 超強気
     - 98
     - 85
     - 103
     - 92
     - 87
     - 82
     - 172
     - 171
     - 208
     - 196
     - 184
     - 192
     - 40
     - B
     - A
     - B
     - B
     - ひらめき 14
     - 熱血 3
     - 鉄壁 29
     - ド根性 1
     - 気合 2
     - 幸運,25
   * - 14
     - 自
     - .. image:: ../pilots/images/srw4_pilot_14.png
     - 式部雅人	
     - :ref:`断空我 <srw4_pilots_dancouga>`
     - 強気
     - 98
     - 86
     - 104
     - 90
     - 84
     - 80
     - 165
     - 153
     - 208
     - 194
     - 183
     - 194
     - 40
     - B
     - A
     - B
     - B
     - 集中 13
     - 根性 1
     - 熱血 3
     - 気合 2
     - 激励 23
     - 愛 30
   * - 15
     - 自
     - .. image:: ../pilots/images/srw4_pilot_15.png
     - 司馬亮
     - :ref:`断空我 <srw4_pilots_dancouga>`
     - 強気
     - 105
     - 92
     - 102
     - 91
     - 86
     - 91
     - 172
     - 159
     - 206
     - 195
     - 185
     - 195
     - 45
     - B
     - A
     - B
     - B
     - てかげん 19
     - 根性 1
     - 信頼 11
     - 熱血 3
     - 気合 2
     - 覚醒 31
   * - 16
     - 自
     - .. image:: ../pilots/images/srw4_pilot_16.png
     - 葵豹馬
     - :ref:`孔巴特拉V <srw4_pilots_combattler_v>`
     - 超強気
     - 112
     - 92
     - 90
     - 90
     - 83
     - 84
     - 179
     - 149
     - 194
     - 194
     - 182
     - 188
     - 50
     - A
     - A
     - B
     - B
     - ひらめき 10
     - 探索 41
     - 熱血 2
     - ド根性 7
     - 気合 4
     - 覚醒 30
     - 底力 1
   * - 17
     - 自
     - .. image:: ../pilots/images/srw4_pilot_17.png
     - 浪花十三
     - :ref:`孔巴特拉V <srw4_pilots_combattler_v>`
     - 強気
     - 90
     - 95
     - 84
     - 95
     - 82
     - 80
     - 152
     - 162
     - 188
     - 199
     - 181
     - 189
     - 40
     - A
     - A
     - B
     - B
     - 加速 13
     - 偵察 40
     - ひらめき 7
     - てかげん 35
     - 集中 3
     - 必中 1
     - 底力 14
   * - 18
     - 自
     - .. image:: ../pilots/images/srw4_pilot_18.png
     - 西川大作
     - :ref:`孔巴特拉V <srw4_pilots_combattler_v>`
     - 強気
     - 116
     - 75
     - 80
     - 87
     - 78
     - 77
     - 178
     - 127
     - 184
     - 186
     - 177
     - 176
     - 40
     - C
     - A
     - A
     - C
     - 足かせ 24
     - 根性 1
     - 熱血 5
     - ド根性 2
     - 気合 10
     - 激怒 18
     - 底力 1
   * - 19
     - 自
     - .. image:: ../pilots/images/srw4_pilot_19.png
     - 南原ちづる
     - :ref:`孔巴特拉V <srw4_pilots_combattler_v>`
     - 普通
     - 85
     - 88
     - 93
     - 88
     - 83
     - 75
     - 147
     - 140
     - 197
     - 187
     - 182
     - 174
     - 30
     - A
     - B
     - A
     - B
     - ひらめき 1
     - 信頼 1
     - 幸運 33
     - 補給 48
     - 友情 3
     - 愛 12
   * - 1A
     - 自
     - .. image:: ../pilots/images/srw4_pilot_1A.png
     - 北小介
     - :ref:`孔巴特拉V <srw4_pilots_combattler_v>`
     - 弱気
     - 70
     - 85
     - 90
     - 86
     - 80
     - 74
     - 137
     - 137
     - 194
     - 185
     - 179
     - 173
     - 30
     - A
     - A
     - A
     - B
     - 加速 5
     - 偵察 1
     - 探索 1
     - 根性 49
     - 信頼 42
     - 隠れ身 31
   * - 1B
     - 盟
     - .. image:: ../pilots/images/srw4_pilot_1B.png
     - ギリアム＝イェーガー
     - :ref:`原创 <srw4_pilots_banpresto_originals>`
     - 超強気
     - 115
     - 122
     - 120
     - 110
     - 91
     - 108
     - 167
     - 184
     - 219
     - 209
     - 190
     - 207
     - 60
     - A
     - A
     - B
     - A
     - ひらめき 3
     - 必中 2
     - 熱血 6
     - 気合 1
     - 再動 20
     - 復活 31
     - 切り払い１ 1
   * - 1C
     - 自
     - .. image:: ../pilots/images/srw4_pilot_1C.png
     - ショウ＝ザマ
     - :ref:`圣战士丹拜因 <srw4_pilots_dunbine>`
     - 強気
     - 118
     - 110
     - 129
     - 108
     - 90
     - 105
     - 180
     - 172
     - 234
     - 212
     - 194
     - 214
     - 50
     - A
     - A
     - B
     - B
     - てかげん 13
     - 集中 4
     - 根性 1,
     - 熱血 10
     - 気合 30
     - 魂 45
     - 聖戦士 10
     
       切り払い４ 1
       
       切り払い５ 31
   * - 1D
     - 自
     - .. image:: ../pilots/images/srw4_pilot_1D.png
     - マサキ＝アンドー
     - :ref:`原创 <srw4_pilots_banpresto_originals>`
     - 超強気
     - 111
     - 122
     - 122
     - 106
     - 90
     - 109
     - 163
     - 174
     - 221
     - 205
     - 189
     - 208
     - 60
     - A
     - A
     - C
     - A
     - 加速 1
     - ひらめき 2
     - てかげん 20
     - 集中 5
     - 熱血 52
     - 気合 10
   * - 1E
     - 自
     - .. image:: ../pilots/images/srw4_pilot_1E.png
     - リューネ＝ゾルダーク
     - :ref:`原创 <srw4_pilots_banpresto_originals>`
     - 超強気
     - 107
     - 118
     - 123
     - 102
     - 89
     - 100
     - 159
     - 170
     - 222
     - 201
     - 188
     - 199
     - 60
     - A
     - B
     - C
     - A
     - ひらめき 4
     - 熱血 54
     - 鉄壁 31
     - ド根性 1
     - 気合 9
     - 愛 36
   * - 1F
     - 自
     - .. image:: ../pilots/images/srw4_pilot_1F.png
     - シュウ＝シラカワ
     - :ref:`原创 <srw4_pilots_banpresto_originals>`
     - 普通
     - 103
     - 123
     - 127
     - 114
     - 89
     - 118
     - 155
     - 175
     - 226
     - 213
     - 188
     - 217
     - 60
     - A
     - A
     - B
     - A
     - 熱血 43
     - ド根性 9
     - 気合 1
     - 幸運 17
     - 威圧 29
     - 隠れ身 2
   * - 20
     - 自
     - .. image:: ../pilots/images/srw4_pilot_20.png
     - クワトロ＝バジーナ
     - :ref:`Z高达 <srw4_pilots_ms_z_gundam>`
     - 強気
     - 98
     - 130
     - 129
     - 119
     - 94
     - 127
     - 150
     - 182
     - 228
     - 218
     - 193
     - 226
     - 50
     - B
     - A
     - B
     - A
     - 加速 3
     - てかげん 9
     - 集中 1
     - 熱血 8
     - 威圧 18
     - 魂 40
     - ニュータイプ 15

       シールド防御３ 1
   * - 21
     - 自
     - .. image:: ../pilots/images/srw4_pilot_21.png
     - ブライト＝ノア
     - :ref:`高达0079 <srw4_units_ms_gundam>`
     - 普通
     - 76
     - 110
     - 105
     - 101
     - 86
     - 100
     - 128
     - 162
     - 204
     - 200
     - 187
     - 199
     - 50
     - A
     - C
     - C
     - A
     - 加速 1
     - 偵察 3
     - 集中 18
     - 根性 5
     - 必中 24
     - かく乱 41
   * - 22
     - 盟
     - .. image:: ../pilots/images/srw4_pilot_22.png
     - ハヤト＝コバヤシ
     - :ref:`高达0079 <srw4_units_ms_gundam>`
     - 弱気
     - 236
     - 236
     - 0
     - 0
     - 0
     - 0
     - 255
     - 255
     - 99
     - 99
     - 99
     - 99
     - 0
     - 🚫
     - 🚫
     - 🚫
     - 🚫
   * - 23
     - 盟
     - .. image:: ../pilots/images/srw4_pilot_23.png
     - カイ＝シデン
     - :ref:`Z高达 <srw4_units_ms_z_gundam>`
     - 弱気
     - 236
     - 236
     - 0
     - 0
     - 0
     - 0
     - 255
     - 255
     - 99
     - 99
     - 99
     - 99
     - 0
     - 🚫
     - 🚫
     - 🚫
     - 🚫
   * - 24
     - 盟
     - .. image:: ../pilots/images/srw4_pilot_24.png
     - マチルダ＝アジャン
     - :ref:`高达0079 <srw4_units_ms_gundam>`
     - 強気
     - 78
     - 82
     - 104
     - 92
     - 82
     - 80
     - 130
     - 134
     - 203
     - 191
     - 181
     - 179
     - 50
     - A
     - C
     - C
     - C
     - 加速 1
     - 根性 12
     - 激励 28
     - 補給 32
     - 再動 35
     - 復活 40
   * - 25
     - 没
     - .. image:: ../pilots/images/srw4_pilot_25.png
     - セイラ＝マス(没)
     - :ref:`高达0079 <srw4_units_ms_gundam>`
     - 弱気
     - 236
     - 236
     - 0
     - 0
     - 0
     - 0
     - 255
     - 255
     - 99
     - 99
     - 99
     - 99
     - 0
     - 🚫
     - 🚫
     - 🚫
     - 🚫
   * - 26
     - 没
     - .. image:: ../pilots/images/srw4_pilot_26.png
     - ワッケイン(没)
     - :ref:`高达0079 <srw4_units_ms_gundam>`
     - 普通
     - 74
     - 107
     - 105
     - 90
     - 81
     - 80
     - 126
     - 159
     - 204
     - 189
     - 180
     - 179
     - 40
     - B
     - C
     - C
     - B
     - 加速 1
     - 根性 2
     - 気合 12
   * - 27
     - 没
     - .. image:: ../pilots/images/srw4_pilot_27.png
     - ティアンム提督(没)
     - :ref:`高达0079 <srw4_units_ms_gundam>`
     - 普通
     - 74
     - 108
     - 105
     - 90
     - 81
     - 80
     - 126
     - 160
     - 204
     - 189
     - 180
     - 179
     - 40
     - B
     - B
     - C
     - B
     - 加速 4
     - 根性 3
     - 気合 15
     - かく乱 17
   * - 28
     - 自
     - .. image:: ../pilots/images/srw4_pilot_28.png
     - エマ＝シーン
     - :ref:`Z高达 <srw4_units_ms_z_gundam>`
     - 普通
     - 80
     - 108
     - 110
     - 105
     - 88
     - 96
     - 142
     - 165
     - 221
     - 204
     - 187
     - 195
     - 50
     - B
     - A
     - B
     - B
     - 偵察 1
     - ひらめき 2
     - 集中 10
     - 熱血 17
     - 覚醒 30
     - 激励 31
     - シールド防御１ 1
   * - 29
     - 自
     - .. image:: ../pilots/images/srw4_pilot_29.png
     - トーレス
     - :ref:`Z高达 <srw4_units_ms_z_gundam>`
     - 弱気
     - 68
     - 101
     - 103
     - 94
     - 82
     - 81
     - 120
     - 153
     - 204
     - 193
     - 181
     - 180
     - 40
     - A
     - C
     - C
     - B
     - 加速 2
     - 偵察 1
     - 根性 1
   * - 2A
     - 自
     - .. image:: ../pilots/images/srw4_pilot_2A.png
     - ファ＝ユイリィ
     - :ref:`Z高达 <srw4_units_ms_z_gundam>`
     - 弱気
     - 70
     - 97
     - 105
     - 96
     - 84
     - 82
     - 137
     - 169
     - 216
     - 200
     - 193
     - 181
     - 55
     - A
     - B
     - C
     - A
     - ひらめき 5
     - 集中 10
     - 信頼 1
     - 幸運 12
     - 激励 18
     - 愛 23
     - ニュータイプ 29

       シールド防御１ 14
   * - 2B
     - 自
     - .. image:: ../pilots/images/srw4_pilot_2B.png
     - カツ＝コバヤシ
     - :ref:`Z高达 <srw4_units_ms_z_gundam>`
     - 弱気
     - 90
     - 98
     - 104
     - 93
     - 83
     - 82
     - 142
     - 170
     - 203
     - 192
     - 192
     - 186
     - 50
     - A
     - B
     - C
     - A
     - 根性 5
     - 必中 8
     - 信頼 12
     - 熱血 14
     - 隠れ身 21
     - 補給 57
     - ニュータイプ 20

       シールド防御１ 1
   * - 2C
     - 自
     - .. image:: ../pilots/images/srw4_pilot_2C.png
     - フォウ＝ムラサメ
     - :ref:`Z高达 <srw4_units_ms_z_gundam>`
     - 普通
     - 98
     - 102
     - 122
     - 114
     - 95
     - 112
     - 160
     - 164
     - 211
     - 213
     - 194
     - 211
     - 50
     - A
     - B
     - C
     - A
     - ひらめき 2
     - 集中 1
     - 信頼 14
     - 熱血 5
     - 覚醒 20
     - 愛 30
     - 強化人間 1
       
       シールド防御２ 1
   * - 2D
     - 盟
     - .. image:: ../pilots/images/srw4_pilot_2D.png
     - ベルトーチカ＝イルマ
     - :ref:`Z高达 <srw4_units_ms_z_gundam>`
     - 弱気
     - 236
     - 236
     - 0
     - 0
     - 0
     - 0
     - 255
     - 255
     - 99
     - 99
     - 99
     - 99
     - 0
     - 🚫
     - 🚫
     - 🚫
     - 🚫
   * - 2E
     - 敌
     - .. image:: ../pilots/images/srw4_pilot_2E.png
     - ケリィ＝レズナー
     - :ref:`高达0083 <srw4_units_ms_gundam_0083>`
     - 普通
     - 100
     - 117
     - 113
     - 112
     - 82
     - 116
     - 152
     - 169
     - 212
     - 211
     - 181
     - 215
     - 50
     - A
     - B
     - B
     - A
     - 加速 3
     - ひらめき 15
     - 根性 1
     - 信頼 28
     - 熱血 10
     - 隠れ身 7
   * - 2F
     - 盟
     - .. image:: ../pilots/images/srw4_pilot_2F.png
     - ヘンケン＝ベッケナー
     - :ref:`Z高达 <srw4_units_ms_z_gundam>`
     - 普通
     - 74
     - 108
     - 104
     - 99
     - 82
     - 100
     - 126
     - 160
     - 203
     - 198
     - 181
     - 199
     - 50
     - A
     - B
     - C
     - A
     - 加速 4
     - 偵察 8
     - 集中 6
     - ド根性 1
     - かく乱 29
     - 愛 34
   * - 30
     - 盟
     - .. image:: ../pilots/images/srw4_pilot_30.png
     - ブレックス＝フォーラ
     - :ref:`Z高达 <srw4_units_ms_z_gundam>`
     - 弱気
     - 236
     - 236
     - 0
     - 0
     - 0
     - 0
     - 255
     - 255
     - 99
     - 99
     - 99
     - 99
     - 0
     - 🚫
     - 🚫
     - 🚫
     - 🚫
   * - 31
     - 自
     - .. image:: ../pilots/images/srw4_pilot_31.png
     - ルー＝ルカ
     - :ref:`ZZ高达 <srw4_units_ms_gundam_zz>`
     - 強気
     - 78
     - 91
     - 110
     - 100
     - 87
     - 89
     - 140
     - 162
     - 209
     - 199
     - 191
     - 193
     - 50
     - B
     - B
     - A
     - A
     - ひらめき 3
     - 根性 1
     - 熱血 13
     - 幸運 10
     - 補給 46
     - 友情 26
     - ニュータイプ 22
     
       シールド防御１ 1
     
       シールド防御２21
   * - 32
     - 自
     - .. image:: ../pilots/images/srw4_pilot_32.png
     - エルピー＝プル
     - :ref:`ZZ高达 <srw4_units_ms_gundam_zz>`
     - 強気
     - 80
     - 102
     - 123
     - 115
     - 95
     - 100
     - 132
     - 164
     - 222
     - 214
     - 194
     - 199
     - 50
     - B
     - A
     - C
     - A
     - てかげん 25
     - 根性 4
     - 熱血 7
     - 幸運 19
     - 激励 35 
     - 愛 32
     - 強化人間 1
   * - 33
     - 自
     - .. image:: ../pilots/images/srw4_pilot_33.png
     - プルツー
     - :ref:`ZZ高达 <srw4_units_ms_gundam_zz>`
     - 超強気
     - 80
     - 102
     - 123
     - 115
     - 95
     - 100
     - 132
     - 164
     - 222
     - 214
     - 194
     - 199
     - 50
     - B
     - A
     - C
     - A
     - 集中 6
     - 根性 2
     - 熱血 9
     - 威圧 22
     - 覚醒 18
     - 友情 31
     - 強化人間 1
   * - 34
     - 盟
     - .. image:: ../pilots/images/srw4_pilot_34.png
     - リィナ＝アーシタ
     - :ref:`ZZ高达 <srw4_units_ms_gundam_zz>`
     - 弱気
     - 236
     - 236
     - 0
     - 0
     - 0
     - 0
     - 255
     - 255
     - 99
     - 99
     - 99
     - 99
     - 0
     - 🚫
     - 🚫
     - 🚫
     - 🚫
   * - 35
     - 盟
     - .. image:: ../pilots/images/srw4_pilot_35.png
     - ビーチャ＝オレーグ
     - :ref:`ZZ高达 <srw4_units_ms_gundam_zz>`
     - 普通
     - 87
     - 92
     - 106
     - 92
     - 82
     - 80
     - 149
     - 154
     - 205
     - 191
     - 191
     - 179
     - 50
     - A
     - B
     - C
     - A
     - 加速 4
     - ひらめき 17
     - 集中 8
     - 根性 1
     - 熱血 12
     - 覚醒 29
     - ニュータイプ 29
   * - 36
     - 没
     - .. image:: ../pilots/images/srw4_pilot_36.png
     - モンド＝アガケ(没)
     - :ref:`ZZ高达 <srw4_units_ms_gundam_zz>`
     - 弱気
     - 70
     - 87
     - 100
     - 90
     - 80
     - 78
     - 132
     - 149
     - 199
     - 189
     - 179
     - 177
     - 50
     - C
     - B
     - C
     - B
     - 根性,12
     - 脱力,2
     - 幸運,19
     - 激励,27
     - 再動,37
     - 愛,20
     - ニュータイプ 40
   * - 37
     - 盟
     - .. image:: ../pilots/images/srw4_pilot_37.png
     - エル＝ビアンノ
     - :ref:`ZZ高达 <srw4_units_ms_gundam_zz>`
     - 強気
     - 70
     - 88
     - 105
     - 91
     - 82
     - 78
     - 132
     - 160
     - 204
     - 190
     - 191
     - 177
     - 50
     - C
     - B
     - A
     - A
     - 偵察 4
     - 探索 2
     - 根性 1
     - 信頼 7
     - 熱血 13
     - かく乱 14
     - ニュータイプ 36
      
       シールド防御１,8
   * - 38
     - 没
     - .. image:: ../pilots/images/srw4_pilot_38.png
     - イーノ＝アッバーブ(没)
     - :ref:`ZZ高达 <srw4_units_ms_gundam_zz>`
     - 弱気
     - 236
     - 236
     - 0
     - 0
     - 0
     - 0
     - 255
     - 255
     - 99
     - 99
     - 99
     - 99
     - 0
     - 🚫
     - 🚫
     - 🚫
     - 🚫
   * - 39
     - 盟
     - .. image:: ../pilots/images/srw4_pilot_39.png
     - エマリー＝オンス
     - :ref:`ZZ高达 <srw4_units_ms_gundam_zz>`
     - 弱気
     - 236
     - 236
     - 0
     - 0
     - 0
     - 0
     - 255
     - 255
     - 99
     - 99
     - 99
     - 99
     - 0
     - 🚫
     - 🚫
     - 🚫
     - 🚫
   * - 3A
     - 自
     - .. image:: ../pilots/images/srw4_pilot_3A.png
     - クェス＝パラヤ
     - :ref:`逆袭的夏亚 <srw4_units_ms_gundam_char_s_counterattack>`
     - 弱気
     - 82
     - 95
     - 110
     - 113
     - 95
     - 100
     - 144
     - 167
     - 219
     - 212
     - 194
     - 199
     - 50
     - B
     - B
     - C
     - A
     - 加速	8
     - ひらめき	1
     - 集中	7
     - 必中	3
     - 熱血	18
     - 気合	9
     - ニュータイプ	3
   * - 3B
     - 盟
     - .. image:: ../pilots/images/srw4_pilot_3B.png
     - チェーン＝アギ
     - :ref:`逆袭的夏亚 <srw4_units_ms_gundam_char_s_counterattack>`
     - 弱気
     - 236
     - 236
     - 0
     - 0
     - 0
     - 0
     - 255
     - 255
     - 99
     - 99
     - 99
     - 99
     - 0
     - 🚫
     - 🚫
     - 🚫
     - 🚫
   * - 3C
     - 自
     - .. image:: ../pilots/images/srw4_pilot_3C.png
     - ケーラ＝スゥ
     - :ref:`逆袭的夏亚 <srw4_units_ms_gundam_char_s_counterattack>`
     - 普通
     - 80
     - 107
     - 120
     - 113
     - 87
     - 110
     - 137
     - 164
     - 219
     - 212
     - 186
     - 209
     - 50
     - B
     - A
     - C
     - A
     - 加速	5
     - ひらめき	17
     - 集中	12
     - 根性	1
     - 熱血	26
     - かく乱	19
     - シールド防御２	1
   * - 3D
     - 自
     - .. image:: ../pilots/images/srw4_pilot_3D.png
     - ハサウェイ＝ノア
     - :ref:`Z高达 <srw4_pilots_ms_z_gundam>`
     - 弱気
     - 90
     - 95
     - 111
     - 97
     - 83
     - 80
     - 142
     - 167
     - 210
     - 196
     - 192
     - 200
     - 50
     - B
     - A
     - B
     - B
     - 集中	2
     - 熱血	24
     - 気合	8
     - 隠れ身	16
     - 覚醒	23
     - 愛	31
     - ニュータイプ	13
   * - 3E
     - 自
     - .. image:: ../pilots/images/srw4_pilot_3E.png
     - クリスチーナ＝マッケンジー	
     - :ref:`高达0080 <srw4_units_ms_gundam_0080>`
     - 弱気
     - 78
     - 94
     - 103
     - 101
     - 87
     - 94
     - 130
     - 154
     - 202
     - 200
     - 186
     - 214
     - 50
     - C
     - A
     - C
     - B
     - 加速	2
     - 熱血	25
     - 覚醒	30
     - 友情	12
     - 激励	19
     - 復活	39
     - シールド防御１	1
   * - 3F
     - 自
     - .. image:: ../pilots/images/srw4_pilot_3F.png
     - バーナード＝ワイズマン	
     - :ref:`高达0080 <srw4_units_ms_gundam_0080>`
     - 普通
     - 98
     - 87
     - 102
     - 99
     - 80
     - 90
     - 170
     - 159
     - 201
     - 198
     - 189
     - 210
     - 50
     - C
     - A
     - B
     - B
     - 自爆	10
     - 集中	7
     - 足かせ	16
     - 根性	1
     - 熱血	23
     - 幸運	4
     - シールド防御１	1











.. raw:: html

    <script>
        var oTable = new DataTable('#srw-pilots-snes-table',{paging: false,searching: true, info: false,fixedHeader: true, scrollX: false, columnDefs: [
                {
                     type: 'hex',
                     targets:  0
               },
               {
               
                     type: 'terrain-grade',
                     targets:  [18,19,20,21]
               },
               {
                    target: [6,7,8,9,10,11,12,13,14,15,16,17],
                    visible: false,
               },
               {
                    targets: [2,5,23,24,25,26,27,28,29],
                    orderable: false
               }
            ]});
        $(document).ready(function(){
            $("#checkboxPlayerOnly").on( "click", function() {
              oTable.draw();
            });
            $("#comboboxSeries").change(function() {
              var selectedSeries=$('#comboboxSeries').val();
              oTable.draw();
            });
            oTable.search.fixed('affiliationSearch', function (row, data, index) 
            { 
              let affiliation = data[1] || ""; 
              let seriesName = data[4] || ""; 
              var affiliationMatch=false;
              if($('#checkboxPlayerOnly').prop('checked'))
              {            
                  affiliationMatch= affiliation.includes("自");
              }
              else 
                  affiliationMatch= true;
              var seriesNameMatch=false;
              var selectedSeries=$('#comboboxSeries').val();
              //console.log("selectedSeries="+selectedSeries);
              switch(selectedSeries)
              {
                case "1":
                  seriesNameMatch=true;break;
                case "2":
                  seriesNameMatch= seriesName.includes("高达")||seriesName.includes("逆袭的夏亚");break;
                case "3":
                  seriesNameMatch= seriesName.includes("魔神")||seriesName.includes("古连泰沙");break;
                case "4":
                  seriesNameMatch= seriesName.includes("重战机");break;
                case "5":
                  seriesNameMatch= seriesName.includes("丹拜因");break;
                default:
                  console.log("unexpected selectedSeries="+selectedSeries);break;
              }
              return affiliationMatch && seriesNameMatch;
            });
            document.querySelectorAll('a.toggle-vis').forEach((el) => {
                    el.addEventListener('click', function (e) {
                        e.preventDefault();
                
                        let columnMode = e.target.getAttribute('data-column');
                        var visibleColumnIndexArray;
                        var hiddenColumnIndexArray;
                        switch(columnMode)
                        {
                            case "1":
                                visibleColumnIndexArray=[6,7,8,9,10,11,19,20,21,22];
                                hiddenColumnIndexArray=[12,13,14,15,16,17,18,23,24,25,26,27,28,29];
                                break;
                            case "2":
                                visibleColumnIndexArray=[12,13,14,15,16,17,19,20,21,22];
                                hiddenColumnIndexArray=[6,7,8,9,10,11,18,23,24,25,26,27,28,29];
                                break;
                            case "3":
                                visibleColumnIndexArray=[18,23,24,25,26,27,28,29];
                                hiddenColumnIndexArray=[6,7,8,9,10,11,12,13,14,15,16,17,19,20,21,22];
                                break;
                            default:
                                visibleColumnIndexArray=[18,19,20,21,22,23,24,25,26,27,28,29];
                                hiddenColumnIndexArray=[6,7,8,9,10,11,12,13,14,15,16,17];
                                break;

                        }
                        /* console.log("current column state");
                           oTable.columns().every( function () {
                             var data = this.data();
                              console.log("column "+this.index()+"has visibility "+this.visible());
                        } );*/
                        for(const columnIndex of visibleColumnIndexArray)
                        {
                            //console.log("showing column"+columnIndex);
                            oTable.column(columnIndex).visible(true);
                        }
                        
                        columns = oTable.columns(hiddenColumnIndexArray);
                        for(const columnIndex of hiddenColumnIndexArray)
                        {
                            //console.log("hiding column"+columnIndex);
                            oTable.column(columnIndex).visible(false);
                        }
                    });
                });
        });    
        
    </script>
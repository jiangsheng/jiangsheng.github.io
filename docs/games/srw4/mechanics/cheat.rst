.. meta::
   :description: 目录 修改 (第四次机器人大战) 第四次金手指 第四次修改 动态修改 人物和机体修改 芯片修改 静态修改 人物修改 机体修改 精神修改 武器修改 芯片修改 第四次S金手指 用金手指添加机师的时候要注意，按照隐藏要素推荐的路线走剧情的话（这样打两遍就可以基本走完剧情），第四次的A路线到最后有59名机师，58个机体，B路线

.. _srw4_cheat:

修改 (第四次机器人大战)
==============================

.. contents::

.. image:: images/cheat_boss.jpg


用金手指添加机师的时候要注意，按照\ :ref:`隐藏要素 <srw4_missable>`\ 推荐的路线走剧情的话（这样打两遍就可以基本走完剧情），第四次的A路线到最后有59名机师，58个机体，B路线55名机师，52个机体(但是最多只能比真实系多增加5台，因为在\ :ref:`コンバトラーV <srw4_unit_combattler_v>`\ 或者\ :ref:`ダンクーガ <srw4_unit_dancouga>`\ 离队之前就会造成机体溢出)，C路线的话比A路线少一个机师。不管走哪条路线，都可以至少添加5名机师，6个机体。不走推荐的路线的话，也可以根据人物机体的加入离开算一下自己想走的路线最后会有多少人物和机体，用64减去最后的数量就是可以利用的空位。第四次S的话，机体和机师最多可以有80个，但是因为强制离队事件少了很多的原因，新增的空位并没有那么多。

添加机师会出的问题是一些人物有剧情强制出场。比如如果在一开头把クワトロ改出来了，之后走宇宙路线クワトロ登场的时候会无限失败，因为改出来的机体和机师会被划到地上分队去，导致这一话夏亚登不了场。在这一话之前把クワトロ改到宇宙分队是没有用的，把夏亚改成别的人物才行。为了安全起见可以添加NPC、敌方或者你选择的路线不会入手的机师。如果改出来的是只会临时参战的人物或者机体，在参战完之后改出来的人物或者机体也会离队。

添加机体会需要连武器数量那一段数据一起改，只添加机体的代码的话，加的机体不能改造。另外游戏本身需要一些机体离队以腾出空间容纳新加入的机体，如果改掉了会中途离队的机体，可能导致机体溢出，后面人物加入时没有对应的机体或者现存人物的机体被顶掉。

.. image:: images/cheat_boss_weapon.jpg

-------------------
静态修改
-------------------

第四次的以C开头的金手指地址减去C00000即为ROM地址，至于以7开头的，因为是只在RAM里面才有的数据，所以不能够静态修改。对于第四次S，可以根据数据结构搜索。例如搜机体的话，依次输入移动力、移动类型、地形适应、装甲/10、运动性、限界、EN、HP（2字节）。

数据结构列表:

* :ref:`机体 <srw4_units_cheat>`
* :ref:`人物 <srw4_pilots_cheat>`
* :ref:`武器 <srw4_weapon_cheat>`
* :ref:`芯片 <srw4_items_cheat>`
* :ref:`改造参数 <srw4_remodeling_cheat>`
* :ref:`特殊诞生日精神和SP消耗 <srw4_mechanics_sprit_command_cheat>`

-------------------
第四次金手指
-------------------

^^^^^^^^^^^^^^^^^
全局设置
^^^^^^^^^^^^^^^^^
借鉴了西XX和BTSG的心得

.. grid::

    .. grid-item-card:: 跳关
      :columns: auto
      
      | 7E1000=xx
      | xx:下一话代码

    .. grid-item-card:: 当前话数
      :columns: auto

      | 7E1001=xx 

    .. grid-item-card:: 当前话代码
      :columns: auto

      | 7E1002=xx 

    .. grid-item-card:: 生日
      :columns: auto

      | 7E1086=mm
      | 7E1087=dd

    .. grid-item-card:: 最大\ :ref:`资金 <srw4_remodeling_cheat>`
      :columns: auto

      | 7E1055=7F
      | 7E1056=96
      | 7E1057=98
  
    .. grid-item-card:: 战斗画面关，地图坐标开
      :columns: auto

      | 7E1058=60 

    .. grid-item-card:: 战斗画面开，地图坐标关
      :columns: auto

      | 7E1058=00 

    .. grid-item-card:: 总回合数最小 
      :columns: auto

      | 7e1053=01
      | 7e1054=00

    .. grid-item-card:: 总回合数最大
      :columns: auto

      | 7e1053=0f
      | 7e1054=27

    .. grid-item-card:: :ref:`经验倍率 <srw4_exp>`
      :columns: auto

      | 7E0EE1=7E 

    .. grid-item-card:: 基础经验值
      :columns: auto

      | 7e0eda=ff 
      | 7e0edb=ff  

    .. grid-item-card:: 地图武器自残有经验
      :columns: auto

      | c3d848=00

    .. grid-item-card:: 1级全精神
      :columns: auto

      | 7e0eba=ff

    .. grid-item-card:: 精神不減
      :columns: auto

      | 7e0ebb=ff

    .. grid-item-card:: 气合效果最大
      :columns: auto

      | 829bcf=fd
      | 使用脱力时关掉

    .. grid-item-card:: 保持幸運效果
      :columns: auto

      | c0b85b=00
      | 不用时关掉

    .. grid-item-card:: 激怒攻击力最大
      :columns: auto

      | 7E0EC3=FF
      | 7E0EC4=FF

    .. grid-item-card:: 恋爱度最大
      :columns: auto

      | 7E1068=F0 

    .. grid-item-card:: 恋爱度最小
      :columns: auto

      | 7E1068=00 

    .. grid-item-card:: 演示动画强开
      :columns: auto      

      | 7E1069=ff
      | 7E106a=40

    .. grid-item-card:: 控制敌军
      :columns: auto

      | c392cd=0b

    .. grid-item-card:: 控制敌军探宝
      :columns: auto

      | C2B07D=00

    .. grid-item-card:: 无需侦察
      :columns: auto

      | C2C23C=80

    .. grid-item-card:: 诞生月
      :columns: auto

      7e1206=xx

    .. grid-item-card:: 诞生日
      :columns: auto

      7e1207=xx

    .. grid-item-card:: 换乘无视系别
      :columns: auto

      | C2D3BE=80

    .. grid-item-card:: 无限移动
      :columns: auto

      | 7E1566=44
      | 7E1568=44
      | 7E156a=44
      | 7E156c=44
      | 7E156e=44
      | 7E1570=44
      | 7E1572=44

    .. grid-item-card:: 出击数锁定
      :columns: auto

      | 7E0EEC=18
      | 比如同时可以出击两台母舰，
      | 但是总出击数量是写死的，
      | 后选的会把先选的覆盖，
      | 而且把剧情预留出击位占了会出bug，
      | 比如战场之爱击落蕾西之后
      | 她本来会重新作为友军出现，
      | 但是开了之后会作为敌军出现，
      | \ :ref:`マサキ·アンドー <srw4_pilot_masaki_andoh>`\ （安藤正树）也只会作为NPC出场。

    .. grid-item-card:: 全体高性能雷达      
      :columns: auto

      | 7E1308=00
      | 7E1309=00
      | 7E130A=00
      | 7E130B=00
      | …… （中间每个字节都是00）
      | 7E1387=00

    .. grid-item-card:: 全武器15段改造
      :columns: auto
      
      | 7E141E=FF
      | 7E141F=FF
      | …… （中间每个字节都是FF）
      | 7E14EB=FF

    .. grid-item-card:: 强化配件各9个
      :columns: auto

      | 7e1078=99
      | 7e1079=99
      | 7e107a=99
      | 7e107b=99
      | 7e107c=99
      | 7e107d=99
      | 7e107e=99
      | 7e107f=99

    .. grid-item-card:: 添加妖精
      :columns: auto
      
      | Snes9x/Bsnes支持条件启用
      | 如果模拟器不支持，需要开局开启，
      | 第一话过关之后存盘之后关闭再读盘，
      | 因为换乘的机师代码也在同一个字节，
      | 一直锁定的话会导致改出来也没法用。
      | 7E1409=00?80
      | チャム·ファウ
      | 7E140D=00?80
      | ベル·アール
      | 7E1411=00?80
      | エル·フィノ
      | 7E1415=00?80
      | リリス·ファウ
      | 7E1419=00?80
      | シルキー·マウ


^^^^^^^^^^^^^^^^^
主人公名字修改
^^^^^^^^^^^^^^^^^

.. grid::

    .. grid-item-card:: マオ
      :columns: auto

      | D28963=F5
      | D28964=54
      | マオ→毛

    .. grid-item-card:: リン
      :columns: auto

      | D28935=F3
      | D28936=42
      | リン→林
      



^^^^^^^^^^^^^^^^^
主人公精神修改
^^^^^^^^^^^^^^^^^
具体数据格式参考\ :ref:`第四次精神修改 <srw4_mechanics_sprit_command_cheat>`\ 。

.. grid::

    .. grid-item-card:: リン
      :columns: auto

      | CB8FFF1E
      | CB0000=01
      | CB0001=0E
      | CB0002=01
      | CB0003=13
      | CB0004=01
      | CB0005=14
      | CB0006=01
      | CB0007=16
      | CB0008=01
      | CB0009=12
      | CB000A=01

    .. grid-item-card:: ヘクトール
      :columns: auto

      | CB9045=1E
      | CB9046=01
      | CB9047=0E
      | CB9048=01
      | CB9049=13
      | CB904A=01
      | CB904B=14
      | CB904C=01
      | CB904D=16
      | CB904E=01
      | CB904F=12
      | CB9050=01

    .. grid-item-card:: ジェス
      :columns: auto

      | CB90C3=1E
      | CB90C4=01
      | CB90C5=0E
      | CB90C6=01
      | CB90C7=13
      | CB90C8=01
      | CB90C9=14
      | CB90CA=01
      | CB90CB=16
      | CB90CC=01
      | CB90CD=12
      | CB90CE=01

    .. grid-item-card:: ミーナ
      :columns: auto

      | CB90FB=1E
      | CB90FC=01
      | CB90FD=0E
      | CB90FE=01
      | CB90FF=13
      | CB9100=01
      | CB9101=14
      | CB9102=01
      | CB9103=16
      | CB9104=01
      | CB9105=12
      | CB9106=01

    .. grid-item-card:: イルム
      :columns: auto

      | CB9179=1E
      | CB917A=01
      | CB917B=0E
      | CB917C=01
      | CB917D=13
      | CB917E=01
      | CB917F=14
      | CB9180=01
      | CB9181=16
      | CB9182=01
      | CB9183=12
      | CB9184=01

    .. grid-item-card:: パット
      :columns: auto

      | CB9221=1E
      | CB9222=01
      | CB9223=0E
      | CB9224=01
      | CB9225=13
      | CB9226=01
      | CB9227=14
      | CB9228=01
      | CB9229=16
      | CB922A=01
      | CB922B=12
      | CB922C=01

    .. grid-item-card:: グレース
      :columns: auto

      | CB923D=1E
      | CB923E=01
      | CB923F=0E
      | CB9240=01
      | CB9241=13
      | CB9242=01
      | CB9243=14
      | CB9244=01
      | CB9245=16
      | CB9246=01
      | CB9247=12
      | CB9248=01

    .. grid-item-card:: ウィン
      :columns: auto

      | CB9267=1E
      | CB9268=01
      | CB9269=0E
      | CB926A=01
      | CB926B=13
      | CB926C=01
      | CB926D=14
      | CB926E=01
      | CB926F=16
      | CB9270=01
      | CB9271=12
      | CB9272=01

    .. grid-item-card:: ８月１２日Ａ型
      :columns: auto

      | CB92D7=1E
      | CB92D8=01
      | CB92D9=0E
      | CB92DA=01
      | CB92DB=13
      | CB92DC=01
      | CB92DD=14
      | CB92DE=01
      | CB92DF=16
      | CB92E0=01
      | CB92E1=12
      | CB92E2=01


^^^^^^^^^^^^^^^^^
机师修改
^^^^^^^^^^^^^^^^^
因为数据是散列的，这里只列出首地址，特定机师的对应数据地址为序号x2+首地址。

* 7e1088xx xx为机师代号，可以在\ :ref:`机师数据 <srw4_pilots_data_snes>` \ 查到。
* 7e1089xx 等级 (0x01-0x63=99)  

  * 80位为是否副机师，所以副机师需要给等级+0x80。  

* 7E1108xx 分队情况。，每个机师2字节，低位未用。
  
  * 7E110900   表示第一个机师不在部队中。
  * 7E110910   表示第一个机师在第一小队中。
  * 7E110B00   表示第二个机师不在部队中。
  * 7E110B10   表示第二个机师在第一小队中。
  * 如下类推
  * 新增机师的话，需要设置对应分队情况。

.. grid::

    .. grid-item-card:: 增加人物(共通)
      :columns: auto
      
      | 分歧参考（\ :ref:`隐藏要素 <srw4_missable>`\ 路线A/B/C）
      | 不按照路线中的选择可能造成数据溢出
      | 7E110636
      | 7e1187=00?10
      | モンド
      | 7E110497
      | 7e1185=00?10
      | ギュネイ
      | 7E110292 
      | 7e1183=00?10
      | グレミー
      | 7E11007F 
      | 7e1181=00?10 
      | ララァ
      | 7E10fe4B 
      | 7e117f=00?10 
      | 早乙女ミチル

    .. grid-item-card:: 额外增加人物（路线B）
      :columns: auto

      | 分歧参考 （\ :ref:`隐藏要素 <srw4_missable>`\ 路线B）
      | 走A/C路线时禁用
      | 不按照路线中的选择可能造成数据溢出
      | 7e10fcBC
      | 7e117d=00?10 
      | ゼット
      | 7e10faBD
      | 7e117b=00?10
      | トルストール
      | 7e10f83a 
      | 7e1179=00?10 
      | レズン
      | 7e10f644 
      | 7e1177=00?10 
      | モンシア

^^^^^^^^^^^^^^^^^
机体修改
^^^^^^^^^^^^^^^^^

因为数据是散列的，这里只列出首地址，特定机体的对应数据地址为序号x2+首地址。

* 7E1208xx xx=a
* 7E1209yy yy=b+cx2+d。

  * 其中a为机体代码低8位，机体代码可以在\ :ref:`机体数据 <srw4_units_data_snes>` \ 查到。
  * 机体代码>=0x100的时候，b为1，否则b为0。
  * c为机体当前驾驶员以0开始的序数。如果没有驾驶员，则c为0。
  * 有驾驶员时d为0x80，否则为0。
  * 例如1F80表示マジンガーZ（JS）（编号1F）由第1个机师驾驶，在前面机师数据区（7e1088开始）查到第一个机师代码为0x55，所以是兜甲児驾驶。

* 7E1288FF 机体改造段数，改满为FF
* 7E12897E 机体改造段数，改满为7E
  
  * 如果锁定为7F，则为阵亡状态，可复活
  * 如果锁定为7E，则为活跃状态，即使被击落也无法复活
  * 为安全起见，可以只在过关时启用
* 7E1308xx 
* 7E1309yy 
  
  * xx和yy是芯片的\ :ref:`序号 <srw4_items>`\ 。

下面是修改机体性能的金手指。如果你要修改其他机体的性能，可以参考\ :ref:`机体数据 <srw4_units_data_snes>` \ 找到对应参数，根据参数搜索找到地址，然后修改。关于参数顺序和其他机体数据的相对位移，参考\ :ref:`机体修改 <srw4_units_cheat>` \ 。

.. grid::


    .. grid-item-card:: 增加机体(共通)
      :columns: auto

      | 分歧参考（\ :ref:`隐藏要素 <srw4_missable>`\ 路线A/B/C）
      | 不按照路线中的选择可能造成数据溢出
      | 7e1287=00?01
      | 7e1286=00?7a 
      | ガイラム
      | 7e1285=00?01
      | 7e1284=00?06
      | Ξガンダム
      | 7e1283=00?01
      | 7e1282=00?0C
      | ニセサイバスター
      | 7e1280=00?03
      | ウイングガスト
      | 武器改造段数数量/位移
      | 7e14071E 
      | 7e140600 
      | 7e14051E
      | 7e140400 
      | 7e14031E 
      | 7e140200 
      | 7e14011E
      | 7e140000 
       
    .. grid-item-card:: 额外增加机体(路线B)
      :columns: auto

      | 分歧参考 （\ :ref:`隐藏要素 <srw4_missable>`\ 路线B）
      | 走A/C路线时禁用
      | 不按照路线中的选择可能造成数据溢出
      | 7e127f=00?01
      | 7e127e=00?28
      | ガラバ(ハイパー可)
      | 7e127d=00?01
      | 7e127c=00?26
      | ライネック(ハイパー可)
      | 7e127b=00?01
      | 7e127a=00?24
      | レプラカーン(ハイパー可)
      | 7e1279=00?01
      | 7e1278=00?04
      | Gディフェンサー
      | 7e12768C
      | ビギナ・ギナ
      | 武器改造段数数量/位移
      | 7e13ff1E 
      | 7e13fe00 
      | 7e13fd1E
      | 7e13fc00 
      | 7e13fb1E 
      | 7e13fa00 
      | 7e13f91E 
      | 7e13f800 
      | 7e13f71E 
      | 7e13f600 

    .. grid-item-card:: ヒュッケバイン
      :columns: auto

      | CB9576000
      | CB9576100
      | 乘换機動戦士系
      | CB958601
      | 移动空陆
      | CB958744
      | 空A海A
      | CB95914F
      | CB959206
      | ６０ﾐﾘﾊﾞﾙｶﾝ
      | →ブーストナックル
      | CB959450
      | ﾌﾟﾗｽﾞﾏｿｰﾄﾞ
      | →オメガレーザー
      | CB959A53
      | ﾛｼｭｾｲﾊﾞｰ→
      | ｸﾞﾙﾝｶﾞｽﾄﾋﾞｰﾑ

    .. grid-item-card:: グルンガスト
      :columns: auto

      | CB95AD00
      | CB95AE00
      | 乘换機動戦士系
      | CB95BF44
      | 空A海A
      | CB95CC4D
      | オメガレーザー→
      | リープスラッシャー

    .. grid-item-card:: ウイングガスト
      :columns: auto

      | CB95E200
      | CB95E300
      | 乘换機動戦士系
      | CB95F444
      | 空A海A

    .. grid-item-card:: ガストランダー
      :columns: auto

      | CB960D00
      | CB960E00
      | 乘换機動戦士系
      | CB961F44
      | 空A海A

    .. grid-item-card:: νガンダム
      :columns: auto

      | CB96602D
      | ﾐｻｲﾙﾗﾝﾁｬｰ
      | →ヴェスバー

    .. grid-item-card:: F-91
      :columns: auto

      | CB96942B
      | ﾒｶﾞﾏｼﾝｷｬﾉﾝ→
      | フィンファンネル

    .. grid-item-card:: NT-1アレックス
      :columns: auto

      | CB96C52B
      | ガトリングガン
      | →フィンファンネル

    .. grid-item-card:: GP-01Fb
      :columns: auto

      | B96F34A
      | B96F40D
      | ビームガン
      | →ビット

    .. grid-item-card:: GP-03
      :columns: auto

      | cb973c01
      | GP-03移动空陆
      | cb973d44
      | 空A海A
      | cb973e44
      | 陆A宇A
      | CB975612 
      | 集中ミサイル→
      | バルカン
      | CB97592F
      | マイクロミサイル (M)
      | →ｱﾄﾐｯｸﾊﾞｽﾞｰｶ (M)
      | CB97504A
      | CB97510D
      | CB97844A
      | CB97850D
      | CBC7EB4A
      | CBC7EC0D
      | ﾌｫｰﾙﾃﾞｨﾝｸﾞﾊﾞｽﾞｰｶ
      | →ビット

    .. grid-item-card:: ガンキャノン
      :columns: auto

      | CB97AF4A
      | CB97B00D
      | ２40ミリキャノン→
      | ビット

    .. grid-item-card:: ガンタンク
      :columns: auto

      | CB97D44A
      | CB97D50D
      | １２０ミリキャノン→
      | ビット

    .. grid-item-card:: ボール
      :columns: auto

      | CB97F101
      | 移动空陆
      | CB97F244
      | 空A海A
      

    .. grid-item-card:: ボスロボット
      :columns: auto

      | CB9CCA01
      | 移动空陆
      | CB9CCB44
      | 地形适应空海
      | CB9CCC44
      | 地形适应陆宇

    .. grid-item-card:: ダンクーガ
      :columns: auto

      | cba18601
      | ダンクーガ移动空陆


^^^^^^^^^^^^^^^^^
武器修改
^^^^^^^^^^^^^^^^^
在添加机体之后，需要修改机体武器数量，否则机体武器无法升级。

这里只列出首地址，特定武器的对应数据地址为序号x2+首地址。

* 7E1388xx xx=a
* 7E1389yy yy=b+cx2

  * 其中a为机体的武器改造段数位移低8位
  * b为武器改造段数位移高1位，机体的武器改造段数位>=0x100的时候，b为1，否则b为0。
  * c为机体武器数量。

武器数据的格式参考\ :ref:`武器修改 <srw4_weapon_cheat>`。
 
.. grid::

    .. grid-item-card:: 武器追加      
      :columns: auto

      | 7E105E=00?01 
      | コン・バトラーV
      | 7E105F=00?86
      | イオン
      | アトミックバズーカ
      | グランダッシャー
      | 7E1060=00?1A
      | ダイモス
      | 7E1061=00?30
      | 計都羅喉剣暗剣殺
      | ブラックホールキャノン




    .. grid-item-card:: 必殺烈風正拳突き

      | CBDA5BFE 
      | 必殺烈風正拳突き地形AAAB
      | CBEDFBFE
      | 必殺烈風正拳突き改地形AAAB

^^^^^^^^^^^^^^^^^
芯片修改
^^^^^^^^^^^^^^^^^
数据格式参考\ :ref:`芯片修改 <srw4_items_cheat>`。

.. grid:: 

   .. grid-item-card:: 高性能雷达
      :class-card: text-nowrap
      :columns: auto
      
      | cdf85c08 移+8
      | cdf85d1E 运+30
      | cdf85e3F 限+63  
      | cdf85f00 甲+00
      | cdf8bc88
      | cdf8bd13 HP +500
      | cdf8be04 光线护壁

   .. grid-item-card:: 米诺夫斯基飞行器
      :class-card: text-nowrap
      :columns: auto

      | cdf86008 移+8
      | cdf86112 运+18
      | cdf86214 限+20  
      | cdf8630A 甲+100
      | cdf8c0f4
      | cdf8c101 HP +500
      | cdf8be04 光线护壁

   .. grid-item-card:: 助推器
      :class-card: text-nowrap
      :columns: auto

      | cdf8640c 移+12
      | cdf86512 运+18
      | cdf86614 限+20  
      | cdf8670A 甲+100
      | cdf8c4f4
      | cdf8c501 HP +500
      | cdf8c604 光线护壁

   .. grid-item-card:: 超级助推器
      :class-card: text-nowrap
      :columns: auto

      | cdf86810 移+16
      | cdf86912 运+18
      | cdf86a14 限+20  
      | cdf86b0A 甲+100
      | cdf8c8f4
      | cdf8c901 HP +500
      | cdf8ca04 光线护壁

   .. grid-item-card:: 远地点控制发动机
      :class-card: text-nowrap
      :columns: auto

      | cdf86C08 移+8
      | cdf86D12 运+18
      | cdf86E14 限+20  
      | cdf86F0A 甲+100
      | cdf8CCf4
      | cdf8CD01 HP +500
      | cdf8cE04 光线护壁

   .. grid-item-card:: FATIMA
      :class-card: text-nowrap
      :columns: auto

      | cdf87010 移+16
      | cdf87124 运+36
      | cdf87228 限+40
      | cdf8730a 甲+100
      | cdf8d0f4
      | cdf8d101 HP +500
      | cdf8d204 光线护壁

   .. grid-item-card:: ALICE
      :class-card: text-nowrap
      :columns: auto

      | cdf87408 移+8
      | cdf8751E 运+30
      | cdf87628 限+40
      | cdf8770a 甲+100
      | cdf8d4f4
      | cdf8d501 HP +500
      | cdf8d604 光线护壁

   .. grid-item-card:: 精神力框架
      :class-card: text-nowrap
      :columns: auto

      | cdf87808 移+8
      | cdf8791C 运+28
      | cdf87a32 限+50
      | cdf87b0A 甲+100
      | cdf8d8f4
      | cdf8d901 HP +500
      | cdf8da04 光线护壁

   .. grid-item-card:: 生物传感器
      :class-card: text-nowrap
      :columns: auto

      | cdf87C08 移+8
      | cdf87D1A 运+26
      | cdf87E23 限+35
      | cdf87F0A 甲+100
      | cdf8dCf4
      | cdf8dD01 HP +500
      | cdf8dE04 光线护壁   

   .. grid-item-card:: 磁铁镀膜
      :class-card: text-nowrap
      :columns: auto

      | cdf88008 移+8
      | cdf8811A 运+26
      | cdf88223 限+35
      | cdf8830A 甲+100
      | cdf8E0f4
      | cdf8E101 HP +500
      | cdf8E204 光线护壁   

   .. grid-item-card:: I立场发生机
      :class-card: text-nowrap
      :columns: auto

      | cdf88408 移+8
      | cdf88512 运+18
      | cdf88614 限+20
      | cdf8870A 甲+100
      | cdf8E4f4
      | cdf8E501 HP +500
      | cdf8E604 光线护壁  

   .. grid-item-card:: 乔巴姆装甲
      :class-card: text-nowrap
      :columns: auto

      | cdf88808 移+8
      | cdf88912 运+18
      | cdf88a28 限+40
      | cdf88b64 甲+1000
      | cdf8E8d0
      | cdf8E907 HP+2000
      | cdf8Ea04 光线护壁

   .. grid-item-card:: 混合装甲
      :class-card: text-nowrap
      :columns: auto

      | cdf88C08 移+8
      | cdf88D12 运+18
      | cdf88E28 限+40
      | cdf88F96 甲+1500
      | cdf8ECA0
      | cdf8ED0F HP+4000
      | cdf8EE04 光线护壁

   .. grid-item-card:: 护壁发生机
      :columns: auto

      | cdf89008 移+8
      | cdf89112 运+18
      | cdf89228 限+40
      | cdf89396 甲+1500
      | cdf8F0A0
      | cdf8F10F HP+4000
      | cdf8F204 光线护壁 

   .. grid-item-card:: 反光束涂层
      :columns: auto

      | cdf89408 移+8
      | cdf89512 运+18
      | cdf89628 限+40
      | cdf89796 甲+1500
      | cdf8F4A0
      | cdf8F50F HP+4000
      | cdf8F604 光线护壁 

   .. grid-item-card:: 修理工具包
      :columns: auto

      | cdf89808 移+8
      | cdf89912 运+18
      | cdf89A28 限+40
      | cdf89B96 甲+1500
      | cdf8F8A0
      | cdf8F90F HP+4000
      | cdf8FA04 光线护壁 

   .. grid-item-card:: 螺旋桨油箱
      :columns: auto

      | cdf89C08 移+8
      | cdf89D12 运+18
      | cdf89E28 限+40
      | cdf89F96 甲+1500
      | cdf8FCA0
      | cdf8FD0F HP+4000
      | cdf8FE04 光线护壁 

   .. grid-item-card:: 推进剂荚舱
      :columns: auto

      | cdf8A008 移+8
      | cdf8A112 运+18
      | cdf8A228 限+40
      | cdf8A396 甲+1500
      | cdf900A0
      | cdf9010F HP+4000
      | cdf90204 光线护壁 

   .. grid-item-card:: 推进剂荚舱S
      :columns: auto

      | cdf8A408 移+8
      | cdf8A512 运+18
      | cdf8A628 限+40
      | cdf8A796 甲+1500
      | cdf904A0
      | cdf9050F HP+4000
      | cdf90604 光线护壁 

-------------------
第四次S金手指
-------------------
53、81和31开头的代码是Dockstation模拟器的扩展。如果使用只支持标准GameShark码的其他模拟器，一些一次性追加的31码金手指，比如妖精、人物、机体等，可以用30替换，但是只在游戏开始的时候启用一次，之后存盘并禁用金手指，再读盘。这样的代码我会打上星号（*）。但是53开头的批量写入代码只能改写成一个一个写入的50代码。

^^^^^^^^^^^^^^
全局设置
^^^^^^^^^^^^^^
.. grid::

    .. grid-item-card:: 最大\ :ref:`资金 <srw4_remodeling_cheat>`
      :columns: auto

      | 801047A8 967F
      | 301047AA 0098

    .. grid-item-card:: 战斗画面关，地图坐标开
      :columns: auto

      | 301046F6 0060

    .. grid-item-card:: 战斗画面开，地图坐标关
      :columns: auto     

      | 301046F6 0000

    .. grid-item-card:: 总回合数最小
      :columns: auto

      | 80104740 0001 

    .. grid-item-card:: 总回合数最大
      :columns: auto

      | 80104740 270F 

    .. grid-item-card::  :ref:`经验倍率 <srw4_exp>`
      :columns: auto

      | 30105168 007F

    .. grid-item-card:: 基础经验值
      :columns: auto

      | 80105162 FFFF

    .. grid-item-card:: EN不减
      :columns: auto

      | D01255C4 1023
      | 801255C6 0040

    .. grid-item-card:: 精神不減
      :columns: auto

    .. grid-item-card:: SP最大
      :columns: auto

      | 50004A3C 0000
      | 30102F7C 00FF

    .. grid-item-card:: SP不减
      :columns: auto

      80105179 0000
    .. grid-item-card:: 气力效果最大
      :columns: auto

      | D0137A66 1440
      | 80137A64 0001  


    .. grid-item-card:: 武器15段改造
      :columns: auto

      | 50007002 0000
      | 8010424E FFFF

    .. grid-item-card:: 改造段数最大
      :columns: auto

      | GameShark：(*)
      | 5000503C 0000
      | 80102F9A FFFE

    .. grid-item-card:: 改造段数最小
      :columns: auto

      | GameShark：(*)
      | 5000503C 0000
      | 80102F9A 0000

    .. grid-item-card:: 改造段数最大
      :columns: auto

      | DuckStation版
      | 53000050 003c0000 
      | 81102F9A fffe

    .. grid-item-card:: 改造段数最小
      :columns: auto

      | DuckStation版
      | 53000050 003c0000 
      | 81102F9A 0000

    .. grid-item-card:: 强化芯片x9
      :columns: auto

      | 50000901 0000
      | 301046E8 0099

    .. grid-item-card:: 全体高性能雷达
      :columns: auto

      | 偶尔造成游戏冻结
      | 部署前或者通关前禁用
      | 部署后启用
      | 5000503C 0000
      | 80102F90 0000

    .. grid-item-card:: 全体无
      :columns: auto

      | 5000503C 0000
      | 80102F90 ffff

^^^^^^^^^^^^^^^^^
主人公修改
^^^^^^^^^^^^^^^^^
具体精神数据格式参考\ :ref:`第四次精神修改 <srw4_mechanics_sprit_command_cheat>`\ 。


.. grid::

    .. grid-item-card:: リン
      :columns: auto

      | 8004CA98 011E
      | 8004CA9A 010E
      | 8004CA9C 0113
      | 8004CA9E 0114
      | 8004CAA0 0116
      | 8004CAA2 0112
      | 精神
      | 80074A70 54F5
      | 姓→毛
      | 80074A9E 42F3
      | 名→林      
      | 80074AC0 42F3
      | 呼号→林

    .. grid-item-card:: ヘクトール
      :columns: auto

      | 8004CADE 011E
      | 8004CAE0 010E
      | 8004CAE2 0113
      | 8004CAE4 0114
      | 8004CAE6 0116
      | 8004CAE8 0112
      | 精神
      | 80074A60 0BF3
      | 80074A62 0000
      | 30074A64 0000
      | 姓→張
      | 80074A8A 9EF3
      | 80074A8C 3BF4
      | 30074A8E 0000
      | 名→翼徳
      | 80074AB2 8BF0
      | 80074AB4 0000
      | 30074AB6 0000
      | 呼号→飛


    .. grid-item-card:: ジェス
      :columns: auto

      | 8004CB5C 011E
      | 8004CB5E 010E
      | 8004CB60 0113
      | 8004CB62 0114
      | 8004CB64 0116
      | 8004CB66 0112
      | 精神
      | 80074A47 4DF2
      | 80074A49 0000
      | 80074A4B 0000
      | 姓→関
      | 80074A73 CDF3
      | 80074A75 9AF0
      | 80074A77 0000
      | 名→雲長
      | 80074AA1 DFF4
      | 30074AA3 0000
      | 呼号→羽

    .. grid-item-card:: ミーナ
      :columns: auto 

      | 8004CB94 011E
      | 8004CB96 010E
      | 8004CB98 0113
      | 8004CB9A 0114
      | 8004CB9C 0116
      | 8004CB9E 0112    
      | 精神
      | 80074A66 75F5
      | 30074A68 0000
      | 姓→曹
      | 80074A90 A1F4
      | 80074A92 0000
      | 80074A94 0000
      | 名→節
      | 80074AB8 A1F4
      | 30074ABA 0000
      | 呼号→節


    .. grid-item-card:: イルム
      :columns: auto 

      | 8004CC12 011E
      | 8004CC14 010E
      | 8004CC16 0113
      | 8004CC18 0114
      | 8004CC1a 0116
      | 8004CC1c 0112
      | 精神
      | 80074A54 DDF4
      | 80074A56 0000
      | 80074A58 0000
      | 姓→劉
      | 80074A80 CBF5
      | 80074A82 3BF4
      | 名→旋徳
      | 80074AA9 FEF1
      | 30074AAB 0000
      | 呼号→備

    .. grid-item-card:: パット
      :columns: auto 

      | 8004CCBA 011E
      | 8004CCBC 010E
      | 8004CCBE 0113
      | 8004CCC0 0114
      | 8004CCC2 0116
      | 8004CCC4 0112
      | 精神
      | 80074A4E 75F5
      | 80074A50 0000
      | 30074A52 0000
      | 姓→曹
      | 80074A7A 7CF1
      | 80074A7C 0000
      | 30074A7E 0000
      | 名→ 憲
      | 80074AA5 7CF1
      | 30074AA7 0000
      | 呼号→憲

    .. grid-item-card:: グレース
      :columns: auto 

      | 8004CCD6 011E
      | 8004CCD8 010E
      | 8004CCDA 0113
      | 8004CCDC 0114
      | 8004CCDE 0116
      | 8004CCE0 0112
      | 精神
      | 80074A5b 6CF0
      | 80074A5d 0000
      | 姓→黄
      | 80074A85 95F0
      | 80074A87 12F3
      | 名→月英
      | 80074AAD 95F0
      | 80074AAF 12F3
      | 呼号→月英

    .. grid-item-card:: ウィン
      :columns: auto

      | 8004CD00 011E
      | 8004CD02 010E
      | 8004CD04 0113
      | 8004CD06 0114
      | 8004CD08 0116
      | 8004CD0A 0112
      | 精神
      | 80074A6A 9BF1
      | 80074A6C 7DF5
      | 30074A6E 0000
      | 姓→諸葛
      | 80074A97 7EF5
      | 80074A99 33F0
      | 80074A9B 0000
      | 名→孔明
      | 80074ABC 22F4
      | 30074ABE 0000
      | 呼号→亮

    .. grid-item-card:: 8月12日A
      :columns: auto

      | 如需修改其他特殊诞生日精神
      | 参考\ :ref:`第四次精神修改 <srw4_mechanics_sprit_command_cheat>`
      | 8004CD70 011E
      | 8004CD72 0113
      | 8004CD74 0114
      | 8004CD76 0112
      | 8004CD78 010E
      | 8004CD7A 0103

^^^^^^^^^^^^^^^^^
机师修改
^^^^^^^^^^^^^^^^^

因为数据是散列的，这里只列出首地址，特定机师的对应数据地址为 序号 x 0x3C+首地址。

* 30102F68 00xx 显示用等级
* 30102F69 00xx 机师底层代码。可以在\ :ref:`机师数据 <srw4_pilots_data_ps>` \ 查到。例如当机师代码为主角（0xFA）时，真实系男的底层代码为0xF8。
* 30102F7C 00xx 当前SP
* 30102F7D 00xx 最大SP
* 30102F85 00xx 气力
* 30102F86 00xx 限界
* 30102F88 00xx 远攻击
* 30102F89 00xx 近攻击
* 30102F8A 00xx 技量
* 30102F8B 00xx 命中
* 30102F8C 00xx 直感
* 30102F8D 00xx 回避
* 30102F92 xx=a+b*2 
  
  * a为是否副机师，如果是的话为1，否则为0。
  * b为机师等级。
  
* D0102F93 0000
* 80102F93 xx04
* xx为机师代码，可以在\ :ref:`机师数据 <srw4_pilots_data_ps>` \ 查到。 
* 因为分队信息和是否存在信息在同一个地址，所以得用D0码先判断此位置是否有数据，如果没有的再用80码进行写入。
* 如果要修改对应的机师信息，去掉前面的D0码。但是分队信息可能失效。
* 30102F98 00xx击坠数
  
.. grid::

    .. grid-item-card:: 增加人物(共通)
      :columns: auto
      
      | 分歧参考（\ :ref:`隐藏要素 <srw4_missable>`\ 路线A/B/C）
      | 不按照路线中的选择可能造成数据溢出
      | D0103F47 0000
      | 80103F47 0438
      | イーノ
      | D0103F83 0000
      | 80103F83 0492      
      | グレミー
      | D0103FBF 0000
      | 80103FBF 0444
      | モンシア
      | D0103FFB 0000
      | 80103FFB 0436
      | モンド
      | D0104037 0000
      | 80104037 0499
      | レズン
      | D0104073 0000
      | 80104073 04D4
      | キャオ
      | D01040AF 0000
      | 801040AF 0437
      | エル
      | D01040EB 0000
      | 801040EB 0435
      | ビーチャ
      | D0104127 0000
      | 80104127 044B
      | 早乙女ミチル
      | D0104163 0000
      | 80104163 0497    
      | ギュネイ·ガス
      | D010419F 0000
      | 8010419F 0425
      | セイラ·マス
      | D01041DB 0000
      | 801041DB 0498
      | ナナイ·ミゲル
      | D0104217 0000
      | 80104217 047f
      | ララァ

    .. grid-item-card:: 额外增加人物（路线B）
      :columns: auto

      | 分歧参考 （\ :ref:`隐藏要素 <srw4_missable>`\ 路线B）
      | 走A/C路线时禁用
      | 不按照路线中的选择可能造成数据溢出
      | D0103DA3 0000
      | 80103DA3 0670
      | バニング
      | D0103DDF 0000
      | 80103DDF 0624
      | マチルダ・アジャン
      | D0103E1B 0000
      | 80103E1B 06bc
      | ゼット
      | D0103E57 0000
      | 80103E57 0627
      | ティアンム提督
      | D0103E93 0000
      | 80103E93 06BD
      | トルストール
      | ·チェシレンコ
      | D0103ECF 0000
      | 80103ECF 0626
      | ワッケイン
      | D0103F0B 0000
      | 80103F0B 06EC
      | テリウス·
      | ビルセイア

    .. grid-item-card:: 妖精SP
      :columns: auto

      | 30104716 00FF 
      | 30104718 00FF
      | 3010471A 00FF
      | 3010471C 00FF
      | 3010471E 00FF

    .. grid-item-card:: 妖精存在等级
      :columns: auto

      | E0104239 0000
      | 30104239 00C6
      | E0104238 0000
      | 30104238 0001
      | チャム
      | E010423D 0000
      | 3010423D 00C6
      | E010423C 0000
      | 3010423C 0001
      | ベル
      | E0104241 0000
      | 30104241 00C6
      | E0104240 0000
      | 30104240 0001
      | エル
      | E0104245 0000
      | 30104245 00C6
      | E0104244 0000
      | 30104244 0001
      | リリス
      | E0104249 0004
      | 30104249 00C6
      | E0104248 0000
      | 30104248 0001
      | シルキー

    .. grid-item-card:: 全体幸运
      :columns: auto

      | DuckStation版
      | 53000050 003c0000 
      | 31102F73 0008

    .. grid-item-card:: 全体已侦察
      :columns: auto

      | DuckStation版
      | 53000050 003c0000 
      | 31102F71 0080

    .. grid-item-card:: エル·フィノ
      :columns: auto

      | 8004AB52 0112
      | 根性→激励
      | 8004AB56 010E
      | 信頼→覚醒
      | 8004AB5A 0108
      | 隠れ身→気合


    .. grid-item-card:: 神隼人
      :columns: auto

      | 8004AC2C 010D
      | 幸運→Lv1


    .. grid-item-card:: 北条真吾
      :columns: auto

      | 3004AC5F 0020
      | 乘换機動戦士系

    .. grid-item-card:: レミー島田	
      :columns: auto

      | 3004AC81 00B0
      | 乘换機動戦士系

    .. grid-item-card:: キリー・ギャグレー
      :columns: auto

      | 3004ACA1 0010
      | 乘换機動戦士系

    .. grid-item-card:: 結城沙羅
      :columns: auto

      | 8004AD58 010D
      | 幸運 LV25→1
    
    .. grid-item-card:: 南原ちづる
      :columns: auto

      | 8004AE1E 010D
      | 幸運 LV25→1

    .. grid-item-card:: マサキ
      :columns: auto  

      | 3004AEA1 0030
      | 乘换機動戦士系

    .. grid-item-card:: リューネ
      :columns: auto

      | 3004AEC1 00B0
      | 乘换機動戦士系

    .. grid-item-card:: シュウ・シラカワ
      :columns: auto  

      | 3004AEE1 0010
      | 乘换機動戦士系
      | 8004AEF0 010D
      | 幸運→lv1

    .. grid-item-card:: ブライト
      :columns: auto

      | 3004AF33 0010
      | 乘换可
      | 8004AF39 4444
      | 地形适应
      | 8004AF48 0118
      | 偵察→探索

    .. grid-item-card:: マチルダ
      :columns: auto

      | 8004AF89 4444
      | 地形适应
      | 8004AF94 0112
      | 根性→激励
      | 8004AF9C 013E
      | 激励→
      | ニュータイプ


    .. grid-item-card:: セイラ
      :columns: auto

      | 8004AFA9 4444
      | 地形适应
      | 8004AFAB 766B
      | 8004AFAD 707E
      | 8004AFAF 5559
      | 能力
      | 3004AFB1 0050
      | SP值
      | 8004AFB2 0008     
      | 无→気合
      | 8004AFB4 003E
      | 无→
      | ニュータイプ

    .. grid-item-card:: ワッケイン
      :columns: auto

      | 8004AFC1 4444
      | 地形适应
      | 8004AFCA 0009
      | 根性→加速
      | 8004AFCE 003E
      | 加速→
      | ニュータイプ 

    .. grid-item-card:: ティアンム
      :columns: auto

      | 8004AFDB 4444
      | 地形适应
      | 8004AFE4 0009      
      | 根性→加速
      | 8004AFE8 0111
      | 偵察→探索
      | 8004AFEA 003E
      | 加速→
      | ニュータイプ

    .. grid-item-card:: エマ
      :columns: auto

      | 8004B00C 013E
      | シールド防御Ｌ2
      | →ニュータイプ

    .. grid-item-card:: トーレス
      :columns: auto

      | 3004B01B 0000
      | 乘换可
      | 8004B02A 0109
      | 加速
      | 习得等级→1
      | 8004B02E 0118
      | 偵察→探索

    .. grid-item-card:: ファ
      :columns: auto

      | 8004B046 010D
      | 幸運→Lv1
      | 8004B050 013E
      | ニュータイプ→Lv1

    .. grid-item-card:: カツ
      :columns: auto

      | 8004B07A 013E
      | ニュータイプ→Lv1

    .. grid-item-card:: ルー
      :columns: auto

      | 8004B140 013E
      | ニュータイプ→Lv1

    .. grid-item-card:: ビーチャ
      :columns: auto

      | 3004B1B0 004E
      | 颜（\ :ref:`獣魔将軍 <srw4_pilot_beast_demon_general>`\ →アキ）
      | 8004B1CE 013E
      | ニュータイプ→Lv1

    .. grid-item-card:: モンド
      :columns: auto

      | 8004B1DB 4444
      | 地形适应
      | 8004B1E8 000D
      | 幸運→Lv1
      | 8004B1F0 013E
      | ニュータイプ→Lv1

    .. grid-item-card:: エル·ビアン
      :columns: auto

      | 8004B1F4 1f05
      | 颜（\ :ref:`ティターンズ兵士 <srw4_pilot_titans_soldier>`\ →
      | イザベル·クロンカイト）
      | 8004B212 013E
      | ニュータイプ→Lv1

    .. grid-item-card:: イーノ
      :columns: auto

      | 8004B218 1f01
      | 颜（議員B→
      | 技術者、研究所員）
      | 8004B221 4444
      | 地形适应
      | 8004B223 7a5b
      | 8004B225 5f71
      | 8004B227 5c55
      | 能力
      | 3004B229 0050
      | SP值
      | 8004B22A 0012
      | 无→激励
      | 8004B22C 003E      
      | 无→
      | ニュータイプ

    .. grid-item-card:: エマリー     
      :columns: auto

      | 8004B239 4444
      | 地形适应
      | 8004B23B 5233
      | 8004B23D 6664
      | 8004B23F 6d65
      | 能力
      | 3004B241 0050
      | SP值
      | 8004B242 0003
      | 无→補給 
      | 8004B244 003E      
      | 无→
      | ニュータイプ

    .. grid-item-card:: クェス
      :columns: auto

      | 8004B251 4444
      | 地形适应

    .. grid-item-card:: チェーン
      :columns: auto

      | 8004B281 4444
      | 地形适应
      | 8004B283 5233
      | 8004B285 6664
      | 8004B287 6d65
      | 能力
      | 3004B289 0050
      | SP值
      | 8004B28A 0003
      | 无→補給 
      | 8004B28C 003E      
      | 无→
      | ニュータイプ

    .. grid-item-card:: ケーラ·スゥ
      :columns: auto

      | 8004B299 4444
      | 地形适应
      | 8004B2AE 003E
      | シールド防御Ｌ4
      | →ニュータイプ

    .. grid-item-card:: ハサウェイ
      :columns: auto

      | 8004B2C3 4444
      | 地形适应

    .. grid-item-card:: クリス
      :columns: auto  

      | 8004B304 003E
      | シールド防御Ｌ1
      | →ニュータイプ

    .. grid-item-card:: バーニィ
      :columns: auto

      | 8004B32E 003E
      | シールド防御Ｌ3
      | →ニュータイプ


    .. grid-item-card:: ガトー
      :columns: auto

      | 8004B396 013E
      | シールド防御Ｌ8
      | →ニュータイプ

    .. grid-item-card:: キース
      :columns: auto

      | 8004B3A5 4444
      | 地形适应
      | 8004B3AE 0116
      | 幸運→脱力
      | 8004B3B8 003E
      | 脱力→
      | ニュータイプ

    .. grid-item-card:: モンシア
      :columns: auto

      | 8004B3C5 4444
      | 地形适应
      | 8004B3DA 003E
      | シールド防御Ｌ2
      | →ニュータイプ

    .. grid-item-card:: さやか
      :columns: auto

      | 3004B3E1 00A2
      | 乘换ダンバイン系

    .. grid-item-card:: ボス
      :columns: auto

      | 3004B423 0022
      | 乘换ダンバイン系
      | 8004B429 4444
      | 地形适应

    .. grid-item-card:: 炎ジュン
      :columns: auto

      | 3004B445 0092
      | 乘换ダンバイン系
      | 8004B44B 4444
      | 地形适应

    .. grid-item-card:: マリア
      :columns: auto

      | 3004B465 00B2
      | 乘换ダンバイン系

    .. grid-item-card:: 牧場ひかる
      :columns: auto

      | 3004B485 0082
      | 乘换ダンバイン系

    .. grid-item-card:: 早乙女ミチル
      :columns: auto

      | 3004B4A5 0092
      | 乘换ダンバイン系
      | 8004B4AB 4444
      | 地形适应      

    .. grid-item-card:: 神宮寺力
      :columns: auto

      | 3004B4E5 0010
      | 乘换機動戦士系
      | 8004B4EB 4444
      | 地形适应

    .. grid-item-card:: 明日香麗
      :columns: auto

      | 3004B505 0090
      | 乘换機動戦士系
      | 8004B50B 4444
      | 地形适应

    .. grid-item-card:: 桜野マリ
      :columns: auto

      | 3004B525 0080
      | 乘换機動戦士系 
      | 8004B54B 4444
      | 地形适应

    .. grid-item-card:: コウ
      :columns: auto

      | 8004B61F 4444
      | 地形适应
      | 8004B634 013E
      | 切り払いＬ2→
      | ニュータイプ
      | 8004B62A 010D
      | 幸運→Lv1


    .. grid-item-card:: 甲児
      :columns: auto

      | 3004B64D 0032
      | 乘换ダンバイン系

    .. grid-item-card:: 鉄也
      :columns: auto

      | 3004B737 0012
      | 乘换ダンバイン系

    .. grid-item-card:: 京四郎
      :columns: auto

      | 3004B759 0010
      | 乘换機動戦士系
      | 8004B75F 4444
      | 地形适应

    .. grid-item-card:: ナナ
      :columns: auto

      | 3004B77B 0080
      | 乘换機動戦士系
      | 8004B781 4444
      | 地形适应

    .. grid-item-card:: デューク
      :columns: auto

      | 3004B79B 0002
      | 乘换ダンバイン系

    .. grid-item-card:: 洸
      :columns: auto

      | 3004B7DF 0010
      | 乘换機動戦士系

    .. grid-item-card:: ニー·ギブン
      :columns: auto

      | 8004B824 0016
      | 根性→脱力
      | 8004B826 0032
      | 脱力→聖戦士

    .. grid-item-card:: キーン
      :columns: auto

      | 8004B846 0032 
      | 友情→聖戦士

    .. grid-item-card:: シーラ
      :columns: auto

      | 8004B853 4444
      | 地形适应

    .. grid-item-card:: エレ·ハンム
      :columns: auto

      | 8004B873 4444
      | 地形适应

    .. grid-item-card:: リムル
      :columns: auto

      | 8004B893 4444
      | 地形适应
      | 3004B89C 000E
      | 探索→覚醒
      | 8004B8A6 0032
      | 覚醒→聖戦士

    .. grid-item-card:: 万丈
      :columns: auto

      | 3004B8C5 0020
      | 乘换機動戦士系

    .. grid-item-card:: 一矢
      :columns: auto

      | 3004B8E7 0020
      | 乘换機動戦士系

    .. grid-item-card:: テュッティ
      :columns: auto

      | 3004B93D 0090
      | 乘换機動戦士系

    .. grid-item-card:: バニング
      :columns: auto

      | 8004B97B 4444
      | 地形适应
      | 8004B97D 4F4A
      | 8004B97F 7177
      | 8004B981 7370
      | 能力
      | 3004B983 0050
      | SP值
      | 8004B984 000A      
      | 无→熱血
      | 8004B986 003E
      | 无→
      | ニュータイプ

    .. grid-item-card:: ヤンロン
      :columns: auto

      | 3004B98D 0020
      | 乘换機動戦士系

    .. grid-item-card:: ミオ
      :columns: auto

      | 3004B9C5 0080
      | 乘换機動戦士系

    .. grid-item-card:: モニカ
      :columns: auto

      | 3004B9FD 0080
      | 乘换機動戦士系

    .. grid-item-card:: サフィーネ
      :columns: auto

      | 3004BA1D 00B0
      | 乘换機動戦士系

    .. grid-item-card:: ララァ
      :columns: auto

      | 3004BB30 0090
      | 颜（\ :ref:`メキボス <srw4_pilot_mekibos_bolverde>`\ →
      | \ :ref:`アンナマリー <srw4_pilot_anna_marie_bruges>`\ ）
      | 8004BB39 4444
      | 地形适应

    .. grid-item-card:: グレミー
      :columns: auto

      | 3004BDCA 00E0
      | 颜（\ :ref:`テリウス<srw4_pilot_telius_bilseia>`\ 
      | →シャア）

    .. grid-item-card:: ナナイ
      :columns: auto

      | 3004BE9C 003b
      | 颜（議長→\ 
      | :ref:`ニナ <srw4_pilot_nina_purpleton>`\ ）
      | 8004BEA5 4444
      | 地形适应
      | 8004BEB8 003E
      | 根性→
      | ニュータイプ

    .. grid-item-card:: レズン
      :columns: auto

      | 8004BED0 0008
      | 根性→気合
      | 8004BED8 003E
      | 気合→
      | ニュータイプ

    .. grid-item-card:: ゼット
      :columns: auto

      | 颜（秘書）
      | 8004C330 0032
      | 切り払いＬ1 1→聖戦士

    .. grid-item-card:: トルストール
      :columns: auto

      | 8004C346 0015
      | 根性→隠れ身
      | 8004C350 0032
      | 隠れ身→聖戦士

    .. grid-item-card:: テリウス
      :columns: auto

      | 8004C930 0008
      | 根性→気合
      | 8004C932 000E
      | ド根性→覚醒


    .. grid-item-card:: 強化兵
      :columns: auto

      | 3004C936 00FE
      | 颜(\ :ref:`エリート兵 <srw4_pilot_elite_soldier>`\→エリート兵（逆）)

    .. grid-item-card:: 超人工知能
      :columns: auto

      | 3004C970 00F3
      | 颜(人工知能改→Now Printing)

    .. grid-item-card:: 超级系男主人公
      :columns: auto
      
      | 8004C9d4 003E
      | 切り払いＬ1→
      | ニュータイプ

    .. grid-item-card:: 超级系女主人公
      :columns: auto
      
      | 8004CA18 003E
      | 切り払いＬ1→
      | ニュータイプ

^^^^^^^^^^^^^^^^^
机体修改
^^^^^^^^^^^^^^^^^
因为数据是散列的，这里只列出首地址，特定机体的对应数据地址为 序号 x 0x3C+首地址。

* 30102F7E 00xx 当前EN
* 30102F7F 00xx 最大EN
* 80102F80 xxyy 当前HP
* 80102F82 xxyy 最大HP
* 30102F84 00xx 运动性
* 30102F86 00xx 限界
* 30102F87 00xx 装甲/10
* 80102F90 xxyy
* 这里xx和yy是机体装备的\ :ref:`芯片 <srw4_items>`\ 的代码。
* 80102F9A FFFE 改造段数
* 30102F9C 机体当前机师序号
* 30102F9D 机体代码低8位 参见\ :ref:`机体数据<srw4_units_data_ps>`\ 。
* 30102F9E 00xx
  
  * xx=a + b x 2
  * a为机体代码的高字节，如果是1的话为1，否则为0。
  * b为机体的武器数量
  * 修改机体代码之后应该修改对应的武器数目，否则一些武器不能改造。
  
.. grid::

    .. grid-item-card:: 增加机体共通 
      :columns: auto

      | :ref:`隐藏要素 <srw4_missable>`
      | 路线A、B、C通用
      | D010407D 0000
      | 8010407D 2412
      | \ :ref:`ボール <srw4_unit_ball>`\ 
      | D01040B9 0000
      | 801040B9 1F01
      | \ :ref:`ガイラム <srw4_unit_gayrahm>`\ 
      | D01040F5 0000
      | 801040F5 2506
      | \ :ref:`Ξガンダム <srw4_unit_xi_gundam>`\ 
      | D0104131 0000
      | 80104131 2403
      | \ :ref:`ウイングガスト <srw4_unit_wing_gust>`\
      | (飞翼加斯特)
      | D010416D 0000
      | 8010416D 247B
      | \ :ref:`キュベレイ Mk-II <srw4_unit_qubeley_mk_ii>`\ 
      | (卡碧尼 Mk-II)
      | D01041A9 0000
      | 801041A9 250C
      | ニセサイバスター
      | D01041E5 0000
      | 801041E5 24D5
      | \ :ref:`Sガンダム <srw4_unit_s_gundam>`\ 
      | (S高达)
      | D0104221 0000
      | 80104221 2489
      | \ :ref:`ヤクト·ドーガ（赤） <srw4_unit_jagd_doga_red>`\ 
      | (亚克·多加柯丝号)


    .. grid-item-card:: 路线B增加机体
      :columns: auto

      | :ref:`隐藏要素 <srw4_missable>`
      | 限路线B
      | D0103DE9 0000
      | 80103DE9 24C5
      | \ :ref:`メカ戦士ゴッドアーモン <srw4_unit_mecha_warrior_goddoamon>`\ 
      | (机械战士阿蒙神)
      | D0103E25 0000
      | 80103E25 2455
      | グランゾン
      | D0103E61 0000
      | 80103E61 245B
      | ウィーゾル改
      | D0103E9D 0000
      | 80103E9D 245C
      | ノルス·レイ
      | D0103ED9 0000
      | 80103ED9 2528
      | ガラバ(ハイパー可)
      | D0103F15 0000
      | 80103F15 24E6
      | \ :ref:`グラシドゥ＝リュ <srw4_unit_grassidow_ryu>`\ 
      | (古拉西德·琉)
      | D0103F51 0000
      | 80103F51 24C4
      | \ :ref:`メカ戦士ギメリア <srw4_unit_mecha_warrior_gimeria>`\ 
      | (机械战士基梅利亚)
      | D0103F8D 0000
      | 80103F8D 24DB
      | | ExSガンダム
      | D0103FC9 0000
      | 80103FC9 2524
      | レプラカーン(ハイパー可)
      | D0104005 0000
      | 80104005 248C
      | ビギナ・ギナ
      | D0104041 0000
      | 80104041 2504
      | \ :ref:`Gディフェンサー <srw4_unit_g_defender>`\ 
      | (G-防卫号)

    .. grid-item-card:: \ :ref:`ヒュッケバイン <srw4_unit_huckebein>`\ 
      :columns: auto

      | 80046264 0000
      | 乘换機動戦士系
      | 30046275 0001
      | 移动空陆
      | 80046276 4444
      | 地形适应全A    
      | 80046280 064F
      | ６０ﾐﾘﾊﾞﾙｶﾝ
      | →ブーストナックル
      | 30046283 0050
      | ﾌﾟﾗｽﾞﾏｿｰﾄﾞ
      | →オメガレーザー
      | 30046289 0053
      | ﾛｼｭｾｲﾊﾞｰ→
      | ｸﾞﾙﾝｶﾞｽﾄﾋﾞｰﾑ

    .. grid-item-card:: \ :ref:`グルンガスト <srw4_unit_grungust>`\ 
      :columns: auto  

      | 8004629C 0000
      | 乘换機動戦士系
      | 800462AE 4444
      | 地形适应全A
      | 300462BB 004D
      | オメガレーザー→
      | リープスラッシャー

    .. grid-item-card:: \ :ref:`ウイングガスト <srw4_unit_wing_gust>`\ 
      :columns: auto  

      | 800462D1 0000
      | 乘换機動戦士系
      | 8004630E 4444
      | 地形适应全A

    .. grid-item-card:: \ :ref:`ガストランダー <srw4_unit_gust_lander>`\ 
      :columns: auto  

      | 800462FC 0000
      | 乘换機動戦士系
      | 8004630E 4444
      | 地形适应全A
      

    .. grid-item-card:: \ :ref:`νガンダム <srw4_unit_nu_gundam>`\ 
      :columns: auto  

      | 8004634F 002D
      | ﾐｻｲﾙﾗﾝﾁｬｰ
      | →ヴェスバー

    .. grid-item-card:: \ :ref:`F-91 <srw4_unit_f_91>`\ 
      :columns: auto  

      | 30046383 002B
      | ﾒｶﾞﾏｼﾝｷｬﾉﾝ→
      | フィンファンネル

    .. grid-item-card:: \ :ref:`NT-1アレックス <srw4_unit_nt_1_alex>`\ 
      :columns: auto 

      | 300463B4 002B
      | ガトリングガン
      | →フィンファンネル

    .. grid-item-card:: \ :ref:`GP-01Fb <srw4_unit_gp_01fb>`\ 
      :columns: auto

      | 300463E2 0D4A
      | ビームガン
      | →ビット

    .. grid-item-card:: \ :ref:`GP-03 <srw4_unit_gp_03_dendrobium>`\ 
      :columns: auto

      | 3004642B 0001 
      | 移动空陆
      | 8004642C 4444
      | 地形适应全A
      | 30046445 0012
      | 集中ミサイル→
      | バルカン
      | (GP-02A)
      | 30046448 002F
      | マイクロミサイル (M)	
      | →ｱﾄﾐｯｸﾊﾞｽﾞｰｶ (M)
      | 800494D7 0D4A
      | 80046473 0D4A
      | 8004643F 0D4A
      | ﾌｫｰﾙﾃﾞｨﾝｸﾞﾊﾞｽﾞｰｶ
      | →ビット      

    .. grid-item-card:: \ :ref:`ガンキャノン <srw4_unit_gun_cannon>`\ 
      :columns: auto

      | 8004649E 0D4A
      | ２40ミリキャノン→
      | ビット

    .. grid-item-card:: \ :ref:`ガンタンク <srw4_unit_gun_tank>`\ 
      :columns: auto

      | 800464C3 054A
      | １２０ミリキャノン→      
      | ビット


    .. grid-item-card:: \ :ref:`ボール <srw4_unit_ball>`\ 
      :columns: auto  

      | 300464E0 0001
      | 移动类型空陆
      | 800464E1 4444
      | 地形适应全A

    .. grid-item-card:: ネモ
      :columns: auto  

      | 80046516 094A
      | ビームライフル→
      | ビット

    .. grid-item-card:: \ :ref:`GM III <srw4_unit_gm_iii>`\ 
      :columns: auto

      | 80046578 114A
      | ﾐｻｲﾙﾗﾝﾁｬｰ→
      | ビット

    .. grid-item-card:: \ :ref:`ジェガン <srw4_unit_jegan>`\ 
      :columns: auto

      | 80046544 0D4A
      | 小型ミサイル→
      | ビット

    .. grid-item-card:: \ :ref:`リ·ガズィ <srw4_unit_ri_gazi_ma>`\ 
      :columns: auto

      | 30046584 0008
      | リ·ガズィ（MA）→
      | リ·ガズィ（MS）
      | 300465AF 0009
      | リ·ガズィ（MS）→
      | リ·ガズィ（MA）
      | 30046592 0001
      | 移动空陆
      | 80046593 4444
      | 800465BE 4444
      | 地形适应全A
      | 800465A0 0D4A
      | ビームキャノン
      | →ビット
      | 8004659D 001F
      | ﾒｶﾞﾋﾞｰﾑｷｬﾉﾝ	→
      | ﾊｲﾊﾟｰﾒｶﾞﾗﾝﾁｬｰ
      | 800465D1 0D4A
      | ｸﾞﾚﾈｰﾄﾞﾗﾝﾁｬｰ
      | →ビット（エルメス）
    
    .. grid-item-card:: \ :ref:`マジンガーZ <srw4_unit_mazinger_z>`\ 
      :columns: auto

      | 800466EF 0200      
      | 乘换ダンバイン系
      | 30046714 0028
      | ミサイル(5E)→
      | ミサイル(28)

    .. grid-item-card:: \ :ref:`マジンガーZ（JS） <srw4_unit_mazinger_z_js>`\ 
      :columns: auto

      | 80046723 0200      
      | 乘换ダンバイン系
      | 3004673A 00B4
      | 限界→180
      | 3004674B 0028
      | ミサイル(5E)→
      | ミサイル(28)

    .. grid-item-card:: グレートマジンガー
      :columns: auto

      | 80046763 0200      
      | 乘换ダンバイン系
      | 30046779 00B4
      | 限界→180

    .. grid-item-card:: \ :ref:`グレンダイザー <srw4_unit_grendizer>`\  
      :columns: auto

      | 800467A9 0200
      | 乘换ダンバイン系
      | 300467BF 00B4
      | 限界→180
      | 300468F4 0035
      | ｼｮﾙﾀﾞｰﾌﾞｰﾒﾗﾝ
      | →マイクロミサイル⚔🗺️	

    .. grid-item-card:: \ :ref:`スペイザー <srw4_unit_spacer>`\  
      :columns: auto

      | 800467DD 0000
      | 乘换機動戦士系
      | 300467F3 00B4
      | 限界→180

    .. grid-item-card:: ダブルスペイザー	
      :columns: auto

      | 80046817 0200
      | 乘换ダンバイン系

    .. grid-item-card:: ドリルスパイザー	
      :columns: auto

      | 80046842 0200
      | 乘换ダンバイン系

    .. grid-item-card:: マリンスペイザー	
      :columns: auto

      | 8004686D 0200
      | 乘换ダンバイン系

    .. grid-item-card:: グレンダイザー (WS)	
      :columns: auto

      | 300468AE 00B4
      | 限界→180
      | 300468B7 0035
      | ｼｮﾙﾀﾞｰﾌﾞｰﾒﾗﾝ
      | →マイクロミサイル⚔🗺️	

    .. grid-item-card:: グレンダイザー （DS)	
      :columns: auto

      | 300468EB 00B4
      | 限界→180
      | 300468F4 0035
      | ｼｮﾙﾀﾞｰﾌﾞｰﾒﾗﾝ
      | →マイクロミサイル⚔🗺️	

    .. grid-item-card:: グレンダイザー （MS)	
      :columns: auto

      | 30046928 00B4
      | 限界→180
      | 30046931 0035
      | ｼｮﾙﾀﾞｰﾌﾞｰﾒﾗﾝ
      | →マイクロミサイル⚔🗺️	


    .. grid-item-card:: アフロダイA
      :columns: auto

      | 8004694F 0200
      | 乘换ダンバイン系


    .. grid-item-card:: ダイアナンA
      :columns: auto

      | 8004697A 0200
      | 乘换ダンバイン系
      | 30046990 00B4
      | 限界→180 

    .. grid-item-card:: \ :ref:`ボスボロット<srw4_unit_boss_borot>`\  
      :columns: auto  

      | 800469A8 0200
      | 乘换ダンバイン系
      | 300469B9 0001 
      | 移动类型空陆
      | 800469BA 4444
      | 地形适应全A
      | 300469BE 00B4
      | 限界→180

    .. grid-item-card:: ビューナスA
      :columns: auto

      | 800469D6 0200
      | 乘换ダンバイン系
      | 300469EC 00B4
      | 限界→180

    .. grid-item-card:: ライディーン
      :columns: auto

      | 80046B2F 0000
      | 乘换機動戦士系

    .. grid-item-card:: \ :ref:`ブルーガー <srw4_unit_bluegar>`\ 
      :columns: auto

      | 80046B79 0000
      | 乘换機動戦士系
      | 30046B89 0001
      | 移动空陆
      | 80046B8A 4444
      | 地形适应全A

    .. grid-item-card:: ダイモス
      :columns: auto

      | 80046BA6 0000
      | 乘换機動戦士系

    .. grid-item-card:: \ :ref:`ガルバーFXⅡ <srw4_unit_galva_fx_ii>`\ 
      :columns: auto

      | 30046BF3 0000
      | 乘换機動戦士系
      | 30046C03 0001
      | 移动空陆
      | 80046C04 4444
      | 地形适应全A


    .. grid-item-card:: ダイターン3
      :columns: auto    

      | 80046C1D 0000 
      | 80046C57 0000 
      | 80046C85 0000 
      | 乘换機動戦士系      

    .. grid-item-card:: \ :ref:`ビルバイン <srw4_unit_bilvine>`\  
      :columns: auto

      | 80046DED 0A33
      | オーラキャノン→
      | ﾊｲﾊﾟｰｵｰﾗｷｬﾉﾝ

    .. grid-item-card:: ゴーショーグン
      :columns: auto

      | 80046E3F 4444
      | 地形适应全A
      | 80046E2D 0000
      | 乘换機動戦士系

    .. grid-item-card:: サイバスター
      :columns: auto

      | 80047107 0000
      | 乘换機動戦士系
      | 80047123 011E
      | ディスカッター
      | →ｸﾞﾗﾝﾜｰﾑｿｰﾄﾞ
      | 80047126 051F
      | ｶﾛﾘｯｸﾐｻｲﾙ
      | →ｸﾞﾗﾋﾞﾄﾛﾝｶﾉﾝ
      | 8004712C 0921
      | ハイファミリア
      | →ﾌﾞﾗｯｸﾎｰﾙｸﾗｽﾀｰ
      | 8004712F 0D1C   

    .. grid-item-card:: サイバード
      :columns: auto

      | 8004713B 0000
      | 乘换機動戦士系
      | 3004714C 0001
      | 移动空陆
      | 8004714D 4444
      | 地形适应全A
      | 80047157 051F
      | ｶﾛﾘｯｸﾐｻｲﾙ
      | →ｸﾞﾗﾋﾞﾄﾛﾝｶﾉﾝ
      | 8004715D 0921
      | ハイファミリア
      | →ﾌﾞﾗｯｸﾎｰﾙｸﾗｽﾀｰ

    .. grid-item-card:: グランゾン
      :columns: auto

      | 80047166 0000
      | 乘换機動戦士系
      | 80047188 011A
      | ﾜｰﾑｽﾏｯｼｬｰ
      | →サイフラッシュ

    .. grid-item-card:: ネオ·グランゾン
      :columns: auto

      | 80047194 0000
      | 乘换機動戦士系
      | 800471B6 0120
      | ﾜｰﾑｽﾏｯｼｬｰ
      | 弹药槽 2→0
      | 800471B9 093A
      | ﾌﾞﾗｯｸﾎｰﾙｸﾗｽﾀｰ
      | 弹药槽 3→2
      | 800471BC 0D22
      | 縮退砲
      | 弹药槽 4→3

    .. grid-item-card:: ヴァルシオーネR
      :columns: auto

      | 800471C5 0000
      | 乘换機動戦士系

    .. grid-item-card:: ザムジード
      :columns: auto

      | 800471F6 0000
      | 乘换機動戦士系

    .. grid-item-card:: グランヴェール
      :columns: auto

      | 80047227 0000
      | 乘换機動戦士系

    .. grid-item-card:: ガッデス
      :columns: auto

      | 8004725B 0000
      | 乘换機動戦士系

    .. grid-item-card:: ウィーゾル改
      :columns: auto

      | 80047289 0000
      | 乘换機動戦士系
    
    .. grid-item-card:: \ :ref:`ノルス·レイ <srw4_unit_nors_ray>`\ 
      :columns: auto

      | 800472B4 0000
      | 乘换機動戦士系
      | 800472C6 4444
      | 地形适应全A
      | 800472CE 0405
      | 武器/残弹槽数量
      | 800472D0 00E9
      | 修理装置→
      | イビルアイ
      | 800472D3 04E6
      | ブラスナックル
      | 弹药槽再编号
      | 800472D6 0939
      | イビルアイ
      | →ニュートロンビーム

    .. grid-item-card:: \ :ref:`ガディフォール <srw4_unit_gadifal>`\ 
      :columns: auto

      | 800472DF 0000
      | 乘换機動戦士系
      | 800472FB 00E9
      | ディスカッター
      | →イビルアイ
      | 800472FE 04E6
      | ギガソートカノン
      | →ブラスナックル
      | 80047301 0939
      | ビームキャノン
      | →ニュートロンビーム
      | 80047304 0D5C
      | ﾒｶﾞﾋﾞｰﾑｷｬﾉﾝ    
      | 修理装置

    .. grid-item-card:: \ :ref:`ゲシュペンスト（リアル） <srw4_unit_gespenst_real>`\ 
      :columns: auto


      | 30047321 0001
      | 移动空陆
      | 80047322 4444
      | 地形适应全A
      | 80047310 0000
      | 乘换機動戦士系
      | 8004732C 00E9
      | プラズマカッター
      | →イビルアイ
      | 8004732F 04E6
      | スプリットミサイル
      | →ブラスナックル


    .. grid-item-card:: \ :ref:`ザク改 <srw4_unit_zaku_kai>`\ 
      :columns: auto

      | 8004735A 054A
      | ザクバズーカ
      | →ビット

    .. grid-item-card:: \ :ref:`サイコガンダム (MS) <srw4_unit_psycho_gundam_ms>`\ 
      :columns: auto

      | 300474D7 0057
      | ビーム砲→
      | ﾚﾌﾚｸﾀｰﾋﾞｯﾄ

    .. grid-item-card:: \ :ref:`サイコガンダム (MA) <srw4_unit_psycho_gundam_ma>`\ 
      :columns: auto

      | 30047502 0057
      | ビーム砲→
      | ﾚﾌﾚｸﾀｰﾋﾞｯﾄ

    .. grid-item-card:: \ :ref:`バイアラン <srw4_unit_byarlant>`\  
      :columns: auto

      | 8004755B 094A
      | 80047583 094A
      | ﾌｪﾀﾞｰｲﾝﾗｲﾌﾙ→
      | ビット

    .. grid-item-card:: \ :ref:`ガブスレイ (MS) <srw4_unit_gabthley_ms>`\  
      :columns: auto

      | 30047533 0050
      | メガ粒子砲→
      | 小型メガビーム砲

    .. grid-item-card:: \ :ref:`バウンド·ドック (MS) <srw4_unit_baund_doc_ms>`\ 
      :columns: auto

      | 300475AB 0555
      | ビームライフル→ 
      | ﾌｪﾀﾞｰｲﾝﾗｲﾌﾙ

    .. grid-item-card:: \ :ref:`百式 <srw4_unit_hyaku_shiki>`\ 
      :columns: auto

      | 30047654 00FD
      | バルカン→
      | ﾒｶﾞ拡散ﾋﾞｰﾑ砲
      | （サイコガンダム Mk-II）
      | 30047657 0058
      | ビームサーベル→
      | ｻｲｺﾐｭ式ﾋﾞｰﾑｿｰﾄ
      | （サイコガンダム Mk-II）
      | 3004765A 00FE
      | ビームライフル→
      | メガビーム砲
      | （サイコガンダム Mk-II）        
      | 3004765D 0057
      | クレイバズーカ→
      | ｻｲｺﾐｭ式ﾋﾞｰﾑｿｰﾄﾞ

    .. grid-item-card:: \ :ref:`メタス (MS) <srw4_unit_methuss_ms>`\ 
      :columns: auto 

      | 3004768B 004A
      | 300476B3 004A
      | アームビームガン→
      | ビット

    .. grid-item-card:: \ :ref:`ブラウ·ブロ <srw4_unit_braw_bro>`\ 
      :columns: auto 

      | 800476CC 010F
      | 移动类型/力
      | 800476CE 4444
      | 地形适应 A
      | 300476D8 004A
      | ｻｲｺﾐｭ式ﾒｶﾞ粒子砲
      | →ビット

    .. grid-item-card:: \ :ref:`ノイエ·ジール <srw4_unit_neue_ziel>`\ 
      :columns: auto  

      | 300477AD 0001
      | 移动空陆
      | 800477AE 4444
      | 地形全A 
      | 300477BE 0048
      | メガ粒子砲
      | →メガ粒子砲
      | (ヤクト·ドーガ)
      | 800477C1 0006
      | 大型ﾐｻｲﾙﾗﾝﾁｬｰ
      | →ヒームサーベル
      | (キュベレイ)
      | 800477C4 0D6C
      | 小型ﾐｻｲﾙﾗﾝﾁｬｰ
      | ファンネル


    .. grid-item-card:: \ :ref:`キュベレイ <srw4_unit_qubeley>`\ 
      :columns: auto

      | 800477EF 0148
      | ビームガン→
      | メガ粒子砲
      | (ヤクト·ドーガ)

    .. grid-item-card:: \ :ref:`キュベレイ Mk-II <srw4_unit_qubeley_mk_ii>`\ 
      :columns: auto

      | 30047817 0006 
      | ビームサーベル 
      | →ビームサーベル
      | （ キュベレイ）
      | 8004781A 0148
      | ビームガン
      | →メガ粒子砲
      | (ヤクト·ドーガ)
      | 3004781D 006C
      | ファンネル
      | →ファンネル
      | （ キュベレイ）

     
    .. grid-item-card:: \ :ref:`ラフレシア <srw4_unit_rafflesia>`\ 
      :columns: auto  

      | 30047B7C 0001
      | 移动空陆
      | 80047B7D 4444
      | 地形全A 
      
    .. grid-item-card:: \ :ref:`ゲシュペンスト（スーパー） <srw4_unit_gespenst_super>`\ 
      :columns: auto

      | 3004819A 0001
      | 移动空陆
      | 8004819B 4444
      | 地形适应全A
      | 80048189 0000
      | 乘换機動戦士系     

    .. grid-item-card:: \ :ref:`コロンブス <srw4_unit_columbus>`\ 
      :columns: auto  
            
      | 80048646 00B8
      | 图像→トロイホース

    .. grid-item-card:: \ :ref:`パゾグ <srw4_unit_pazock>`\ 
      :columns: auto  

      | 8004866E 007F
      | 图像→ミデア  

    .. grid-item-card:: \ :ref:`トロイホース <srw4_unit_trojan_horse>`\ 
      :columns: auto

      | 30048708 0001
      | 移动类型空陆  
      | 80048709 4444
      | 地形适应 A

    .. grid-item-card:: \ :ref:`グラーフ·ツェッペリン <srw4_unit_graf_zeppelin>`\ 
      :columns: auto 

      | 30048736 0001
      | 移动类型空陆
      | 80048737 4444
      | 地形适应 A

    .. grid-item-card:: \ :ref:`Sガンダム <srw4_unit_s_gundam>`\ 
      :columns: auto

      | 3004877E 0007
      | ミサイル→
      | ファンネル
      | (α·アジール)

    .. grid-item-card:: \ :ref:`アレキサンドリア <srw4_unit_alexandria>`\ 
      :columns: auto 

      | 300487C0 0001
      | 移动类型空陆
      | 800487C1 4444 
      | 地形适应 A
      | 300487CB 0413
      | １２０ミリ機関砲
      | →バルカン
      | (Sガンダム)
      | 300487D1 0081
      | メインメガ粒子砲
      | ﾋﾞｰﾑｽﾏｰﾄｶﾞﾝ
      | (Sガンダム)
      | 300487D4 0082
      | サブメガ粒子砲
      | →ビームカノン
      | (Sガンダム)

    .. grid-item-card:: \ :ref:`ＥｘＳガンダム <srw4_unit_ex_s_gundam>`\ 
      :columns: auto

      | 30048895 0007
      | ミサイル→
      | ファンネル

    .. grid-item-card:: \ :ref:`Gクルーザー (EXS) <srw4_unit_g_cruiser_ex_s>`\ 
      :columns: auto

      | 300488C0 0007
      | ミサイル→
      | ファンネル

    .. grid-item-card:: ラー·カイラム
      :columns: auto

      | 300489CC 0001
      | 移动类型空陆
      | 800489CD 4444
      | 地形适应 A

    .. grid-item-card:: \ :ref:`ザムス·ガル <srw4_unit_zamouth_garr>`\ 
      :columns: auto 

      | 300489CC 0001
      | 移动类型空陆
      | 800489CD 4444
      | 地形适应 A


    .. grid-item-card:: \ :ref:`オージェ <srw4_unit_auger>`\ 	
      :columns: auto

      | 30048CC9 00EA
      | ハンドランチャー
      | →スロウランサー
      | (オージェ)
      

    .. grid-item-card:: \ :ref:`アシュラテンプル <srw4_unit_ashura_temple>`\ 
      :columns: auto


      | 30048CFD 00EA
      | リバースボマー 
      | →スロウランサー
      | (オージェ)    

    .. grid-item-card:: \ :ref:`サロンズ <srw4_unit_salonz>`\ 
      :columns: auto 

      | 30048DC9 00EA
      | 图标→バッシュ
      | 80048DCB 0057
      | 图像→バッシュ

     
    .. grid-item-card::  \ :ref:`真·ゲッター3 <srw4_unit_shin_getter_3>`\ 
      :columns: auto
      
      | 30048ECF 0073
      | ｹﾞｯﾀｰﾐｻｲﾙ(0277)→
      | ｹﾞｯﾀｰﾐｻｲﾙ(0273)

    .. grid-item-card:: \ :ref:`ガイラム <srw4_unit_gayrahm>`\ 
      :columns: auto

      | 30048ED7 0006
      | 图标→グライア
      | 30048ED9 00ED
      | 图像→グライア
      | 30048EF5 0201
      | 武器数量
      | 30048EFA 00E7
      | パワーランチャー
      | (ガイラム)→
      | パワーランチャー
      | (エルガイム Mk-II)

    .. grid-item-card:: \ :ref:`ガンダム <srw4_unit_gundam>`\  
      :columns: auto 

      | 80048F28 0D4A
      | ハイパーバズーカ
      | →ビット

    .. grid-item-card:: \ :ref:`ガンダム Mk-II <srw4_unit_gundam_mk_ii>`\ 
      :columns: auto 

      | 80048F59 0D4A
      | ハイパーバズーカ
      | →ビット


    .. grid-item-card:: \ :ref:`スーパーガンダム <srw4_unit_super_gundam>`\ 
      :columns: auto 

      | 30048F9E 0001
      | 移动类型空陆
      | 80048F9F 4444
      | 地形适应 A
      | 80048FB2 0C35
      | ハイパーバズーカ→
      | マイクロミサイル (Map)
      | 80048FB5 114A
      | ﾐｻｲﾙﾗﾝﾁｬｰ
      | →ビット
      

    .. grid-item-card:: \ :ref:`Ξガンダム <srw4_unit_xi_gundam>`\ 
      :columns: auto 

      | 30048FC0 00F7
      | 图标→
      | スーパーガンダム
      | 30048FC2 0029
      | 图像→
      | スーパーガンダム
      | 80048FD4 010F   
      | 移动类型/力 
      | 80048FD6 4444
      | 地形适应 A
      | 30048FD8 0093
      | 装甲
      | 80048FD9 F063
      | 限界/运动性
      | 80048FE0 116b
      | メガカノン砲
      | +残弹槽

    .. grid-item-card:: \ :ref:`サーバイン <srw4_unit_sirbine>`\ 
      :columns: auto       

      | 8004902E 0103
      | 武器/残弹槽数量
      | 80049033 0634
      | オーラ斬り→
      | ﾊｲﾊﾟｰｵｰﾗｷｬﾉﾝ

    .. grid-item-card:: \ :ref:`ズワウス <srw4_unit_zwuath>`\ 
      :columns: auto

      | 80049059 0103
      | 武器/残弹槽数量
      | 8004905E 0634
      | オーラ斬り→ 
      | ﾊｲﾊﾟｰｵｰﾗｷｬﾉﾝ

    .. grid-item-card:: \ :ref:`ナイチンゲール <srw4_unit_nightingale>`\ 
      :columns: auto     

      | 300490EA 0081
      | 图标→
      | サザビー
      | 300490EC 00CA
      | 图像→
      | サザビー
      | 800490FE 010F   
      | 移动类型/力   
      | 80049100 4444
      | 地形适应 A
      | 30049102 0094
      | 装甲
      | 80049103 F063
      | 限界/运动性
      | 80049108 0304
      | 武器/残弹槽数量
      | 8004910A 067E
      | ギガブラスター

    .. grid-item-card:: ヌーベルディザード
      :columns: auto  

      | 8004912F 067E
      | セイバー
      | → ギガブラスター
      | 80049132 09E3
      | Ｓマイン
      | 弹药槽再编号
      | 80049135 01DD
      | パワーランチャー
      | →セイバー

    .. grid-item-card::  \ :ref:`Ζガンダム <srw4_unit_z_gundam>`\ 
      :columns: auto 

      | 800491DB 0108
      | ビームサーベルｰ
      | →突撃    
      | 800491DE 0606
      | ビームライフルｰ
      | →ファンネル  

    .. grid-item-card::  \ :ref:`ウェイブライダー <srw4_unit_wave_rider>`\ 
      :columns: auto 

      | 8004920F 0108
      | ビームガンｰ
      | →突撃
      | 80049212 0606
      | ビームライフルｰ
      | →ファンネル

    .. grid-item-card::  \ :ref:`ZΖガンダム <srw4_unit_zz_gundam>`\ 
      :columns: auto 

      | 80049240 0E06
      | ダブルキャノンｰ
      | →ファンネル

    .. grid-item-card::  \ :ref:`G-フォートレス <srw4_unit_g_fortress>`\ 
      :columns: auto 

      | 80049271 0E06
      | ダブルキャノンｰ
      | →ファンネル


    .. grid-item-card::  \ :ref:`ボチューン <srw4_unit_botune>`\ 
      :columns: auto

      | 80049414 0204
      | 武器/残弹槽数量
      | 30049419 0634
      | オーラバルカン
      | →ﾊｲﾊﾟｰｵｰﾗｷｬﾉﾝ

^^^^^^^^^^^^^^^^^^^^^
武器修改
^^^^^^^^^^^^^^^^^^^^^
.. _srw4_weapon_cheat_ps:

武器数据的格式参考\ :ref:`武器修改 <srw4_weapon_cheat>`。

.. grid::

    .. grid-item-card:: 追加武器1
      :columns: auto

      | E01046FC 0000
      | 301046FC 0001
      | ツインランサー
      | Ｖレーザー
      | ビッグブラスト
      | ·ディバイダー

    .. grid-item-card:: 追加武器2
      :columns: auto
      
      | E01046FD 0000
      | 301046FD 0086
      | イオン砲
      | アトミック
      | ·バズーカ
      | グランダッシャー      

    .. grid-item-card:: 追加武器3
      :columns: auto

      | E01046FE 0000
      | 301046FE 001A
      | ダイモシャフト
      | ドリルアンカー
      | 烈風正拳突き改
      | ゴッドボイス
      | ゴーガンソード
      | エネルギー
      | カッター      

    .. grid-item-card:: 追加武器4
      :columns: auto
      
      | E01046FF 0000
      | 301046FF 0030
      | 計都羅喉剣
      | ·暗剣殺
      | ブラックホール
      | ·キャノン

    .. grid-item-card:: 每机武器数量
      :columns: auto

      | 游戏本身武器数量设置错误
      | 以至于一些武器
      | 在特定加入顺序时
      | 无法改造
      | DuckStation版
      | 53000050 003c0000 
      | 31102F9E 0024
      | 因为会造成挂起
      | 只在过关时开启然后存盘
      | 关闭之后再读盘。

    .. grid-item-card::  フィンファンネル
      :columns: auto 

      | 3004EFCC 0008
      | 弹数→8

    .. grid-item-card::  マイクロミサイル🗺️
      :columns: auto 

      | 3004F06C 0010
      | 弹数→16

    .. grid-item-card::  修理装置
      :columns: auto 
      
      | 3004F65C 001E
      | 弹数→30
      | 3004F65A 0003
      | 射程→3
      | 300502BC 001E
      | 弹数→30
      | 300502BA 0003
      | 射程→3


    .. grid-item-card::  ネーブルミサイル
      :columns: auto 

      | （グレートマジンガー）
      | 8004F3E3 001F
      | 战斗动画→
      | ネーブルミサイル
      | の色違い(未使用)

    .. grid-item-card::  ボロットパンチ
      :columns: auto 

      | 3004F56a 0002
      | 射程→2

    .. grid-item-card::  ｽﾍﾟｼｬﾙﾎﾞﾛｯﾄﾊﾟﾝﾁ
      :columns: auto 

      | 3004F57a 0003
      | 射程→3

    .. grid-item-card::  SPDXﾎﾞﾛｯﾄﾊﾟﾝﾁ
      :columns: auto 

      | 3004F58a 0004
      | 射程→4

    .. grid-item-card::  修理装置
      :columns: auto 

      | 3004F657 0005
      | 射程→5

    .. grid-item-card:: 必殺烈風正拳突き
      :columns: auto  

      | 3004F90B 00FE
      | 地形AAAB
      | 30050CAB 00FE
      | 突き改
      | 地形AAAB

    .. grid-item-card::  オーラ斬り
      :columns: auto

      | 3004FBDA 0003
      | 射程→3

    .. grid-item-card::  ﾊｲﾊﾟｰｵｰﾗ斬り
      :columns: auto

      | 3004FBEA 0002
      | 射程→2


    .. grid-item-card::  突撃
      :columns: auto

      | 3004FD73 0023
      | 战斗动画→
      | ゲッターシャインスパーク
      | 8004FD75 11C6
      | 伤害 4550
      | 8004FD79 0402
      | 射程2~4



    .. grid-item-card::  ハイファミリア
      :columns: auto 
      
      | 3004FEAC 0008
      | サイバスター 弹数→8
      | 3004FFAC 0008
      | ザムジード 弹数→8
      | 3005000C 0008
      | グランヴェール 弹数→8
      | 3005003C 0008
      | ガッデス 弹数→8

    .. grid-item-card::  ビット
      :columns: auto

      | 30050192 0004
      | 台词→
      | フィンファンネル
      | 80050195 08FC
      | 伤害->2300
      | 3005019A 0009
      | 射程→9

    .. grid-item-card::  ﾚﾌﾚｸﾀｰﾋﾞｯﾄ
      :columns: auto

      | 30050262 0004
      | 台词→
      | フィンファンネル
      | 80050265 08FC
      | 伤害->2300
      | 3005026A 0009
      | 射程→9

    .. grid-item-card::  補給装置
      :columns: auto

      | 30050C8C 001E
      | 弹数→30
      | 30050C8A 0005
      | 射程→5
      | 30050C81  000F
      | →Ⓟ

    .. grid-item-card::  パワーランチャー
      :columns: auto

      | 30050B3C 000A
      | 30050B4C 000A
      | 30050B5C 000A
      | 30050B6C 000A
      | 弹数→10

    .. grid-item-card::  ﾄﾞﾘﾙﾃﾝﾍﾟｽﾄ
      :columns: auto

      | （\ :ref:`真·ゲッター2 <srw4_unit_shin_getter_2>`\ ）
      | 3005141B 00FF
      | 地形适应

^^^^^^^^^^^^^^^^^
芯片修改
^^^^^^^^^^^^^^^^^
.. _srw4_items_cheat_ps:

.. grid::

   .. grid-item-card:: 高性能雷达
      :columns: auto
      
      | 8010721C 1E08
      | 移+8 运+30
      | 8010721E 003F
      | 限+63 甲+100
      | 8010729C 1388
      | HP +5000 
      | 3010729E 0004
      | 光线护壁

   .. grid-item-card:: 米诺夫斯基飞行器
      :columns: auto

      | 80107220 1208 
      | 移+8 运+18
      | 80107222 0A14      
      | 限+20 甲+100
      | 801072a0 01F4 
      | HP +500
      | 301072a2 0004
      | 光线护壁

   .. grid-item-card:: 助推器
      :columns: auto

      | 80107224 120C
      | 移+12 运+18
      | 80107226 0A14
      | 限+20 甲+100
      | 801072a4 01F4 
      | HP +500
      | 301072a6 0004
      | 光线护壁

   .. grid-item-card:: 超级助推器
      :columns: auto

      | 80107228 1210
      | 移+16 运+18
      | 8010722A 0A14
      | 限+20 甲+100
      | 801072a8 01F4
      | HP +500 
      | 301072aa 0004
      | 光线护壁

   .. grid-item-card:: 远地点控制发动机
      :columns: auto

      | 8010722C 170C
      | 移+12 运+23
      | 8010722E 1014
      | 限+20 甲+100
      | 801072aC 01F4
      | HP +500 
      | 301072aE 0004
      | 光线护壁


   .. grid-item-card:: FATIMA
      :columns: auto

      | 80107230 2410
      | 移+16 运+36
      | 80107232 0A28
      | 限+40 甲+100
      | 801072b0 01F4
      | HP +500 
      | 301072b2 0004
      | 光线护壁

   .. grid-item-card:: ALICE
      :columns: auto

      | 80107234 1E08
      | 移+8 运+30
      | 80107236 0A28
      | 限+40 甲+100
      | 801072b4 01F4
      | HP +500 
      | 301072b6 0004
      | 光线护壁 

   .. grid-item-card:: 精神力框架
      :columns: auto

      | 80107238 1C08
      | 移+8 运+28
      | 8010723A 0A32
      | 限+50 甲+100
      | 801072b8 01F4
      | HP +500 
      | 301072bA 0004
      | 光线护壁 

   .. grid-item-card:: 生物传感器
      :columns: auto

      | 8010723C 1A08
      | 移+8 运+26
      | 8010723E 0A23
      | 限+35 甲+100
      | 801072bC 01F4
      | HP +500 
      | 301072bE 0004
      | 光线护壁

   .. grid-item-card:: 磁铁镀膜
      :columns: auto

      | 80107240 1708
      | 移+8 运+23
      | 80107242 0A1E
      | 限+30 甲+100
      | 801072C0 01F4
      | HP +500
      | 301072C2 0004
      | 光线护壁

   .. grid-item-card:: I立场发生机
      :columns: auto

      | 80107244 1208
      | 移+8 运+18
      | 80107246 0A14
      | 限+20 甲+100
      | 801072C4 01F4
      | HP +500
      | 301072C6 0004
      | 光线护壁      

   .. grid-item-card:: 乔巴姆装甲
      :columns: auto

      | 80107248 1208
      | 移+8 运+18
      | 8010724A 6428
      | 限+40 甲+1000
      | 801072c8 07d0
      | HP+2000
      | 301072cA 0004
      | 光线护壁   

   .. grid-item-card:: 混合装甲
      :columns: auto

      | 8010724C 1208
      | 移+8 运+18
      | 8010724E 9628
      | 限+40 甲+1500
      | 801072cC 0fa0
      | HP+4000
      | 301072cE 0004
      | 光线护壁  

   .. grid-item-card:: 护壁发生机
      :columns: auto

      | 80107250 1208
      | 移+8 运+18
      | 80107252 9628
      | 限+40 甲+1500
      | 801072D0 01F4
      | HP+500
      | 301072D2 0004
      | 光线护壁  

   .. grid-item-card:: 反光束涂层
      :columns: auto

      | 80107254 1208
      | 移+8 运+18
      | 80107256 9628
      | 限+40 甲+1500
      | 801072D4 01F4
      | HP+500
      | 301072D6 0004
      | 光线护壁  

   .. grid-item-card:: 修理工具包
      :columns: auto

      | 80107258 1208
      | 移+8 运+18
      | 8010725A 9628
      | 限+40 甲+1500
      | 801072D8 01F4
      | HP+500
      | 301072DA 0004
      | 光线护壁  

   .. grid-item-card:: 螺旋桨油箱
      :columns: auto

      | 8010725C 1208
      | 移+8 运+18
      | 8010725E 9628
      | 限+40 甲+1500
      | 801072DC 01F4
      | HP+500
      | 301072DE 0004
      | 光线护壁  

   .. grid-item-card:: 推进剂荚舱
      :columns: auto

      | 80107260 1208
      | 移+8 运+18
      | 80107262 9628
      | 限+40 甲+1500
      | 801072e0 01F4
      | HP+500
      | 301072e2 0004
      | 光线护壁  

   .. grid-item-card:: 推进剂荚舱S
      :columns: auto

      | 80107264 1208
      | 移+8 运+18
      | 80107266 9628
      | 限+40 甲+1500
      | 801072E4 01F4
      | HP+500
      | 301072E6 0004
      | 光线护壁  


^^^^^^^^^^^^^^^^^^^^^^^^^^
机体特殊技能修改
^^^^^^^^^^^^^^^^^^^^^^^^^^
.. _srw4_unit_specialty_cheat_ps:

如果你需要添加自己的修改，可以参考\ :ref:`机体特殊技能数据据格式 <srw4_unit_specialty>`\ 。

"""""""""""""""""""""""""""""
機動戦士变形
"""""""""""""""""""""""""""""


.. grid::  

    .. grid-item-card:: GP-03变形
      :columns: auto

      | 300463EE 0018
      | GP-02A → GP-03D 
      | 3004641D 0019
      | GP-03D → GP-03S 
      | 30046454 001A
      | GP-03S → GP-02A 
      | 80046405 0708
      | 80046434 0708
      | 8004646B 0708
      | 武器/残弹槽数量
      | 30046438 0004
      | 3004643B 0001
      | 3004643E 0002
      | 30046441 0005
      | 30046444 0006
      | 30046447 0000
      | 3004644A 0003
      | GP-03D
      | 武器再编号
      | 3004646F 0001
      | 30046472 0002
      | 30046475 0005
      | GP-03S
      | 武器再编号
      | 30046437 0010
      | 30046440 0014
      | 30046443 0018
      | 30046446 0004
      | 30046449 000c
      | GP-03D
      | 弹药槽再编号
      | 30046474 0014
      | GP-03S
      | 弹药槽再编号


    .. grid-item-card:: バイアラン变形  
      :columns: auto

      | 300474BE 0018
      | サイコガンダム(MS) 
      | →サイコガンダム(MA) 
      | 300474E9 0019
      | サイコガンダム(MA)
      | →バイアラン
      | 30047514 001A
      | バイアラン→
      | サイコガンダム(MS)
      | 800474D5 0304
      | 80047500 0304
      | 8004752B 0304
      | 武器/残弹槽数量
      | 3004752F 0003
      | バイアラン
      | 武器再编号
      | 30047531 0009
      | バイアラン  
      | 弾药槽再编号

    .. grid-item-card:: 百式变形  
      :columns: auto

      | 300475E2 0018
      | サイコガンダム Mk-II(MS)
      | →サイコガンダム Mk-II(MA)
      | 30047610 0019
      | サイコガンダム Mk-II(MA)
      | →百式
      | 3004763B 001A
      | 百式→
      | サイコガンダム Mk-II(MS)
      | 800475F9 0305
      | 80047627 0305
      | 80047652 0305
      | 武器/残弹槽数量
      | 30047656 0001
      | 30047659 0003
      | 3004765C 0000
      | 3004765F 0002
      | 百式武器再编号 
      | 30047655 0009
      | 3004765B 0005
      | 3004765E 000D
      | 百式弾药槽再编号

    .. grid-item-card:: メタス变形  
      :columns: auto

      | 3004766C 0018
      | メタス (MS)
      | →メタス (MA)
      | 30047697 0019
      | メタス (MA)
      | →ブラウ·ブロ
      | 300476BF 001A
      | ブラウ·ブロ→
      | メタス (MS)
      | 300476DA 0002
      | ブラウ·ブロ
      | 武器再编号
      | 300476D9 0009
      | ブラウ·ブロ
      | 弾药槽再编号

    .. grid-item-card:: キュベレイmkII变形  
      :columns: auto

      | 3004779F 0018
      | ノイエ·ジール
      | →キュベレイ
      | 300477D3 0019
      | キュベレイ
      | →キュベレイmkII
      | 300477FE 001A
      | キュベレイmkII
      | →ノイエ·ジール
      | 800477B6 0306
      | 800477EA 0306
      | 80047815 0306
      | 武器/残弹槽数量
      | 300477EE 0003     
      | 300477F1 0002      
      | 300477F4 0004
      | キュベレイ
      | 武器再编号
      | 30047819 0003      
      | 3004781C 0002      
      | 3004781F 0004
      | キュベレイmkII
      | 武器再编号
      | 300477F3 000D
      | キュベレイ
      | 弾药槽再编号  
      | 3004781E 000D
      | キュベレイmkII  
      | 弾药槽再编号

    .. grid-item-card:: ビギナ·ギナ变形  
      :columns: auto

      | 30047B18 0018
      | ビギナ·ギナ→
      | ベルガ·ギロス
      | 30047B43 0019
      | ベルガ·ギロス
      | →ラフレシア
      | 30047B6E 001A
      | ラフレシア→
      | ビギナ·ギナ
      | 80047B2F 0305
      | 80047B5A 0305
      | 80047B85 0305
      | 武器/残弹槽数量
      | 80047B31 0189
      | 80047B5C 0189
      | ビームサーベル
      | →ﾃﾝﾀｸﾗｰﾛｯﾄﾞ
      | 80047B34 058B
      | 80047B5F 058B
      | ビームライフル
      | →バグ
      | 80047B62 09FD
      | 80047B64 0003
      | ベルガ·ギロス
      | ショットランサー
      | →ﾒｶﾞ拡散ﾋﾞｰﾑ
      | 80047B8A 058B
      | ﾒｶﾞ拡散ﾋﾞｰﾑ砲
      | →バグ
      | 80047B8d  0208
      | ﾒｶﾞﾋﾞｰﾑｷｬﾉﾝ
      | →ﾒｶﾞﾋﾞｰﾑﾗﾝﾁｬｰ
      | 80047B90 09fd
      | バグ→
      | ﾒｶﾞ拡散ﾋﾞｰﾑ砲
      | 80047B93 0D8A 
      | メガ粒子砲
      | →ﾒｶﾞﾋﾞｰﾑｷｬﾉﾝ
      
    .. grid-item-card:: Sガンダム变形 
      :columns: auto

      | 30048756 0018
      | Sガンダム→
      | Gクルーザー (S)
      | 3004878A 0019
      | Gクルーザー (S)→
      | アレキサンドリア
      | 300487B2 001A
      | アレキサンドリア
      | →Sガンダム
      | 8004876D 0607
      | 800487A1 0607
      | 800487C9 0607
      | 武器数量
      | 300487D0 0005
      | 300487D3 0002
      | 300487D6 0003
      | アレキサンドリア
      | 武器再编号
      | 300487CC 0004
      | 300487CF 0016 
      | 300487D2 000A
      | 300487D5 000E
      | アレキサンドリア
      | 弾药槽再编号

    .. grid-item-card:: ネェル·アーガマ变形 
      :columns: auto

      | 300488CC 0018
      | ネェル·アーガマ
      | →エンドラ
      | 300488FD 0019
      | エンドラ → サダラーン
      | ネェル·アーガマ
      | 3004892B 001A
      | サダラーン→
      | ネェル·アーガマ
      | 30048914 0405
      | エンドラ
      | 武器/残弹槽数量      
      | 30048918 0002
      | 3004891B 0003
      | 3004891E 0000
      | 30048921 0001
      | エンドラ
      | 武器再编号
      | 30048946 0002
      | 30048949 0003
      | 3004894C 0000
      | 3004894F 0001
      | サダラーン
      | 武器再编号
      | 30048917 000E
      | 3004891A 0012
      | 3004891D 0006
      | 30048920 000A
      | エンドラ
      | 弾药槽再编号
      | 30048945 000E
      | 30048948 0012
      | 3004894B 0006
      | 3004894E 000A 
      | サダラーン
      | 弾药槽再编号

"""""""""""""""""""""""""""""
重戦机エルガイム变形
"""""""""""""""""""""""""""""

.. grid::

    .. grid-item-card:: アシュラテンプル变形  
      :columns: auto

      | 30048C7C 0018
      | オージェ
      | →\ :ref:`オージ <srw4_unit_auge>`\ (奥津)
      | 30048CAA 0019
      | オージ→
      | アシュラテンプル
      | 30048CDE 001A
      | アシュラテンプル
      | →オージェ
      | 80048C93 0407
      | 80048CC1 0407
      | 80048CF5 0407
      | 武器/残弹槽数量 
      | 30048D02 0006
      | 30048D05 0003      
      | 30048D08 0004
      | アシュラテンプル
      | 武器再编号
      | 30048D01 0011
      | 30048D04 0009
      | アシュラテンプル
      | 弾药槽再编号


    .. grid-item-card:: ヌーベルディザード变形  
      :columns: auto

      | 300490F1 0008
      | ナイチンゲール→
      | →ヌーベルディザード
      | 30049116 0009
      | ヌーベルディザード
      | →ニセサイバスター
      | 80049108 0203
      | 8004912D 0203
      | 武器/残弹槽数量

"""""""""""""""""""""""""""""
オリジナル变形
"""""""""""""""""""""""""""""

在如下关卡中禁用：

.. grid::

    .. grid-item-card:: ヒュッケバイン变形      
      :columns: auto

      | 30046267 0008
      | ヒュッケバイン→
      | グルンガスト
      | 3004629F 0009
      | グルンガスト→
      | ヒュッケバイン
      | 300462D4 0008
      | ウイングガスト→
      | ガストランダー
      | 300462FF 0009
      | ガストランダー
      | →ウイングガスト
      | 8004627E 060A
      | ヒュッケバイン
      | 武器/残弹槽数量
      | 30046288 0007
      | 3004628E 0008
      | 30046291 0089
      | ヒュッケバイン
      | 武器再编号
      | 30046284 000A
      | 30046287 0016
      | 3004628D 001A
      | ヒュッケバイン
      | 弹药槽再编号
      | 300462BD 0008
      | ウイングガスト
      | 武器再编号
      | 300462BC 001A
      | ウイングガスト
      | 弹药槽再编号

    .. grid-item-card:: サイバスター变形
      :columns: auto    

      | 3004710A 0018
      | サイバスター→
      | サイバード
      | 3004713E 0019
      | サイバード
      | グランゾン
      | 30047169 001A
      | グランゾン
      | →サイバスター
      | 80047180 0406
      | 武器/残弹槽数量

    .. grid-item-card:: ザムジード变形
      :columns: auto

      | 30047197 0018
      | ネオ·グランゾン→
      | ヴァルシオーネR
      | 300471C8 0019
      | ヴァルシオーネR
      | →ザムジード
      | 300471F9 001A
      | ザムジード→
      | ヴァルシオーネR
      | 800471AE 0305
      | 800471DF 0305
      | 80047210 0305
      | 武器/残弹槽数量
      | 300471E9 0002
      | 300471Ec 0003
      | ヴァルシオーネR
      | 武器再编号
      | 3004721A 0004
      | 30047220 0002
      | ザムジード
      | 武器再编号
      | 30047219 0009
      | 3004721C 000D
      | ザムジード
      | 弹药槽再编号

    .. grid-item-card:: ガッデス变形
      :columns: auto
      
      | 3004722A 0018
      | グランヴェール
      | →ガッデス
      | 3004725E 0019
      | ガッデス→
      | ウィーゾル改
      | 3004728C 001A
      | ウィーゾル改→
      | グランヴェール
      | 80047241 0306
      | 80047275 0306
      | 800472A3 0306
      | 武器/残弹槽数量
      | 3004727f 0003
      | 30047282 0002
      | ガッデス
      | 武器再编号
      | 300472AD 0003
      | ウィーゾル改
      | 武器再编号 

    .. grid-item-card:: ゲシュペンスト变形  
      :columns: auto

      | 300472B7 0018
      | ノルス·レイ→
      | ガディフォール
      | 300472E2 0019
      | ガディフォール→
      | ゲシュペンスト（R）
      | 30047313 001A
      | ゲシュペンスト（R）
      | →ノルス·レイ
      | 800472CE 0405
      | 800472F9 0405
      | 8004732A 0405
      | 武器/残弹槽数量




"""""""""""""""""""""""""""""
グレンダイザー合体可
"""""""""""""""""""""""""""""

.. grid::

    .. grid-item-card:: マジンガーZ（JS）
      :columns: auto

      | 30046726 00A8
      | 可被合体

    .. grid-item-card:: グレートマジンガー
      :columns: auto
      
      | 30046766 00A8
      | 可被合体
      
  
"""""""""""""""""""""""""""""
二段变身
"""""""""""""""""""""""""""""
对于会加入我军的机体，使用10/11代码以避免被击坠变成其他机体变不回来。例外是ボチューン，因为其后的机体为废弃数据，不保留击坠变身的效果，其后的机体就不会出战。

特定机体需要增加武器数量到其他形态的最大值以避免敌人出击时死机。

.. grid::

    .. grid-item-card:: ブラッドテンプル
      :columns: auto

      | 300470AD 0042

    .. grid-item-card:: アトールV/ゴッドネロス
      :columns: auto

      | 300470E1 0040
      
    .. grid-item-card:: ドム
      :columns: auto

      | 30047371 0040

    .. grid-item-card:: マラサイ
      :columns: auto

      | 300473C7 0060

    .. grid-item-card:: バーザム
      :columns: auto

      | 300473F2 0040

    .. grid-item-card:: ハンブラビ
      :columns: auto

      | 3004741D 0040
      | ハンブラビ (MS)
      | 3004744B 0040
      | ハンブラビ (MA)

    .. grid-item-card:: アッシマー
      :columns: auto

      | 30047473 0040
      | アッシマー (MS)	

    .. grid-item-card:: ガブスレイ
      :columns: auto

      | 3004753C 0010
      | ガブスレイ (MS)
      | 30047567 0011
      | ガブスレイ (MA)

    .. grid-item-card:: バウンド·ドック
      :columns: auto

      | 30047591 0040
      | バウンド·ドック (MS)

    .. grid-item-card:: ビグロ
      :columns: auto

      | 300476E6 0040

    .. grid-item-card:: ケンプファー
      :columns: auto

      | 30047711 0040

    .. grid-item-card:: ヴァル·ヴァロ
      :columns: auto

      | 30047745 0040

    .. grid-item-card:: ガーベラ·テトラ
      :columns: auto

      | 30047776 0040

    .. grid-item-card:: ガルスJ
      :columns: auto

      | 3004782B 0040
      | 80047840 0304

    .. grid-item-card:: ズサ
      :columns: auto

      | 30047856 0040

    .. grid-item-card:: ハンマ·ハンマ
      :columns: auto

      | 3004787E 0060

    .. grid-item-card:: R·ジャジャ
      :columns: auto

      | 300478A9 0040
      | 800478BE 0304

    .. grid-item-card:: バウ
      :columns: auto

      | 300478D4 0040
      | バウ (MS)
      | 30047902 0040
      | バウ (MA)

    .. grid-item-card:: クイン·マンサ
      :columns: auto

      | 3004795B 0044
      | 30047970 0609


    .. grid-item-card:: ドーベンウルフ
      :columns: auto

      | 30047986 0040

    .. grid-item-card:: ゲーマルク
      :columns: auto

      | 300479C3 0040

    
    .. grid-item-card:: ギラ·ドーガ（绿）
      :columns: auto

      | 300479FD 0040

    .. grid-item-card:: ギラ·ドーガ（强化）
      :columns: auto

      | 30047A2B 0040

    .. grid-item-card:: ヤクト·ドーガ（青）
      :columns: auto

      | 30047A59 0060

    .. grid-item-card:: α·アジール
      :columns: auto

      | 30047AEC 0044

    .. grid-item-card:: \ :ref:`メカザウルス·サキ <srw4_unit_mechasaurus_saki>`\  (机械恐龙·萨基)
      :columns: auto

      | 30047BA1 0040 

    .. grid-item-card:: \ :ref:`メカザウルス·バド <srw4_unit_mechasaurus_bado>`\ (机械恐龙·巴德)
      :columns: auto

      | 30047BC9 0040

    .. grid-item-card:: \ :ref:`メカザウルス·ザイ <srw4_unit_mechasaurus_zai>`\ (机械恐龙·扎伊)
      :columns: auto

      | 30047BF1 0040

    .. grid-item-card:: \ :ref:`機械獣ガラダK７ <srw4_unit_mechanical_beast_garada_k7>`\ (机械兽镰刀兽K7)
      :columns: auto

      | 30047CBF 0040

    .. grid-item-card:: \ :ref:`ラインX1 <srw4_unit_rhine_x1>`\ (莱茵X1)
      :columns: auto

      | 30047D12 0040

    .. grid-item-card:: \ :ref:`機械獣スパルタンK5 <srw4_unit_mechanical_beast_spartan_k5>`\ (机械兽斯巴达人K5)
      :columns: auto

      | 30047D62 0040

    .. grid-item-card:: グール
      :columns: auto
      
      | 30047DB2 0040

    .. grid-item-card:: ブード
      :columns: auto
    
      | 30047DE0 0040

    .. grid-item-card:: \ :ref:`マザーバーン <srw4_unit_mother_burn>`\  (圆盘母舰)
      :columns: auto

      | 30047E8F 0040

    .. grid-item-card:: \ :ref:`円盤獣ギルギル <srw4_unit_saucer_beast_girugiru>`\  (圆盘兽基鲁基鲁)
      :columns: auto

      | 30047EBA 0040
      | 80047ECF 0203
      
    .. grid-item-card:: \ :ref:`円盤獣ゴスゴス <srw4_unit_saucer_beast_gosgos>`\  (圆盘兽格斯格斯)
      :columns: auto

      | 30047EE5 0040

    .. grid-item-card:: ピクドロン
      :columns: auto

      | 80047F4D 0203
      | 30047F38 0040

    .. grid-item-card:: メカギルギルガン
      :columns: auto

      | 30047F88 0044

    .. grid-item-card:: ヴァルシオン
      :columns: auto

      | 30047FDE 0044

    .. grid-item-card:: ドラムロ
      :columns: auto

      | 30048006 0056

    .. grid-item-card:: レプラカーン
      :columns: auto

      | 3004802E 0056      

    .. grid-item-card:: ズワァース
      :columns: auto

      | 3004806B 0056
      | 80048080 0306

    .. grid-item-card:: ビアレス
      :columns: auto

      | 3004809C 0056
      | 800480B1 0306

    .. grid-item-card:: ライネック
      :columns: auto

      | 300480CA 0056

    .. grid-item-card:: ブブリィ
      :columns: auto

      | 3004812F 0056

    .. grid-item-card:: ガラバ
      :columns: auto

      | 30048160 0056

    .. grid-item-card:: グラン·ガラン
      :columns: auto

      | 300481B7 0010

    .. grid-item-card:: ゴラオン
      :columns: auto

      | 300481E2 0011

    .. grid-item-card:: ウィル·ウィプス
      :columns: auto

      | 3004820F 00C6

    .. grid-item-card:: ゲア·ガリング
      :columns: auto

      | 30048237 00C6

    .. grid-item-card:: スプリガン
      :columns: auto

      | 3004825F 00C6

    .. grid-item-card:: ガンテ(岩手)
      :columns: auto

      | 300482AC 0040

    .. grid-item-card:: 化石獣バストドン
      :columns: auto

      | 300482D7 0040

    .. grid-item-card:: 巨大シャーキン
      :columns: auto

      | 30048324 0040

    .. grid-item-card:: メカブースト·ガビタン（空）
      :columns: auto

      | 300483A2 0040

    .. grid-item-card:: 赤騎士デスカイン
      :columns: auto

      | 300483CA 0040

    .. grid-item-card:: バンドック
      :columns: auto

      | 3004841A 0044

    .. grid-item-card:: メカ戦士ギメリア
      :columns: auto

      | 3004846D 0040

    .. grid-item-card:: マグマ獣ガルムス
      :columns: auto

      | 300484C7 0040

    .. grid-item-card:: マグマ獣デモン
      :columns: auto

      | 300484EF 0040

    .. grid-item-card:: ビッグガルーダ
      :columns: auto

      | 3004851D 0040

    .. grid-item-card:: ブンドル艦
      :columns: auto

      | 30048548 0044

    .. grid-item-card:: カットナル艦
      :columns: auto

      | 30048576 0044

    .. grid-item-card:: ケルナグール艦
      :columns: auto

      | 300485A4 0044

    .. grid-item-card:: ザンジバル
      :columns: auto

      | 300485FA 00C0

    .. grid-item-card:: ミデア
      :columns: auto

      | 30048625 0040

    .. grid-item-card:: コロンブス
      :columns: auto

      | 3004864D 0040

    .. grid-item-card:: パゾグ
      :columns: auto

      | 30048675 0040

    .. grid-item-card:: ガウ
      :columns: auto

      | 3004869A 00C0

    .. grid-item-card:: ダブデ
      :columns: auto

      | 300486CB 0040

    .. grid-item-card:: トロイホース
      :columns: auto

      | 300486FA 0010

    .. grid-item-card:: グラーフ·ツェッペリン
      :columns: auto

      | 30048728 0011

    .. grid-item-card:: ムサイ改
      :columns: auto

      | 300487E2 00C0

    .. grid-item-card:: アーガマ
      :columns: auto

      | 3004880B 0010

    .. grid-item-card:: アイリッシュ
      :columns: auto

      | 3004883C 0011

    .. grid-item-card:: レウルーラ
      :columns: auto

      | 3004895E 00C0

    .. grid-item-card:: ラー·カイラム
      :columns: auto

      | 3004898F 0010

    .. grid-item-card:: ザムス·ガル
      :columns: auto

      | 300489BE 0011

    .. grid-item-card:: ガロイカ
      :columns: auto

      | 300489F1 0040

    .. grid-item-card:: ゼラニオ
      :columns: auto

      | 30048AD4 0040
      | 80048AE9 0506

    .. grid-item-card:: ゲイオス＝グルード
      :columns: auto

      | 30048B02 0040
      | 80048B17 0506

    .. grid-item-card:: \ :ref:`バラン＝シュナイル <srw4_unit_baran_schnile>`\ (巴兰·修奈尔)
      :columns: auto      
      
      | 30048B67 0040
      
    .. grid-item-card:: ゲシュペンスト Mk-II      
      :columns: auto

      | 30048B95 0042   

    .. grid-item-card:: アトール
      :columns: auto

      | 30048D76 0062

    .. grid-item-card:: グルーン
      :columns: auto

      | 30048DA1 0042

    .. grid-item-card:: サロンズ
      :columns: auto

      | 30048DD2 0042

    .. grid-item-card:: サーバイン
      :columns: auto

      | 30049017 0010 

    .. grid-item-card:: ズワウス
      :columns: auto

      | 30049042 0011

    .. grid-item-card:: アッザム
      :columns: auto

      | 3004909D 0040

    .. grid-item-card:: 暗黒大将軍
      :columns: auto

      | 30049143 0040

    .. grid-item-card:: ハーディアス
      :columns: auto

      | 3004916E 0040

    .. grid-item-card:: ドレイドウ
      :columns: auto

      | 30049199 0040

    .. grid-item-card:: 円盤獣ジンジン
      :columns: auto

      | 30049282 0040

    .. grid-item-card:: 円盤獣デキデキ
      :columns: auto

      | 300492AD 0040

    .. grid-item-card:: 戦闘獣ダンテ
      :columns: auto

      | 300492D8 0040

    .. grid-item-card:: 獣魔将軍
      :columns: auto

      | 3004932B 0040 

    .. grid-item-card:: グレイドン
      :columns: auto

      | 30049356 0040

    .. grid-item-card:: ガルンロール
      :columns: auto

      | 30049381 0040
      | 30049396 0608

    .. grid-item-card:: グライア
      :columns: auto

      | 300493AC 0040

    .. grid-item-card:: メカザウルス·ズー
      :columns: auto

      | 300493D4 0040

    .. grid-item-card:: ボチューン
      :columns: auto

      | 300493FF 0010   

    .. grid-item-card:: ドゴス·ギア
      :columns: auto

      | 3004942D 00C0

    .. grid-item-card:: スードリ
      :columns: auto

      | 3004948C 00C0

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
      
      | 7E1000xx 下一话代码

    .. grid-item-card:: 当前话数

      | 7E1001xx 

    .. grid-item-card:: 当前话代码

      | 7E1002xx 

    .. grid-item-card:: 生日

      | 7E1086mm
      | 7E1087dd

    .. grid-item-card:: 最大\ :ref:`资金 <srw4_remodeling_cheat>`
      :columns: auto

      | 7E10557F
      | 7E105696
      | 7E105798
  
    .. grid-item-card:: 战斗画面关，地图坐标开
      :columns: auto

      | 7E105860 

    .. grid-item-card:: 战斗画面开，地图坐标关
      :columns: auto

      | 7E105800 

    .. grid-item-card:: 总回合数最小 
      :columns: auto

      | 7e105301
      | 7e105400

    .. grid-item-card:: 总回合数最大
      :columns: auto

      | 7e10530f
      | 7e105427

    .. grid-item-card:: :ref:`经验倍率 <srw4_exp>`
      :columns: auto

      | 7E0EE17E 

    .. grid-item-card:: 基础经验值
      :columns: auto

      | 7e0edaff 
      | 7e0edbff  

    .. grid-item-card:: 地图武器自残有经验
      :columns: auto

      | c3d84800

    .. grid-item-card:: 1级全精神
      :columns: auto

      | 7e0ebaff

    .. grid-item-card:: 精神不減
      :columns: auto

      | 7e0ebbff

    .. grid-item-card:: 气合效果最大
      :columns: auto

      | 829bcffd
      | 使用脱力时关掉

    .. grid-item-card:: 保持幸運效果
      :columns: auto

      | c0b85b00
      | 不用时关掉

    .. grid-item-card:: 激怒攻击力最大
      :columns: auto

      | 7E0EC3FF
      | 7E0EC4FF

    .. grid-item-card:: 恋爱度最大
      :columns: auto

      | 7E1068F0 

    .. grid-item-card:: 恋爱度最小
      :columns: auto

      | 7E106800 

    .. grid-item-card:: 演示动画强开
      :columns: auto      

      | 7E1069ff
      | 7E106a40

    .. grid-item-card:: 控制敌军
      :columns: auto

      c392cd0b

    .. grid-item-card:: 诞生月
      :columns: auto

      7e1206xx

    .. grid-item-card:: 诞生日
      :columns: auto

      7e1207xx

    .. grid-item-card:: 无视系别
      :columns: auto

    .. grid-item-card:: 无限移动
      :columns: auto

      | 7E156644
      | 7E156844
      | 7E156a44
      | 7E156c44
      | 7E156e44
      | 7E157044
      | 7E157244

    .. grid-item-card:: 出击数锁定
      :columns: auto

      | 7E0EEC18
      | 比如同时可以出击两台母舰，
      | 但是总出击数量是写死的，
      | 后选的会把先选的覆盖，
      | 而且把剧情预留出击位占了会出bug，
      | 比如战场之爱击落蕾西之后
      | 她本来会重新作为友军出现，
      | 但是开了之后会作为敌军出现，
      | 安藤正树也只会作为NPC出场。

    .. grid-item-card:: 全武器15段改造
      :columns: auto
      
      | 7E141EFF
      | 7E141FFF
      | …… （中间每个字节都是FF）
      | 7E14EBFF

    .. grid-item-card:: 强化配件各9个
      :columns: auto

      | 7e107899
      | 7e107999
      | 7e107a99
      | 7e107b99
      | 7e107c99
      | 7e107d99
      | 7e107e99
      | 7e107f99

    .. grid-item-card:: 添加妖精
      :columns: auto
      
      | 需要开局开启，
      | 第一话过关之后存盘之后关闭再读盘，
      | 因为换乘的机师代码也在同一个字节，
      | 一直锁定的话会导致改出来也没法用。
      | 7E140980 チャム・ファウ
      | 7E140D80 ベル・アール
      | 7E141180 エル・フィノ
      | 7E141580 リリス・ファウ
      | 7E141980 シルキー・マウ
 
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
      | 7E110687 增加ハマーン
      | 7e118710 ハマーン编队
      | 7E1104B4 增加トッド
      | 7e118510 トッド编队
      | 7E110224 增加マチルダ
      | 7e118310 マチルダ编队
      | 7E1100D8 增加アマンダラ・
      | 7e118110 アマンダラ编队
      | 7E10fea0 增加あしゅら男爵
      | 7e117f10 あしゅら男爵编队

    .. grid-item-card:: 额外增加人物（路线B）
      :columns: auto

      | 分歧参考 （\ :ref:`隐藏要素 <srw4_missable>`\ 路线B）
      | 走A/C路线时禁用
      | 不按照路线中的选择可能造成数据溢出
      | 7e10fc82 增加サラ
      | 7e117d10 サラ编队
      | 7e10fa8e 增加ロザミア
      | 7e117b10 ロザミア编队
      | 7e10f83a 增加クェス
      | 7e117910 クェス编队
      | 7e10f67f 增加ララァ
      | 7e117710 ララァ编队

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

    .. grid-item-card:: ヒュッケバイン
      :columns: auto

      | CB958601
      | ヒュッケバイン移动空陆
      | CB958744
      | ヒュッケバイン空A海A

    .. grid-item-card:: グルンガスト
      :columns: auto

      | CB95BF44
      | グルンガスト空A海A

    .. grid-item-card:: GP-03
      :columns: auto

      | cb973c01
      | GP-03移动空陆
      | cb973d43
      | GP-03空A海B
      | cb973e34
      | GP-03陆B宇A

    .. grid-item-card:: ボスロボット
      :columns: auto

      | CB9CCA05
      | ボスロボット移动陆地中
      | CB9CCB04
      | ボスロボット地形适应海
      | CB9CCC44
      | ボスロボット地形适应陆宇

    .. grid-item-card:: ダンクーガ
      :columns: auto

      | cba18601
      | ダンクーガ移动空陆


    .. grid-item-card:: 增加机体(共通)
      :columns: auto

      | 分歧参考（\ :ref:`隐藏要素 <srw4_missable>`\ 路线A/B/C）
      | 不按照路线中的选择可能造成数据溢出
      | 7e12867a 增加キュベレイ
      | 7e140788 キュベレイ武器数量
      | 7e128440 增加ビルバイン
      | 7e140588 ビルバイン武器数量
      | 7e128285 增加ゲーマルク
      | 7e140388 ゲーマルク武器数量
      | 7e128050 增加ブラッドテンプル
      | 7e140188 ブラッドテンプル武器数量
      | 武器改造段数位移
      | 7e140600 キュベレイ
      | 7e140400 ビルバイン
      | 7e140200 ゲーマルク
      | 7e140000 ブラッドテンプル
       
    .. grid-item-card:: 额外增加机体(路线B)
      :columns: auto

      * 分歧参考 （\ :ref:`隐藏要素 <srw4_missable>`\ 路线B）
      * 走A/C路线时禁用
      * 不按照路线中的选择可能造成数据溢出
      * 7e127ee6 增加グラシドゥ＝リュ
      * 7e13ff88 グラシドゥ＝リュ武器数量
      * 7e127c8c 增加ビギナ・ギナ
      * 7e13fd88 ビギナ・ギナ武器数量      
      * 7e127adb 增加EXSガンダム
      * 7e13fb88 EXSガンダム武器数量      
      * 7e127870 增加サイコガンダム Mk-II(MA)
      * 7e13f988 サイコガンダム Mk-II(MA)武器数量
      * 7e127689 增加ヤクトドーガ（青）
      * 7e13f788 ヤクトドーガ（青）武器数量
      * 武器改造段数位移
      * 7e13fe00 グラシドゥ＝リュ
      * 7e13fc00 ビギナ・ギナ
      * 7e13fa00 ExSガンダム
      * 7e13f800 サイコガンダム Mk-II(MA)
      * 7e13f600 ヤクトドーガ（青）

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
      | cdf85d12 运+18
      | cdf85e14 限+20  
      | cdf85f0A 甲+100
      | cdf8bcf4
      | cdf8bd01 HP +500
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
主人公精神修改
^^^^^^^^^^^^^^^^^
具体数据格式参考\ :ref:`第四次精神修改 <srw4_mechanics_sprit_command_cheat>`\ 。


.. grid::

    .. grid-item-card:: リン
      :columns: auto

      | 8004CA98 011E
      | 8004CA9A 010E
      | 8004CA9C 0113
      | 8004CA9E 0114
      | 8004CAA0 0116
      | 8004CAA2 0112

    .. grid-item-card:: ヘクトール
      :columns: auto

      | 8004CADE 011E
      | 8004CAE0 010E
      | 8004CAE2 0113
      | 8004CAE4 0114
      | 8004CAE6 0116
      | 8004CAE8 0112

    .. grid-item-card:: ジェス
      :columns: auto

      | 8004CB5C 011E
      | 8004CB5E 010E
      | 8004CB60 0113
      | 8004CB62 0114
      | 8004CB64 0116
      | 8004CB66 0112      

    .. grid-item-card:: ミーナ
      :columns: auto 

      | 8004CB94 011E
      | 8004CB96 010E
      | 8004CB98 0113
      | 8004CB9A 0114
      | 8004CB9C 0116
      | 8004CB9E 0112    

    .. grid-item-card:: イルム
      :columns: auto 

      | 8004CC12 011E
      | 8004CC14 010E
      | 8004CC16 0113
      | 8004CC18 0114
      | 8004CC1a 0116
      | 8004CC1c 0112

    .. grid-item-card:: パット
      :columns: auto 

      | 8004CCBA 011E
      | 8004CCBC 010E
      | 8004CCBE 0113
      | 8004CCC0 0114
      | 8004CCC2 0116
      | 8004CCC4 0112

    .. grid-item-card:: グレース
      :columns: auto 

      | 8004CCD6 011E
      | 8004CCD8 010E
      | 8004CCDA 0113
      | 8004CCDC 0114
      | 8004CCDE 0116
      | 8004CCE0 0112

    .. grid-item-card:: ウィン
      :columns: auto

      | 8004CD00 011E
      | 8004CD02 010E
      | 8004CD04 0113
      | 8004CD06 0114
      | 8004CD08 0116
      | 8004CD0A 0112

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
      | 80103F47 04D9
      | ポセイダル
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
      | 80104163 04DC
      | フル・フラット
      | D010419F 0000
      | 8010419F 0425
      | セイラ・マス
      | D01041DB 0000
      | 801041DB 0498
      | ナナイ・ミゲル
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
      | 和チェーン冲突
      | D0103DA3 0000
      | 80103DA3 063B
      | チェーン
      | 和バニング冲突
      | D0103DDF 0000
      | 80103DDF 0697      
      | ギュネイ・ガス
      | D0103E1B 0000
      | 80103E1B 06bc
      | ゼット
      | D0103E57 0000
      | 80103E57 0627
      | ティアンム提督
      | D0103E93 0000
      | 80103E93 0638
      | イーノ・アッバーブ
      | D0103ECF 0000
      | 80103ECF 0626
      | ワッケイン
      | D0103F0B 0000
      | 80103F0B 06D8
      | アマンダラ


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

    .. grid-item-card:: エル・フィノ
      :columns: auto

      | 8004AB52 010D
      | 根性→幸運
      | 8004AB56 010E
      | 信頼→覚醒
      | 8004AB58 0112
      | 脱力→激励
      | 8004AB5A 0108
      | 隠れ身→気合

    .. grid-item-card:: 神江宇宙太
      :columns: auto

      | 3004ACFA 010D
      | てかげん→幸運

    .. grid-item-card:: 結城沙羅
      :columns: auto

      | 8004AD58 010D
      | 幸運 LV25→1

    .. grid-item-card:: 南原ちづる
      :columns: auto

      | 8004AE1E 010D
      | 幸運 LV25→1

    .. grid-item-card:: ショウ・ザマ
      :columns: auto

      | 8004AE8A 010D
      | てかげん→幸運

    .. grid-item-card:: マサキ
      :columns: auto  

      | 8004AED0 010D
      | ド根性→幸運

    .. grid-item-card:: リューネ
      :columns: auto

      | 8004AEB8 010D
      | てかげん→幸運


    .. grid-item-card:: クワトロ
      :columns: auto  

      | 8004AF16 010D
      | てかげん→幸運

    .. grid-item-card:: ブライト
      :columns: auto

      | 8004AF39 4444
      | 地形适应
      | 8004AF42 010D 
      | 根性→幸運
      | 8004AF48 0118
      | 偵察→探索


    .. grid-item-card:: マチルダ
      :columns: auto

      | 8004AF89 4444
      | 地形适应
      | 8004AF94 010D
      | 根性→幸運

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
      | 8004AFB2 000D      
      | 无→幸運
      | 8004AFB4 003E
      | 无→
      | ニュータイプ

    .. grid-item-card:: ワッケイン
      :columns: auto

      | 8004AFC1 4444
      | 地形适应
      | 8004AFCA 000D
      | 根性→幸運
      | 8004AFCC 011D
      | 気合→魂
      | 8004AFCE 003E
      | 加速→
      | ニュータイプ 

    .. grid-item-card:: ティアンム
      :columns: auto

      | 8004AFDB 4444
      | 地形适应
      | 8004AFE4 000D      
      | 根性→幸運
      | 8004AFE6 011D
      | 気合→魂
      | 8004AFE8 0111
      | 偵察→探索
      | 8004AFEA 003E
      | 加速→集中
      | ニュータイプ

    .. grid-item-card:: エマ
      :columns: auto

      | 8004B008 010D
      | 偵察→幸運
      | 8004B00C 013E
      | シールド防御Ｌ2
      | →ニュータイプ

    .. grid-item-card:: トーレス
      :columns: auto

      | 8004B02A 0109
      | 加速
      | 习得等级→1
      | 8004B02C 010D
      | 根性→幸運
      | 8004B02E 0118
      | 偵察→探索

    .. grid-item-card:: カツ
      :columns: auto

      | 8004B06E 010D
      | 根性→幸運

    .. grid-item-card:: フォウ
      :columns: auto

      | 8004B09E 010D
      | 信頼→幸運

    .. grid-item-card:: ビーチャ
      :columns: auto

      | 3004B1B0 004E
      | 颜
      | 8004B1C2 000D
      | 根性→幸運

    .. grid-item-card:: モンド
      :columns: auto

      | 8004B1DB 4444
      | 地形适应

    .. grid-item-card:: エル・ビアン
      :columns: auto

      | 8004B1F4 1f05
      | 颜
      | 8004B206 000D
      | 根性→幸運

    .. grid-item-card:: イーノ
      :columns: auto

      | 8004B218 1f01
      | 颜
      | 8004B221 4444
      | 地形适应
      | 8004B223 7a5b
      | 8004B225 5f71
      | 8004B227 5c55
      | 能力
      | 3004B229 0050
      | SP值
      | 8004B22A 000D
      | 无→幸運
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
      | 8004B242 000D
      | 无→幸運  
      | 8004B244 003E      
      | 无→
      | ニュータイプ

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
      | 8004B28A 000D
      | 无→幸運  
      | 8004B28C 003E      
      | 无→
      | ニュータイプ

    .. grid-item-card:: ケーラ・スゥ
      :columns: auto

      | 8004B299 4444
      | 地形适应
      | 8004B2A4 000D
      | 根性→幸運
      | 8004B2AE 003E
      | シールド防御Ｌ4
      | →ニュータイプ

    .. grid-item-card:: ハサウェイ
      :columns: auto

      | 8004B2C3 4444
      | 地形适应
      | 8004B2D3 010D
      | 愛→幸運

    .. grid-item-card:: クリス
      :columns: auto  

      | 8004B2FA 000D
      | 友情→幸運
      | 8004B304 003E
      | シールド防御Ｌ1
      | →ニュータイプ

    .. grid-item-card:: バーニィ
      :columns: auto

      | 8004B326 001D
      | 根性→魂
      | 8004B32E 003E
      | シールド防御Ｌ3
      | →ニュータイプ

    .. grid-item-card:: セシリー
      :columns: auto

      | 8004B350 010D
      | 信頼→幸運

    .. grid-item-card:: ガトー
      :columns: auto

      | 8004B394 010D
      | 威圧→幸運

    .. grid-item-card:: キース
      :columns: auto

      | 8004B3A5 4444
      | 地形适应
      | 8004B3B8 003E
      | 脱力→
      | ニュータイプ

    .. grid-item-card:: モンシア
      :columns: auto

      | 8004B3C5 4444
      | 地形适应
      | 8004B3D0 000D
      | てかげん→幸運
      | 8004B3DA 003E
      | シールド防御Ｌ2
      | →ニュータイプ

    .. grid-item-card:: ボス
      :columns: auto

      | 8004B429 4444
      | 地形适应
      | 8004B432 010D
      | 自爆→幸運

    .. grid-item-card:: 炎ジュン
      :columns: auto

      | 8004B44B 4444
      | 地形适应
      | 8004B454 010D
      | 信頼→幸運

    .. grid-item-card:: 牧場ひかる
      :columns: auto

      | 8004B498 000D
      | 足かせ→幸運

    .. grid-item-card:: 早乙女ミチル
      :columns: auto

      | 3004B4A5 0091
      | 乘换マジンガーZ系
      | 8004B4AB 4444
      | 地形适应
      | 8004B4B4 000D
      | 偵察→幸運
      | 8004B4BA 0101
      | 信頼→集中
      | 8004B4BC 001C
      | 隠れ身→鉄壁
      

    .. grid-item-card:: 神宮寺力
      :columns: auto

      | 3004B4E5 0010
      | 乘换機動戦士系
      | 8004B4EB 4444
      | 地形适应
      | 8004B4FA 010D
      | 根性→幸運


    .. grid-item-card:: 明日香麗
      :columns: auto

      | 3004B505 0090
      | 乘换機動戦士系
      | 8004B50B 4444
      | 地形适应
      | 8004B518 000D
      | 偵察→幸運

    .. grid-item-card:: 桜野マリ
      :columns: auto

      | 3004B525 0080
      | 乘换機動戦士系 
      | 8004B54B 4444
      | 地形适应

    .. grid-item-card:: カミーユ
      :columns: auto

      | 8004B58E 000D
      | 友情 →幸運

    .. grid-item-card:: ジュドー・
      :columns: auto

      | 8004B5C2 000D
      | 友情 →幸運

    .. grid-item-card:: シーブック
      :columns: auto

      | 8004B5F8 000D
      | 根性→幸運

    .. grid-item-card:: コウ
      :columns: auto

      | 8004B61F 4444
      | 地形适应
      | 8004B634 013E
      | 切り払いＬ2→
      | ニュータイプ

    .. grid-item-card:: 甲児
      :columns: auto

      | 8004B65E 000D
      | 根性→幸運

    .. grid-item-card:: ギャリソン時田
      :columns: auto

      | 8004B6DE 000D
      | 根性→幸運

    .. grid-item-card:: 鉄也
      :columns: auto

      | 8004B74E 000D
      | ド根性→幸運

    .. grid-item-card:: 京四郎
      :columns: auto

      | 3004B759 0010
      | 乘换機動戦士系
      | 8004B75F 4444
      | 地形适应
      | 8004B770 010D
      | 根性→幸運

    .. grid-item-card:: ナナ
      :columns: auto

      | 3004B77B 0080
      | 乘换機動戦士系
      | 8004B781 4444
      | 地形适应
      | 8004B794 010D
      | 信頼→幸運

    .. grid-item-card:: デューク
      :columns: auto

      | 3004B79B 0000
      | 乘换機動戦士系
      | 8004B7B2 000D
      | 友情→幸運

    .. grid-item-card:: マーベル
      :columns: auto

      | 8004B7D6 000D
      | 信頼→幸運

    .. grid-item-card:: 洸
      :columns: auto

      | 8004B7F2 000D
      | 根性→幸運

    .. grid-item-card:: ニー・ギブン
      :columns: auto

      | 3004B822 0009
      | 必中→加速
      | 3004B824 000D
      | 根性→幸運
      | 3004B826 0032
      | 脱力→聖戦士

    .. grid-item-card:: キーン
      :columns: auto

      | 3004B83C 0009
      | 偵察→加速
      | 3004B83E 000D 
      | 必中→幸運
      | 3004B844 0003
      | 信頼→補給
      | 3004B846 0032 
      | 友情→聖戦士

    .. grid-item-card:: シーラ
      :columns: auto

      | 3004B85E 000D
      | 信頼→幸運

    .. grid-item-card:: エレ・ハンム
      :columns: auto

      | 3004B87C 000D
      | 信頼→幸運

    .. grid-item-card:: リムル
      :columns: auto

      | 8004B893 4444
      | 地形适应
      | 3004B89E 010D 
      | 愛→幸運
      | 3004B8A6 0032
      | 覚醒→聖戦士

    .. grid-item-card:: 万丈
      :columns: auto

      | 8004B8D8 000D      
      | ド根性→幸運

    .. grid-item-card:: 一矢
      :columns: auto

      | 8004B8F8 000D
      | 根性→幸運

    .. grid-item-card:: テュッティ
      :columns: auto

      | 8004B956 000D
      | 信頼→幸運

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
      | 8004B984 000D      
      | 无→幸運
      | 8004B986 003E
      | 无→
      | ニュータイプ

    .. grid-item-card:: ヤンロン
      :columns: auto

      | 8004B9A6 000D
      | 根性→幸運

    .. grid-item-card:: ミオ
      :columns: auto

      | 8004B9DC 000D
      | 友情→幸運

    .. grid-item-card:: ララァ
      :columns: auto

      | 3004BB30 0090
      | 颜→アンナマリー
      | 8004BB39 4444
      | 地形适应
      | 8004BB42 001E
      | 愛→奇跡
      | 8004BB48 0012
      | 根性→激励
      | 8004BB4C 000C
      | てかげん
      | →ひらめき

    .. grid-item-card:: サラ
      :columns: auto      

      | 8004BBA6 000D
      | 愛→幸運

    .. grid-item-card:: ロザミア
      :columns: auto

      | 8004BD4A 000D
      | 根性→幸運


    .. grid-item-card:: グレミー
      :columns: auto

      | 3004BDCA 00E0
      | 颜
      | 8004BDDE 000D
      | てかげん→幸運

    .. grid-item-card:: ナナイ
      :columns: auto

      | 3004BE9C 003b
      | 颜
      | 8004BEA5 4444
      | 地形适应
      | 8004BEB0 000D
      | 信頼→幸運
      | 8004BEB8 003E
      | 根性→
      | ニュータイプ

    .. grid-item-card:: レズン
      :columns: auto

      | 8004BED0 000D
      | 根性→幸運
      | 8004BED2 001D
      | てかげん→魂
      | 8004BED8 003E
      | 気合→
      | ニュータイプ

    .. grid-item-card:: ゼット
      :columns: auto

      | 8004C330 0032
      | 切り払いＬ1 1→聖戦士
      | 8004C324 000D
      | 根性→幸運

    .. grid-item-card:: ダバ
      :columns: auto

      | 8004C5A8 000D
      | 友情→幸運

    .. grid-item-card:: レッシィ
      :columns: auto

      | 8004C5DA 000D
      | 愛→幸運

    .. grid-item-card:: キャオ
      :columns: auto      

      | 8004C614 000D
      | 自爆→幸運

    .. grid-item-card:: アム
      :columns: auto

      | 8004C62C 000D
      | 偵察→幸運

    .. grid-item-card:: ギャブレー
      :columns: auto

      | 8004C67A 000D
      | 根性→幸運

    .. grid-item-card:: アマンダラ
      :columns: auto

      | 8004C6A8 000D
      | 根性→幸運

    .. grid-item-card:: ポセイダル
      :columns: auto

      | 8004C6C6 000D
      | 根性→幸運

    .. grid-item-card:: フル・フラット
      :columns: auto
      
      | 8004C722 000A
      | 根性→熱血
      | 8004C724 0011
      | ド根性→集中
      | 8004C72A 000D
      | 威圧→幸運 

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
      | 8010407D 24CF
      | \ :ref:`コロンブス <srw4_unit_columbus>`\     
      | D01040B9 0000
      | 801040B9 1F01
      | \ :ref:`ガイラム <srw4_unit_gayrahm>`\ 
      | D01040F5 0000
      | 801040F5 2506
      | \ :ref:`Ξガンダム <srw4_unit_xi_gundam>`\ 
      | D0104131 0000
      | 80104131 240c
      | \ :ref:`ニセサイバスター <srw4_unit_fake_cybuster>`\ 
      | D010416D 0000
      | 8010416D 2451 
      | \ :ref:`アトールV <srw4_unit_a_taul_v>`\ 
      | D01041A9 0000
      | 801041A9 2485
      | \ :ref:`ゲーマルク <srw4_unit_geymalk>`\ 
      | D01041E5 0000
      | 801041E5 2503
      | \ :ref:`ガンダム Mk-II <srw4_unit_gundam_mk_ii>`\ 
      | D0104221 0000
      | 80104221 2503
      | \ :ref:`ガンダム Mk-II <srw4_unit_gundam_mk_ii>`\ 


    .. grid-item-card:: 路线B增加机体
      :columns: auto

      | :ref:`隐藏要素 <srw4_missable>`
      | 限路线B
      | D0103DE9 0000
      | 80103DE9 2487
      | \ :ref:`ギラ・ドーガ（强化） <srw4_unit_geara_doga_upgraded>`\ 
      | D0103E25 0000
      | 80103E25 2503
      | \ :ref:`ガンダム Mk-II <srw4_unit_gundam_mk_ii>`\ 
      | D0103E61 0000
      | 80103E61 24F8
      | \ :ref:`サロンズ <srw4_unit_salonz>`\ 
      | D0103E9D 0000
      | 80103E9D 2503
      | \ :ref:`ガンダム Mk-II <srw4_unit_gundam_mk_ii>`\ 
      | D0103ED9 0000
      | 80103ED9 2508
      | \ :ref:`サーバイン <srw4_unit_sirbine>`\ 
      | D0103F15 0000
      | 80103F15 2503
      | \ :ref:`ガンダム Mk-II <srw4_unit_gundam_mk_ii>`\ 
      | D0103F51 0000
      | 80103F51 2412
      | \ :ref:`ボール <srw4_unit_ball>`\ 
      | D0103F8D 0000
      | 80103F8D 2503
      | \ :ref:`ガンダム Mk-II <srw4_unit_gundam_mk_ii>`\ 
      | D0103FC9 0000
      | 80103FC9 1E61
      | \ :ref:`エルメス <srw4_unit_elmeth>`\ 
      | D0104005 0000
      | 80104005 2503
      | \ :ref:`ガンダム Mk-II <srw4_unit_gundam_mk_ii>`\ 
      | D0104041 0000
      | 80104041 2503
      | \ :ref:`ガンダム Mk-II <srw4_unit_gundam_mk_ii>`\ 

    .. grid-item-card:: \ :ref:`ヒュッケバイン <srw4_unit_huckebein>`\ 
      :columns: auto

      | 80046264 0000
      | 乘换機動戦士系
      | 30046275 0001
      | 移动空陆
      | 80046276 4444
      | 地形适应全A
      | 80046280 0655
      | ６０ﾐﾘﾊﾞﾙｶﾝ
      | →ﾀﾞﾌﾞﾙｵﾒｶﾞﾚｰｻﾞ
      | 80046283 0259
      | ﾌﾟﾗｽﾞﾏｿｰﾄﾞ
      | →ドリルアタック
      | 80046286 0A58
      | ４連ﾐｻｲﾙﾗﾝﾁｬｰ
      | →オメガキャノン
      | 80046289 0253
      | ﾛｼｭｾｲﾊﾞｰ→
      | ｸﾞﾙﾝｶﾞｽﾄﾋﾞｰﾑ

    .. grid-item-card:: \ :ref:`グルンガスト <srw4_unit_grungust>`\ 
      :columns: auto  

      | 8004629C 0000
      | 乘换機動戦士系
      | 800462AE 4444
      | 地形适应全A
      | 300462B8 0655
      | ﾌﾞｰｽﾄﾅｯｸﾙ
      | →ﾀﾞﾌﾞﾙｵﾒｶﾞﾚｰｻﾞ
      | 300462BB 0A58
      | オメガレーザー
      | →オメガキャノン
      | 300462BE 0E4D
      | ブレイククロス
      | →ﾘｰﾌﾟｽﾗｯｼｬｰ
      | 300462C1 0257
      | ｸﾞﾙﾝｶﾞｽﾄﾋﾞｰﾑ
      | →スパイラルアタック
      | 300462C4 0259
      | 計都羅睺剣
      | →ドリルアタック

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

    .. grid-item-card:: \ :ref:`リ・ガズィ <srw4_unit_ri_gazi_ma>`\ 
      :columns: auto

      | 30046584 0008
      | リ・ガズィ（MA）→
      | リ・ガズィ（MS）
      | 300465AF 0009
      | リ・ガズィ（MS）→
      | リ・ガズィ（MA）
      | 800465BE 4444
      | 地形适应全A
      | 800465D1 0D4A
      | ｸﾞﾚﾈｰﾄﾞﾗﾝﾁｬｰ
      | →ビット（エルメス）
      | 8004659D 001F
      | ﾒｶﾞﾋﾞｰﾑｷｬﾉﾝ	→
      | ﾊｲﾊﾟｰﾒｶﾞﾗﾝﾁｬｰ


    .. grid-item-card:: \ :ref:`マジンガーZ <srw4_unit_mazinger_z>`\ 
      :columns: auto

      | 30046714 0028
      | ミサイル(5E)→
      | ミサイル(28)

    .. grid-item-card:: \ :ref:`マジンガーZ（JS） <srw4_unit_mazinger_z_js>`\ 
      :columns: auto

      | 3004674B 0028
      | ミサイル(5E)→
      | ミサイル(28)

    .. grid-item-card:: \ :ref:`グレンダイザー <srw4_unit_grendizer>`\  
      :columns: auto

      | 800467A9 0000
      | 乘换機動戦士系

    .. grid-item-card:: \ :ref:`スペイザー <srw4_unit_spacer>`\  
      :columns: auto

      | 800467DD 0100
      | 乘换マジンガーZ系


    .. grid-item-card:: \ :ref:`ボスボロット<srw4_unit_boss_borot>`\  
      :columns: auto  

      | 300469B9 0001 
      | 移动类型空陆
      | 800469BA 4444
      | 地形适应全A

    .. grid-item-card:: \ :ref:`ブルーガー <srw4_unit_bluegar>`\ 
      :columns: auto

      | 30046B79 0000
      | 乘换機動戦士系
      | 30046B89 0001
      | 移动空陆
      | 80046B8A 4444
      | 地形适应全A

    .. grid-item-card:: \ :ref:`ガルバーFXⅡ <srw4_unit_galva_fx_ii>`\ 
      :columns: auto

      | 30046BF3 0000
      | 乘换機動戦士系
      | 30046C03 0001
      | 移动空陆
      | 80046C04 4444
      | 地形适应全A

    .. grid-item-card:: \ :ref:`ビルバイン <srw4_unit_bilvine>`\  
      :columns: auto

      | 80046DED 0A33
      | オーラキャノン→
      | ﾊｲﾊﾟｰｵｰﾗｷｬﾉﾝ
      
    .. grid-item-card:: \ :ref:`アトールV <srw4_unit_a_taul_v>`\ 
      :columns: auto

      | 300470D8 00EB
      | 图标
      | 800470DA 012A
      | 图像
      | 300470DD 0003
      | 乘换エルガイム系
      | 300470ED 0001
      | 移动空陆
      | 800470EE 4444
      | 地形适应全A
      | 300470F8 00E1
      | ｺﾞｯﾄﾞﾈﾛｽﾊﾟﾝﾁ
      | →ランサー
      | 300470FB 00E8
      | ﾌﾗｯｼｬｰﾋﾞｰﾑ→
      | ﾊﾞｽﾀｰﾗﾝﾁｬｰ (Map)
      | 300470FE 00E7
      | ｸﾞﾗﾋﾞﾄﾝｳｪｰﾌ→
      | パワーランチャー

    
    .. grid-item-card:: \ :ref:`ヴァルシオーネR <srw4_unit_valsione_r>`\ 
      :columns: auto

      | 300471E7 002B
      | クロスソーサー
      | →ハイファミリア

    .. grid-item-card:: \ :ref:`ザムジード <srw4_unit_zamzeed>`\ 
      :columns: auto

      | 30047215 0027
      | リニアレールガン
      | →クロスマッシャー
      | 30047218 003A
      | 対空ミサイル→
      | ﾌﾞﾗｯｸﾎｰﾙｸﾗｽﾀｰ

    .. grid-item-card:: \ :ref:`ノルス・レイ <srw4_unit_nors_ray>`\ 
      :columns: auto

      | 800472B4 0000
      | 乘换機動戦士系

    .. grid-item-card:: \ :ref:`ガディフォール <srw4_unit_gadifal>`\ 
      :columns: auto

      | 800472DF 0000
      | 乘换機動戦士系
      | 800472FE 0538
      | ギガソートカノン
      | →ｽﾌﾟﾘｯﾄﾐｻｲﾙ
      | 80047301 08E9
      | ビームキャノン
      | →イビルアイ
      | 80047304 0D39
      | ﾒｶﾞﾋﾞｰﾑｷｬﾉﾝ    
      | ﾆｭｰﾄﾛﾝﾋﾞｰﾑ


    .. grid-item-card:: \ :ref:`ゲシュペンスト（リアル） <srw4_unit_gespenst_real>`\ 
      :columns: auto


      | 30047321 0001
      | 移动空陆
      | 80047322 4444
      | 地形适应全A
      | 80047310 0000
      | 乘换機動戦士系


    .. grid-item-card:: \ :ref:`ザク改 <srw4_unit_zaku_kai>`\ 
      :columns: auto

      | 8004735A 054A
      | ザクバズーカ
      | →ビット

    .. grid-item-card:: \ :ref:`エルメス <srw4_unit_elmeth>`\ 
      :columns: auto  
 
      | 300473AB 0001
      | 移动类型空陆   
      | 800473AC 4444 
      | 地形适应

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

    .. grid-item-card:: \ :ref:`バウンド・ドック (MS) <srw4_unit_baund_doc_ms>`\ 
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


    .. grid-item-card:: \ :ref:`ブラウ・ブロ <srw4_unit_braw_bro>`\ 
      :columns: auto 

      | 800476CC 010F
      | 移动类型/力
      | 800476CE 4444
      | 地形适应 A

    .. grid-item-card:: \ :ref:`ノイエ・ジール <srw4_unit_neue_ziel>`\ 
      :columns: auto  

      | 300477AD 0001
      | 移动空陆
      | 800477AE 4444
      | 地形全A 
      | 300477BE 0048
      | メガ粒子砲
      | →メガ粒子砲
      | (ヤクト・ドーガ)
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
      | (ヤクト・ドーガ)

    .. grid-item-card:: \ :ref:`キュベレイ Mk-II <srw4_unit_qubeley_mk_ii>`\ 
      :columns: auto

      | 30047817 0006 
      | ビームサーベル 
      | →ビームサーベル
      | （ キュベレイ）
      | 8004781A 0148
      | ビームガン
      | →メガ粒子砲
      | (ヤクト・ドーガ)
      | 3004781D 006C
      | ファンネル
      | →ファンネル
      | （ キュベレイ）

    .. grid-item-card:: \ :ref:`クイン・マンサ <srw4_unit_quin_mantha>`\ 
      :columns: auto

      | 80047975 0148
      | メガ粒子砲 
      | →メガ粒子砲
      | (ドーベンウルフ)
      | 80047978 056F
      | ファンネル
      | →ファンネル
      | （ゲーマルク）

    .. grid-item-card:: \ :ref:`ドーベンウルフ <srw4_unit_doven_wolf>`\ 
      :columns: auto
  
      | 800479A9 100D
      | ﾐｻｲﾙﾗﾝﾁｬｰ
      | →ビームライフル
      | （ゲーマルク）
      | 800479AF 056F
      | 対艦ミサイル
      | →ファンネル
      | （ゲーマルク）

    .. grid-item-card:: \ :ref:`ゲーマルク <srw4_unit_geymalk>`\ 
      :columns: auto

      | 800479DD 0413
      | ビームランチャー
      | →バルカン
      | 300479E3 0D7C
      | ｸﾞﾚﾈｰﾄﾞﾗﾝﾁｬｰ
      | インコム
      | （ドーベンウルフ）
      | 300479EC 007D
      | ﾊｲﾊﾟｰﾒｶﾞ粒子砲	
      | →メガランチャー
      | （ドーベンウルフ）


    .. grid-item-card:: \ :ref:`ヤクト・ドーガ（赤） <srw4_unit_jagd_doga_red>`\ 
      :columns: auto

      | 30047AAA 0086     
      | ﾒｶﾞｶﾞﾄﾘﾝｸﾞｶﾞﾝ→
      | ビームトマホーク
      | 30047AAD 0007 
      | ファンネル
      | →ファンネル
      | （ α・アジール）

    .. grid-item-card:: \ :ref:`サザビー <srw4_unit_sazabi>`\ 
      :columns: auto
  

      | 30047ADE 0007
      | ファンネル
      | →ファンネル
      | （ α・アジール）

    .. grid-item-card:: \ :ref:`α・アジール <srw4_unit_alpha_azieru>`\ 
      :columns: auto  

      | 30047AF8 0001
      | 移动空陆
      | 80047AF9 4444
      | 地形全A
      | 30047B06 0048
      | メガ粒子砲
      | →メガ粒子砲
      | (ヤクト・ドーガ)
      | 30047B09 0086
      | 有線式ﾒｶﾞｱｰﾑ砲
      | →ﾋﾞｰﾑｼｮｯﾄﾗｲﾌﾙ


    .. grid-item-card:: \ :ref:`ビギナ・ギナ <srw4_unit_vigna_ghina>`\ 
      :columns: auto  

      | 80047B34 058B
      | ビームライフル
      | →バグ

    .. grid-item-card:: \ :ref:`ベルガ・ギロス <srw4_unit_berga_giros>`\ 
      :columns: auto     

      | 30047B5F 058A
      | ビームライフル
      | →ﾒｶﾞﾋﾞｰﾑｷｬﾉﾝ  

      
    .. grid-item-card:: \ :ref:`ラフレシア <srw4_unit_rafflesia>`\ 
      :columns: auto  

      | 30047B7C 0001
      | 移动空陆
      | 80047B7D 4444
      | 地形全A 
      | 30047B8A 0088
      | ﾒｶﾞ拡散ﾋﾞｰﾑ砲→
      | ショットランサー      

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
      | 30048659 0001
      | 移动类型空陆
      | 8004865A 4444  
      | 地形适应 A

    .. grid-item-card:: \ :ref:`パゾグ <srw4_unit_pazock>`\ 
      :columns: auto  

      | 8004866E 007F
      | 图像→ミデア
      | 30048681 0001
      | 移动类型空陆 
      | 80048682 4444
      | 地形适应 A     
      | 8084868C 121F
      | １２０ミリ機関砲
      | →12連装
      | ﾐｻｲﾙﾗﾝﾁｬｰ
      | 3004868E 0003
      | 武器再编号      

    .. grid-item-card:: \ :ref:`ガウ <srw4_unit_gaw>`\ 
      :columns: auto 

      | 300486A6 0001
      | 移动类型空陆
      | 800486A7 4444
      | 地形适应 

    .. grid-item-card:: \ :ref:`トロイホース <srw4_unit_trojan_horse>`\ 
      :columns: auto

      | 30048708 0001
      | 移动类型空陆  
      | 80048709 4444
      | 地形适应 A

    .. grid-item-card:: \ :ref:`グラーフ・ツェッペリン <srw4_unit_graf_zeppelin>`\ 
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
      | (α・アジール)

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

    .. grid-item-card:: \ :ref:`アーガマ <srw4_unit_argama>`\ 
      :columns: auto

      | 30048819 0001
      | 移动类型空陆
      | 8004881A 4444
      | 地形适应 A  

    .. grid-item-card:: \ :ref:`アイリッシュ <srw4_unit_irish>`\ 
      :columns: auto 

      | 3004884A 0001
      | 移动类型空陆
      | 8004884B 4444
      | 地形适应 A  

    .. grid-item-card:: \ :ref:`ExSガンダム <srw4_unit_ex_s_gundam>`\ 
      :columns: auto

      | 30048895 0007
      | ミサイル→
      | ファンネル

    .. grid-item-card:: \ :ref:`Gクルーザー (EXS) <srw4_unit_g_cruiser_ex_s>`\ 
      :columns: auto

      | 300488C0 0007
      | ミサイル→
      | ファンネル

    .. grid-item-card:: \ :ref:`ネェル・アーガマ <srw4_unit_nahel_argama>`\ 
      :columns: auto

      | 300488DA 0001
      | 移动类型空陆
      | 800488DB 4444
      | 地形适应 A

    .. grid-item-card:: \ :ref:`エンドラ <srw4_unit_endra>`\ 
      :columns: auto

      | 3004890B 0001
      | 移动类型空陆
      | 8004890C 4444
      | 地形适应 A
      | 30048916 0025
      | １６０ミリ機関砲
      | →１８０ミリ機関砲
      | （ネェル・アーガマ）      
      | 3004891C 002A
      | メインメガ粒子砲→
      | メインメガ粒子砲
      | (ネェル・アーガマ)
      | 3004891F 002D
      | サブメガ粒子砲
      | →サブメガ粒子砲
      | (ネェル・アーガマ)

    .. grid-item-card:: \ :ref:`サダラーン <srw4_unit_sadalahn>`\ 
      :columns: auto

      | 30048939 0001
      | 移动类型空陆
      | 8004893A 4444
      | 地形适应 A


    .. grid-item-card:: \ :ref:`ザムス・ガル <srw4_unit_zamouth_garr>`\ 
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
      | 80048DDD 010F
      | 移动类型/力
      | 80048DDF 4444
      | 地形适应
      | 30048DE1 0097
      | 装甲
      | 80048DE2 F063
      | 限界/运动性
      | 80048DE7 0607
      | 武器/残弹槽数量
      | 80048DEF 11E3
      | ハンマー→
      | Sマイン
      | 80048DF5 15E7
      | セイバー→
      | バスターランチャー
      
    .. grid-item-card::  \ :ref:`真・ゲッター3 <srw4_unit_shin_getter_3>`\ 
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
      | 80048EFA 11E7
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
      | 80049108 0101
      | 武器/残弹槽数量
      | 8004910A 056e
      | ファンネル

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
      | 30049419 0623
      | オーラバルカン
      | →140ミリ機関砲
      | (ドゴス・ギア)
      | 8004941C 0A27
      | オーラ斬り→
      | メインメガ粒子砲

    .. grid-item-card:: \ :ref:`ドゴス・ギア <srw4_unit_dogosse_giar>`\ 
      :columns: auto     

      | 30049425 001D 
      | 图标
      | 30049427 0029
      | 图像
      | 80049438 010F
      | 移动类型/力
      | 8004943A 4444
      | 地形适应 A
      | 3004943c 0095
      | 装甲
      | 8004943d F063
      | 限界/运动性

    .. grid-item-card:: \ :ref:`アウドムラ <srw4_unit_audhumla>`\ 
      :columns: auto    

      | 80049469 010F
      | 移动类型/力
      | 8004946B 4444
      | 地形适应 A
      | 3004946D 0096
      | 装甲
      | 8004946E F063
      | 限界/运动性    
      | 30049475 0627      
      | メガ粒子砲→
      | メインメガ粒子砲
      | (ドゴス・ギア) 
      | 3004947B 0DD9
      | 対空機関砲
      | →ハイメガ粒子砲
      | (ドゴス・ギア)


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
      | ・ディバイダー

    .. grid-item-card:: 追加武器2
      :columns: auto
      
      | E01046FD 0000
      | 301046FD 0086
      | イオン砲
      | アトミック
      | ・バズーカ
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
      | ・暗剣殺
      | ブラックホール
      | ・キャノン

    .. grid-item-card:: 每机武器数量
      :columns: auto

      | 游戏本身武器数量设置错误
      | 以至于一些武器
      | 在特定加入顺序时
      | 无法改造
      | DuckStation版
      | 53000050 003c0000 
      | 31102F9E 002E
      | 因为会造成挂起
      | 只在过关时开启然后存盘
      | 关闭之后再读盘。

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

    .. grid-item-card::  ビット
      :columns: auto

      | 30050192 0002
      | 台词→
      | ファンネル
      | 80050195 08FC
      | 伤害->2300

    .. grid-item-card::  ﾚﾌﾚｸﾀｰﾋﾞｯﾄ
      :columns: auto

      | 30050262 0002
      | 台词→
      | ファンネル

    .. grid-item-card::  ﾄﾞﾘﾙﾃﾝﾍﾟｽﾄ
      :columns: auto

      | （\ :ref:`真・ゲッター2 <srw4_unit_shin_getter_2>`\ ）
      | 3005141B 00FF
      | 地形适应

^^^^^^^^^^^^^^^^^
芯片修改
^^^^^^^^^^^^^^^^^
.. _srw4_items_cheat_ps:

.. grid::

   .. grid-item-card:: 高性能雷达
      :columns: auto
      
      | 8010721C 1208
      | 移+8 运+18
      | 8010721E 0A14
      | 限+20 甲+100
      | 8010729C 01F4
      | HP +500 
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

开启这部分作弊码时注意，部署、敌我增援和过关之前先存盘，以避免游戏挂起。有些挂起是临时的，可以在读盘之后继续游戏。有些必须在禁用对应作弊码之后才能读盘跳过。

"""""""""""""""""""""""""""""
機動戦士变形
"""""""""""""""""""""""""""""
在有涉及机体增援时可能在当场或者过关时造成游戏挂起。挂起时禁用。这包括：

* :ref:`第三十六话 栄光の落日 <srw4_walkthrough_36_glorious_sunset>`
* :ref:`第三十八话 ポセイダルの野心 <srw4_walkthrough_38_poseidal_s_ambition>`
* :ref:`第四十二话Ａ オルドナ＝ポセイダル (易) <srw4_walkthrough_42a_oldna_poseidal_easy>`


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

    .. grid-item-card:: キュベレイmkII变形  
      :columns: auto

      | 3004779F 0018
      | ノイエ・ジール
      | →キュベレイ
      | 300477D3 0019
      | キュベレイ
      | →キュベレイmkII
      | 300477FE 001A
      | キュベレイmkII
      | →ノイエ・ジール
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


    .. grid-item-card:: ヤクト・ドーガ变形  
      :columns: auto

      | 30047A88 0018
      | ヤクト・ドーガ（赤）
      | →サザビー
      | 30047AB9 0019
      | サザビー→
      | α・アジール
      | 30047AEA 001A
      | α・アジール→
      | ヤクト・ドーガ（赤）
      | 80047A9F 0406
      | 80047AD0 0406
      | 80047B01 0406
      | 武器/残弹槽数量     
      | 30047ADA 0003
      | 30047ADD 0002      
      | サザビー
      | 武器再编号	
      | 30047B05 0005   
      | 30047B08 0002      
      | 30047B0B 0003    
      | 30047B0E 0004      
      | α・アジール      
      | 武器再编号
      | 30047B04 0010
      | 30047B07 0001
      | 30047B0A 0009
      | 30047B0D 000E
      | α・アジール
      | 弾药槽再编号  

    .. grid-item-card:: ビギナ・ギナ变形  
      :columns: auto

      | 30047B18 0018
      | ビギナ・ギナ→
      | ベルガ・ギロス
      | 30047B43 0019
      | ベルガ・ギロス
      | →ラフレシア
      | 30047B6E 001A
      | ラフレシア→
      | ビギナ・ギナ
      | 80047B2F 070A
      | 80047B5A 070A
      | 80047B85 070A
      | 武器/残弹槽数量
      | 30047B64 0003
      | ベルガ・ギロス
      | 武器再编号
      | 30047B8C 0003
      | 30047B8F 0001
      | 30047B92 0004
      | 30047B95 0002
      | ラフレシア
      | 武器再编号
      | 30047B8B 0009
      | 30047B8E 0005
      | 30047B91 000D
      | 30047B94 0001
      | ラフレシア
      | 弾药槽再编号

    .. grid-item-card:: コロンブス变形 
      :columns: auto

      | 3004864B 0018
      | コロンブス
      | →パゾグ
      | 30048673 0019
      | パゾグ→
      | ガウ
      | 30048698 001A
      | ガウ→
      | コロンブス
      | 80048662 0505
      | 8004868A 0505
      | 800486AF 0505
      | 武器/残弹槽数量



    .. grid-item-card:: トロイホース变形 
      :columns: auto

      | 300486FA 0008
      | トロイホース →
      | グラーフ・
      | ツェッペリン
      | 30048728 0009
      | グラーフ・
      | ツェッペリン
      | →トロイホース
      | 80048711 0405
      | 8004873F 0405
      | 武器数量
      
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

    .. grid-item-card:: アーガマ变形  
      :columns: auto

      | 3004880B 0008
      | アーガマ→
      | アイリッシュ
      | 3004883C 0009
      | アイリッシュ
      | →アーガマ
      | 80048822 0405
      | 80048853 0405
      | 武器数量
      | 30048857 0002
      | 3004885A 0003      
      | 3004885D 0000
      | 30048860 0001
      | アイリッシュ
      | 武器再编号
      | 30048856 000E
      | 30048859 0012
      | 3004885C 0006
      | 3004885F 000A
      | アイリッシュ
      | 弾药槽再编号

    .. grid-item-card:: ネェル・アーガマ变形  
      :columns: auto


      | 在如下关卡中禁用
      | :ref:`第二十七话 グランゾンの謎 <srw4_walkthrough_27_granzon_s_enigma>`\ 
      | 300488CC 0018
      | ネェル・アーガマ
      | →エンドラ
      | 300488FD 0019
      | エンドラ→
      | サダラーン
      | 3004892B 001A
      | サダラーン→
      | ネェル・アーガマ
      | 800488E3 0405
      | 80048914 0405
      | 80048942 0405
      | 武器数量
      | 300488E7 0002
      | 300488EA 0003
      | 300488ED 0000
      | 300488F0 0001
      | ネェル・アーガマ
      | 武器再编号
      | 300488E6 000E
      | 300488E9 0012
      | 300488EC 0006
      | 300488EF 000A
      | ネェル・アーガマ
      | 弾药槽再编号


    .. grid-item-card:: ラー・カイラム变形  
      :columns: auto

      | 3004898D 0008
      | ラー・カイラム
      | →ザムス・ガル
      | 300489BE 0009
      | ザムス・ガル→
      | ラー・カイラム
      | 300489D9 0002
      | 300489DC 0003
      | 300489DF 0000
      | 300489E2 0001
      | ザムス・ガル
      | 武器再编号 
      | 800489D8 000E
      | 800489DB 0012
      | 800489DE 0006   
      | 800489E1 000A
      | ザムス・ガル  
      | 弾药槽再编号

"""""""""""""""""""""""""""""
聖戦士ダンバイン变形
"""""""""""""""""""""""""""""
在如下关卡中禁用：

* :ref:`第二十八话 ノイエＤＣ <srw4_walkthrough_28_new_dc>`\    
* :ref:`第三十二话 ダカールの日 <srw4_walkthrough_32_the_day_of_dakar>`
* :ref:`第三十六话 栄光の落日 <srw4_walkthrough_36_glorious_sunset>`\ 

在有涉及机体增援时可能在当场或者过关时造成游戏挂起。挂起时禁用。

.. grid::

    .. grid-item-card:: ボチューン变形   
      :columns: auto

      | 300493FD 0018
      | ボチューン→
      | ドゴス・ギア
      | 3004942B 0019
      | ドゴス・ギア→
      | →アウドムラ
      | 3004945C 001A
      | アウドムラ→
      | ボチューン     
      | 80049414 0507
      | 80049442 0507
      | 80049473 0507
      | 武器/残弹槽数量      
      | 30049446 0001
      | 30049449 0004
      | 3004944C 0003      
      | 3004944F 0006
      | 30049452 0005
      | ドゴス・ギア
      | 武器再编号
      | 30049477 0003      
      | 3004947A 0001
      | 3004947d 0005     
      | 30049480 0004
      | アウドムラ
      | 武器再编号
      | 30049448 000E
      | 3004944B 000A
      | 3004944E 0016
      | 30049451 0011
      | ドゴス・ギア      
      | 弾药槽再编号      
      | 30049476 000A
      | 30049479 0006
      | 3004947C 0011
      | 3004947F 000E
      | アウドムラ
      | 弾药槽再编号



"""""""""""""""""""""""""""""
重戦机エルガイム变形
"""""""""""""""""""""""""""""
在有涉及机体增援时可能在当场或者过关时造成游戏挂起。挂起时禁用。

在如下关卡中禁用：
* :ref:`第二十八话 ノイエＤＣ <srw4_walkthrough_28_new_dc>`\    
* :ref:`第三十六话 栄光の落日 <srw4_walkthrough_36_glorious_sunset>`\ 

.. grid::

    .. grid-item-card:: アシュラテンプル变形  
      :columns: auto

      | 30048C7C 0018
      | オージェ
      | →オージ
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

"""""""""""""""""""""""""""""
オリジナル变形
"""""""""""""""""""""""""""""
在有涉及机体增援时可能在当场或者过关时造成游戏挂起。挂起时禁用。

在如下关卡中禁用：

* :ref:`第二十八话 ノイエＤＣ <srw4_walkthrough_28_new_dc>`\    
* :ref:`第三十六话 栄光の落日 <srw4_walkthrough_36_glorious_sunset>`\ 

.. grid::

    .. grid-item-card:: ヒュッケバイン变形      
      :columns: auto

      | 30046267 0018
      | ヒュッケバイン→
      | グルンガスト
      | 3004629F 0019
      | グルンガスト→
      | ウイングガスト
      | 300462D4 001A
      | ウイングガスト→
      | ヒュッケバイン
      | 300462FF 0000
      | ガストランダー
      | →🚫
      | 8004627E 0408
      | 800462B6 0408
      | 800462EB 0408
      | 武器/残弹槽数量
      | 300462BD 0002
      | 300462C0 0004
      | 300462C3 0007
      | 300462C6 0001
      | 300462C9 0005
      | グルンガスト
      | 武器再编号
      | 300462EF 0000
      | 300462F2 0002
      | 300462F5 0007
      | ウイングガスト
      | 武器再编号
      | 300462BC 000A
      | グルンガスト
      | 弹药槽再编号
      | 300462EE 0006
      | 300462F1 000A
      | ウイングガスト
      | 弹药槽再编号

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
      | 800471AE 0608
      | 800471DF 0608
      | 80047210 0608
      | 武器/残弹槽数量
      | 300471E6 0005
      | 300471E9 0007
      | 300471Ec 0002
      | 300471EF 0006
      | ヴァルシオーネR
      | 武器再编号
      | 30047217 0006
      | 3004721A 0003
      | 3004721D 0007
      | 30047220 0002
      | ザムジード
      | 武器再编号
      | 300471E5 0009
      | 300471E8 0019
      | 300471EE 0015
      | ヴァルシオーネR
      | 弹药槽再编号
      | 30047216 0015
      | 30047219 000D
      | 3004721C 0019
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
      | 80047241 0609
      | 80047275 0609
      | 800472A3 0609
      | 武器/残弹槽数量
      | 3004727C 0004
      | 3004727f 0006
      | 30047282 0005
      | ガッデス
      | 武器再编号
      | 300472AA 0007
      | 300472AD 0008
      | ウィーゾル改
      | 武器再编号 
      | 3004727B 000D
      | 3004727E 0011
      | ガッデス      
      | 弹药槽再编号
      | 300472A9 0014
      | 300472AC 0018
      | ウィーゾル改
      | 弹药槽再编号

    .. grid-item-card:: ゲシュペンスト变形  
      :columns: auto

      | 300472B7 0018
      | ノルス・レイ→
      | ガディフォール
      | 300472E2 0019
      | ガディフォール→
      | ゲシュペンスト（R）
      | 30047313 001A
      | ゲシュペンスト（R）
      | →ノルス・レイ
      | 800472CE 0507
      | 800472F9 0507
      | 8004732A 0507
      | 武器/残弹槽数量
      | 300472FD 0003
      | 30047300 0004
      | 30047303 0002
      | 30047306 0005
      | 30047309 0006
      | ガディフォール
      | 武器再编号
      | 3004732E 0003
      | 30047331 0004
      | 30047334 0005
      | ゲシュペンスト
      | 武器再编号
      | 300472FF 000D
      | 30047302 0008
      | 30047305 0011
      | 30047308 0015
      | ガディフォール
      | 弹药槽再编号
      | 30047330 000D
      | 30047333 0011 
      | ゲシュペンスト
      | 弹药槽再编号


    .. grid-item-card:: ニセサイバスター变形  
      :columns: auto

      | 300490C3 0008
      | ニセサイバスター
      | →ナイチンゲール
      | 300490F1 0009
      | ナイチンゲール→
      | ニセサイバスター
      | 800490DA 0405
      | 80049108 0405
      | 武器/残弹槽数量
      | 3004910c 0004
      | ナイチンゲール
      | 武器再编号
      | 3004910B 0011
      | ナイチンゲール
      | 弾药槽再编号

"""""""""""""""""""""""""""""
合体可
"""""""""""""""""""""""""""""
在有涉及机体增援时可能在当场或者过关时造成游戏挂起。挂起时禁用对应系的修改。

.. grid::

    .. grid-item-card:: ガンダム Mk-II
      :columns: auto

      | 300463C0 00D9
      | GP-01Fb
      | 3004647F 00D9
      | ガンキャノン
      | 300464AA 00D9
      | ガンタンク
      | 300464D2 00D9
      | ボール
      | 300464F7 00D9
      | ネモ
      | 30046522 00D9
      | GM III      
      | 30046553 00D9
      | ジェガン  
      | 3004733E 00D9
      | ザク改
      | 3004739D 00D9
      | エルメス
      | 30047A57 00D9
      | ヤクト・ドーガ（青）
      | 30048B93 00D9
      | ゲシュペンスト Mk-II      
      | 30048BC1 00D9
      | エルガイム 
      | 30048C4E 00D9  
      | ディザード
      | 30048D12 00D9
      | カルバリーテンプル
      | 30048DD0 00D9
      | サロンズ      
      | 30048EDE 00D9
      | ガイラム
      | 30048F06 00D9
      | ガンダム      
      | 30048FC7 00D9
      | Ξガンダム
      | 30049116 00D9
      | ヌーベルディザード      
      | 300494B8 00D9
      | GP-03ステイメン 

    .. grid-item-card:: グレンダイザー
      :columns: auto

      | 在如下关卡中禁用
      | :ref:`第二十话Ｂ 勇者ライディーン <srw4_walkthrough_20b_raideen_the_brave>`
      | :ref:`第二十八话 ノイエＤＣ <srw4_walkthrough_28_new_dc>`\
      | :ref:`第二十九话Ｂ(下) リヒテルとアイザム <srw4_walkthrough_29b2_richter_and_aizam>`\      
      | :ref:`第三十二话 ダカールの日 <srw4_walkthrough_32_the_day_of_dakar>`
      | :ref:`第三十三话Ｂ ビヨン・ザ・トッド <srw4_walkthrough_33b_beyond_the_todd>`
      | :ref:`第三十六话 栄光の落日 <srw4_walkthrough_36_glorious_sunset>`      
      | 300466F2 00AA
      | マジンガーZ
      | 30046726 00A8
      | マジンガーZ（JS）
      | 30046766 00A8
      | グレートマジンガー
      | 30046952 00AC
      | アフロダイA
      | 3004697D 00AC
      | ダイアナンA
      | 300469AB 00AB
      | ボスボロット
      | 300469D9 00AA
      | ビューナスＡ
      | 30046B7B 00AA
      | ブルーガー
      | 30046BF5 00AA
      | ガルバーFXⅡ         
      | 30046DA0 00AA
      | ダンバイン

    .. grid-item-card:: 可分离
      :columns: auto


      | 3004632A 00C0
      | νガンダム 
      | 30046361 00C0
      | F-91
      | 30046392 00C0
      | NT-1アレックス
      | 30046BA9 00C0
      | ダイモス
      | 30046B32 00D0
      | ライディーン
      | 30046C20 00D0
      | ダイターン3
      | 300470DF 00C0
      | アトールV
      | 3004710A 00D0
      | サイバスター
      | 30047984 00C0
      | ドーベンウルフ
      | 3004818C 00C0 
      | ゲシュペンスト（S）


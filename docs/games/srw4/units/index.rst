.. meta::
   :description: 强化芯片 当前机体装备的强化芯片，可以增强机体性能，上限2个。装备某些芯片可能会影响一项或者多项机体数据，参见芯片。 移动类型 机体的允许移动类型。参见地形。 移动力 你的机体每次行动在理想地形上可以移动的方格数。参见地形。有些时候，按照剧情，机体不能移动。 运动性 增加机师的命中和回避能力，影响命中和回避的效果。 装

.. _srw4_units:

机体 (第四次超级机器人大战)
===============================

.. toctree::
   :maxdepth: 1
   :caption: 内容:
   
   
   unit_data_snes
   unit_data_ps
   mobile_suit_gundam
   mobile_suit_z_gundam
   mobile_suit_gundam_zz
   mobile_suit_gundam_0080
   mobile_suit_gundam_0083   
   mobile_suit_gundam_char_s_counterattack
   mobile_suit_gundam_f91
   mobile_suit_gundam_sentinel
   heavy_metal_l_gaim
   mazinger_z
   mazinger_z_the_movie
   great_mazinger
   grendizer
   getter_robo
   daimos
   zambot_3
   dancouga
   dunbine
   combattler_v
   daitarn_3
   reideen_the_brave
   goshogun
   banpresto_originals
   
--------------
属性 
--------------

* 强化芯片 当前机体装备的\ :ref:`强化芯片 <srw4_items>`\ ，可以增强机体性能，上限2个。装备某些芯片可能会影响一项或者多项机体数据。
* 移动类型 机体可以进入哪些\ :ref:`地形 <srw4_terrain>`\ 。
* 移动力 你的机体每次行动在最理想地形上可以移动的方格数。有些时候，按照剧情，机体不能移动。
* 运动性 增加\ :ref:`机师 <srw4_pilots>`\ 的命中和回避能力，影响命中和回避的效果。
* 装甲 你的机体的防御能力。这个值越高，你的机体每次攻击受到的伤害越少，但是伤害值的下限为10。
* 限界反应 机体的最大反应能力。如果机体的命中或者回避（驾驶员的命中或者回避加上运动性补正）超过了这个值，那么超过的部分无效。例如，如果某个机体的命中能力是200，而限界反应只有180，那么 ，不使用\ :ref:`精神 <srw4_mechanics_sprit_command>`\ 的话，实际上机体的命中能力的效果只有180。
* HP 你的机体的生命点数。这个值越高，你的机体被击落之前能够承受的伤害越大。第一个数字是当前值，第二个数字是上限。
* EN 你的机体的能量点数。在地图上移动、发动某些机体特殊技能和使用一些武器都需要消耗EN。每回合EN自动回复5点，搭载到主舰(代价是损失\ :ref:`气力 <srw4_willpower>`\ )或者在某些\ :ref:`地形 <srw4_terrain>`\ 上可以回复得更多；使用某些芯片或者精神也可以回复EN。第一个数字是当前值，第二个数字是上限。
* 特殊能力 机体的特殊能力，参见\ :ref:`机体特殊技能 <srw4_unit_specialty>`\ 。
* 盾 指明机体是否有盾。只有人形机器人有盾，战舰或者移动要塞没有。驾驶员必须具有盾防御能力来发动盾技能，发动之后受到的伤害减半。参见\ :ref:`机师特殊技能 <srw4_pilot_specialty>`\ 。
* 大小机体的大小，从S到LL。小的机体回避的概率比较高。
* 地形 相当于机体的地形适应，从A到D。-相当于E。如果机体是有人驾驶的，那么攻击和防御的地形适应补正是和机师的地形适应的平均值，向下取整。例如A+C=B，B+C=C，A+-=C等等。
* 修理费 战斗结束的时候，如果该机体在战斗中被击落，需要付出的修理费。对于敌方机体，则是击落之后可以获得的资金。

可以通过\ :ref:`改造 <srw4_remodeling>`\ 改善机体数据。

每个机体有一个或者多个武器。有的武器需要机师有特殊技能才能发动。


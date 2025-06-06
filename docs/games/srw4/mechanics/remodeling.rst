.. meta::
   :description: 过关之后在整备界面可以改造下一关可以使用的机体及其武器。改造费用如下： 等级 HP EN 装甲 運動性 限界 一般武器 巴尔干炮 奥拉斩 线性电磁加速炮 1 3000 1000 3000 5000 1000 5000 2000 10000 3000 2 5000 1500 5000 8000 1500 8000 200
       
.. _srw4_remodeling:

------
改造
------
过关之后在整备界面可以改造下一关可以使用的机体及其武器。改造费用如下：

.. csv-table:: 改造费用
   :file: remodelling.csv
   :header-rows: 1

游戏中一些机体在更换时继承改造

* トロイホース→ アーガマ → ネェルアーガマ → ラーカイラム
* ゲッター → ゲッターＧ → 真ゲッター (例外是ゲッター1的ゲッターレザー，ゲッタードラゴン的スピンカッター和ゲッターポセイドン的ゲッターサイクロン这三个武器)
* Ｓガンダム → ＥＸＳガンダム
* マジンガーＺ → マジンガーＺ（JS）
* アフロダイＡ → ダイアナンＡ

某些特殊武器不能改造，例如修理装置和补给装置。

历史学家：据说在某些作品中，改造完机体的所有能力或者武器的时候会有奖励，可惜这是后来的事情……

游戏中的改造数据的存储方式是武器数量和改造段数起始位置。由于设计时把一些机体的武器数量设错了的原因，一些机体的武器改造和其他机体的武器共享改造等级。但是这也意味着在特定加入/废弃顺序下，一些武器无法改造。

* 孔巴特拉V 5号机 雪霸/翼霸
* 阿布罗狄A

武器改造段数游戏里最高为7，可以\ :ref:`修改 <srw4_cheat>`\ 到15.

第四次的ROM中，每段改造增加的值存储为连续7个双字节。
* 运动性（00009A39 ~00009A46 ）
* 装甲（00009A49 ~00009A56）
* 限界（00009A59 ~00009A66）。
* EN（00009A69 ~00009A76 ）
* HP（00009A79 ~00009A86 ）

武器每段的上升量
* 0002D81F 
* 0002D820 

机体改造费用为连续7个双字节（000DF566~000DF567）。




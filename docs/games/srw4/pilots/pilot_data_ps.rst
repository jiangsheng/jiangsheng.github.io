:html_theme.sidebar_primary.remove: true
:html_theme.sidebar_secondary.remove: true


机师数据 （第四次超级机器人大战S）
================================================

点击列头排序，Shift+点击列头添加排序条件。

标题打型号的列为99级数据，不打的为0级。

.. container::
   :name: display_options
   
   .. raw:: html
      
       <a class="toggle-vis" data-column="1">显示0级能力</a>
       <a class="toggle-vis" data-column="2">显示99级能力</a>
       <a class="toggle-vis" data-column="3">显示精神和技能</a>
       <a class="toggle-vis" data-column="0">恢复默认</a>


.. flat-table:: 机师数据 （第四次超级机器人大战）
   :class: text-center, align-items-center, compact, display,dataTables_no_scroll_x
   :name: srw4_pilots_ps_table
   :header-rows: 1
   :fill-cells:

   * - 编码
     - 名字
     - 作品
     - 性格
     - 近攻击
     - 远攻击
     - 回避
     - 命中
     - 直感
     - 技量
     - 近攻击
     - 远攻击
     - 回避
     - 命中
     - 直感
     - 技量
     - SP
     - 空
     - 陆
     - 海
     - 宇
     - 精1
     - 精2
     - 精3
     - 精4
     - 精5
     - 精6
     - 技能





.. raw:: html

    <script>
      pilots_datatable_init('srw4-pilots-ps-table');
    </script>
       
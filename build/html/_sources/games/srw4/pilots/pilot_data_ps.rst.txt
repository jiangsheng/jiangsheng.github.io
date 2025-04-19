:html_theme.sidebar_secondary.remove: true

机师数据 （第四次超级机器人大战S）
================================================

点击列头排序，Shift+点击列头添加排序条件。

标题打型号的列为99级数据，不打的为1级。

.. container::
   :name: display_options
   
   .. raw:: html
      
       <a class="toggle-vis" data-column="1">显示1级能力</a>
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
        DataTable.ext.type.order['terrain-grade-pre'] = function (d) {
            switch (d) {
                case '<p>🚫</p>':
                    return 1;
                case '<p>D</p>':
                    return 2;
                case '<p>C</p>':
                    return 3;
                case '<p>B</p>':
                    return 4;
                case '<p>A</p>':
                    return 5;
                case '<p>S</p>':
                    return 6;
            }
            return 0;
        };
        DataTable.ext.type.order['hex-pre'] = function (d) {
            return parseInt("0x"+d);
        };
        var oTable = new DataTable('#srw-pilots-snes-table',{paging: false,searching: true, info: false,fixedHeader: true, scrollX: false, columnDefs: [
                {
                     type: 'hex',
                     targets:  0
               },
               {
               
                     type: 'terrain-grade',
                     targets:  [17,18,19,20]
               },
               {
                    target: [4,5,6,7,8,9,10,11,12,13,14,15],
                    visible: false,
               },
               {
                    targets: [3,21,22,23,24,25,26,27],
                    orderable: false
               }
            ]});
        $(document).ready(function(){
            document.querySelectorAll('a.toggle-vis').forEach((el) => {
                    el.addEventListener('click', function (e) {
                        e.preventDefault();
                
                        let columnMode = e.target.getAttribute('data-column');
                        var visibleColumnIndexArray;
                        var hiddenColumnIndexArray;
                        switch(columnMode)
                        {
                            case "1":
                                visibleColumnIndexArray=[4,5,6,7,8,9,17,18,19,20];
                                hiddenColumnIndexArray=[10,11,12,13,14,15,16,21,22,23,24,25,26,27];
                                break;
                            case "2":
                                visibleColumnIndexArray=[10,11,12,13,14,15,17,18,19,20];
                                hiddenColumnIndexArray=[4,5,6,7,8,9,16,21,22,23,24,25,26,27];
                                break;
                            case "3":
                                visibleColumnIndexArray=[16,21,22,23,24,25,26,27];
                                hiddenColumnIndexArray=[4,5,6,7,8,9,10,11,12,13,14,15,17,18,19,20];
                                break;
                            default:
                                visibleColumnIndexArray=[16,17,18,19,20,21,22,23,24,25,26,27];
                                hiddenColumnIndexArray=[4,5,6,7,8,9,10,11,12,13,14,15];
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
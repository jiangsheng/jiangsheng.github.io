function pilots_datatable_init(dataTableName)
{
    console.log("creating data table "+dataTableName);
    var oTable = new DataTable
    (
        '#'+dataTableName,
        {
            paging: false,searching: true, info: false,fixedHeader: true, scrollX: false, 
            columnDefs:
            [
                {type: 'hex',targets:0},
                {type: 'integer',targets:[7,8,9,10,11,12,13,14,15,16,17,18,19]},
                {type: 'rating-grade',targets:[20,21,22,23]},
                //{visible: true,target: [7,8,9,10,11,12,13,14,15,16,17,18]},
                {orderable: false,targets: [2,6,24,25,26,27,28,29,30]}
            ]
        }
    );

    $(document).ready(function()
    {
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
                seriesNameMatch= seriesName.includes("ガンダム")||seriesName.includes("逆襲のシャア")||seriesName.includes("閃光のハサウェイ");break;
                case "3":
                seriesNameMatch= (seriesName.includes("マジンガー") ||seriesName.includes("グレンダイザー"));break;
                case "4":
                seriesNameMatch= seriesName.includes("エルガイム");break;
                case "5":
                seriesNameMatch= seriesName.includes("ダンバイン");break;
                default:
                console.log("unexpected selectedSeries="+selectedSeries);break;
            }
            return affiliationMatch && seriesNameMatch;
        });

        document.querySelectorAll('a.toggle-vis').forEach((el) => 
        {
            el.addEventListener('click', function (e) 
            {
                e.preventDefault();    
                let columnMode = e.target.getAttribute('data-column');
                var visibleColumnIndexArray;
                var hiddenColumnIndexArray;
                switch(columnMode)
                {
                    case "1":
                        visibleColumnIndexArray=[7,8,9,10,11,12,20,20,21,22,23];
                        hiddenColumnIndexArray=[13,14,15,16,17,18,19,24,25,26,27,28,29,30];
                        break;
                    case "2":
                        visibleColumnIndexArray=[13,14,15,16,17,19,20,21,22,23];
                        hiddenColumnIndexArray=[7,8,9,10,11,12,19,24,25,26,27,28,29,30];
                        break;
                    case "3":
                        visibleColumnIndexArray=[19,24,25,26,27,28,29,30];
                        hiddenColumnIndexArray=[7,8,9,10,11,12,13,14,15,16,17,19,20,21,22,23];
                        break;
                    default:
                        visibleColumnIndexArray=[7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
                        hiddenColumnIndexArray=[];
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
}
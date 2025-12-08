function units_datatable_init(dataTableName)
{
    console.log("creating data table "+dataTableName);
    var oTable = new DataTable
    (
        '#'+dataTableName,
        {
            orderCellsTop: true,
            paging: false,
            searching: true,
            info: false,
            fixedHeader: true,
            autoWidth: false,
            columnDefs: 
            [
                {type: 'hex',targets:  0},
                {type: 'terrain-movement-type',targets:  15},
                {type: 'rating-grade',targets:  [16,17,18,19]},
                {targets: 1,orderable: false}
            ]
        }
    );
    $(document).ready(function()
    {
        $("#checkboxPlayerOnly").on( "click", function() 
        {
            oTable.draw();
        });
        $("#comboboxSeries").change(function() 
        {
            var selectedSeries=$('#comboboxSeries').val();
            oTable.draw();
        });
        oTable.search.fixed('affiliationSearch', function (row, data, index) 
        { 
            let affiliation = data[1] || ""; 
            let seriesName = data[5] || ""; 
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
            case "6":
                seriesNameMatch= seriesName.includes("オリジナル");break;
            case "7":
                seriesNameMatch= seriesName.includes("ゲッター");break;
            case "8":
                seriesNameMatch= seriesName.includes("ダンクーガ");break;
            case "9":
                seriesNameMatch= seriesName.includes("コンバトラーV");break;
            case "10":
                seriesNameMatch= seriesName.includes("ダイモス");break;
            case "11":
                seriesNameMatch= seriesName.includes("ザンボット3");break;
            case "12":
                seriesNameMatch= seriesName.includes("ゴーショーグン");break;
            case "13":
                seriesNameMatch= seriesName.includes("ダイターン3");break;
            case "14":
                seriesNameMatch= seriesName.includes("ライディーン");break;
               
            default:
                console.log("unexpected selectedSeries="+selectedSeries);break;
            }
            return affiliationMatch && seriesNameMatch;
        });
    });    
}
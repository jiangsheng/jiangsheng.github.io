function units_datatable_init(dataTableName)
{
    console.log("creating data table "+dataTableName);
    var oTable = new DataTable
    (
        '#'+dataTableName,
        {
            orderCellsTop: true,
            scrollX: false,
            paging: false,
            searching: true,
            info: false,
            fixedHeader: true,
            columnDefs: 
            [
                {type: 'hex',targets:  0},
                {type: 'terrain-movement-type',targets:  14},
                {type: 'rating-grade',targets:  [15,16,17,18]},
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
                seriesNameMatch= (seriesName.includes("魔神") && !seriesName.includes("战国")) ||seriesName.includes("古连泰沙");break;
            case "4":
                seriesNameMatch= seriesName.includes("重战机");break;
            case "5":
                seriesNameMatch= seriesName.includes("丹拜因");break;
            default:
                console.log("unexpected selectedSeries="+selectedSeries);break;
            }
            return affiliationMatch && seriesNameMatch;
        });
    });    
}
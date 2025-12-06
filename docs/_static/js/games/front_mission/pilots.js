function front_mission_pilot_table_init(dataTableName)
{
    $(document).ready( function () {    
        new DataTable('#'+dataTableName,
        {
        paging: false,
        searching: false, 
        info: false, 
        scrollX: false,
        fixedHeader: true,
        columnDefs: [
            {
                    type: 'rating-grade',
                    targets:  [1,2,3,4]
            }
        ],
        order: []
        });
    });
}
 
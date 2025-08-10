function weapons_datatable_init(dataTableName)
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
            ]
        }
    ); 
}
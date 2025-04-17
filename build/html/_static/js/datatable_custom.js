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
 
/*
 function table_createFooterFromHeader (tableName,divName) {
    console.log("table_createFooterFromHeader");

    let oTable=$(tableName);
    if ($('tfoot',oTable).length === 0) {
        var tFoot=oTable.append($('<tfoot/>'));
    }
    $("thead tr", oTable).clone().appendTo($('tfoot',oTable));
 }

 function datatable_initComplete (oDataTable) {
    oDataTable.api().columns().every
    (
        function () {
            let column = this;
            let title = column.footer().textContent; 
            // Create input element
            let input = document.createElement('input');
            input.placeholder = title;
            column.footer().replaceChildren(input); 
            // Event listener for user input
            input.addEventListener('keyup', () => {
                if (column.search() !== this.value) {
                    column.search(input.value).draw();
                }
            });
        }
    );
}*/
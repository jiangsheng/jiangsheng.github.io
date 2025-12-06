DataTable.ext.type.order['rating-grade-pre'] = function (d) {
    switch (d) {
      case '<p>S+</p>':return 1;
      case '<p>S</p>':return 2;
      case '<p>A+</p>':return 3;
      case '<p>A</p>':return 4;
      case '<p>B+</p>':return 5;
      case '<p>B</p>':return 6;      
      case '<p>C+</p>':return 7;
      case '<p>C</p>':return 8;
      case '<p>D+</p>':return 9;
      case '<p>D</p>':return 10;
      case '<p>E+</p>':return 11;
      case '<p>E</p>':return 12;
      case '<p>F</p>':return 11;
      case '<p>🚫</p>':return 100;
    }
    return 0;
 };

 DataTable.ext.type.order['terrain-movement-type-pre'] = function (d) {
    switch (d) {
        case '<p>水陸空</p>':
            return 1;
        case '<p>海陸空</p>':
            return 1;
        case '<p>海陆空</p>':
            return 1;
        case '<p>陆空地</p>':
            return 2;
        case '<p>陸空地中</p>':
            return 2;
        case '<p>空陆</p>':
            return 3;
        case '<p>空陸</p>':
            return 3;
        case '<p>空地中</p>':
            return 4;
        case '<p>空海</p>':
            return 5;    
        case '<p>空</p>':
            return 6;
        case '<p>空（陆可）</p>':
            return 7;
        case '<p>水陸</p>':
            return 8;
        case '<p>海陆</p>':            
            return 8;
        case '<p>海陸</p>':
            return 8;
        case '<p>陆地中</p>':
            return 9;
        case '<p>陸地中</p>':
            return 9;
        case '<p>陆宇</p>':
            return 10;
        case '<p>陸宇</p>':
            return 10;
        case '<p>陆</p>':
            return 11;
        case '<p>陸</p>':
            return 11;
        case '<p>宇宙</p>':
            return 12;
        case '<p>水</p>':
             return 13;            
        case '<p>海</p>':
             return 13; 
        case '<p>🚫</p>':
            return 14;
    }
    return 100;
 };

 DataTable.ext.type.order['hex-pre'] = function (d) {
    return parseInt("0x"+d);
 };

 DataTable.ext.type.order['integer-pre'] = function (d) {
    return parseInt(d.replace(/\D/g,''));
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
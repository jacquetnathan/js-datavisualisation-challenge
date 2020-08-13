function tableToJson(table, label, index) {
    var data = [];
    var headers = [];
    //
    // first row needs to be headers
    headers.push(label);
    for (var i=1; i<table.rows[index].cells.length-index; i++) {
        headers[i] = table.rows[index].cells[i+index].innerHTML.toLowerCase().replace(/ /gi,'');
    }

    // go through cells
    for (var i=1+index; i<table.rows.length; i++) {
        var tableRow = table.rows[i];
        var rowData = {};
        for (var j=index; j<tableRow.cells.length; j++) {
            rowData[ headers[j-index] ] = tableRow.cells[j].innerHTML;
        }
        data.push(rowData);
    }       

    return data;
}

myTable1 = tableToJson(table1, "Country" ,1);
myTable2 = tableToJson(table2, "country", 0);
//console.log(myTable1)
//console.log(myTable2)
console.log(myTable2)
for (let el in myTable2) {
    console.log(myTable1[el]["Country"])
    console.log(myTable1[el])
}
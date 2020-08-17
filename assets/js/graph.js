function tableToJson(table, label, index) {
    let data = [];
    let headers = [];
    //
    // first row needs to be headers
    headers.push(label);
    for (let i=1; i<table.rows[index].cells.length-index; i++) {
        headers[i] = table.rows[index].cells[i+index].innerHTML.toLowerCase().replace(/ /gi,'');
    }

    // go through cells
    for (let i=1+index; i<table.rows.length; i++) {
        let tableRow = table.rows[i];
        let rowData = {};
        for (let j=index; j<tableRow.cells.length; j++) {
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
// console.log(myTable2)
/* 
for (let el in myTable2) {
    console.log(myTable1[el]["Country"])
    console.log(myTable1[el])
}
*/

let allCountry = [];

 myTable2.forEach( country =>  { allCountry.push(country.country) });

console.log(allCountry);

// create canva
const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');

    const title = document.getElementById("table2");
    title.before(canvas);


let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: allCountry,
        datasets: [{
            label: '2007–09',
            data: [50, 100, 150, 200, 250, 300, 350],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
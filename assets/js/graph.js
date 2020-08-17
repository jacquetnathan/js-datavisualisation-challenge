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

// generation de couleur random
function getRandomColor() {
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    let color = '#'+ randomColor;
    return color;
}

// console.log(myTable2);

// Début de la partie du code de Nathan !


// recuperation des pays dans un array
    let allCountry = [];
    let colorRand = [];
    myTable2.forEach( country =>  { 
        colorRand.push(getRandomColor());
        allCountry.push(country.country) 
    });
    console.log(myTable2);
    console.log(colorRand);

// recupération données de 2009
    let data2009 = [];
    myTable2.forEach( country =>  { data2009.push(country['2007–09']) });
    //console.log(data2009);


// recupération des données de 2010
    let data2010 = [];
    myTable2.forEach( country =>  { data2010.push(country['2010–12']) });
    console.log(data2010);

// creation canvas pour le graph2
const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');

    const title = document.getElementById("table2");
    title.before(canvas);

// graph 2
let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: allCountry,
        datasets: [{
            label: '2007–09',
            data: data2009,
            backgroundColor:
                colorRand,
            borderColor: 
            colorRand,
            borderWidth: 1
        },{
            label: '2010–12',
            data: data2010,
            backgroundColor: 
                colorRand,
            borderColor: 
            colorRand,
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

// Fin de la partie du code de Nathan !
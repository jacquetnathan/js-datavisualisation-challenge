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
// extract year
let tempYear = ["2002", "2003","2004","2005","2006", "2007", "2008", "2009", "2010", "2011","2012"];
/* let colorRand = [];
for (let i = 0; i < myTable1.length; i++) {
    console.log(myTable1[0])
} */

function generateData(){
    let dataGenerated = []
    for (const [key, value] of Object.entries(myTable1)) {
        let tempValue = []
        let myCountry
        for (const [key2, value2] of Object.entries(value)) {
            if (key2 == "Country"){
                myCountry = value2
            }else {
                tempValue.push(parseFloat(value2.replace(",",".")))
            }
        }

        let dataToGenerate = { label: myCountry, borderColor: getRandomColor(), backgroundColor: getRandomColor(), data: tempValue };
        dataGenerated.push(dataToGenerate);
    }
    return dataGenerated
}

// creation canvas pour le graph2
const canvas2 = document.createElement("canvas");
    canvas2.width = 800;
    canvas2.height = 600;
    const ctx2 = canvas2.getContext('2d');

    const title2 = document.getElementById("table1");
    title2.before(canvas2);

// graph 2
let myChart2 = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: tempYear,
        datasets: generateData()
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

// Début de la partie du code de Nathan !


// recuperation des pays dans un array
let allCountry = [];
let colorRand = [];
myTable2.forEach( country =>  { 
    colorRand.push(getRandomColor());
    allCountry.push(country.country) 
});

// recupération données de 2009
let data2009 = [];
myTable2.forEach( country =>  { data2009.push(country['2007–09']) });
//console.log(data2009);


// recupération des données de 2010
let data2010 = [];
myTable2.forEach( country =>  { data2010.push(country['2010–12']) });
console.log(data2010);

// creation canvas pour le graph2
const canvas3 = document.createElement("canvas");
canvas3.width = 800;
canvas3.height = 600;
const ctx3 = canvas3.getContext('2d');

const title3 = document.getElementById("table2");
title3.before(canvas3);

// graph 2
let myChart3 = new Chart(ctx3, {
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

// canvas graph dynamique
const canvas1 = document.createElement("canvas");
canvas1.width = 800;
canvas1.height = 400;
const ctx1 = canvas1.getContext('2d');

const title1 = document.getElementById("firstHeading");
title1.after(canvas1);

// recup les données

    let dataPoints = [];
    let chart;
    let label = []; 
    let colorDynamic = [];
    $.getJSON("https://canvasjs.com/services/data/datapoints.php", function (data) {
        $.each(data, function (key, value) {
            dataPoints.push({ x: value[0], y: parseInt(value[1]) });
            label.push(value[0])
        });

// graph 1 dynamic
        chart = new Chart(ctx1, {
            type: 'line',
            data: {
                labels: label,
                datasets: [{
                    label: "Dynamic Chart by Nathan & Chris !",
                    backgroundColor:colorDynamic,
                    tension: 0,
                    fill: false,
                    data: dataPoints
                }]
            },

        });
        chart.update();
        updateChart();
    });

    // updade des données
    function updateChart() {
        $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=" + (dataPoints.length + 1) + "&ystart=" + (dataPoints[dataPoints.length - 1].y) + "&length=1&type=json", function (data) {
            $.each(data, function (key, value) {
                dataPoints.push({
                    x: parseInt(value[0]),
                    y: parseInt(value[1])
                });
                label.push(value[0]);
                colorDynamic.push(getRandomColor() )
            });
            chart.update();
            setTimeout(function () { updateChart() }, 1000);
        });
    }

// Fin de la partie du code de Nathan !
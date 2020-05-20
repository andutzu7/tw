var MONTHS = ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function generateBarMonthsLabels(monthsIndex) {
    let displayedLabel = [];
    for (let i = 0; i < monthsIndex.length; i++) {
        displayedLabel.push(MONTHS[monthsIndex[i] - 1]);
    }
    return displayedLabel;
}

function createBarChart(chartNameID, field_text, title_text, months, values ) {
    var ctx = document.getElementById(chartNameID);
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [{
                label: field_text,
                type: "line",
                borderColor: "#ae8ee2",
                data: values,
                fill: false
            }, {
                label: field_text,
                type: "bar",
                backgroundColor: "rgba(255, 0, 255 , 0.15)",
                data: values,
            }
            ]
        },
        options: {
            tooltips: {
                titleFontSize: 20,
                bodyFontSize: 20,
                titleFontFamily: "Comic Sans MS",
                bodyFontFamily:"Comic Sans MS",
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display:false
            },
            title: {
                display: true,
                text: title_text,
                fontFamily: "Comic Sans MS",
                fontSize:20

            }, scales: {
                xAxes: [{
                    ticks: {
                        callback: function (value, index, values) {
                            return value;
                        }
                    }, scaleLabel: {
                        fontFamily: "Comic Sans MS",
                        fontSize:20,
                        display: true,
                        labelString: 'Datele pentru August 2019 nu sunt disponibile pe site-ul guvernului.'
                    },
                    ticks: {
                        fontFamily: "Comic Sans MS",
                        fontSize:20
                    }
                }
                ],
                yAxes: [{
                    ticks: {
                        fontFamily: "Comic Sans MS",
                        fontSize:20
                    }
                }]
            }
        }
    });
}


function update_barchart(chart, values){
    for(let i=0; i < chart.data.datasets.length; i++){
        chart.data.datasets[i].data = values;
    }
    chart.update()
}


function init_barchart_total(table, field){
    values = []
    month_labels = []
    for (var year in table) {
        for(var month in table[year]){
            for(var row of table[year][month]){
                if (row['id_judet'] === 25 ) {  // TODO
                    values.push(row[field]);
                    month_labels.push(row['luna']);
                }
            }
        }
    }
    labels = generateBarMonthsLabels(month_labels);
    return createBarChart("barchart_total", 'total', 'titlu', labels, values);
}

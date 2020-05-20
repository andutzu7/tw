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
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display:false
            },
            title: {
                display: true,
                text: title_text
            }, scales: {
                xAxes: [{
                    ticks: {
                        callback: function (value, index, values) {
                            return value;
                        }
                    }, scaleLabel: {
                        display: true,
                        labelString: 'Datele pentru August 2019 nu sunt disponibile pe site-ul guvernului.'
                    }
                }
                ]
            }
        }
    });
}


function init_barchart(table, field){
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
     createBarChart("lineBarChart0", 'total', 'titlu', labels, values);
     createBarChart("lineBarChart1", 'total', 'titlu', labels, values);
    //return createBarChart("lineBarChart", 'total', 'titlu', labels, values);
}

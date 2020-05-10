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
    var myChart = new Chart(ctx, {
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


function init_barchart(rows, field){
    values = []
    month_labels = []
    for (let row of rows) {
        if (row['id_judet'] === 25 ) {  // TODO
            values.push(row[field]);  // TODO
            month_labels.push(row['luna']);
        }
    }
    labels = generateBarMonthsLabels(month_labels);
    createBarChart("lineBarChart", 'total', 'titlu', labels, values);
}

function createPieChart( elementID, labels, values, colors ) {
    var ctx2 = document.getElementById(elementID);
    return new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                backgroundColor: colors,
                data: values
            }]
        },
        options: {
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
                        return value + '%';
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    fontColor: "white",
                    boxWidth: 10
                }
            },
            title: {
                display: false,
                text: 'https://youtu.be/QaPrQa3oMy0'
            }
        }
    });
}

let api_url = 'https://arcane-sierra-19327.herokuapp.com'


function init_piechart(rows){
    colors = ["rgb(140,140,255)", "rgb(118,0,119)"]
    labels = ['indemnizati', 'neindemnizati']
    values = [0, 0]
    for (var row of rows) {
        values[0] += row.indemnizati
        values[1] += row.neindemnizati
    }
    sum = values[0] + values[1]
    values[0] = (values[0] / sum * 100).toFixed(1)
    values[1] = (values[1] / sum * 100).toFixed(1)
    createPieChart("piechart0", labels, values, colors)
    createPieChart("piechart1", labels, values, colors)
    createPieChart("piechart2", labels, values, colors)
    createPieChart("piechart3", labels, values, colors)
    // return createPieChart("pieChart", labels, values, colors)
}
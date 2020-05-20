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
                titleFontSize: 20,
                bodyFontSize: 20,
                titleFontFamily: "Comic Sans MS",
                bodyFontFamily:"Comic Sans MS",
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
                    fontFamily: "Comic Sans MS",
                    fontSize:20,
                    fontColor: "white",
                    boxWidth: 10
                }
            },
            title: {
                fontFamily: "Comic Sans MS",
                fontSize:20,
                display: false,
                text: 'https://youtu.be/QaPrQa3oMy0'
            }
        }
    });
}


function update_piechart(chart, values){
    chart.data.datasets[0].data = values;
    chart.update();
}


function init_piechart_indemnizatie(rows){
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
    return createPieChart("piechart_indemnizatie", labels, values, colors)
}
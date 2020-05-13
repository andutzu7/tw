function createPieChart( elementID, labels, values, colors ) {
    var ctx2 = document.getElementById(elementID);
    var pieChart = new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                backgroundColor: colors,
                data: values
            }]
        },
        options: { 
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: true,
                position: "bottom",
                fullWidth: true,
                labels: {
                    fontColor: "white"
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
        values[0] += row.insdemnizati
        values[1] += row.neindemnizati
    }
    sum = values[0] + values[1]
    values[0] = (values[0] / sum * 100).toFixed(1)
    values[1] = (values[1] / sum * 100).toFixed(1)
    createPieChart("pieChart", labels, values, colors)
}
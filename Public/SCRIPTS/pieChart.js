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
let table_name = 'medii';


function init_piechart(rows){
    colors = ["rgb(140,140,255)","rgb(118,0,119)"]
    labels = []
    values = []
    for (let row of rows) {
        if( row.luna == 1 && row.an == 2019){ // TODO
            if (row['id_judet'] === 25) { //TODO
                console.log(row)
                values.push(row.insdemnizati)
                labels.push('indemnizati')

                values.push(row.neindemnizati)
                labels.push('neindemnizati')

            }
        }
    }
    createPieChart("pieChart", labels, values, colors)
}
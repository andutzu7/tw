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

function normalize_values(values){
    sum = values.reduce((a, b) => a + b, 0)
    return values.map((a) => (a / sum * 100).toFixed(1))
}


function init_piechart_indemnizatie(rows){
    colors = ["#ffc2e5", "#3399ff"]
    labels = ['indemnizati', 'neindemnizati']
    values = [0, 0]
    for (var row of rows) {
        values[0] += row.indemnizati
        values[1] += row.neindemnizati
    }
    values = normalize_values(values)
    return createPieChart("piechart_indemnizatie", labels, values, colors)
}

function init_piechart_gender_medii(rows){
    colors = ["#ffc2e5", "#3399ff", "#ee70a6", "#f38654"]
    labels = ['rural_femei', 'rural_barbati', 'urban_barbati', 'urban_femei']
    values = [0, 0, 0, 0]
    for (var row of rows) {
        values[0] += row.rural_femei
        values[1] += row.rural_barbati
        values[2] += row.urban_barbati
        values[3] += row.urban_femei
    }
    values = normalize_values(values)
    return createPieChart("piechart_gender_medii", labels, values, colors)
}

function init_piechart_varste(rows, id_judet=null){
    let colors = ["#ffc2e5", "#3399ff", "#ee70a6", "#f38654", "yellow", "orange"]
    labels = []
    values = []
    dict = {}
    for(var row of rows){
        if(id_judet == null || row.id_judet == id_judet){
            for(var key in row){
                if (['an', 'luna', 'id_judet'].indexOf(key) < 0) {  
                    if(key in dict){
                        dict[key] += row[key]
                    }
                    else{
                        dict[key] = row[key]
                    }
                }
            }
        }
    }
    values.push(dict['sub25'])
    labels.push('sub 25');
    values.push(dict['interval25_29'])
    labels.push('25-29');
    values.push(dict['interval30_39'])
    labels.push('30-39');
    values.push(dict['interval40_49'])
    labels.push('40-49');
    values.push(dict['interval50_55'])
    labels.push('50-55');
    values.push(dict['peste55'])
    labels.push('peste 55');
    // values = normalize_values(values)
    return createPieChart("piechart_all", labels, values, colors)
}


function init_piechart_rata(rows){
}

function init_piechart_educatie(rows){
}

function init_piechart_medii(rows){
}
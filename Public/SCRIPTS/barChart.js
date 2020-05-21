var MONTHS = ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function generateBarMonthsLabels(monthsIndex) {
    let displayedLabel = [];
    for (let i = 0; i < monthsIndex.length; i++) {
        displayedLabel.push(MONTHS[monthsIndex[i] - 1]);
    }
    return displayedLabel;
}

function createBarChart(chartNameID, field_text, title_text, months, values, add_line=false) {
    var ctx = document.getElementById(chartNameID);

    datasets = [{
        label: field_text,
        type: "bar",
        backgroundColor: "rgba(255, 0, 255 , 0.15)",
        data: values,
    }
    ]

    if(add_line){
        datasets.push({
            label: field_text,
            type: "line",
            borderColor: "#ae8ee2",
            data: values,
            fill: false
        })
    }

    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: datasets
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
    return createBarChart("barchart_total", 'total', 'titlu', labels, values, add_line=true);
}


function init_barchart_varste(table, year, month, id_judet = null){
    values = []
    labels = []
    if(id_judet){
        for(var row of table[year][month]){
            if (row['id_judet'] === id_judet) {  // TODO
                values.push(row[field]);
                month_labels.push(row['luna']);
            }
        }
    }
    else{
        dict = {}
        for(var row of table[year][month]){
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
    }
    return createBarChart("barchart_varste_educatie", 'total', 'titlu', labels, values);
}
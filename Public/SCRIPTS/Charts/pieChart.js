function createPieChart(elementID, labels, values, colors) {
    if (all_charts[elementID]) {
        all_charts[elementID].data.datasets[0].data = values;
        all_charts[elementID].data.labels = labels;
        all_charts[elementID].update()
        return
    }
    var ctx2 = document.getElementById(elementID);
    all_charts[elementID] = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                backgroundColor: colors,
                data: values
            }]
        },
        options: {
            rotation: 0.5 * Math.PI,
            tooltips: {
                titleFontSize: 20,
                bodyFontSize: 20,
                titleFontFamily: "Trebuchet MS ",
                bodyFontFamily: "Trebuchet MS ",
                callbacks: {
                    label: function (tooltipItem, data) {
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
                    fontFamily: "Trebuchet MS ",
                    fontSize: 20,
                    fontColor: "white",
                    boxWidth: 10
                }
            },
            title: {
                fontFamily: "Trebuchet MS ",
                fontSize: 20,
                display: false,
                text: 'https://youtu.be/QaPrQa3oMy0'
            }
        }
    });
}


function update_piechart(chart, values) {
    chart.data.datasets[0].data = values;
    chart.update();
}

function normalize_values(values) {
    sum = values.reduce((a, b) => a + b, 0)
    return values.map((a) => (a / sum * 100).toFixed(1))
}


function init_piechart_indemnizatie(rows, id_judet = null) {
    colors = ["#ffc2e5", "#3399ff"]
    labels = ['indemnizati', 'neindemnizati']
    values = [0, 0]
    for (var row of rows) {
        if (id_judet == null || id_judet === row['id_judet']) {
            values[0] += row.indemnizati
            values[1] += row.neindemnizati
        }
    }
    values = normalize_values(values)
    createPieChart("piechart_indemnizatie", labels, values, colors)
}

function init_piechart_medii(rows, id_judet = null) {
    colors = ["#ffc2e5", "#3399ff"]
    labels = ['urban', 'rural']
    values = [0,0]
    for (var row of rows) {
        if (id_judet == null || id_judet === row['id_judet']) {
            values[0] += row.urban_femei + row.urban_barbati
            values[1] += row.rural_femei + row.rural_barbati
        }
    }
    values = normalize_values(values)
    createPieChart("piechart_medii", labels, values, colors)
}


function init_piechart_cateogory(rows, id_judet = null) {
    const colors = ["#ffc2e5", "#3399ff", "#ee70a6", "#f38654", "yellow", "orange", '#9ACD32', '#20B2AA']
    let labels = [];
    let values = [];
    const dict = generate_data_dict_by_rows(rows,   id_judet);
    const result = generate_lables_data(dict);
    for (const key in dict) {
        if (key === 'procent_total' || key === 'procent_femei' || key === 'procent_barbati')
            continue;
        labels.push(result[key]['label']);
        values.push(result[key]['value']);
    }
    values = normalize_values(values);

    createPieChart("piechart_all", labels, values, colors)
}
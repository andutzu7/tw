function createPieChart(elementID, labels, values, colors, second_set=null) {
    if (all_charts[elementID]) {
        all_charts[elementID].data.datasets[0].data = values;
        all_charts[elementID].data.labels = labels;

        if(second_set){
            if(all_charts[elementID].data.datasets.length == 2){
                all_charts[elementID].data.datasets[1].data = second_set;
            }
            else{
                all_charts[elementID].data.datasets.push({
                    backgroundColor: colors,
                    data: second_set
                })
            }
        }
        else{
            if(all_charts[elementID].data.datasets.length == 2){
                all_charts[elementID].data.datasets.pop()
            } 
        }

        all_charts[elementID].update()
        return
    }

    datasets = [{
        backgroundColor: colors,
        data: values
    }]

    if(second_set){
        console.log('here')
        datasets.push({
            backgroundColor: colors,
            data: second_set
        })
    }

    var ctx2 = document.getElementById(elementID);
    all_charts[elementID] = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: datasets
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


function init_piechart_indemnizatie(rows, id_judet, id_to_compare) {
    colors = ["#ffc2e5", "#3399ff"]
    labels = ['indemnizati', 'neindemnizati']
    values = [0, 0]
    second_set = null
    for (var row of rows) {
        if (id_judet == null || id_judet === row['id_judet']) {
            values[0] += row.indemnizati
            values[1] += row.neindemnizati
        }
    }
    values = normalize_values(values)

    if(id_to_compare){
        second_set = [0,0]

        for (var row of rows) {
            if (id_to_compare === row['id_judet']) {
                second_set[0] += row.indemnizati
                second_set[1] += row.neindemnizati
            }
        }
        second_set = normalize_values(second_set)
    }

    createPieChart("piechart_indemnizatie", labels, values, colors, second_set)
}

function init_piechart_medii(rows, id_judet, id_to_compare) {
    colors = ["#ffc2e5", "#3399ff"]
    labels = ['urban', 'rural']
    values = [0,0]
    second_set = null
    for (var row of rows) {
        if (id_judet == null || id_judet === row['id_judet']) {
            values[0] += row.urban_femei + row.urban_barbati
            values[1] += row.rural_femei + row.rural_barbati
        }
    }
    values = normalize_values(values)

    if(id_to_compare){
        second_set = [0,0]

        for (var row of rows) {
            if (id_to_compare === row['id_judet']) {
                second_set[0] += row.urban_femei + row.urban_barbati
                second_set[1] += row.rural_femei + row.rural_barbati
            }
        }
        second_set = normalize_values(second_set)
    }
    createPieChart("piechart_medii", labels, values, colors, second_set)
}


function init_piechart_cateogory(rows, id_judet, id_to_compare) {
    const colors = ["#ffc2e5", "#3399ff", "#ee70a6", "#f38654", "yellow", "orange", '#9ACD32', '#20B2AA']
    let labels = [];
    let values = [];
    second_set = null;
    dict = generate_data_dict_by_rows(rows, id_judet);
    result = generate_lables_data(dict);
    for (const key in dict) {
        if (key === 'procent_total' || key === 'procent_femei' || key === 'procent_barbati')
            continue;
        labels.push(result[key]['label']);
        values.push(result[key]['value']);
    }
    values = normalize_values(values);

    if(id_to_compare){
        second_set = []
        labels2 = []

        dict = generate_data_dict_by_rows(rows, id_to_compare);
        result = generate_lables_data(dict);
        for (const key in dict) {
            if (key === 'procent_total' || key === 'procent_femei' || key === 'procent_barbati')
                continue;
            second_set.push(result[key]['value']);
        }
        second_set = normalize_values(second_set)
    }

    createPieChart("piechart_all", labels, values, colors, second_set)
}
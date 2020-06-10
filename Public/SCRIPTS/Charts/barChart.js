let MONTHS = ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function generateBarMonthsLabels(monthsIndex) {
    let displayedLabel = [];
    for (let i = 0; i < monthsIndex.length; i++) {
        displayedLabel.push(MONTHS[monthsIndex[i] - 1]);
    }
    return displayedLabel;
}

function createBarChart(chartNameID, field_text, title_text, months, values, colors, second_set, add_line = false) {
    if (colors == null) {
        colors = "rgba(219,0,0,0.3)"
    }
    if(add_line){
        second_color_set = "rgba(255,100,100,0.7)"
    }
    else{
        second_color_set = colors;
    }
    if (all_charts[chartNameID]) {
        all_charts[chartNameID].options.title.text = title_text
        max_sets = 2;
        if(add_line){
            max_sets = 4
        }
        if(second_set){
            if(all_charts[chartNameID].data.datasets.length == max_sets){
                for (let i = 0; i < all_charts[chartNameID].data.datasets.length / 2; i++) {
                    all_charts[chartNameID].data.datasets[i].data = values;
                }
                for (let i = all_charts[chartNameID].data.datasets.length / 2; i < all_charts[chartNameID].data.datasets.length; i++) {
                    all_charts[chartNameID].data.datasets[i].data = second_set;
                }
            }
            else{
                for (let i = 0; i < max_sets/2; i++) {
                    all_charts[chartNameID].data.datasets[i].data = values;
                }
                all_charts[chartNameID].data.datasets.push({
                    label: field_text,
                    type: "bar",
                    backgroundColor: second_color_set,
                    data: second_set,
                })
                if(add_line){
                    all_charts[chartNameID].data.datasets.push({
                        label: field_text,
                        type: "line",
                        borderColor: "pink",
                        data: second_set,
                        fill: false
                    })
                }
            }
        }
        else{
            if(all_charts[chartNameID].data.datasets.length == max_sets){
                for (let i = 0; i < max_sets/2; i++) {
                    all_charts[chartNameID].data.datasets.pop()
                }
            }
            else{
                for (let i = 0; i < all_charts[chartNameID].data.datasets.length; i++) {
                    all_charts[chartNameID].data.datasets[i].data = values;
                }
            }
        }

        all_charts[chartNameID].data.labels = months;
        all_charts[chartNameID].update()
        return;
    }

    var ctx = document.getElementById(chartNameID);
    datasets = [{
        label: field_text,
        type: "bar",
        backgroundColor: colors,
        data: values,
    }
    ]

    if (add_line) {
        datasets.push({
            label: field_text,
            type: "line",
            borderColor: "#f38654",
            data: values,
            fill: false
        })
    }

    if(second_set){
        datasets.push({
            label: field_text,
            type: "bar",
            backgroundColor: second_color_set,
            data: second_set,
        })
        if(add_line){
            datasets.push({
                label: field_text,
                type: "line",
                borderColor: "pink",
                data: second_set,
                fill: false
            })
        }
    }

    all_charts[chartNameID] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: datasets
        },
        options: {
            tooltips: {
                fontColor: "white",
                titleFontSize: 20,
                bodyFontSize: 20,
                titleFontFamily: "Trebuchet MS ",
                bodyFontFamily: "Trebuchet MS ",
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            title: {
                fontColor: "white",
                display: true,
                text: title_text,
                fontFamily: "Trebuchet MS ",
                fontSize: 20

            }, scales: {
                xAxes: [{
                    ticks: {
                        callback: function (value, index, values) {
                            return value;
                        }
                    },
                    ticks: {
                        fontFamily: "Trebuchet MS ",
                        fontSize: 20,
                        fontColor: "white"
                    }
                }
                ],
                yAxes: [{
                    ticks: {
                        fontColor: "white",
                        fontFamily: "Trebuchet MS ",
                        fontSize: 20
                    }
                }]
            }
        }
    });
}

function init_barchart_total(table, field,  id_judet, id_to_compare) {
    selected_total = field
    values = []
    month_labels = []

    let second_set = null
    for (var year in table) {
        for (var month in table[year]) {
            if (id_judet) {
                for (var row of table[year][month]) {
                    if (row['id_judet'] === id_judet) {
                        values.push(row[field]);
                        month_labels.push(row['luna']);
                    }
                }
            } else {
                if (field === 'procent_total') {
                    values.push(get_procent_romania(year, month));
                    month_labels.push(month);
                } else {
                    sum = 0;
                    for (var row of table[year][month]) {
                        sum += row[field];
                    }
                    values.push(sum);
                    month_labels.push(month);
                }
            }
        }
    }

    if(id_to_compare){
        second_set = []
        for (var year in table) {
            for (var month in table[year]) {
                for (var row of table[year][month]) {
                    if (row['id_judet'] === id_to_compare) {
                        second_set.push(row[field]);
                    }
                }
            }
        }
    }
    labels = generateBarMonthsLabels(month_labels);
    title = 'Numarul somerilor in ultimele 12 luni'
    if(field == 'procent_total'){
        title = 'Rata somajului in ultimele 12 luni'
    }
    createBarChart("barchart_total", 'total', title, labels, values, null, second_set, add_line = true);
}

function init_barchart(table, year, month, id_judet, colors, chart_title, id_to_compare) {
    let labels = [];
    let values = [];

    let second_set = null

    const dict = generate_data_dict(table, year, month, id_judet);
    const result = generate_lables_data(dict);
    for (const key in dict) {
        if (key === 'procent_total' || key === 'procent_femei' || key === 'procent_barbati')
            continue;
        if (key === 'total')
            continue;
        labels.push(result[key]['label']);
        values.push(result[key]['value']);
    }


    if(id_to_compare){
        second_set = []
        const dict = generate_data_dict(table, year, month, id_to_compare);
        const result = generate_lables_data(dict);
        for (const key in dict) {
            if (key === 'procent_total' || key === 'procent_femei' || key === 'procent_barbati')
                continue;
            if (key === 'total')
                continue;
            second_set.push(result[key]['value']);
        }
    }
    

    createBarChart("barchart_all", '', chart_title, labels, values, colors, second_set);
}


titles_per_category = {
    'varste': 'Distributia per varste',
    'rata': 'Rata somajului',
    'educatie': 'Distributia pe nivele de educatie',
    'medii': 'Somajul in functie de medii'
}


function init_barchart_category(category, year, month, id_judet, id_to_compare) {
    const colors = ["#ffc2e5", "#3399ff", "#ee70a6", "#f38654", "yellow", "orange", '#9ACD32', '#20B2AA']
    chart_title = titles_per_category[category]
    init_barchart(all_tables[category], year, month, id_judet, colors, chart_title, id_to_compare);
}
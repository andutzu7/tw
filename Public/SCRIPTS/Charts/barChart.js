let MONTHS = ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function generateBarMonthsLabels(monthsIndex) {
    let displayedLabel = [];
    for (let i = 0; i < monthsIndex.length; i++) {
        displayedLabel.push(MONTHS[monthsIndex[i] - 1]);
    }
    return displayedLabel;
}

function createBarChart(chartNameID, field_text, title_text, months, values, colors, add_line = false) {
    if (all_charts[chartNameID]) {
        for (let i = 0; i < all_charts[chartNameID].data.datasets.length; i++) {
            all_charts[chartNameID].data.datasets[i].data = values;
        }
        all_charts[chartNameID].data.labels = months;
        all_charts[chartNameID].update()
        return;
    }

    var ctx = document.getElementById(chartNameID);
    if (colors == null) {
        colors = "rgba(219, 0, 0, 0.3)"
    }
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
                titleFontFamily: "Comic Sans MS",
                bodyFontFamily: "Comic Sans MS",
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
                fontFamily: "Comic Sans MS",
                fontSize: 20

            }, scales: {
                xAxes: [{
                    ticks: {
                        callback: function (value, index, values) {
                            return value;
                        }
                    },
                    ticks: {
                        fontFamily: "Comic Sans MS",
                        fontSize: 20,
                        fontColor: "white"
                    }
                }
                ],
                yAxes: [{
                    ticks: {
                        fontColor: "white",
                        fontFamily: "Comic Sans MS",
                        fontSize: 20
                    }
                }]
            }
        }
    });
}

function init_barchart_total(table, field, id_judet = null) {
    selected_total = field
    values = []
    month_labels = []
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
    labels = generateBarMonthsLabels(month_labels);
    createBarChart("barchart_total", 'total', 'Numarul somerilor in ultimele 12 luni', labels, values, null, add_line = true);
}

function init_barchart(table, year, month, id_judet = null, colors, chart_title) {
    let labels = [];
    let values = [];
    const dict = generate_data_dict(table, year, month, id_judet);
    const result = generate_lables_data(dict);
    for (const key in dict) {
        if (key === 'procent_total' || key === 'procent_femei' || key === 'procent_barbati')
           continue;
        if(chart_title === 'Distributia pe nivele de educatie'){
            if(key === 'total')
                continue;
        }
        labels.push(result[key]['label']);
        values.push(result[key]['value']);
    }
    createBarChart("barchart_all", '', chart_title, labels, values, colors);
}


titles_per_category = {
    'varste': 'Distributia per varste',
    'rata': 'Rata somajului',
    'educatie': 'Distributia pe nivele de educatie',
    'medii': 'Media somajului'
}


function init_barchart_category(category, year, month, id_judet = null) {
    const colors = ["#ffc2e5", "#3399ff", "#ee70a6", "#f38654", "yellow", "orange", '#9ACD32', '#20B2AA']
    const chart_title = titles_per_category[category]
    init_barchart(all_tables[category], year, month, id_judet, colors, chart_title);
}
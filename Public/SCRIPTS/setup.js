all_tables = {};
all_charts = {};
selected_month = 3;
selected_year = 2020;
selected_table = 'rata';
MONTHS_STR = []
COUNTY_DICT = {}


function store_table(table_name, rows) {
    dict = {}
    for (let row of rows) {
        if (!(row.an in dict)) {
            dict[row.an] = {}
        }
        if (!(row.luna in dict[row.an])) {
            dict[row.an][row.luna] = []
        }
        dict[row.an][row.luna].push(row)
    }
    all_tables[table_name] = dict;
}

function fetch_table(api_url, table_name, use_data = null) {
    fetch(`${api_url}/${table_name}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            all_tables[table_name] = data;
            store_table(table_name, data);
            if (use_data) {
                use_data(data)
            }
        })
}


function init_rata() {
    colorize_map(all_tables['rata'][selected_year][selected_month], 'total', selected_year, selected_month);
    set_county_hover(all_tables['rata'][selected_year][selected_month], 'total', selected_year, selected_month);
    init_barchart_total(all_tables['rata'], 'total');
    all_charts['piechart_indemnizatie'] = init_piechart_indemnizatie(all_tables['rata'][selected_year][selected_month]);
    generate_table();


    for (let year in all_tables['rata']) {
        for (let month in all_tables['rata'][year]) {
            MONTHS_STR.push(`${year}-${MONTHS[month - 1]}`)
        }
    }
    append_options_to_dropdown(MONTHS_STR);

    //to comment
    init_barchart_rata(all_tables['rata'], selected_year, selected_month);
    all_charts['piechart_all'] = init_piechart_rata(all_tables['rata'][selected_year][selected_month]);
}

function init_medii() {
    all_charts['piechart_gender_medii'] = init_piechart_gender_medii(all_tables['medii'][selected_year][selected_month]);

    //to comment
    // all_charts['barchart_all'] = init_barchart_medii(all_tables['medii'], selected_year, selected_month);
    // all_charts['piechart_all'] = init_piechart_medii(all_tables['medii'][selected_year][selected_month]);
}


function init_varste() {
    //to comment
    // all_charts['barchart_all'] = init_barchart_varste(all_tables['varste'], selected_year, selected_month);
    // all_charts['piechart_all'] = init_piechart_varste(all_tables['varste'][selected_year][selected_month]);
}


function init_educatie() {
    //to comment
    // all_charts['barchart_all'] = init_barchart_educatie(all_tables['educatie'], selected_year, selected_month);
    // all_charts['piechart_all'] = init_piechart_educatie(all_tables['educatie'][selected_year][selected_month]);
}


function fetch_judete(api_url) {
    fetch(`${api_url}/judete`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            for (let row of data) {
                COUNTY_DICT[row['id']] = row['nume']
            }
        })
}


function setup_hardcoded(api_url) {
    fetch_judete(api_url)
    fetch_table(api_url, 'rata', init_rata);
    fetch_table(api_url, 'varste', init_varste);
    fetch_table(api_url, 'medii', init_medii);
    fetch_table(api_url, 'educatie', init_educatie);
}


url = 'https://arcane-sierra-19327.herokuapp.com'
setup_hardcoded(url)


// function update_charts() { //in the future thiss will hav a parameter
//     //removeData(all_charts['barchart' + sel_table]);
//     //removeData(all_charts['piechart'+sel_table]);
//     let testmonth = 11;
//     let testyear = 2019;
//     let testtable = 'varste';
//     all_charts['barchart' + testtable] = init_barchart(all_tables[testtable]);
//     all_charts['piechart' + testtable] = init_piechart(all_tables[testtable][testyear][testmonth]);
//     all_charts['barchart' + testtable].update();
//     all_charts['piechart' + testtable].update();
// }


function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        while (dataset.data.length > 0) {
            dataset.data.pop();
        }
    });

    chart.update();

}

function update2() {
    // update_piechart(all_charts['piechart_indemnizatie'], [20,1])
    // update_barchart(all_charts['barchart_total'], [0, 0, 1, 1, 0.2, 5, 4.5, 0.2, 1, 1, 0, 0])
}


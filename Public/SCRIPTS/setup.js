all_tables = {};
all_charts = {};
selected_month = 1;
selected_year = 2020;
selected_table = 'rata';


function select_table(table_name, init_field) {
    colorize_map(all_tables[table_name][selected_year][selected_month], init_field, selected_year, selected_month);
    set_county_hover(all_tables[table_name][selected_year][selected_month], init_field, selected_year, selected_month);
    all_charts['barchart_total'] = init_barchart_total(all_tables[table_name], init_field);
    all_charts['piechart_indemnizatie'] = init_piechart_indemnizatie(all_tables[table_name][selected_year][selected_month]);
}


function myupdate(){
    update_piechart(all_charts['piechart_indemnizatie'], [20,1])
    update_barchart(all_charts['barchart_total'], [0, 0, 1, 1, 0.2, 5, 4.5, 0.2, 1, 1, 0, 0])
}

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

function fetch_table(api_url, table_name, init_with_field = null) {
    fetch(`${api_url}/${table_name}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            all_tables[table_name] = data;
            store_table(table_name, data);
            if (init_with_field) {
                select_table(table_name, init_with_field);
            }
        })
}

function setup_hardcoded(api_url) {
    fetch_table(api_url, 'rata', 'total');
    fetch_table(api_url, 'varste');
    fetch_table(api_url, 'medii');
    fetch_table(api_url, 'educatie');
}


url = 'https://arcane-sierra-19327.herokuapp.com'
setup_hardcoded(url)

function xmlExp() {
    const xmlStringData = generateXML(all_tables);
    downloadxml("export_statistici.xml", xmlStringData);
}

function csvExp() {
    const csvStringData = generateCSV(all_tables["educatie"]); //hardcoded
    downloadcsv("export_statistici.csv", csvStringData);
}

function parse_link_param() {
    const current_link = window.location.href;
    //separam din link stringul cu criterii, apoi il transformam in array
    const criteria = current_link.split("?")[1].split(",");
    let selected_criteria = {};
    criteria.forEach(function (entry) {
        selected_criteria[entry.split("=")[0]] = entry.split("=")[1];
    });
    return selected_criteria;
}

function create_link_from_criteria(criteria) {
    const current_link = window.location.href;
    let page_link = current_link.split("?")[0].split(",");
    page_link += '?'; //needed
    for (const [key, value] of Object.entries(criteria)) {
        page_link += key;
        page_link += '=';
        page_link += value;
        page_link += '&';
    }
    page_link = page_link.slice(0, -1);
    return page_link;
}

function update_charts() { //in the future thiss will hav a parameter
    let sel_table = 'rata';
    removeData(all_charts['barchart' + sel_table]);
}


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
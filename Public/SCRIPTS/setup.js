all_tables = {}

selected_month = 1
selected_year = 2020
selected_table = 'rata'


function select_table(table_name, init_field){
    colorize_map(all_tables[table_name][selected_year][selected_month], init_field, selected_year, selected_month);
    set_county_hover(all_tables[table_name][selected_year][selected_month], init_field, selected_year, selected_month);
    init_barchart(all_tables[table_name], init_field);
    init_piechart(all_tables['rata'][selected_year][selected_month]);
}

function store_table(table_name, rows){
    dict = {}
    for(let row of rows){
        if(!(row.an in dict)){
            dict[row.an] = {}
        }
        if(!(row.luna in dict[row.an])){
            dict[row.an][row.luna] = []
        }
        dict[row.an][row.luna].push(row)
    }
    all_tables[table_name] = dict;
}

function fetch_table(api_url, table_name, init_with_field=null){
    fetch(`${api_url}/${table_name}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        all_tables[table_name] = data;
        store_table(table_name, data);
        if(init_with_field){       
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

function xmlExp(){
    const xmlStringData =generateXML(all_tables);
   downloadxml("export_statistici.xml",xmlStringData);
}

function csvExp(){
    const csvStringData = generateCSV(all_tables);
    downloadxml("export_statistici.csv",csvStringData);
}
all_tables = {};
all_charts = {};
selected_month = 4; // TODO: call select_month_year with latest month on init
selected_year = 2020;
selected_criteria = 'varste';
selected_county = null;
compared_county = null;


selected_total = 'total' // or "total_procent"

MONTHS_STR = []
COUNTY_DICT = {}
COUNTY_DICT_REVERSE = {}



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


function select_year_month(year, month){
    selected_year = year
    selected_month = month

    colorize_map(all_tables['rata'][selected_year][selected_month], 'total', selected_year, selected_month);
    set_county_hover(all_tables['rata'][selected_year][selected_month], 'total', selected_year, selected_month);

    select_county(selected_county)
}

function select_county(id){
    if(id){
        //if id is null we are on country view
        id = parseInt(id) 
    document.getElementById("countryBackButton").style.display = 'block'
    }

    selected_county = id
    
    init_piechart_medii(all_tables['medii'][selected_year][selected_month], id, compared_county);
    init_piechart_indemnizatie(all_tables['rata'][selected_year][selected_month], id, compared_county);
    init_barchart_total(all_tables['rata'], selected_total, id, compared_county);

    select_category(selected_criteria, selected_county)

    set_header_info(id)
}


function select_category(category){
    selected_criteria = category

    init_barchart_category(category, selected_year, selected_month, selected_county, compared_county);
    init_piechart_cateogory(all_tables[category][selected_year][selected_month], selected_county, compared_county);
    change_table(category)
}


function init_rata() {
    console.log('fetch_rata')
    colorize_map(all_tables['rata'][selected_year][selected_month], 'total', selected_year, selected_month);
    set_county_hover(all_tables['rata'][selected_year][selected_month], 'total', selected_year, selected_month);
    init_barchart_total(all_tables['rata'], selected_total, selected_county, compared_county);
    init_piechart_indemnizatie(all_tables['rata'][selected_year][selected_month], selected_county, compared_county);

    for (let year in all_tables['rata']) {
        for (let month in all_tables['rata'][year]) {
            MONTHS_STR.push(`${year}-${MONTHS[month - 1]}`)
        }
    }

    options = Object.values(COUNTY_DICT)
    options.push('COMPARA CU')

    append_options_to_dropdown(options, "compare-dropdown")
    append_options_to_dropdown(MONTHS_STR, "months-dropdown")
    

    set_header_info(selected_county)
    if(selected_criteria == 'rata'){
        select_category('rata')
    }
}

function init_medii() {
    console.log('fetch_medii')
    init_piechart_medii(all_tables['medii'][selected_year][selected_month], selected_county, compared_county);
    if(selected_criteria == 'medii'){
        select_category('medii')
    }
}


function init_varste() {
    console.log('fetch_varste')
    if(selected_criteria == 'varste'){
        select_category('varste')
    }
}


function init_educatie() {
    console.log('fetch_educatie')
    if(selected_criteria == 'educatie'){
        select_category('educatie')
    }
}


function fetch_judete(api_url) {
    fetch(`${api_url}/judete`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log('fetch_judete')
            for (let row of data) {
                COUNTY_DICT[row['id']] = row['nume']
                COUNTY_DICT_REVERSE[row['nume']] = row['id']
            }
            if(selected_county && isNaN(selected_county)){
                selected_county = COUNTY_DICT_REVERSE[selected_county]
                console.log(selected_county)
            }
            if(compared_county && isNaN(compared_county)){
                compared_county = COUNTY_DICT_REVERSE[compared_county]
                console.log(compared_county)
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

params = parse_link_param()

console.log(params)

if(params['criteriu'])
    selected_criteria = params['criteriu']
if(params['an'])
    selected_year = params['an']
if(params['luna'])
    selected_month = params['luna']
if(params['total'])
    selected_total = params['total']
if(params['judet'])
    selected_county = params['judet']
if(params['comparatie'])
    compared_county = params['comparatie']

setup_hardcoded(url)

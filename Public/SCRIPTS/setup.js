all_tables = {}

function select_table(table_name, init_field){
    colorize_map_hardcoded(all_tables[table_name], init_field);
    set_hover_hardcoded(all_tables[table_name], init_field);
}

function fetch_table(api_url, table_name, init_with_field=null){
    fetch(`${api_url}/${table_name}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        all_tables[table_name] = data;
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
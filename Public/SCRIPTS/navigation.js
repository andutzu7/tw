function changeContent(e) {
    id = e.target.id.split('_')[2]
    console.log(id)

    document.getElementById("header-location-name").innerText = COUNTY_DICT[id]
    document.getElementById("header-total-value").innerText = `${id}${id} someri`  // TODO
    document.getElementById("header-procent-value").innerText = `${id}%`  // TODO

    // TODO: update existing charts instead of generating them every time
    all_charts['piechart_gender_medii'] = init_piechart_gender_medii(all_tables['medii'][selected_year][selected_month], id);
    all_charts['piechart_indemnizatie'] = init_piechart_indemnizatie(all_tables['rata'][selected_year][selected_month], id);
    all_charts['barchart_total'] = init_barchart_total(all_tables['rata'], 'total', id);

    // TODO: update #piechart_all and #barchart_all based on selected_category
    // all_charts['barchart_all'] = init_barchart_varste(all_tables['varste'], selected_year, selected_month,id);
    // all_charts['piechart_all'] = init_piechart_varste(all_tables['varste'][selected_year][selected_month],id);
};


let svg = document.getElementById('romanian_map');

function set_county_on_click_events(){
    for (let i = 1; i <= 42; i++) {
        let country = document.getElementById(`JUDET_SVG_${i}`);
        country.addEventListener("click", changeContent); 
    }
}

function back_button_on_click(){
    let country_backButton = document.getElementById('countryBackButton');
    country_backButton.onclick = function changeContent() {
        svg.style.display='block';
        let country_barchart = document.getElementById('countryBarChart');
        country_barchart.style.visibility='hidden';
    
        let country_piechart = document.getElementById('countryPieChart');
        country_piechart.style.visibility='hidden';
    
        let country_textbox = document.getElementById('countryTextbox');
        country_textbox.style.visibility='hidden';
    
        let country_backButton = document.getElementById('countryBackButton');
        country_backButton.style.visibility='hidden';
    }
}


set_county_on_click_events();
// back_button_on_click();
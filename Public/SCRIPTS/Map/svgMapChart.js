function set_county_color(county_id, color) {
    console.assert(county_id > 0 && county_id <= 42, `invalid county_id: ${county_id}`)
    var element_id = `JUDET_SVG_${county_id}`

    var element = document.getElementById(element_id)
    console.assert(element, `element with id ${element_id} not found`)

    element.style.fill = color;
}


function map_value_to_color(value) {
    console.assert(value !== null, `invalid: value: ${value}`)
    max_value = 10000;
    value = Math.min(max_value, value)
    color_value = value / max_value * 255
    r = color_value
    g = 255 - color_value
    b = 255 - color_value
    return `rgb(${r}, ${g}, ${b})`
}


function colorize_map(rows, field){
    console.assert(rows.length == 42, `length not 42: ${rows.length}`)
    for (let row of rows) {
        set_county_color(row.id_judet, map_value_to_color(row[field]));
    }
}


function set_county_hover(rows, field){
    console.assert(rows.length == 42, `length not 42: ${rows.length}`)
    let svg = document.getElementById('romanian_map');
    let tooltip = document.getElementById('tooltip');
    for (let row of rows){
        trigger = document.getElementById(`JUDET_SVG_${row.id_judet}`)
        trigger.addEventListener('mouseenter', function (event) {
            let CTM = svg.getScreenCTM();
            let x = (event.clientX - CTM.e + 6) / CTM.a;
            let y = (event.clientY - CTM.f + 20) / CTM.d;

            tooltip.setAttributeNS(null, "transform", "translate(" + x + " " + y + ")");
            tooltip.setAttributeNS(null, "visibility", "visible");
            let tooltipText = tooltip.getElementsByTagName('text')[0];
            tooltipText.firstChild.data = `${COUNTY_DICT[row['id_judet']]}: ${field} ${row[field]}`;

            let rects = tooltip.getElementsByTagName('rect');
            let length = tooltipText.getComputedTextLength();

            for (let rect of rects) {
                rect.setAttributeNS(null, "width", length + 8);
            }
        }); 
        trigger.addEventListener('mouseout', function (event) {
            tooltip.setAttributeNS(null, "visibility", "hidden");
        });
    }
}


let svg = document.getElementById('romanian_map');

function set_county_on_click_events(){
    for (let i = 1; i <= 42; i++) {
        let country = document.getElementById(`JUDET_SVG_${i}`);
        country.addEventListener("click", changeContent);
    }
}


function changeContent(e) {
    id = parseInt(e.target.id.split('_')[2])
    select_county(id)
    document.getElementById("countryBackButton").style.display = 'block'
};


function get_procent_romania(year, month){
    let someri = 0
    let populatie = 0

    for(var row of all_tables['rata'][year][month]){
        someri += row['total']
        populatie += row['total'] * 100 / row['procent_total']
    }

    return (someri / populatie * 100).toFixed(2)
}


function set_header_info(id_judet=null){
    result = {};
    if(id_judet){
        if(compared_county){
            county_name = COUNTY_DICT[compared_county]
            document.getElementById("header-location2-name").innerText = `vs ${county_name}`
        }
        for(var row of all_tables['rata'][selected_year][selected_month]){
            if(row['id_judet']==id_judet){
                result['total'] = row['total']
                result['procent'] = row['procent_total']
            }
        }
        document.getElementById("header-location-name").innerText = COUNTY_DICT[id_judet]
    }
    else{
        let someri = 0

        for(var row of all_tables['rata'][selected_year][selected_month]){
            someri += row['total']
        }

        result['total'] = someri
        result['procent'] = get_procent_romania(selected_year, selected_month)
        document.getElementById("header-location-name").innerText = 'ROMANIA'
    }

    document.getElementById("header-total-value").innerText = `${result['total']} someri`
    document.getElementById("header-procent-value").innerText = `${result['procent']}%`

    if(id_judet){
        document.getElementById("countryBackButton").style.display = 'block'
    }
    

}


function select_romania(){
    document.getElementById("countryBackButton").style.display = 'None'
    document.getElementById("header-location2-name").innerText = ``
    select_option_with_value('form-compare', 'COMPARA CU')
    compared_county = null
    select_county(null);
}


function compare_with(county_name){
    if(selected_county){
        compared_county = COUNTY_DICT_REVERSE[county_name]
        select_county(selected_county)
    }
    select_option_with_value('form-compare', 'COMPARA CU')
}

set_county_on_click_events();



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

    document.getElementById("header-location-name").innerText = COUNTY_DICT[id]
    document.getElementById("header-total-value").innerText = `${id}${id} someri`  // TODO
    document.getElementById("header-procent-value").innerText = `${id}%`  // TODO


    init_piechart_gender_medii(all_tables['medii'][selected_year][selected_month], id);
    init_piechart_indemnizatie(all_tables['rata'][selected_year][selected_month], id);

    init_barchart_total(all_tables['rata'], 'total', id);

    init_barchart_category(selected_criteria, selected_year, selected_month, id);
    init_piechart_cateogory(all_tables[selected_criteria][selected_year][selected_month], id);
};

set_county_on_click_events();
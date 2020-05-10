function set_county_color(county_id, color) {
    console.assert(county_id > 0 && county_id <= 42, `invalid county_id: ${county_id}`)
    var element_id = `JUDET_SVG_${county_id}`

    var element = document.getElementById(element_id)
    console.assert(element, `element with id ${element_id} not found`)

    element.style.fill = color;
}


function map_value_to_color(value) {
    console.assert(value, `invalid: value: ${value}`)
    max_value = 10000;
    value = Math.min(max_value, value)
    color_value = value / max_value * 255
    r = color_value
    g = 255 - color_value
    b = 255 - color_value
    return `rgb(${r}, ${g}, ${b})`
}


function colorize_map_hardcoded(rows, field){
    for (let row of rows) {
        if (row.luna === 1 && row.an === 2019) {
            set_county_color(row.id_judet, map_value_to_color(row[field]));
        }
    }
}


function set_hover_hardcoded(rows, field){
    let svg = document.getElementById('romanian_map');
    let tooltip = document.getElementById('tooltip');
    for (let row of rows) {
        //toolip and popup box
        trigger = document.getElementById(`JUDET_SVG_${row.id_judet}`)
        trigger.addEventListener('mouseenter', function (event) {

            let CTM = svg.getScreenCTM();
            let x = (event.clientX - CTM.e + 6) / CTM.a;
            let y = (event.clientY - CTM.f + 20) / CTM.d;

            tooltip.setAttributeNS(null, "transform", "translate(" + x + " " + y + ")");
            tooltip.setAttributeNS(null, "visibility", "visible");
            let tooltipText = tooltip.getElementsByTagName('text')[0];
            tooltipText.firstChild.data = `${event.target.getAttribute('title')}: ${field} ${row[field]}`;

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


function setup_hardcoded(API_URL, TABLE_NAME, field) {
    fetch(`${API_URL}/${TABLE_NAME}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            colorize_map_hardcoded(data, field);
            set_hover_hardcoded(data, field)
        })
}



url = 'https://arcane-sierra-19327.herokuapp.com'


setup_hardcoded(url, 'rata', 'total')
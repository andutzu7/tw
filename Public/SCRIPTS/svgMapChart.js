function set_county_color(county_id, color){
    console.assert(county_id > 0 && county_id <= 42, `invalid county_id: ${county_id}`)
    var element_id = `JUDET_SVG_${county_id}`

    var element = document.getElementById(element_id)
    console.assert(element, `element with id ${element_id} not found`)

    element.style.fill = color;
}


function map_value_to_color(value){
    max_value = 10000;
    value = Math.min(max_value, value)
    color_value = value / max_value * 255
    r = color_value
    g = 255 - color_value
    b = 255 - color_value
    return `rgb(${r}, ${g}, ${b})`
}


function myfunc(API_URL, TABLE_NAME){
    fetch(`${API_URL}/${TABLE_NAME}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            for(let row of data){
                if(row.luna == 1){ //hardcoded
                    set_county_color(row.id_judet, map_value_to_color(row.total))
                }
            }
        });
}
url = 'https://arcane-sierra-19327.herokuapp.com'
myfunc(url, 'rata')

function set_county_color(county_id, color){
    console.assert(county_id > 0 && county_id <= 42, `invalid county_id: ${county_id}`)
    var element_id = `JUDET_SVG_${county_id}`
    
    var element = document.getElementById(element_id)
    console.assert(element, `element with id ${element_id} not found`)

    element.style.fill = color;
}


set_county_color(25, 'orange')
set_county_color(4, 'rgb(69, 4, 20)')
set_county_color(41, '#9900ff')

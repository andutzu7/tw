function append_options_to_dropdown(options, dropdown_id) {

    let dropdown = document.getElementById(dropdown_id);
    options.forEach(function (element) {
        let option = document.createElement("option");
        let text = document.createTextNode(element);
        option.appendChild(text);
        
        dropdown.appendChild(option); //de adaugat selected
    });
    dropdown.lastChild.selected = true;
}

function dropdownOnChange(raw_year_month) {
    parsed_year_month = parse_date(raw_year_month)
    year = parsed_year_month['year']
    month = parsed_year_month['month']
    
    console.log(`Selected month: ${year}-${month}`)

    select_year_month(year, month)
}

function select_option_with_value(dropdown_id, value){
    for(let option of document.getElementById(dropdown_id).getElementsByTagName('option')){
        if(option.text == value){
            option.selected = 'selected'
        }
    }
}
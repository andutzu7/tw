function append_options_to_dropdown(months) {

    let dropdown = document.querySelector(".select-criteriu");
    months.forEach(function (element) {
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

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

function dropdownOnClick() {

}
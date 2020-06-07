function change_table(category) {
    generateTable(all_tables, category)
}

function generateTable(allTables, sel_category) {
    let table = document.getElementById("Table");
    const elem = document.getElementById('myTable');
    if (elem != null)
        elem.parentNode.removeChild(elem);

    let tbl = document.createElement("table");
    tbl.setAttribute("id", "myTable");
    let tblBody = document.createElement("tbody");
    let tableHeader = "";
    let rowsNr = 0;
    let counter = 0;
    for (let category in allTables) {
        if (category === sel_category) {
            for (let entry of allTables[category][selected_year][selected_month]) {
                id_judet = entry.id_judet
                let row = document.createElement("tr");
                for (let key in entry) {
                    if (key !== "luna" && key !== "an") {
                        if (tableHeader === "") {
                            let the_header = document.createElement("thead");
                            let headrow = document.createElement("tr");
                            for (const headerName in entry) {
                                if (headerName !== "luna" && headerName !== "an") {
                                    let cell = document.createElement("th");
                                    let cellText = null;
                                    if (rowsNr === 0)
                                        cellText = document.createTextNode('Judet');
                                    else
                                        cellText = document.createTextNode(headerName.charAt(0).toUpperCase() + headerName.slice(1));
                                    tableHeader += headerName;
                                    cell.appendChild(cellText);
                                    headrow.appendChild(cell);
                                    the_header.appendChild(headrow);
                                    rowsNr++;
                                }
                            }
                            tbl.appendChild(the_header);
                        }
                        let cell = document.createElement("td");
                        let cellText = null;
                        if (counter % rowsNr === 0) {
                            cellText = document.createTextNode(COUNTY_DICT[id_judet]);
                            counter = 0
                        } else {
                            cellText = document.createTextNode(entry[key]);
                        }

                        cell.appendChild(cellText);
                        row.appendChild(cell);

                        counter++;
                    }
                }
                tblBody.appendChild(row);
            }
        }
    }
    tbl.appendChild(tblBody);
    table.appendChild(tbl);
    tbl.setAttribute("border", "2");

    let th = document.getElementsByTagName('th');

    for (let c = 0; c < th.length; c++) {

        th[c].addEventListener('click', item(c))
    }
}


th = document.getElementsByTagName('th');

for (let c = 0; c < th.length; c++) {

    th[c].addEventListener('click', item(c))
}


function item(c) {
    return function () {
        sortTable(c)
    }
}

let up = false; //ordinea -> true:crescator, false:descrescator
function sortTable(c) {
    up = !up;
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("myTable");
    switching = true;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[c];
            y = rows[i + 1].getElementsByTagName("TD")[c];

            compare_x = x.innerHTML;
            compare_y = y.innerHTML;
            if(!isNaN(compare_x) && !isNaN(compare_y)){
                compare_x = parseFloat(compare_x)
                compare_y = parseFloat(compare_y)
            }
            if (up) {//check if the two rows should switch place:
                if (compare_x > compare_y){
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else {
                if (compare_x < compare_y) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

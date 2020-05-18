function generate_table() {
    generateTable(all_tables);
}

function generateTable(allTables) {

    var body = document.getElementById("myTable");
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");

    let tableHeader = "";
    let tableRow = "";
    for (let category in allTables) {
        if (category === "rata") {
            for (let year in allTables[category]) {
                for (let month in allTables[category][year]) {
                    for (let id_judet in allTables[category][year][month]) {
                        let row = document.createElement("tr");
                        for (let key in allTables[category][year][month][id_judet]) {
                            if (key !== "luna" && key !== "an") {
                                if (tableHeader === "") {
                                    let the_header = document.createElement("thead");
                                    let headrow = document.createElement("tr");
                                    for (const headerName in allTables[category][year][month][id_judet]) {
                                        if (headerName !== "luna" && headerName !== "an") {
                                            let cell = document.createElement("th");
                                            let cellText = document.createTextNode(headerName);
                                            tableHeader += headerName;
                                            cell.appendChild(cellText);
                                            headrow.appendChild(cell);
                                            the_header.appendChild(headrow);
                                        }
                                    }
                                    tbl.appendChild(the_header);
                                }
                                let cell = document.createElement("td");
                                let cellText = document.createTextNode(allTables[category][year][month][id_judet][key]);
                                cell.appendChild(cellText);
                                row.appendChild(cell);
                            }
                        }
                        tblBody.appendChild(row);
                    }
                }
            }
        }
    }

    tbl.appendChild(tblBody);
    body.appendChild(tbl);
    tbl.setAttribute("border", "2");

    th = document.getElementsByTagName('tr');
    console.log(th.length);
}

th = document.getElementsByTagName('tb');
console.log(th.length);
for (let c = 0; c < th.length; c++) {

    th[c].addEventListener('click', item(c))
}


function item(c) {

    return function () {
        console.log(c)
        sortTable(c)
    }
}


function sortTable(c) {
    var table, rows, switching, i, x, y, shouldSwitch;
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
            //check if the two rows should switch place:
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                //if so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
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
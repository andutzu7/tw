function generate_table() {
    generateTable(all_tables);
}

function generateTable(allTables) {

    var body = document.getElementsByTagName("body")[0];
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
                            if (key !== "luna" && key !== "an" ) {
                                if (tableHeader === "") {
                                    let head = document.createElement("tr");
                                    for (const headerName in allTables[category][year][month][id_judet]) {
                                        if (headerName !== "luna" && headerName !== "an") {
                                            let cell = document.createElement("td");
                                            let cellText = document.createTextNode(headerName);
                                            tableHeader += headerName;
                                            cell.appendChild(cellText);
                                            head.appendChild(cell);
                                            tblBody.appendChild(head);
                                        }
                                    }
                                }
                                let cell = document.createElement("td");
                                let cellText = document.createTextNode( allTables[category][year][month][id_judet][key]);
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

}
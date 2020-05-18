function generate_table() {
    // get the reference for the body
    var body = document.getElementsByTagName("body")[0];
  
    // creates a <table> element and a <tbody> element
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
  
    // creating all cells
    for (var i = 0; i < 6; i++) {
      // creates a table row
      var row = document.createElement("tr");
  
      for (var j = 0; j < 2; j++) {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        var cell = document.createElement("td");
        var cellText = document.createTextNode("cell in row "+i+", column "+j);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
  
      // add the row to the end of the table body
      tblBody.appendChild(row);
    }
  
    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tbl);
    // sets the border attribute of tbl to 2;
    tbl.setAttribute("border", "2");
    
   generateCSV(all_tables);
  }



  function generateCSV(data) {
    let csvString = "";//trebuie puse categoriile in csv
    var urban_femei = "urban_femei";
    for (const id in data) {
        for (const month in data[id])
            for (let id_judet in data[id][month]) {
                for (let key in data[id][month][id_judet]) {
                    if (csvString === "") {//facem headeru
                        for (let aux in data[id][month][id_judet]) {
                            csvString += aux + ","
                            for(let i in data[id][month][id_judet][aux]){
                                console.log(data[id][month][id_judet][aux] + "-" + data[id][month][id_judet][aux][i])
                            }
                        }

                        csvString = csvString.substring(0, csvString.length - 1);
                        csvString += '\n';
                    }
                    csvString += data[id][month][id_judet][key] + ',';
                }
                csvString = csvString.substring(0, csvString.length - 1);
                csvString += '\n';

            }
    }
    return csvString;
}
//hardcoded just for testing purposes
function generateCSV(data) {
    let csvString = "";//trebuie puse categoriile in csv
    for (const id in data) {
        for (const month in data[id])
            for (let id_judet in data[id][month]) {
                for (let key in data[id][month][id_judet]) {
                    if (csvString === "") {//facem headeru
                        for (let aux in data[id][month][id_judet]) {
                            csvString += aux + ","
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

function downloadcsv(filename, csvStringContent) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvStringContent));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}


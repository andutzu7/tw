
function generateXML(allTables){
    let xmldata='<?xml version="1.0" encoding="UTF-8"?>';
    xmldata+="<data>";

    for (const [key, value] of Object.entries(allTables)) {
        console.log(key, value);
    }


    xmldata+="</data>";

    return xmldata;

}


function downloadxml(filename,xmlStringContent) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(xmlStringContent));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function generateXML(allTables){
    let xmldata='<?xml version="1.0" encoding="UTF-8"?> \n';
    xmldata+="<data>\n";

    for (let key in allTables) {
        console.log(key);
       xmldata += `<${key}> `;
        xmldata += `</${key}> \n`;
    }


    xmldata+="</data>";

    return xmldata;

}


function downloadxml(filename,xmlStringContent) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/xml;charset=utf-8,' + encodeURIComponent(xmlStringContent));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
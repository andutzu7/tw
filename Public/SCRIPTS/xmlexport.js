const lunile_anului = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie',
    'Octombrie', 'Noiembrie', 'Decembrie'];

function generateXML(allTables) {
    let xmldata = '<?xml version="1.0" encoding="UTF-8"?> \n';
    console.log(allTables);
    xmldata += "<data>\n";
    var x = "id_judet";
    //console.log(allTables[category][year][3][0][x]);
//TODO TABS N SPACES BBE
    for (let category in allTables) {
        xmldata += `\t<${category}> \n`;
        for (let year in allTables[category]) {
            xmldata += `\t\t<${year}> \n `;
            for (let month in allTables[category][year]) {
                xmldata += `\t\t\t<${lunile_anului[month - 1]}>\n `;
                for (let id_judet in allTables[category][year][month]) {
                    let id_judet_int = parseInt(id_judet);
                    id_judet_int++;// ca sa scapam de decalaj
                    xmldata += "\t\t\t\t<judet id=" + `${(id_judet_int)}>` + '\n';
                    for (let key in allTables[category][year][month][id_judet]) {
                        if (key !== "luna" && key !== "an" && key !== "id_judet") {
                            xmldata += `\t\t\t\t\t<${key}>` + allTables[category][year][month][id_judet][key] + `</${key}>\n`;
                        }
                    }


                    xmldata += "\t\t\t\t</judet>\n";

                }
                xmldata += `\t\t\t</${lunile_anului[month - 1]}> \n`;
            }
            //

            xmldata += `\t\t</${year}> \n`;
        }

        xmldata += `\t</${category}> \n`;
    }


    xmldata += "</data>";

    return xmldata;

}


function downloadxml(filename, xmlStringContent) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/xml;charset=utf-8,' + encodeURIComponent(xmlStringContent));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

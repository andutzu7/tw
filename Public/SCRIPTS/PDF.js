var canvas = document.getElementById('piechart_indemnizatie');


function genPDF() {
    var imgData = canvas.toDataURL("image/jpeg", 1.0);

    var doc = new jsPDF("p", "px", "a4");
    var width = 226;
    var height = 150;

    doc.fromHTML(document.getElementById('pieChartPDF_indemnizatie').innerHTML, 20, 50, {
        'width': 20
    });
    doc.addImage(imgData, 'JPEG', 0, 0, width, height);

    canvas1 = document.getElementById('piechart_gender_medii');
    imgData = canvas1.toDataURL("image/jpeg", 1.0);
    doc.fromHTML(document.getElementById('pieChartPDF_piechart_gender_medii').innerHTML, 20, 20, {
        'width': 80
    });
    doc.addImage(imgData, 'JPEG', 224, 0, width, height);

    canvas2 = document.getElementById('barchart_total');
    imgData = canvas2.toDataURL("image/jpeg", 1.0);
    doc.fromHTML(document.getElementById('barchart_total_PDF').innerHTML, 20, 20, {
        'width': 80
    });
    width = doc.internal.pageSize.getWidth();
    doc.addImage(imgData, 'JPEG', 0, 160, width, height);

    width = 150;
    canvas3 = document.getElementById('piechart_varste_educatie');
    imgData = canvas3.toDataURL("image/jpeg", 1.0);
    doc.fromHTML(document.getElementById('piechart_varste_educatie_PDF').innerHTML, 20, 20, {
        'width': 80
    });
    doc.addImage(imgData, 'JPEG', 0, 330, width, height)

    width = doc.internal.pageSize.getWidth() - 130;
    canvas4 = document.getElementById('barchart_varste_educatie');
    imgData = canvas4.toDataURL("image/jpeg", 1.0);
    doc.fromHTML(document.getElementById('barchart_varste_educatie_PDF').innerHTML, 20, 20, {
        'width': 80
    });
    doc.addImage(imgData, 'JPEG', 150, 330, width, height)

    doc.save('Chart-uri Somaj.pdf');


}

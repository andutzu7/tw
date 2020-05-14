var canvas = document.getElementById('pieChart');


function genPDF() {
    var imgData = canvas.toDataURL("image/jpeg", 1.0);
    
    var doc = new jsPDF("p", "px", "a4");
    var width = doc.internal.pageSize.getWidth();
    var height = 150;

    doc.fromHTML(document.getElementById('pieChartPDF').innerHTML, 20,500,{
                 'width':100});
    doc.addImage(imgData, 'JPEG', 0, 150);

    canvas1 = document.getElementById('lineBarChart');
    imgData = canvas1.toDataURL("image/jpeg", 1.0);
    doc.fromHTML(document.getElementById('barChartPDF').innerHTML, 20,20,{
        'width':100});
doc.addImage(imgData, 'JPEG', 0, 0, width,height);
    doc.save('Chart-uri Somaj.pdf');
    
	
}

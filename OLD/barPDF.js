var canvas = document.getElementById('lineBarChart');

function genPDF() {
	var imgData = canvas.toDataURL("image/jpeg", 1.0);
    var doc = new jsPDF();

    doc.fromHTML(document.getElementById('barChartPDF').innerHTML, 0,0,{
                 'width':0});
	doc.addImage(imgData, 'JPEG', 0, 0);
	doc.save('Test.pdf');
	
}
var canvas = document.getElementById('pieChart');

function genPDF() {
	var imgData = canvas.toDataURL("image/jpeg", 1.0);
    var doc = new jsPDF();

    doc.fromHTML(document.getElementById('testdiv').innerHTML, 20,20,{
                 'width':8000});
	doc.addImage(imgData, 'JPEG', 0, 0);
	doc.save('Test.pdf');
	
}
function showDiv(elem) {
    if(elem.selectedIndex != 0) {
         //hide the divs
         for(var i=0; i < divsO.length; i++) {
             divsO[i].style.display = 'none';
        }
        if(elem.selectedIndex == 0){
            divsO[0].style.display = 'none';
        }

        //unhide the selected div
        document.getElementById('hidden_div'+elem.value).style.display = 'block';
    }
}
 
window.onload=function() {
    //get the divs to show/hide
    divsO = document.getElementById("frmMyform").getElementsByTagName('div');
}
function showDiv(value) {
    for (var i = 0; i < divsO.length; i++) {
        divsO[i].style.display = 'none';
    }
    //unhide the selected div
    showButtons();
    document.getElementById('hidden_div' + value).style.display = 'block';
}
function showButtons() {
    let buttons = document.querySelectorAll('.button-group button');
    buttons.forEach(function (button) {
        button.style.display = 'block';
    });
//.button-group button
}

function hideButtons(){
    let buttons = document.querySelectorAll('.button-group button');
    buttons.forEach(function (button) {
        button.style.display = 'none';
    });
//.button-group button
}

window.onload = function () {
    //get the divs to show/hide
    divsO = document.getElementById("form-criterii").getElementsByTagName('div');

}


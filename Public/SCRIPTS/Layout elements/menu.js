
function display_menu(){
    document.getElementById("main-menu-container").style.display = 'block'
}

function hide_menu(){
    document.getElementById("main-menu-container").style.display = 'none'
}

function export_func(value){
    if(value == 'export'){
        return
    }
    mapper = {
        'csv': csvExp,
        'svg': download,
        'xml': xmlExp,
        'pdf': genPDF
    }

    mapper[value]()
}
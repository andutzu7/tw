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
    select_option_with_value('form-export', 'EXPORT')
}
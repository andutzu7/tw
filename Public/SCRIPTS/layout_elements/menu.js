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


function get_sharable_link(){
    a= 'http://127.0.0.1:3000/view/iasi?year=2020&month=4&judet=25&compare=1&total=total&categorie=medii'

    // year=2020
    // &month=4
    // &judet=25
    // &compare=1
    // &total=total
    // &categorie=medii

    config = {
        'judet': null,
        'an': selected_year,
        'luna': selected_month,
        'comparatie': null,
        'total': selected_total,
        'criteriu': selected_criteria
    }

    if(selected_county){
        config['judet'] = COUNTY_DICT[selected_county].toLowerCase()
    }
    if(compared_county){
        config['comparatie'] = COUNTY_DICT[compared_county].toLowerCase()
    }

    link = create_link_from_criteria(config)
    navigator.clipboard.writeText(link)
    .then(() => {
        console.log(`Link copied to clipboard : ${link}`);
    })
    .catch(err => {
        console.error('Could not copy text: ', err);
    });
}
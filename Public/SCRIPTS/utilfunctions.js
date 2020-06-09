
function parse_date(date) {
    let months = {
        'Ian': '1', 'Feb': '2', 'Mar': '3', 'Apr': '4', 'Mai': '5',
        'Iun': '6', 'Iul': '7', 'Aug': '8', 'Sep': '9', 'Oct': '10', 'Nov': '11', 'Dec': '12'
    };
    const split = date.split('-');
    let result = {};
    result['year'] = parseInt(split[0]);
    result['month'] = parseInt(months[split[1]]);
    return result;
}

//ia ca si parametru un dictionar  cu datele initiale si returneaza un dict cu labels si values
function generate_lables_data(dict) {   

    let result = {};
    for (let key in dict) {
        result[key] = {};
        let str = key;
        str = str.replace('_', '-');
        let match = str.match(/(\d+)/);
        if (match != null) {
            let index = str.indexOf(match[0]);
            str = str.substring(index, str.length);
        }
        if (str === '25')
            str = "sub 25";
        if (str === '55')
            str = "peste 55";
        result[key]['label'] = str;
        result[key]['value'] = dict[key];
    }
    return result;
}

function generate_data_dict(table, year, month, id_judet = null) {
    let dict = {}
    for (let row of table[year][month]) {
        if (id_judet == null || row.id_judet === id_judet) {
            for (let key in row) {
                if (['an', 'luna', 'id_judet'].indexOf(key) < 0) {
                    if (key in dict) {
                        dict[key] += row[key]
                    } else {
                        dict[key] = row[key]
                    }
                }
            }
        }
    }
    return dict;
}

function generate_data_dict_by_rows(rows, id_judet = null) {
    let dict = {}
    for (let row of rows) {
        if (id_judet == null || row.id_judet === id_judet) {
            for (let key in row) {
                if(key === 'total')
                    continue;
                if (['an', 'luna', 'id_judet'].indexOf(key) < 0) {
                    if (key in dict) {
                        dict[key] += row[key]
                    } else {
                        dict[key] = row[key]
                    }
                }
            }
        }
    }
    return dict;
}


function parse_link_param(current_link=null) {
    if(current_link == null){
        current_link = window.location.href;
    }
    //separam din link stringul cu criterii, apoi il transformam in array

    config = {
        'judet': null,
        'an': null,
        'luna': null,
        'comparatie': null,
        'total': null,
        'criteriu': null
    }
    url_attrs = current_link.split("?")
    if(url_attrs.length > 1){
        const attributes = url_attrs[1].split("&");
        attributes.forEach(function (entry) {
            attribute = entry.split("=")
            key = attribute[0]
            value = attribute[1]
            if(key in config){
                config[key] = value
            }
        });
    }

    if(config['judet']){
        config['judet'] = config['judet'].toUpperCase()
    }
    if(config['comparatie']){
        config['comparatie'] = config['comparatie'].toUpperCase()
    }

    return config;
}

function create_link_from_criteria(config) {
    const current_link = window.location.href;
    let page_link = current_link.split("?")[0].split(",");
    page_link += '?'; //needed
    for (const [key, value] of Object.entries(config)) {
        if(value){
            page_link += key;
            page_link += '=';
            page_link += value;
            page_link += '&';
        }
    }
    if(page_link.endsWith('&')){
        page_link = page_link.slice(0, -1);
    }
    if(page_link.endsWith('?')){
        page_link = page_link.slice(0, -1);
    }
    return page_link;
}
function parse_url(url){
    // format xml sau csv
    // luni 1..12
    // an
    // categorie
    // judete


    dict = {}

    // parse arguemnts

    return dict
}



exmaple_url = '/export?format=csv,xml&an=2020&categorii=rata,educatie&judete=alba,iasi'
expected = {
    'format': ['csv', 'xml'],
    'categorii': ['rata', 'educatie'],
    'judete': ['alba', 'iasi'],
    'an' : [2020]
}


console.log('output:')
console.log(parse_url(exmaple_url))
console.log('expected output:')
console.log(expected)

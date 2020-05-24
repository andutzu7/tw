function parse_url(url){
var url1 = require('url');
adr = url;
var q = url1.parse(adr, true);
console.log(q.query['format']);
  var  dict = {
  }
    return q.query;
}


exmaple_url = '/export?format=csv,xml&an=2020&categorii=rata,educatie&judete=alba,iasi'


//console.log('output:')
console.log(parse_url(exmaple_url))
const http = require('http');
const url = require('url');
const database = require('./scripts/database');


db = new database.Database('eu-cdbr-west-03.cleardb.net', 'b4ce0916cecd87', '0aa128f5', 'heroku_79d4353e46b22ee');

data = {}

connection = db.getConnection();

all_tables = ['varste', 'medii', 'educatie', 'rata', 'judete']

for(let table_name of all_tables){
    connection.query(`SELECT * FROM ${table_name}`, (err, rows) => {
        if (err) throw err;
        data[table_name] = JSON.parse(JSON.stringify(rows));
    });
}
connection.end()






const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
    valid_url = false;
    res.setHeader('Access-Control-Allow-Origin', '*');
    for(let table_name of all_tables){
        if(req.url.substring(1) == table_name){
            valid_url = true;
            console.log(req.url);

            res.end(JSON.stringify(data[table_name]))
            break;
        }
    }
    if(!valid_url){
        console.log("INVALID URL: " + req.url);
        res.end('INVALID URL')
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

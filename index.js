const http = require('http');
const mysql = require('mysql');
const fs = require('fs');

console.log(process.env.host)

pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});


data = {}
all_tables = ['varste', 'medii', 'educatie', 'rata', 'judete']

function update_data() {
    for (let index = 0; index < all_tables.length - 1; index++) {
        let table_name = all_tables[index]
        let query = `SELECT * FROM ${table_name} ORDER BY AN DESC, luna desc limit 504`
        pool.query(query, (err, rows) => {
            if (err) throw err;
            data[table_name] = JSON.parse(JSON.stringify(rows));
        });
    }

    let query = `SELECT * FROM judete`
    pool.query(query, (err, rows) => {
        if (err) throw err;
        data[`judete`] = JSON.parse(JSON.stringify(rows));
    });
    console.log('server reloaded data')
}


update_data();
const port = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
    console.log(req.url)
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.method == 'POST') {
        if (req.url == '/dev/reload_db') {
            update_data();
            res.end('SUCCESS')
        }
    }

    if (req.method == 'GET') {
        for (let table_name of all_tables) {
            if (req.url == `/${table_name}`) { 
                res.end(JSON.stringify(data[table_name]))
                return;
            }
        }


        if (req.url.startsWith('/view')) {

            const path = "Public/HTML/index.html";
            fs.readFile(path, function (err, html) {
                if (err) {
                    throw err;
                }
                res.end(html);
            });
        } else if (req.url.startsWith('/raport')) {

            const path = "Public/HTML/raport.html";
            fs.readFile(path, function (err, html) {
                if (err) {
                    throw err;
                }
                res.end(html);
            });
        }  
        else if(req.url == '/favicon.ico'){
            res.end('')
        }
        else{
            const path = "Public";
            const splitted_url = req.url.split(".");
            const extension = splitted_url[splitted_url.length - 1]; //workaround pt cazurile in care un fisier e de forma blabla.txt.js
            switch (extension) {
                case "css":
                    res.setHeader('Content-Type', 'text/css');
                    break;
                case "js":
                    res.setHeader('Content-Type', 'application/javascript');
                    break;
                case "html":
                    res.setHeader('Content-Type', 'text/html');
                    break;
                case "jpg":
                    res.setHeader('Content-Type', 'image/jpg');
                    break;
                case "png":
                    res.setHeader('Content-Type', 'image/png');
                    break;
            }
            fs.readFile(path + req.url, function (err, data) {
                if (err) {
                    // res.end(err)
                }
                res.end(data);
            });
        }
    }
});

server.listen(port);

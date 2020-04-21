const http = require('http');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'eu-cdbr-west-03.cleardb.net',
  user: 'b4ce0916cecd87',
  password: '0aa128f5',
  database: 'heroku_79d4353e46b22ee'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('connected to db');
});

connection.query('SELECT * FROM varste where id_judet=10', (err,rows) => {
    if(err) throw err;
  
    console.log('Data received from Db:');
    rows.forEach( (row) => {
        console.log(`luna: ${row.luna}, sub 25 ani: ${row.sub25}, peste 55: ${row.peste55}`);
      });
  });


const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

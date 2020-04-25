const mysql = require('mysql');


class Database {
    constructor(host, user, password, database) {
        this.host = host
        this.user = user
        this.password = password
        this.database = database
    }
        
    getConnection(){
        if (this.connection === undefined){
            this.db = mysql.createConnection({
                host: this.host,
                user: this.user,
                password: this.password,
                database: this.database
            });
    
            this.db.connect((err) => {
                if (err) throw err;
                console.log('connected to db');
            });
        }
        return this.db;
    }
}

module.exports = { Database }

const util = require('util');
const mysql = require('mysql');
const dbconf = require('./database.json')
let database;

exports.configure = () => {
    let pool = mysql.createPool({
        host: dbconf.host,
        user: dbconf.user,
        password: dbconf.password,
        database: "talky"
    });

    pool.getConnection((err, connection) => {
        if (err) {
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.error('Database connection was closed.')
            }
            if (err.code === 'ER_CON_COUNT_ERROR') {
                console.error('Database has too many connections.')
            }
            if (err.code === 'ECONNREFUSED') {
                console.error('Database connection was refused.')
            }
        }
        if (connection) connection.release()
        return
    })

    pool.query = util.promisify(pool.query);

    database = pool;
}

exports.execute = async (command) => {
    try{
        let query = await database.query(command);
        return query;
    }
    catch (error){
        return false;
    }
}
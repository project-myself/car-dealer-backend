const mysql = require('mysql2');

const {
    MYSQL_HOST: HOST,
    MYSQL_USER: USER,
    MYSQL_PASSWORD: PASSWORD,
    MYSQL_DB: DB,
} = process.env;

let pool;

const connection = mysql.createConnection({
    host: HOST,
    user: USER,
    database: DB,
    password: PASSWORD,
});

async function init() {
    return new Promise((acc, rej) => {
        connection.query(
            'CREATE TABLE IF NOT EXISTS car (id int, name varchar(255), model_id int)',
            (err) => {
                if (err) return rej(err);
                console.log(`Connected to mysql db at host ${HOST}`);
                acc();
            },
        );
    });
}

async function teardown() {
    return new Promise((acc, rej) => {
        pool.end((err) => {
            if (err) rej(err);
            else acc();
        });
    });
}

async function getCars() {
    return new Promise((acc, rej) => {
        pool.query('SELECT * FROM car', (err, rows) => {
            if (err) return rej(err);
            console.log('rows', rows);
            // acc(rows);
        });
    });
}

module.exports = {
    init,
    teardown,
    getCars,
};

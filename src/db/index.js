const mysql = require("mysql2");

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB } = process.env;

let pool;

const connection = mysql.createConnection({
  host: "mysql",
  user: MYSQL_USER,
  database: MYSQL_DB,
  password: MYSQL_PASSWORD,
  multipleStatements: true,
});

function init() {
  connection.query(
    `
      CREATE TABLE IF NOT EXISTS brand (id int NOT NULL AUTO_INCREMENT,
      name varchar(50),
      CONSTRAINT PK_brand PRIMARY KEY (id,
      name));

      CREATE TABLE IF NOT EXISTS model (id int NOT NULL AUTO_INCREMENT,
      brand_id int,
      name varchar(50),
      fuel_type varchar(15),
      engine_cc varchar(25),
      CONSTRAINT PK_model PRIMARY KEY (id,
      name),
      FOREIGN KEY (brand_id) REFERENCES brand(id));

      CREATE TABLE IF NOT EXISTS car (id int NOT NULL AUTO_INCREMENT,
      name varchar(50),
      model_id int,
      plate_number varchar(25),
      price int,
      PRIMARY KEY (id),
      FOREIGN KEY (model_id) REFERENCES model(id));

      CREATE TABLE IF NOT EXISTS user (id int NOT NULL AUTO_INCREMENT,
      name varchar(50),
      email varchar(50),
      CONSTRAINT PK_user PRIMARY KEY (id,
      email));

      CREATE TABLE IF NOT EXISTS customer (id int NOT NULL AUTO_INCREMENT,
      name varchar(50),
      email varchar(50),
      phone varchar(50),
      type varchar(50),
      CONSTRAINT PK_customer PRIMARY KEY (id,
      email,
      phone));

      CREATE TABLE IF NOT EXISTS inspection_form (id int NOT NULL AUTO_INCREMENT,
      inspector_id int,
      customer_id int,
      car_model_id int,
      status varchar(15),
      date_time timestamp,
      PRIMARY KEY (id),
      FOREIGN KEY (inspector_id) REFERENCES user(id),
      FOREIGN KEY (customer_id) REFERENCES customer(id),
      FOREIGN KEY (car_model_id) REFERENCES model(id));

      CREATE TABLE IF NOT EXISTS inspection_report (id int NOT NULL AUTO_INCREMENT,
      inspector_id int,
      car_id int,
      created_date timestamp,
      PRIMARY KEY (id),
      FOREIGN KEY (inspector_id) REFERENCES user(id));

      CREATE TABLE IF NOT EXISTS test_drive_form (id int NOT NULL AUTO_INCREMENT,
      customer_id int,
      car_id int,
      date_time timestamp,
      PRIMARY KEY (id),
      FOREIGN KEY (customer_id) REFERENCES customer(id),
      FOREIGN KEY (car_id) REFERENCES car(id));

      CREATE TABLE IF NOT EXISTS role (id int NOT NULL AUTO_INCREMENT,
      name varchar(50),
      CONSTRAINT PK_role PRIMARY KEY (id,
      name));

      CREATE TABLE IF NOT EXISTS permission (id int NOT NULL AUTO_INCREMENT,
      name varchar(50),
      CONSTRAINT PK_permission PRIMARY KEY (id,
      name));

      CREATE TABLE IF NOT EXISTS user_role (id int NOT NULL AUTO_INCREMENT,
      user_id int,
      role_id int,
      PRIMARY KEY (id),
      FOREIGN KEY (user_id) REFERENCES user(id),
      FOREIGN KEY (role_id) REFERENCES role(id));

      CREATE TABLE IF NOT EXISTS user_permission (id int NOT NULL AUTO_INCREMENT,
      user_id int,
      permission_id int,
      PRIMARY KEY (id),
      FOREIGN KEY (user_id) REFERENCES user(id),
      FOREIGN KEY (permission_id) REFERENCES permission(id));

      CREATE TABLE IF NOT EXISTS news (id int NOT NULL AUTO_INCREMENT,
      title varchar(50),
      content varchar(255),
      PRIMARY KEY (id));
    `,
    (err, result) => {
      console.log(`Connected to mysql db at host ${MYSQL_HOST}`, err, result);
    }
  );
}

async function getCars() {
  return new Promise((acc, rej) => {
    pool.query("SELECT * FROM car", (err, rows) => {
      if (err) return rej(err);
      console.log("rows", rows);
      // acc(rows);
    });
  });
}

module.exports = {
  init,
  getCars,
  connection,
};

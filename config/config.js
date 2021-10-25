require('dotenv').config();

module.exports ={
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": "localhost",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "b5e46014b694bb",
    "password": "90d90964",
    "database": "heroku_1f7c795ce39c311",
    "host": "us-cdbr-east-04.cleardb.com",
    "dialect": "mysql"
  }
}

require('dotenv').config();

const { DATABASE, USERNAME, PASSWORD, HOST, DB_PORT} = process.env;
module.exports =
{
  "development": {
    "username": USERNAME,
    "password": PASSWORD,
    "database": "fuelme_dev",
    "host": HOST,
    "port": DB_PORT,
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": PASSWORD,
    "database": "fuelme_test",
    "host": HOST,
    "dialect": "postgres"
  }
  // "production": {
  //   "username": "root",
  //   "password": PASSWORD,
  //   "database": "fuelme_prod",
  //   "host": HOST,
  //   "dialect": "postgres"
  // }
}

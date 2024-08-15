require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  dialect: process.env.DB_DIALECT,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.log(`error: ${error}`);
  });

module.exports = sequelize;

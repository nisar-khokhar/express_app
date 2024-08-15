const sequelize = require("../bin/DBConnection");
const users = require("./definitions/users");

const models = { users };

const db = {};

db.sequelize = sequelize;
sequelize.models = models;

module.exports = { db, models };

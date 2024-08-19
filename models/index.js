const sequelize = require("../bin/DBConnection");
const users = require("./definitions/users");
const roles = require("./definitions/roles");

roles.hasMany(users, { foreignKey: "roleId" });
users.belongsTo(roles, { foreignKey: "roleId" });

const models = { users, roles };

const db = {};

db.sequelize = sequelize;
sequelize.models = models;

module.exports = { db, models };

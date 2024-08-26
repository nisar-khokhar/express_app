const sequelize = require("../bin/DBConnection");
const users = require("./definitions/users");
const roles = require("./definitions/roles");
const sessions = require("./definitions/sessions");

roles.hasMany(users, { foreignKey: "roleId" });
users.belongsTo(roles, { foreignKey: "roleId" });

users.hasOne(users, { foreignKey: "userId" }); //1:1 relation btw users and sessions
sessions.belongsTo(users, { foreignKey: "userId" });

const models = { users, roles };

const db = {};

db.sequelize = sequelize;
sequelize.models = models;

module.exports = { db, models };

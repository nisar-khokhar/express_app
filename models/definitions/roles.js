const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/DBConnection");
const { v4: uuid } = require("uuid");

class roles extends Model {}

roles.init(
  {
    roleId: {
      type: DataTypes.STRING(60),
      primaryKey: true,
    },
    role: {
      type: DataTypes.ENUM, //datatype is strictly defined
      values: ["Instructor", "Admin", "Trainee"],
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    modelName: "roles",
    sequelize,
  }
);

module.exports = roles;

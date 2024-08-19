const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/DBConnection");

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

roles.beforeCreate(async (role) => {
  role.roleId = uuid();
});

module.exports = roles;

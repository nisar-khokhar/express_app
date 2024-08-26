const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/DBConnection");
const { v4: uuid } = require("uuid");
const { hash } = require("bcryptjs");
const roles = require("./roles");

class users extends Model {}

users.init(
  {
    userId: {
      type: DataTypes.STRING(60),
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(34),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(34),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(34),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(34),
      unique: true,
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING(34),
      unique: true,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: false,
      references: {
        model: roles,
        key: "roleId",
      },
    },
  },
  {
    timestamps: true,
    paranoid: true,
    modelName: "users",
    sequelize,
  }
);

users.beforeCreate(async (user) => {
  user.userId = uuid();
  user.password = await hash(user.password, 10);
});

users.afterCreate(async (user) => {
  delete user.dataValues.password;
});

module.exports = users;

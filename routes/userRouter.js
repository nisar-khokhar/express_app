var routes = require("express").Router();
const {
  getUser,
  get_all_users,
  create_user,
  deleteUser,
} = require("../controllers/userController");
const {
  createUserSchema,
  deleteUserSchema,
  getUserSchema,
} = require("../validations/users");

routes.get("/get-user", getUserSchema, getUser);
routes.get("/get-all-users", get_all_users);
routes.post("/create-user", createUserSchema, create_user);
routes.delete("/delete-user", deleteUserSchema, deleteUser);

module.exports = routes;

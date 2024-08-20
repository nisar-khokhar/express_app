var routes = require("express").Router();
const {
  get_user,
  get_all_users,
  create_user,
  delete_user,
} = require("../controllers/userController");
const { createUserSchema, userSchema } = require("../validations/users");

routes.get("/get-user", userSchema, get_user);
routes.get("/get-all-users", get_all_users);
routes.post("/create-user", createUserSchema, create_user);
routes.delete("/delete-user", userSchema, delete_user);

module.exports = routes;

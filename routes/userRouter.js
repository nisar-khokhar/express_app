var routes = require("express").Router();
const protected = require("../middleware");

const {
  get_user,
  get_all_users,
  create_user,
  delete_user,
  update_user,
  get_profile,
} = require("../controllers/userController");
const {
  createUserSchema,
  userSchema,
  getAllUserSchema,
  updateUserSchema,
} = require("../validations/users");

routes.get("/get-user", userSchema, get_user);
routes.get("/get-all-users", getAllUserSchema, get_all_users);
routes.post("/create-user", createUserSchema, create_user);
routes.delete("/delete-user", userSchema, delete_user);
routes.patch("/update-user", updateUserSchema, update_user);
routes.get("/get-profile", protected, get_profile);

module.exports = routes;

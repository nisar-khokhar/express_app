var routes = require("express").Router();
const { getAll, create } = require("../controllers/userController");
const { createUserSchema } = require("../validations/users");

routes.get("/get-all-users", getAll);
routes.post("/create-user", createUserSchema, create);

module.exports = routes;

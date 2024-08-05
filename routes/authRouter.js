var routes = require("express").Router();
const { login, logout } = require("../controllers/authController");
const { createAuthSchema } = require("../validations/auth");

routes.post("/login", createAuthSchema, login);
routes.post("/logout", logout);

module.exports = routes;

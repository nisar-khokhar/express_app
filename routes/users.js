var routes = require("express").Router();

routes.get("/create", (req, res) => {
  res.send("create user api");
});

/* GET users listing. */
routes.get("/update", function (req, res) {
  res.send("update user api");
});

routes.get("/delete", function (req, res) {
  res.send("delete user api");
});

routes.get("/read", function (req, res, next) {
  res.send("read user api");
});
module.exports = routes;

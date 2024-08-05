// var express = require("express");
// var router = express.Router();
var routes = require("express").Router();

routes.get("/get-home", (req, res) => {
  return res.send("Welcome to home page");
});

/* GET home page. 
routes.get("/", function (req, res, next) {
  res.send("My first express app");
});*/

module.exports = routes;

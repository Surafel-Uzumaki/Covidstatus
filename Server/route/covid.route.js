const express = require("express");
const route = express.Router();
const covidController = require("../controller/covid.controller");
route.get('/',covidController.getAll);
module.exports = route

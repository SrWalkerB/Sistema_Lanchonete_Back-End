
const express = require("express");
const login_Controllers = require("../Controllers/login_Controllers");

const login_route = express.Router();


login_route.post("/login", login_Controllers.login_Account);



module.exports = login_route;

const express = require("express");
const lanchonete_Controller = require("../Controllers/lanchonete_Controller");
const login_Controllers = require("../Controllers/login_Controllers");

const login_route = express.Router();


login_route.post("/login", login_Controllers.login_Account);

login_route.post("/login/create", lanchonete_Controller.create_Lanchonete);



module.exports = login_route;
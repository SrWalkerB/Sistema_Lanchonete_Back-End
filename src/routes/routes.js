
const express = require("express");
const menu_Controller = require("../Controllers/menu_Controller");

const routes = express.Router();


routes.get("/menu", menu_Controller.list_Menu);






module.exports = routes;
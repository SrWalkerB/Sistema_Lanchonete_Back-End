
const express = require("express");
const lanchonete_Controller = require("../Controllers/lanchonete_Controller");
const menu_Controller = require("../Controllers/menu_Controller");

const lanchonete_route = express.Router();


lanchonete_route.get("/menu", menu_Controller.list_Menu);

lanchonete_route.post("/create/lanchonete", lanchonete_Controller.create_Lanchonete);



module.exports = lanchonete_route;


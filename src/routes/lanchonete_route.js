
const express = require("express");
const lanchonete_Controller = require("../Controllers/lanchonete_Controller");
const menu_Controller = require("../Controllers/menu_Controller");
const { Autenticao } = require("./middlewares/autenticao");

const lanchonete_route = express.Router();


lanchonete_route.get("/menu", Autenticao, menu_Controller.list_Menu);



module.exports = lanchonete_route;


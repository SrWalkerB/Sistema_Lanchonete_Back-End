
const expres = require("express");
const cliente_Controllers = require("../Controllers/cliente_Controllers");

const cliente_route = expres.Router();


cliente_route.get("/menu", cliente_Controllers.list_Menu_Products);



module.exports = cliente_route;
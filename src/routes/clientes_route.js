
const expres = require("express");
const cliente_Controllers = require("../Controllers/cliente_Controllers");

const cliente_route = expres.Router();


cliente_route.get("/menu", cliente_Controllers.list_Menu_Products);

cliente_route.post("/cliente", cliente_Controllers.create_Account);



module.exports = cliente_route;
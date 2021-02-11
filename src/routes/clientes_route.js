
const expres = require("express");
const cliente_Controllers = require("../Controllers/cliente_Controllers");
const { Autenticao } = require("./middlewares/autenticao");

const cliente_route = expres.Router();



cliente_route.post("/cliente", cliente_Controllers.create_Account);

cliente_route.get("/cliente/my", Autenticao, cliente_Controllers.my_Data_Account);



module.exports = cliente_route;
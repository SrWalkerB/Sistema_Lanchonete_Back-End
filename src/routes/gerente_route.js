
const express = require("express");
const gerente_Controller = require("../Controllers/gerente_Controller");
const { Autenticao } = require("./middlewares/autenticao");
const { Autorizacao_ADM } = require("./middlewares/autorizacao");

const gerente_route = express.Router();


gerente_route.get("/clients", Autenticao, Autorizacao_ADM, gerente_Controller.list_Clientes_Cadastrados);

gerente_route.post("/menu/create", gerente_Controller.create_Pratos_Menu);

gerente_route.put("/menu/:id", gerente_Controller.update_Pratos_Menu);

gerente_route.delete("/menu/del/:id", gerente_Controller.delete_Pratos_Menu);



module.exports = gerente_route;



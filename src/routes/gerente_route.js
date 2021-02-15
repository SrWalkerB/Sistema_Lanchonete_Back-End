
const express = require("express");
const gerente_Controller = require("../Controllers/gerente_Controller");
const { Autenticao } = require("./middlewares/autenticao");
const { Autorizacao_ADM } = require("./middlewares/autorizacao");

const gerente_route = express.Router();


gerente_route.get("/clients", Autenticao, Autorizacao_ADM, gerente_Controller.list_Clientes_Cadastrados);

gerente_route.get("/pedidos", Autenticao, Autorizacao_ADM, gerente_Controller.list_Pedidos);

gerente_route.post("/menu/create", Autenticao, Autorizacao_ADM, gerente_Controller.create_Pratos_Menu);

gerente_route.put("/menu/:id_product", Autenticao, Autorizacao_ADM, gerente_Controller.update_Pratos_Menu);

gerente_route.delete("/menu/del/:id",Autenticao, Autorizacao_ADM, gerente_Controller.delete_Pratos_Menu);

gerente_route.get("/funcionarios", Autenticao, Autorizacao_ADM, gerente_Controller.list_Funcionarios);

gerente_route.post("/funcionarios", Autenticao, Autorizacao_ADM, gerente_Controller.create_Funcionarios);





module.exports = gerente_route;



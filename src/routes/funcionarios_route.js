
const express = require("express");
const funcionarios_Controllers = require("../Controllers/funcionarios_Controllers");
const gerente_Controller = require("../Controllers/gerente_Controller");
const { Autenticao } = require("./middlewares/autenticao");
const { Autorizacao_Funcionario } = require("./middlewares/autorizacao");

const funcionario_route = express.Router();


funcionario_route.get("/clientes", Autenticao, Autorizacao_Funcionario, funcionarios_Controllers.list_clientes);

funcionario_route.get("/pedidos", Autenticao, Autorizacao_Funcionario, funcionarios_Controllers.list_Pedidos);



module.exports = funcionario_route;
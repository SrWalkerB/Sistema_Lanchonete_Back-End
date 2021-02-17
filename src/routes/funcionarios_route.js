
const express = require("express");
const funcionarios_Controllers = require("../Controllers/funcionarios_Controllers");
const { Autenticao } = require("./middlewares/autenticao");
const { Autorizacao_Funcionario } = require("./middlewares/autorizacao");

const funcionario_route = express.Router();


funcionario_route.get("/clientes", Autenticao, Autorizacao_Funcionario, funcionarios_Controllers.list_clientes);

funcionario_route.get("/pedidos", Autenticao, Autorizacao_Funcionario, funcionarios_Controllers.list_Pedidos);

funcionario_route.post("/pedidos/status", Autenticao, Autorizacao_Funcionario, funcionarios_Controllers.list_Pedidos_Status);

funcionario_route.post("/pedidos/:id_pedido", Autenticao, Autorizacao_Funcionario, funcionarios_Controllers.status_Pedidos);

funcionario_route.get("/funcionarios/my", Autenticao, Autorizacao_Funcionario, funcionarios_Controllers.MyData);






module.exports = funcionario_route;
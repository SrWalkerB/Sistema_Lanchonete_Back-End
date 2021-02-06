
const express = require("express");
const lanchonete_Controller = require("../Controllers/lanchonete_Controller");

const lanchonete_route = express.Router();



lanchonete_route.post("/create/lanchonete", lanchonete_Controller.create_Lanchonete);



module.exports = lanchonete_route;


require("dotenv").config();
const express = require("express");
const cliente_route = require("./routes/clientes_route");
const gerente_route = require("./routes/gerente_route");
const lanchonete_route = require("./routes/lanchonete_route");
const login_route = require("./routes/login_route");

const app = express();


app.use(express.json());



app.use(login_route);

app.use(lanchonete_route);

app.use(gerente_route);

app.use(cliente_route);



module.exports = app;
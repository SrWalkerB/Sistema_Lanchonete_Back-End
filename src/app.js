require("dotenv").config();
const express = require("express");
const cliente_route = require("./routes/clientes_route");
const gerente_route = require("./routes/gerente_route");
const routes = require("./routes/routes");

const app = express();


app.use(express.json());


app.use(routes)

app.use(gerente_route);

app.use(cliente_route);


module.exports = app;
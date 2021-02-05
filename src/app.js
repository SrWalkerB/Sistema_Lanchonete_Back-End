const express = require("express");
const gerente_route = require("./routes/gerente_route");
const routes = require("./routes/routes");

const app = express();


app.use(express.json());


app.use(routes)

app.use(gerente_route);



module.exports = app;
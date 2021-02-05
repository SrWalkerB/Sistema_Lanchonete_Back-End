const knexfile = require("../../../knexfile");

const db_Actions = require("knex")(knexfile['development']);



module.exports = db_Actions



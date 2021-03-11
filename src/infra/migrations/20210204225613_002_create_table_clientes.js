const db_Actions = require("../config/db_Config");



exports.up = function(knex) {
    return db_Actions.schema.createTableIfNotExists("tb_clientes", table => {
        table.string('id_cliente');
        table.string("id_lanchonete").notNullable();
        table.string('name', 20).notNullable();
        table.string("surname", 50).notNullable();
        table.string("type").notNullable();
    })
};

exports.down = function(knex) {
    return db_Actions.schema.dropTableIfExists("tb_clientes")
};

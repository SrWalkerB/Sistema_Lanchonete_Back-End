const db_Actions = require("../config/db_Config");



exports.up = function(knex) {

    return db_Actions.schema.createTableIfNotExists("tb_clientes", table => {

        table.increments('id_cliente');
        table.string('name', 20).notNullable();
        table.string("surname", 50).notNullable();
        table.string("email").notNullable();
        table.string('password').notNullable();
        table.string("type").notNullable();
        table.integer("id_lanchonete").notNullable();
    })
};

exports.down = function(knex) {
  
    return db_Actions.schema.dropTableIfExists("tb_clientes")
};

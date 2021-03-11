const db_Actions = require("../config/db_Config");




exports.up = function(knex) {
    
    return db_Actions.schema.createTableIfNotExists("tb_pedidos", table => {

        table.string('id_lanchonete').notNullable();
        table.string("id_pedido").notNullable();
        table.string('id_prato').notNullable()
        table.string('id_cliente').notNullable();
        table.string("status").notNullable();

        table.timestamp("created_at").defaultTo(db_Actions.fn.now()).notNullable();
    })
};

exports.down = function(knex) {
  
    return db_Actions.schema.dropTableIfExists("tb_pedidos")
};

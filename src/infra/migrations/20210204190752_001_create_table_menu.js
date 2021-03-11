const db_Actions = require("../config/db_Config");



exports.up = function(knex) {
  
    return db_Actions.schema.createTableIfNotExists("tb_menu", table => {

        table.string("id_lanchonete").notNullable();
        table.string("id_products").notNullable();
        table.string("name").notNullable();
        table.string("description");
        table.float("price").notNullable();
    })
};

exports.down = function(knex) {
  
    return db_Actions.schema.dropTableIfExists("tb_menu");
};

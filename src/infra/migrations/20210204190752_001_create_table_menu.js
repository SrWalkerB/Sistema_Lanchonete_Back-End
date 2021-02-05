const db_Actions = require("../config/db_Config");



exports.up = function(knex) {
  
    return db_Actions.schema.createTableIfNotExists("tb_menu", table => {

        table.increments("id_products");
        table.string("name");
        table.string("description");
        table.float("price");
    })
};

exports.down = function(knex) {
  
    return db_Actions.schema.dropTableIfExists("tb_menu");
};

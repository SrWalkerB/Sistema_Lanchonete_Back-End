const db_Actions = require("../config/db_Config");



exports.up = function(knex) {
  
    return db_Actions.schema.createTableIfNotExists("tb_users", table => {

        table.increments("id_user").notNullable();
        table.integer("id_lanchonete").notNullable();
        table.string('email').notNullable();
        table.string("password").notNullable();
        table.string("type").notNullable();
    })
};


exports.down = function(knex) {
  
    return db_Actions.schema.dropTableIfExists("tb_users");
};

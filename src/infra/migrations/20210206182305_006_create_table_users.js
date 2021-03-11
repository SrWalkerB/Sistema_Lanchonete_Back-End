const db_Actions = require("../config/db_Config");



exports.up = function(knex) {
  
    return db_Actions.schema.createTableIfNotExists("tb_users", table => {

        table.string("id_user").notNullable();
        table.string("id_lanchonete").notNullable();
        table.string('email').notNullable();
        table.string("password").notNullable();
        table.string("type").notNullable();
    })
};


exports.down = function(knex) {
  
    return db_Actions.schema.dropTableIfExists("tb_users");
};

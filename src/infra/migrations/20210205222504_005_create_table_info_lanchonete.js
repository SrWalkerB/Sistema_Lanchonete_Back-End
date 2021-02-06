const db_Actions = require("../config/db_Config");


exports.up = function(knex) {
  
    return db_Actions.schema.createTableIfNotExists("tb_info_lanchonete", table => {

        table.increments('id_lanchonete');

        table.string('nome_empresarial').notNullable();
        table.string('descricao').notNullable();
        
    })
};

exports.down = function(knex) {
  
    return db_Actions.schema.dropTableIfExists("tb_info_lanchonete")
};

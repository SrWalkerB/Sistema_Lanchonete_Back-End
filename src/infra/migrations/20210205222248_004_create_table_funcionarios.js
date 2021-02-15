const db_Actions = require("../config/db_Config");


exports.up = function(knex) {
    
    return db_Actions.schema.createTableIfNotExists('tb_funcionarios', table => {

        table.integer('id_lanchonete').notNullable();
        table.integer('id_funcionario').notNullable();
        table.string('name', 20).notNullable();
        table.string('surname', 50).notNullable();
        table.string('type').notNullable();
    })
};

exports.down = function(knex) {
  
    return db_Actions.schema.dropTableIfExists('tb_funcionarios');
};

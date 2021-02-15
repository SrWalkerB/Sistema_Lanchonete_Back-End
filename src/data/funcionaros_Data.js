const db_Actions = require("../infra/config/db_Config")



module.exports = {

    list_Funcionarios_DB: async(id_lanchonete) => {

        return db_Actions("tb_funcionarios")
        .where("id_lanchonete", id_lanchonete);
    },

    create_Funcionario_DB: async(id_lanchonete, id_funcionario, name, surname, type) => {

        return await db_Actions("tb_funcionarios").insert({

            id_lanchonete: id_lanchonete,
            id_funcionario: id_funcionario,
            name: name,
            surname: surname,
            type: type
        })
    }
}
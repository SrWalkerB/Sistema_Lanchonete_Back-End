const db_Actions = require("../infra/config/db_Config")



module.exports = {

    create_Funcionario_DB: async(id_lanchonete, name, surname, type) => {

        return await db_Actions("tb_funcionarios").insert({

            id_lanchonete: id_lanchonete,
            name: name,
            surname: surname,
            type: type
        })
    }
}
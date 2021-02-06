const db_Actions = require("../infra/config/db_Config")



module.exports = {

    seacher_email_Funcionarios_DB: async(email) => {

        return await db_Actions("tb_funcionarios")
        .where("email", email);
    },

    create_Funcionario_DB: async(id_lanchonete, name, surname, email, password, type) => {

        return await db_Actions("tb_funcionarios").insert({

            id_lanchonete: id_lanchonete,
            name: name,
            surname: surname,
            email: email,
            password: password,
            type: type
        })
    }
}
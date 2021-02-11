const e = require("express");
const db_Actions = require("../infra/config/db_Config")



module.exports = {


    list_clients_DB: async(id_lanchonete) => {

        return db_Actions('tb_clientes')
        .where("id_lanchonete", id_lanchonete);
    },

    create_Clients_DB: async(name, surname, id_lanchonete) => {

        return db_Actions("tb_clientes").insert({

            id_lanchonete: id_lanchonete,
            name: name,
            surname: surname,
            type: "CLIENT"
        })
    },

    seacher_email_DB: async (email) => {

        return await db_Actions('tb_clientes')
        .where("email", email);
    }
}
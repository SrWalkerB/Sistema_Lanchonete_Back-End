const e = require("express");
const db_Actions = require("../infra/config/db_Config")



module.exports = {


    list_clients_DB: async() => {

        return db_Actions('tb_clientes');
    },

    create_Clients_DB: async(name, surname, email, password) => {

        return db_Actions("tb_clientes").insert({

            name: name,
            surname: surname,
            email: email,
            password: password
        })
    },

    seacher_email_DB: async(email) => {

        return await db_Actions('tb_clientes')
        .where("email", email);
    }
}
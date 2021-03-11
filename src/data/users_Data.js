const db_Actions = require("../infra/config/db_Config")




module.exports = {

    seacher_Mail_User_DB: async (email) => {

        return db_Actions("tb_users").where("email", email);
    },

    create_user_DB: async (id_lanchonete, id_user, email, password, type) => {
        return db_Actions("tb_users").insert({
            id_lanchonete: id_lanchonete,
            id_user: id_user,
            email: email,
            password: password,
            type: type
        })
    },

    seacher_User_DB: async (id_user) => {

        return await db_Actions("tb_users")
        .where("id_user", id_user);
    }
}


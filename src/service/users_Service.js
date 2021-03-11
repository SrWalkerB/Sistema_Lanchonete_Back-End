const uuid = require("uuid");
const users_Data = require("../data/users_Data")
const db_Actions = require("../infra/config/db_Config")



module.exports = {

    seacher_User_Mail_Service: async (email) => {

        return await users_Data.seacher_Mail_User_DB(email);
    },
    
    create_User_Service: async (id_lanchonete, id_user,email, password, type) => {

        return await users_Data.create_user_DB(id_lanchonete, id_user, email, password, type);
    },

    seacher_User_Service: async (id_user) => {

        const result = await users_Data.seacher_User_DB(id_user);

        if(result == "") return { err: "Usuário não encontrado" };

        return result;
    }
}
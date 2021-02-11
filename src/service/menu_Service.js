const menu_Data = require("../data/menu_Data");
const { verificaToken } = require("../utils/gerenciarToken");
const users_Service = require("./users_Service");



module.exports = {

    get_Menu_Service: async (token) => {

        const decoded = verificaToken(token);
        const userData = await users_Service.seacher_User_Service(decoded.id_user);
        const user_ID_lanchonete = userData[0].id_lanchonete;
        const menu = await menu_Data.list_menu_DB(user_ID_lanchonete);

        if(menu == ""){

            return { msg : "Nenhum Produto Cadastrado"};
        }

        return menu
    },

    create_Prato_Menu_Service: async (name, description, price, token) => {

        const data_Token = verificaToken(token);
        const user_Data = await users_Service.seacher_User_Service(data_Token.id_user);
        const user_ID_lanchonete = user_Data[0].id_lanchonete;
    
        const create = await menu_Data.create_prato_DB(name, description, price, user_ID_lanchonete);

        if(create <= 0){

            return { err: "Ocorreu um erro, tente mais tarde"}
        }
        
        return { msg: "Prato Criado!" }
    },

    update_Prato_Menu_Service: async(id_product, name, description, price, token) => {

        const data_Token = verificaToken(token);
        const user_Data = await users_Service.seacher_User_Service(data_Token.id_user);
        const user_ID_lanchonete = user_Data[0].id_lanchonete;

        const update = await menu_Data.update_prato_DB(user_ID_lanchonete, id_product, name, description, price);

        if(update <= 0){

            return { err: "Produto não encontrado" };
        }

        return { msg: "Produto Alterado" };
    },

    delete_Prato_Menu_Service: async (id_products, token) => {

        const data_Token = verificaToken(token);
        const user_Data = await users_Service.seacher_User_Service(data_Token.id_user);
        const user_ID_lanchonete = user_Data[0].id_lanchonete;

        const del = await menu_Data.delete_prato_DB(user_ID_lanchonete, id_products);

        if(del <= 0){

            return { err: "Prato não encontrado" }
        }

        return { msg : "Prato deletado!" }
    }
}
const menu_Data = require("../data/menu_Data")


module.exports = {

    get_Menu_Service: async () => {

        const menu = await menu_Data.list_menu_DB();

        if(menu == ""){

            return { msg : "Nenhum Produto Cadastrado"};
        }

        return menu
    },

    create_Prato_Menu_Service: async (name, description, price, id_lanchonete) => {

        const create = await menu_Data.create_prato_DB(name, description, price, id_lanchonete);

        if(create <= 0){

            return { err: "Ocorreu um erro, tente mais tarde"}
        }
        
        return { msg: "Prato Criado!" }
    },

    update_Prato_Menu_Service: async(id_lanchonete, id_product, name, description, price) => {

        const update = await menu_Data.update_prato_DB(id_lanchonete, id_product, name, description, price);

        if(update <= 0){

            return { err: "Produto não encontrado" };
        }

        return { msg: "Produto Alterado" };
    },

    delete_Prato_Menu_Service: async (id_lanchonete, id_products) => {

        const del = await menu_Data.delete_prato_DB(id_lanchonete, id_products);

        if(del <= 0){

            return { err: "Prato não encontrado" }
        }

        return { msg : "Prato deletado!" }
    }
}
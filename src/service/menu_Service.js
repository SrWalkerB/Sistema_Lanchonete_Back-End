const menu_Data = require("../data/menu_Data")


module.exports = {

    get_Menu: async () => {

        const menu = await menu_Data.list_menu_DB();

        if(menu == ""){

            return { msg : "Nenhum Produto Cadastrado"};
        }

        return menu
    },

    create_Prato_Menu: async (name, description, price) => {

        const create = await menu_Data.create_prato_DB(name, description, price);

        if(create <= 0){

            return { err: "Ocorreu um erro, tente mais tarde"}
        }
        
        return { msg: "Prato Criado!" }
    },

    update_Prato_Menu: async(id, name, description, price) => {

        const update = await menu_Data.update_prato_DB(id, name, description, price);

        if(update <= 0){

            return { err: "Produto não encontrado" };
        }

        return { msg: "Produto Alterado" };
    },

    delete_Prato_Menu: async (id) => {

        const del = await menu_Data.delete_prato_DB(id);

        if(del <= 0){

            return { err: "Prato não encontrado" }
        }

        return { msg: "Prato deletado!" }
    }
}
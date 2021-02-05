const db_Actions = require("../infra/config/db_Config")



module.exports = {

    list_menu_DB: async () => {

        return await db_Actions("tb_menu");
    },

    create_prato_DB: async (name, description, price) => {

        return await db_Actions("tb_menu").insert({

            name: name,
            description: description,
            price: price
        })
    },

    update_prato_DB: async(id, name, description, price) => {

        return db_Actions('tb_menu').where("id_products", id).update({

            name: name,
            description: description,
            price: price
        })
    },

    delete_prato_DB: async (id) => {

        return db_Actions("tb_menu")
        .where("id_products", id)
        .delete();        
    }
}
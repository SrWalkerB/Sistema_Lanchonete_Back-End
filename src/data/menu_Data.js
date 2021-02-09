const db_Actions = require("../infra/config/db_Config")



module.exports = {

    list_menu_DB: async () => {

        return await db_Actions("tb_menu");
    },

    create_prato_DB: async (name, description, price, id_lanchonete) => {

        return await db_Actions("tb_menu").insert({

            name: name,
            description: description,
            price: price,
            id_lanchonete: id_lanchonete
        })
    },

    update_prato_DB: async(id, name, description, price) => {

        return db_Actions('tb_menu').where("id_products", id).update({

            name: name,
            description: description,
            price: price
        })
    },

    delete_prato_DB: async (id_lanchonete, id_products) => {

        return db_Actions("tb_menu")
        .where("id_lanchonete", id_lanchonete)
        .where("id_products", id_products)
        .delete();        
    }
}
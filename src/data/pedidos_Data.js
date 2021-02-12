const db_Actions = require("../infra/config/db_Config")


module.exports = {

    list_pedidos_DB: async(id_lanchonete) => {

        return db_Actions('tb_pedidos')
        .where("id_lanchonete", id_lanchonete);
    },

    create_pedidos_DB: async(id_lanchonete, id_product, id_cliente) => {

        return db_Actions("tb_pedidos")
        .insert({
            
            id_lanchonete: id_lanchonete,
            id_prato: id_product,
            id_cliente: id_cliente
        })
    }

}
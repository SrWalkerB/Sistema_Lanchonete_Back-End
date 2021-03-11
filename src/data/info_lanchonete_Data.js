const db_Actions = require("../infra/config/db_Config")
const funcionaros_Data = require("./funcionaros_Data")


module.exports = {


    create_lanchonete_DB: async (id_lanchonete, name_empresarial, descricao) => {

        return await db_Actions("tb_info_lanchonete").insert({
            id_lanchonete: id_lanchonete,
            nome_empresarial: name_empresarial,
            descricao: descricao
        })
    },

    seacher_Lanchonete_ID_DB: async (id_lanchonete) => {

        return db_Actions('tb_info_lanchonete')
        .where("id_lanchonete", id_lanchonete);
    }
}
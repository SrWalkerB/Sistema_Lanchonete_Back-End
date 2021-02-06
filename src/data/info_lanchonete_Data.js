const db_Actions = require("../infra/config/db_Config")
const funcionaros_Data = require("./funcionaros_Data")


module.exports = {


    create_lanchonete_DB: async (name_empresarial, descricao) => {

        return await db_Actions("tb_info_lanchonete").insert({

            nome_empresarial: name_empresarial,
            descricao: descricao
        })
    }
}
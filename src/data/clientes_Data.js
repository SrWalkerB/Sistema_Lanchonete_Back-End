const db_Actions = require("../infra/config/db_Config")



module.exports = {


    list_clients_DB: async() => {

        return db_Actions('tb_clientes');
    }
}
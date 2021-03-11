const uuid = require('uuid');
const clientes_Data = require("../data/clientes_Data");
const funcionaros_Data = require("../data/funcionaros_Data");
const info_lanchonete_Data = require("../data/info_lanchonete_Data");
const cryptografarDados = require("../utils/cryptografarDados");
const users_Service = require("./users_Service");



module.exports = {

    seacher_Lanchonete_ID_Service: async (id_lanchonete) => {

        return await info_lanchonete_Data.seacher_Lanchonete_ID_DB(id_lanchonete);
    }
}
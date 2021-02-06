const clientes_Data = require("../data/clientes_Data");
const funcionaros_Data = require("../data/funcionaros_Data");
const info_lanchonete_Data = require("../data/info_lanchonete_Data");
const cryptografarDados = require("../utils/cryptografarDados");
const users_Service = require("./users_Service");



module.exports = {

    create_Lanchonete_Service: async (nome_empresarional, descricao, name, surname, email, password) => {

        const seacher_email_DB = await users_Service.seacher_User_Mail_Service(email);


        if(seacher_email_DB != ""){

            return { err: "Email já cadastrado" };
        }

        const type_User = "ADM";
        const password_cryptografado = cryptografarDados.cryptografarDados(password);
        const create_lanchonete = await info_lanchonete_Data.create_lanchonete_DB(nome_empresarional, descricao);
        const create_ADM = await funcionaros_Data.create_Funcionario_DB(create_lanchonete, name, surname, type_User);
        const create_User_ADM = await users_Service.create_User_Service(create_ADM, create_lanchonete, email, password_cryptografado, type_User);


        if(create_lanchonete < 0 || create_ADM < 0 || create_User_ADM < 0){

            return { err : "Ocorreu um erro, tente mais tarde" };
        }

        return { msg: "Lanchonete criada!" };
    },

    seacher_Lanchonete_ID_Service: async (id_lanchonete) => {

        return await info_lanchonete_Data.seacher_Lanchonete_ID_DB(id_lanchonete);
    }
}
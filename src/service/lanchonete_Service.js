const clientes_Data = require("../data/clientes_Data");
const funcionaros_Data = require("../data/funcionaros_Data");
const info_lanchonete_Data = require("../data/info_lanchonete_Data");
const cryptografarDados = require("../utils/cryptografarDados");



module.exports = {

    create_Lanchonete_Service: async (nome_empresarional, descricao, name, surname, email, password) => {

        const seacher_mail_client = await clientes_Data.seacher_email_DB(email);
        const seacher_mail_funcionarios = await funcionaros_Data.seacher_email_Funcionarios_DB(email);


        if(seacher_mail_funcionarios != "" || seacher_mail_client != ""){

            return { err: "Email já cadastrado" };
        }

        const password_cryptografado = cryptografarDados.cryptografarDados(password);
        const create_lanchonete = await info_lanchonete_Data.create_lanchonete_DB(nome_empresarional, descricao);
        const create_user_ADM = await funcionaros_Data.create_Funcionario_DB(create_lanchonete, name, surname, email, password_cryptografado, "ADM");



        if(create_lanchonete < 0 || create_user_ADM < 0){

            return { err : "Ocorreu um erro, tente mais tarde" };
        }

        return { msg: "Lanchonete criada!" };
    },

    seacher_Lanchonete_ID_Service: async (id_lanchonete) => {

        return await info_lanchonete_Data.seacher_Lanchonete_ID_DB(id_lanchonete);
    }
}
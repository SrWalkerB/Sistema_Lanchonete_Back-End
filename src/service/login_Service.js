const uuid = require("uuid");
const funcionaros_Data = require("../data/funcionaros_Data");
const info_lanchonete_Data = require("../data/info_lanchonete_Data");
const cryptografarDados = require("../utils/cryptografarDados");
const { verificar_Dados_Cryptografados } = require("../utils/cryptografarDados");
const { gerarToken } = require("../utils/gerenciarToken");
const users_Service = require("./users_Service");



module.exports = {

    login_Service: async (email, password) => {

        const seacher_Mail = await users_Service.seacher_User_Mail_Service(email);

        console.log(seacher_Mail);

        if(seacher_Mail == "") return { err: "Conta não encontrada" };

        const hash_Password = seacher_Mail[0].password;
        const verificar_Password = verificar_Dados_Cryptografados(password, hash_Password);

        if(verificar_Password){
            
            const id_user = seacher_Mail[0].id_user;
            const token = gerarToken(id_user)
            
            return { msg: "Login Realizado", token: token } 
        }

        return { err: "Conta não encontrada" };

    },

    create_Account_Lanchonete_Service: async (nome_empresarional, descricao, name, surname, email, password) => {

        const seacher_email_DB = await users_Service.seacher_User_Mail_Service(email);

        if(seacher_email_DB != "") return { err: "Email já cadastrado" };

        const type_User = "ADM";
        const id_lanchonete = uuid.v4();
        const id_ADM = uuid.v4();
        const password_cryptografado = cryptografarDados.cryptografarDados(password);

        await info_lanchonete_Data.create_lanchonete_DB(id_lanchonete, nome_empresarional, descricao);
        await funcionaros_Data.create_Funcionario_DB(id_lanchonete, id_ADM, name, surname, type_User);
        await users_Service.create_User_Service(id_lanchonete, email, password_cryptografado, type_User);

        return { msg: "Lanchonete criada!" };
    },

    
}
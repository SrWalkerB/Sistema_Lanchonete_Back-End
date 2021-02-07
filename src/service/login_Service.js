const { verificar_Dados_Cryptografados } = require("../utils/cryptografarDados");
const { gerarToken } = require("../utils/gerenciarToken");
const users_Service = require("./users_Service");



module.exports = {

    login_Service: async (email, password) => {

        const seacher_Mail = await users_Service.seacher_User_Mail_Service(email);

        if(seacher_Mail == ""){

            return { err: "Conta não encontrada" };
        }

        const hash_Password = seacher_Mail[0].password;
        const verificar_Password = verificar_Dados_Cryptografados(password, hash_Password);


        if(verificar_Password){
            
            const id_user = seacher_Mail[0].id_user;
            const token = gerarToken(id_user)
            
            return { msg: "Login Realizado", token: token } 
        }

        return { err: "Conta não encontrada" };

    }
}
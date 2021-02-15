const funcionaros_Data = require("../data/funcionaros_Data");
const cryptografarDados = require("../utils/cryptografarDados");
const { verificaToken } = require("../utils/gerenciarToken");
const users_Service = require("./users_Service");




module.exports = {

    list_Funcionarios_Service: async(token) => {

        const decoded = verificaToken(token);
        const user_ID = decoded.id_user;
        const user_Dados = await users_Service.seacher_User_Service(user_ID);
        const id_lanchonete = user_Dados[0].id_lanchonete;
        const funcionarios_list = await funcionaros_Data.list_Funcionarios_DB(id_lanchonete);

        if(funcionarios_list == ""){

            return { msg: "Nenhum funcionario cadastrado" }
        }

        return funcionarios_list;
    },

    create_Funcionarios_Service: async (name, surname, email, password, token) => {

        const verifica_Token = verificaToken(token);
        const seacher_user = await users_Service.seacher_User_Service(verifica_Token.id_user);
        const id_lanchonete = seacher_user[0].id_lanchonete;
        const verifica_Email = await users_Service.seacher_User_Mail_Service(email);
        const type = "funcionario";
        const password_Tratado = cryptografarDados.cryptografarDados(password);

        if(verifica_Email != ""){

            return { err: "Email já cadastrado" }; 
        }
        
        const create_User_ID = await users_Service.create_User_Service(id_lanchonete, email, password_Tratado, type);
        const create_Funcionario_ID = await funcionaros_Data.create_Funcionario_DB(id_lanchonete, create_User_ID, name, surname, type);

        if(create_Funcionario_ID != 0) {

            return { err: "Ocorreu um erro, Tente mais tarde" };
        }
        
        return { msg: "Funcionario Cadastrado" };
    }
}
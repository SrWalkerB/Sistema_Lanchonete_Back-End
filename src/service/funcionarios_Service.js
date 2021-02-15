const funcionaros_Data = require("../data/funcionaros_Data");
const cryptografarDados = require("../utils/cryptografarDados");
const { verificaToken } = require("../utils/gerenciarToken");
const lanchonete_Service = require("./lanchonete_Service");
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
    },

    my_Data_Service: async(token) => {

        const decoded = verificaToken(token);
        const user_ID = decoded.id_user;
        const user_My_Data = await users_Service.seacher_User_Service(user_ID);
        const lanchonete_ID = user_My_Data[0].id_lanchonete;
        const lanchonete_Data = await lanchonete_Service.seacher_Lanchonete_ID_Service(lanchonete_ID);
        const funcionarios_my_Data = await funcionaros_Data.seacher_Funcionario_ID(lanchonete_ID, user_ID);
        let dados_Formatados = [];

        dados_Formatados.push({

            "lanchonete": lanchonete_Data[0].nome_empresarial,
            "my_id": user_My_Data[0].id_user,
            "name": funcionarios_my_Data[0].name,
            "surname": funcionarios_my_Data[0].surname,
            "email": user_My_Data[0].email,
            "type": funcionarios_my_Data[0].type
        })


        return dados_Formatados;
    }
}
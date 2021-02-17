const clientes_Data = require("../data/clientes_Data");
const cryptografarDados = require("../utils/cryptografarDados");
const { verificaToken } = require("../utils/gerenciarToken");
const lanchonete_Service = require("./lanchonete_Service");
const users_Service = require("./users_Service");




module.exports = {

    list_Cliente_Service: async (token) => {

        const decoded = verificaToken(token);
        const userData = await users_Service.seacher_User_Service(decoded.id_user);
        const userLanchoenteID = userData[0].id_lanchonete;

        const clients = await clientes_Data.list_clients_DB(userLanchoenteID);

        if(clients == ""){

            return { msg: "Nenhum cliente cadastrado" }
        }


        return clients
    },

    create_Cliente_Service: async (name, surname, email, password, id_lanchonete) => {

        const seacher_mail = await users_Service.seacher_User_Mail_Service(email);
        const seacher_ID_Lanchonete = await lanchonete_Service.seacher_Lanchonete_ID_Service(id_lanchonete);
        
        if(seacher_mail != ""){

            return { err : "Email já cadastrado" }
        }

        if(seacher_ID_Lanchonete == ""){

            return { err: "Lanchoente não encontrada" };
        }

        const typeClient = "USER";
        const password_cryptografado = cryptografarDados.cryptografarDados(password);
        const client_ID = await clientes_Data.create_Clients_DB(name, surname, id_lanchonete);
        const create_User = await users_Service.create_User_Service(id_lanchonete, email, password_cryptografado, typeClient);
        
        if(client_ID < 0 || create_User < 0){

            return { err : "Ocorreu um erro, tente mais tarde" }
        } 

        return { msg : "Cadastro Concluido" }
    },

    seacher_Cliente_Token_Service: async(token) => {

        const decoded = verificaToken(token);
        const user_Data = await clientes_Data.seacher_Cliente_DB(decoded.id_user);
        const user_mail = await users_Service.seacher_User_Service(decoded.id_user);
        const lanchonete = await lanchonete_Service.seacher_Lanchonete_ID_Service(user_Data[0].id_lanchonete);
        let data_Formatado = [];

        if(user_Data == ""){

            return { err: "Client não encontrado"};
        }

        user_Data.map(result => {

            data_Formatado.push({

                "id": result.id_cliente,
                "lanchonete": lanchonete[0].nome_empresarial,
                "name": result.name,
                "surname": result.surname,
                "email": user_mail[0].email
            })
        })


        return { msg: data_Formatado };
    },

    seacher_Client_ID_Service: async(id) => {

        const client = await clientes_Data.seacher_Cliente_DB(id);

        if(client < 0){

            return { err: "Nenhum Cliente encontrado" };
        }

        return client;
    }


}
const clientes_Data = require("../data/clientes_Data");
const cryptografarDados = require("../utils/cryptografarDados");
const lanchonete_Service = require("./lanchonete_Service");
const users_Service = require("./users_Service");




module.exports = {

    list_Cliente_Service: async () => {

        const clients = await clientes_Data.list_clients_DB();


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
        const create_User = await users_Service.create_User_Service(client_ID, id_lanchonete, email, password_cryptografado, typeClient);
        
        if(client_ID < 0 || create_User < 0){

            return { err : "Ocorreu um erro, tente mais tarde" }
        } 

        return { msg : "Cadastro Concluido" }
    },


}
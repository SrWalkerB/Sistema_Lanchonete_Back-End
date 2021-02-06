const clientes_Data = require("../data/clientes_Data");
const cryptografarDados = require("../utils/cryptografarDados");
const lanchonete_Service = require("./lanchonete_Service");




module.exports = {

    list_Cliente_Service: async () => {

        const clients = await clientes_Data.list_clients_DB();


        if(clients == ""){

            return { msg: "Nenhum cliente cadastrado" }
        }

        return clients
    },

    create_Cliente_Service: async (name, surname, email, password, id_lanchonete) => {

        const seacher_mail = await clientes_Data.seacher_email_DB(email)
        const seacher_id_lanchoente = await lanchonete_Service.seacher_Lanchonete_ID_Service(id_lanchonete);
        
        if(seacher_mail != ""){

            return { err : "Email já cadastrado" }
        }

        if(seacher_id_lanchoente == ""){

            return { err: "Lanchonete não encontrada" };
        }


        const password_cryptografado = cryptografarDados.cryptografarDados(password);
        const createClient = await clientes_Data.create_Clients_DB(name, surname, email, password_cryptografado, "cliente", id_lanchonete);
        
        if(createClient == 0){

            return { err : "Ocorreu um erro, tente mais tarde" }
        } 

        return { msg : "Cadastro Concluido" }
    },


}
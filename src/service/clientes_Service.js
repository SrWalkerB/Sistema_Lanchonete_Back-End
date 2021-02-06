const clientes_Data = require("../data/clientes_Data");
const cryptografarDados = require("../utils/cryptografarDados");




module.exports = {

    list_Cliente_Service: async () => {

        const clients = await clientes_Data.list_clients_DB();


        if(clients == ""){

            return { msg: "Nenhum cliente cadastrado" }
        }

        return clients
    },


    create_Cliente_Service: async (name, surname, email, password) => {


        const seacher_mail = await clientes_Data.seacher_email_DB(email)
        

        if(seacher_mail != ""){

            return { err : "Email já cadastrado" }
        }

        const password_cryptografado = cryptografarDados.cryptografarDados(password);


        const createClient = await clientes_Data.create_Clients_DB(name, surname, email, password_cryptografado);
        
        
        if(createClient == 0){

            return { err : "Ocorreu um erro, tente mais tarde" }
        } 

        return { msg : "Cadastro Concluido" }
    }
}
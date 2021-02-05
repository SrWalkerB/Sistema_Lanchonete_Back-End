const clientes_Data = require("../data/clientes_Data")


module.exports = {

    list_Cliente_Service: async () => {

        const clients = await clientes_Data.list_clients_DB();


        if(clients == ""){

            return { msg: "Nenhum cliente cadastrado" }
        }

        return { msg: clients }
    }
}
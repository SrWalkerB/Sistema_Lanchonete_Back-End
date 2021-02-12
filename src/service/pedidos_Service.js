const pedidos_Data = require("../data/pedidos_Data");
const { verificaToken } = require("../utils/gerenciarToken");
const lanchonete_Service = require("./lanchonete_Service");
const users_Service = require("./users_Service");


module.exports = {

    get_Pedidos_Service: async (token) => {

        const decoded = verificaToken(token);
        const userData = await users_Service.seacher_User_Service(decoded.id_user);
        const id_lanchonete = userData[0].id_lanchonete;
        const lanchoneteData = await lanchonete_Service.seacher_Lanchonete_ID_Service(id_lanchonete);

        console.log(id_lanchonete);
        console.log(lanchoneteData);
        //Carregar a lanchonete

        //Pegar os dados tabela pedidos

        //Consultar os dados da tabela pedidos para retornar o produto e o cliente

        //Devolver os dados

        return token;
    },

    create_pedidos_Service: async(id_lanchonete, id_product, id_cliente) => {

        const create_pedido = await pedidos_Data.create_pedidos_DB(id_lanchonete, id_product, id_cliente);

        if(create_pedido <= 0){

            return { err: "Ocorreu um erro, Tente novamente" };
        } 
        
        return { msg: create_pedido };
    }
}
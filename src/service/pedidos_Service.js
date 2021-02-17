const moment = require("moment");
const pedidos_Data = require("../data/pedidos_Data");
const { verificaToken } = require("../utils/gerenciarToken");
const clientes_Service = require("./clientes_Service");
const lanchonete_Service = require("./lanchonete_Service");
const menu_Service = require("./menu_Service");
const users_Service = require("./users_Service");


module.exports = {

    get_All_Pedidos_Service: async (token) => {

        const decoded = verificaToken(token);
        const userData = await users_Service.seacher_User_Service(decoded.id_user);
        const id_lanchonete = userData[0].id_lanchonete;
        const lanchoneteData = await lanchonete_Service.seacher_Lanchonete_ID_Service(id_lanchonete);
        const pedidos = await pedidos_Data.list_pedidos_DB(id_lanchonete);
        let pedidosFormatados = [];

        for(let x = 0; x < pedidos.length; x++){
            
            moment.locale("pt-br")

            const data_formatada = moment(pedidos[x].created_at).format("LLLL")
            const prato_name = await menu_Service.seacher_Prato_Menu_ID_Service(id_lanchonete, pedidos[x].id_prato);
            const client = await clientes_Service.seacher_Client_ID_Service(pedidos[x].id_cliente);

            pedidosFormatados.push({

                "lanchonete": lanchoneteData[0].nome_empresarial,
                "id_pedido": pedidos[x].id_pedido,
                "id_prato": pedidos[x].id_prato,
                "prato": prato_name[0].name,
                "id_cliente": pedidos[x].id_cliente,
                "client": `${client[0].name} ${client[0].surname}`,
                "data": data_formatada,
                "status": pedidos[x].status
            })
        }

        return pedidosFormatados;
    },

    create_pedidos_Service: async(id_produto, token) => {

        const decoded = verificaToken(token);
        const userData = await users_Service.seacher_User_Service(decoded.id_user);
        const id_lanchonete = userData[0].id_lanchonete;
        const seacherProduto = await menu_Service.seacher_Prato_Menu_ID_Service(id_lanchonete, id_produto);

        if(seacherProduto.err){

            return { err: seacherProduto.err }; 
        }

        const id_product = seacherProduto[0].id_products;

        if(seacherProduto.err){

            return { err : seacherProduto.err };
        }

        const create_pedido = await pedidos_Data.create_pedidos_DB(id_lanchonete, id_product, decoded.id_user);

        if(create_pedido <= 0){

            return { err: "Ocorreu um erro, Tente novamente" };
        } 
        
        return { msg: "Pedido feito!" }; 
        
    },

    seacher_Pedido_ID_Service: async(id_lanchonete, id_pedido) => {

        const result = await pedidos_Data.list_Pedido_ID_DB(id_lanchonete, id_pedido);

        if(result == ""){
            
            return { err: "Pedido não encontrado" }
        }

        return result;
    },

    update_Pedido_ID_Service: async(id_lanchonete, id_pedido, status) => {

        const update_data = await pedidos_Data.update_Pedido_ID_DB(id_lanchonete, id_pedido, status);

        if(update_data <= 0){

            return { err: "Ocorreu um erro, tente mais tarde" }
        }

        return update_data;
    }
}
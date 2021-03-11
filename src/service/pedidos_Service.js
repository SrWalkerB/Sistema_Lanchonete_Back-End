const uuid = require("uuid");
const moment = require("moment");
const pedidos_Data = require("../data/pedidos_Data");
const { verificaToken } = require("../utils/gerenciarToken");
const Send_Mail_Recibo = require("../utils/sendMail");
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

    list_Pedidos_Status_Service: async(token, status) => {

        const decoded = verificaToken(token);
        const user_Data = await users_Service.seacher_User_Service(decoded.id_user);
        const lanchonete_ID = user_Data[0].id_lanchonete;
        const seacher_pedidos = await pedidos_Data.list_Pedido_Status(lanchonete_ID, status);
        let dados_formatado = [];

        if(seacher_pedidos == ""){

            return { err: "Não foi encontrado nenhum registro" };
        }

        for(let x = 0; x < seacher_pedidos.length; x++){

            const prato_dados = await menu_Service.seacher_Prato_Menu_ID_Service(lanchonete_ID, seacher_pedidos[x].id_prato);
            const client_dados = await clientes_Service.seacher_Client_ID_Service(seacher_pedidos[x].id_cliente);

            moment.locale("pt-br");
            const data_formatada = moment(seacher_pedidos[x].created_at).format("LLL");
 
            dados_formatado.push({

                id_pedido: seacher_pedidos[x].id_pedido,
                id_prato: seacher_pedidos[x].id_prato,
                prato: prato_dados[0].name,
                description: prato_dados[0].description,
                price: prato_dados[0].price,
                name: client_dados[0].name,
                surname: client_dados[0].surname,
                status: seacher_pedidos[x].status,
                data_pedido: data_formatada
            })
        }
        
        return dados_formatado;
    },

    create_pedidos_Service: async(id_produto, token) => {

        const decoded = verificaToken(token);
        const userData = await users_Service.seacher_User_Service(decoded.id_user);
        const [{id_lanchonete}] = userData;
        const lanchonete_info = await lanchonete_Service.seacher_Lanchonete_ID_Service(id_lanchonete);
        const seacherProduto = await menu_Service.seacher_Prato_Menu_ID_Service(id_lanchonete, id_produto);

        if(seacherProduto.err) return { err: seacherProduto.err }; 

        
        const id_pedido = uuid.v4();
        const [{ id_products }] = seacherProduto;
        const id_user = decoded.id_user

        await pedidos_Data.create_pedidos_DB(id_lanchonete, id_pedido, id_products, id_user);
        
        
        /* //Criando recibo e enviando email
        const name_lanchonete = lanchonete_info[0].nome_empresarial;
        const email_user = userData[0].email;
        const produto_send = seacherProduto[0].name;
        const description_send = seacherProduto[0].description;
        const recibo_mail = await Send_Mail_Recibo(name_lanchonete, email_user, produto_send, description_send); */

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
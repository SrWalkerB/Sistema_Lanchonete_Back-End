const uuid = require("uuid");
const funcionaros_Data = require("../data/funcionaros_Data");
const cryptografarDados = require("../utils/cryptografarDados");
const { verificaToken } = require("../utils/gerenciarToken");
const clientes_Service = require("./clientes_Service");
const lanchonete_Service = require("./lanchonete_Service");
const menu_Service = require("./menu_Service");
const pedidos_Service = require("./pedidos_Service");
const users_Service = require("./users_Service");


module.exports = {

    list_Funcionarios_Service: async(token) => {

        const decoded = verificaToken(token);
        const user_ID = decoded.id_user;
        const user_Dados = await users_Service.seacher_User_Service(user_ID);
        const [{ id_lanchonete }] = user_Dados;
        const funcionarios_list = await funcionaros_Data.list_Funcionarios_DB(id_lanchonete);

        if(funcionarios_list == ""){

            return { msg: "Nenhum funcionario cadastrado" }
        }

        return funcionarios_list;
    },

    create_Funcionarios_Service: async (name, surname, email, password, token) => {

        const verifica_Token = verificaToken(token);
        const seacher_user = await users_Service.seacher_User_Service(verifica_Token.id_user);
        const verifica_Email = await users_Service.seacher_User_Mail_Service(email);
        if(verifica_Email != "") return { err: "Email já cadastrado" }; 
       
        const [{ id_lanchonete }] = seacher_user;
        const type = "funcionario";
        const id_funcionario = uuid.v4();
        const password_Tratado = cryptografarDados.cryptografarDados(password);

        await users_Service.create_User_Service(id_lanchonete, id_funcionario, email, password_Tratado, type);
        await funcionaros_Data.create_Funcionario_DB(id_lanchonete, id_funcionario, name, surname, "type");

        return { msg: "Funcionario Cadastrado" };
    },

    my_Data_Service: async(token) => {

        const decoded = verificaToken(token);
        const user_ID = decoded.id_user;
        const user_My_Data = await users_Service.seacher_User_Service(user_ID);
        const [{ id_lanchonete }] = user_My_Data;
        const lanchonete_Data = await lanchonete_Service.seacher_Lanchonete_ID_Service(id_lanchonete);
        const funcionarios_my_Data = await funcionaros_Data.seacher_Funcionario_ID(id_lanchonete, user_ID);
        let dados_Formatados = [];

        const [{ nome_empresarial}] = lanchonete_Data;
        const [{ id_user, email, type }] = user_My_Data
        const [{ name, surname }] = funcionarios_my_Data
        
        dados_Formatados.push({

            "id_user": id_user,
            "lanchonete": nome_empresarial,
            "name": name,
            "surname": surname,
            "email": email,
            "type": type 
        })

        return dados_Formatados;
    },

    status_Pedidos_Service: async(id_pedido, status, token) => {

        const decoded = verificaToken(token);
        const user_ID = decoded.id_user;
        const user_Dados = await users_Service.seacher_User_Service(user_ID);
        const lanchonete_ID = user_Dados[0].id_lanchonete;
        const seacher_Pedido = await pedidos_Service.seacher_Pedido_ID_Service(lanchonete_ID, id_pedido);
        
        if(seacher_Pedido.err){
            
            return { err: seacher_Pedido.err };
        }
        
        const update_status = await pedidos_Service.update_Pedido_ID_Service(lanchonete_ID, id_pedido, status);

        if(update_status.err){
            
            return { err: update_status.err };
        }

        let dados_Formatados = [];
        const seacher_Pedido_Atualizado = await pedidos_Service.seacher_Pedido_ID_Service(lanchonete_ID, id_pedido);
        const client_dados = await clientes_Service.seacher_Client_ID_Service(seacher_Pedido_Atualizado[0].id_cliente);
        const prato_name = await menu_Service.seacher_Prato_Menu_ID_Service(lanchonete_ID, seacher_Pedido_Atualizado[0].id_prato);

        dados_Formatados.push({ 

            id_pedido: seacher_Pedido_Atualizado[0].id_pedido,
            prato: prato_name[0].name,
            id_cliente: client_dados[0].id_cliente,
            name: client_dados[0].name,
            surname: client_dados[0].surname,
            status: seacher_Pedido_Atualizado[0].status
            
        })

        return {status: "Atualizado", result: dados_Formatados[0]};
    }
}
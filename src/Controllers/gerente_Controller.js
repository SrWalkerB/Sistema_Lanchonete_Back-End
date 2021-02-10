const clientes_Service = require("../service/clientes_Service");
const menu_Service = require("../service/menu_Service");
const users_Service = require("../service/users_Service");
const { verificaToken } = require("../utils/gerenciarToken");


module.exports = { 

    list_Clientes_Cadastrados: async(Request, Response) => {

        const clients = await clientes_Service.list_Cliente_Service();


        return Response.status(200).json(clients);
    },

    create_Pratos_Menu: async(Request, Response) => {

        try {

            const token = Request.header("Token");
            const data_Token = verificaToken(token);

            const user_Data = await users_Service.seacher_User_Service(data_Token.id_user);
            const user_ID_lanchonete = user_Data[0].id_lanchonete;
    
            const { name, description, price } = Request.body;
            const create = await menu_Service.create_Prato_Menu_Service(name, description, price, user_ID_lanchonete);

            if(create.err){

                return Response.status(500).json(create.err);
            }
 
            return Response.status(200).json({ msg: create.msg})

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error })
        }

    },

    update_Pratos_Menu: async(Request, Response) => {

        try {
            
            //Pegando os dados o usuario
            const token = Request.header("Token");
            const data_Token = verificaToken(token);
            const user_Data = await users_Service.seacher_User_Service(data_Token.id_user);
            const user_ID_lanchonete = user_Data[0].id_lanchonete;

            //Pegando os Dados do body
            const { id_product } = Request.params;
            const { name, description, price } = Request.body;

            const update = await menu_Service.update_Prato_Menu_Service(user_ID_lanchonete, id_product, name, description, price);

            if(update.err){

                return Response.status(404).json({ err : update.err});
            }

            return Response.status(200).json({ msg : update.msg});

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    },

    delete_Pratos_Menu: async(Request, Response) => {

        try {
            
            const { id } = Request.params;

            const del = await menu_Service.delete_Prato_Menu_Service(id);

            if(del.err){

                return Response.status(200).json({ err : del.err});
            }

            return Response.status(200).json({ msg : del.msg});

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    }
}
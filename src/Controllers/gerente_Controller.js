const clientes_Service = require("../service/clientes_Service");
const menu_Service = require("../service/menu_Service");
const users_Service = require("../service/users_Service");
const { verificaToken } = require("../utils/gerenciarToken");


module.exports = { 

    list_Clientes_Cadastrados: async(Request, Response) => {

        const token = Request.header("Token");

        const clients = await clientes_Service.list_Cliente_Service(token);

        return Response.status(200).json(clients);
    },

    create_Pratos_Menu: async(Request, Response) => {

        try {

            const token = Request.header("Token");
            const { name, description, price } = Request.body;
            const create = await menu_Service.create_Prato_Menu_Service(name, description, price, token);

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


            //Pegando os Dados do body
            const { id_product } = Request.params;
            const { name, description, price } = Request.body;

            const update = await menu_Service.update_Prato_Menu_Service(id_product, name, description, price, token);

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

            const token = Request.header("Token");
            
            const { id } = Request.params;

            const del = await menu_Service.delete_Prato_Menu_Service(id, token);

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
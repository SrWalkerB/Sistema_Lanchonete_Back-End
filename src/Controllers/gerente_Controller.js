const clientes_Service = require("../service/clientes_Service");
const funcionarios_Service = require("../service/funcionarios_Service");
const menu_Service = require("../service/menu_Service");
const pedidos_Service = require("../service/pedidos_Service");


module.exports = { 

    list_Pedidos: async (Request, Response) => {

        try {
            
            const token = Request.header("Token");
            const pedidos = await pedidos_Service.get_Pedidos_Service(token)


            return Response.status(200).json(pedidos);

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
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
    },

    list_Funcionarios: async(Request, Response) => {

        try {
            
            const token = Request.header("Token");
            const dados = await funcionarios_Service.list_Funcionarios_Service(token);

            return Response.status(200).json(dados);

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    },

    create_Funcionarios: async(Request, Response) => {

        try {
            
            const token = Request.header("Token");
            const { name, surname, email, password } = Request.body; 
            
            const create_Funcionarios = await funcionarios_Service.create_Funcionarios_Service(name, surname, email, password, token);

            if(create_Funcionarios.err){

                return Response.status(404).json({ err: create_Funcionarios.err });
            }


            return Response.status(200).json({ msg: create_Funcionarios.msg });

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    }
}
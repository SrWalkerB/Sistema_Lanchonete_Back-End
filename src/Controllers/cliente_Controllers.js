const clientes_Service = require("../service/clientes_Service");
const pedidos_Service = require("../service/pedidos_Service");


module.exports = { 

    create_Account: async (Request, Response) => {

        try {

            const { name, surname, email, password, id_lanchonete } = Request.body;

            const create_User = await clientes_Service.create_Cliente_Service(name, surname, email, password, id_lanchonete);
            

            if(create_User.err){

                return Response.status(400).json({ err : create_User.err });
            }

            return Response.status(201).json({ msg: create_User.msg})

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    },

    my_Data_Account: async (Request, Response) => {

        try {
            
            const token = Request.header("Token");
            const user_Data = await clientes_Service.seacher_Cliente_Token_Service(token);

            if(user_Data.err){

                return Response.status(404).json({ err: user_Data.err });
            }

            return Response.status(200).json(user_Data.msg);

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    },

    create_Pedido: async(Request, Response) => {

        try {
            
            const token = Request.header("Token");
            const { id_produto } = Request.body;

            const pedido = await pedidos_Service.create_pedidos_Service(id_produto, token);

            if(pedido.err){

                return Response.status(404).json({ err: pedido.err });
            }
            

            return Response.status(200).json(pedido)

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    }
    
}
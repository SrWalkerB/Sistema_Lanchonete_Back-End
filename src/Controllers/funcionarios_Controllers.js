const clientes_Service = require("../service/clientes_Service");
const funcionarios_Service = require("../service/funcionarios_Service");
const pedidos_Service = require("../service/pedidos_Service");


module.exports = {

    list_clientes: async(Request, Response) => {

        try {
            
            const token = Request.header("Token");
            const clientes_DATA = await clientes_Service.list_Cliente_Service(token);

            return Response.status(200).json(clientes_DATA);

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }

    },

    list_Pedidos: async (Request, Response) => {

        try {
            
            const token = Request.header("Token");
            const pedidos = await pedidos_Service.get_All_Pedidos_Service(token)

            return Response.status(200).json(pedidos);

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    },

    list_Pedidos_Status: async(Request, Response) => {
        
        try {
            
            const token = Request.header("Token");
            const { status } = Request.body;

            const result = await pedidos_Service.list_Pedidos_Status_Service(token, status);

            if(result.err){

                return Response.status(404).json({ err: result.err });
            }

            return Response.status(200).json(result);

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    },

    status_Pedidos: async(Request, Response) => {

        try {
            
            const token = Request.header("Token");
            const { id_pedido } = Request.params;
            const { status } = Request.body;
            
            const result = await funcionarios_Service.status_Pedidos_Service(id_pedido, status, token);

            if(result.err){

                return Response.status(404).json({ err: result.err });
            }

            return Response.status(200).json(result); 

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    }
}
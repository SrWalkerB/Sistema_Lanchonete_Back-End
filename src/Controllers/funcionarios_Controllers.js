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
            const pedidos = await pedidos_Service.get_Pedidos_Service(token)

            return Response.status(200).json(pedidos);

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    },

    MyData: async (Request, Response) => {

        try {
            
            const token = Request.header("Token");

            const dados = await funcionarios_Service.my_Data_Service(token);

            return Response.status(200).json(dados);

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    }
}
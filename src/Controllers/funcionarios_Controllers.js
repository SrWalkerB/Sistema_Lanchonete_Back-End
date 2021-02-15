const clientes_Service = require("../service/clientes_Service")


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

    }
}
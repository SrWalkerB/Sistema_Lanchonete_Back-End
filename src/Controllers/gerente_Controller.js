const clientes_Service = require("../service/clientes_Service");
const menu_Service = require("../service/menu_Service");


module.exports = { 

    list_Clientes_Cadastrados: async(Request, Response) => {

        const clients = await clientes_Service.list_Cliente_Service();


        return Response.status(200).json(clients);
    },

    create_Pratos_Menu: async(Request, Response) => {

        try {
            
            const { name, description, price } = Request.body;

            const create = await menu_Service.create_Prato_Menu_Service(name, description, price);


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
            
            const { id } = Request.params;
            const { name, description, price } = Request.body;


            const update = await menu_Service.update_Prato_Menu_Service(id, name, description, price);

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
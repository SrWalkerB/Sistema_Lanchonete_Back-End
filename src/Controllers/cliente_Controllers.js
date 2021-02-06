const clientes_Service = require("../service/clientes_Service");
const menu_Service = require("../service/menu_Service")



module.exports = { 

    list_Menu_Products: async (Request, Response) => {

        try {

            const menu = menu_Service.get_Menu();

            if(menu.msg){

                return Response.status(200).json(menu.msg);
            }

            return Response.status(200).json(menu);
            
        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        } 
    },

    create_Account: async (Request, Response) => {

        try {

            const { name, surname, email, password } = Request.body;

            const create_User = await clientes_Service.create_Cliente_Service(name, surname, email, password);


            if(create_User.err){

                return Response.status(400).json({ err : create_User.err });
            }

            return Response.status(201).json({ msg: create_User.msg})

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    }
}
const menu_Service = require("../service/menu_Service");


module.exports = {

    list_Menu: async (Request, Response) => {

        try {
            
            const menu = await menu_Service.get_Menu_Service();

            return Response.status(200).json(menu);
        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    },
    
    
}
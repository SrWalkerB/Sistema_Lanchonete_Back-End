const menu_Service = require("../service/menu_Service")



module.exports = { 

    list_Menu_Products: async (Request, Response) => {

        const menu = menu_Service.get_Menu();

        if(menu.msg){

            return Response.status(200).json(menu.msg);
        }

        return Response.status(200).json(menu)
    }
}
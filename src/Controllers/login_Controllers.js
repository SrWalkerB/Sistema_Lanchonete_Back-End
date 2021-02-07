const login_Service = require("../service/login_Service");



module.exports = {

    login_Account: async(Request, Response) => {

        try {
            
            const { email, password } = Request.body;

            const seacher_Account = await login_Service.login_Service(email, password);

            
            if(seacher_Account.err){

                return Response.status(404).json({ err: seacher_Account.err})
            }


            Response.header("Token", seacher_Account.token);
            return Response.status(200).json({ msg: seacher_Account.msg });

        } catch (error) {
            
            console.log(error);
            return Response.status(200).json({ err: error });
        }
    }
}
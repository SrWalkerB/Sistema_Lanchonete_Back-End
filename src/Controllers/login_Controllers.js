


module.exports = {

    login_Account: async(Request, Response) => {

        try {
            
            const { email, password } = Request.body;


        } catch (error) {
            
            console.log(error);
            return Response.status(200).json({ err: error });
        }
    }
}
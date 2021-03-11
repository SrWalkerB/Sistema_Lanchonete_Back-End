const login_Service = require("../service/login_Service");


module.exports = {

    create_Lanchonete: async(Request, Response) => {

        try {
            
            const { nome_empresarial, descricao, name, surname, email, password } = Request.body;

            const create = await login_Service.create_Account_Lanchonete_Service(nome_empresarial, descricao, name, surname, email, password);

            if(create.err) return Response.status(400).json({ err: create.err });

            return Response.status(201).json({ msg: create.msg });
        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    }
}
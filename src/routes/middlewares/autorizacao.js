const users_Service = require("../../service/users_Service");
const gerenciarToken = require("../../utils/gerenciarToken");


module.exports = {

    Autorizacao_ADM: async (Request, Response, done) => {

        //Verificando Token

        const token = Request.header('Token');
        const verificaToken = gerenciarToken.verificaToken(token);

        if(verificaToken.err){

            return Response.status(403).json({ err: verificaToken.err });
        }

        //Verificando Tipo de usuario

        const seacher_user = await users_Service.seacher_User_Service(verificaToken.id_user);
        const type = seacher_user[0].type;

        console.log(type)


        if(type != "ADM"){

            return Response.status(401).json({ err: "User não autorizado" });
        }
                
        done();
    },

    Autorizacao_Funcionario: async (Request, Response, done) => {

        //Verificando Token

        const token = Request.header('Token');
        const verificaToken = gerenciarToken.verificaToken(token);

        if(verificaToken.err){

            return Response.status(403).json({ err: verificaToken.err });
        }

        //Verificando Tipo de usuario

        const seacher_user = await users_Service.seacher_User_Service(verificaToken.id_user);
        const type = seacher_user[0].type;


        if(type != "ADM" && type != "funcionario"){

            return Response.status(401).json({ err: "User não autorizado" });
        }
        
        done();
    }
}
const gerenciarToken = require("../../utils/gerenciarToken");


module.exports = {

    Autenticao: (Request, Response, done) => {

        const token = Request.header("Token");
        const verificaToken = gerenciarToken.verificaToken(token);

        if(verificaToken.err) return Response.status(403).json({ err: verificaToken.err });
        
        done();
    }
}
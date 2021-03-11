const jwt = require("jsonwebtoken");


module.exports = {

    gerarToken: (dado) => {

        const token = jwt.sign({ id_user: dado }, process.env.KEY, { expiresIn: "60m" });
        return token;
    },

    verificaToken: (token) => {

        const decoded = jwt.verify(token, process.env.KEY, (err, decoded) => {

            if(err) return { err: "Token inválido" };

            return decoded;
        })

        return decoded;
    }
}
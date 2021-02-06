const jwt = require("jsonwebtoken");


module.exports = {

    gerarToken: (dado) => {

        const token = jwt.sign({ id: dado }, process.env.KEY, { expiresIn: "30m" });

        return token;
    }
}
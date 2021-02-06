
const bcrypt = require('bcrypt');



module.exports = {

    cryptografarDados: (data) => {

        const salt = parseInt(process.env.SALT);

        return bcrypt.hashSync(data, salt);
    }
}

const nodemailer = require("nodemailer");

async function Send_Mail_Recibo(lanchonete_name, email_client, produto, description) {

    const transporter = nodemailer.createTransport({

        host: "smtp.ethereal.email",
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_MAIL,
            pass: process.env.PASSWORD_MAIL
        }
    })

    const mailOptions = {

        from: `"A ${lanchonete_name} agradece sua compra" <${lanchonete_name}@gmal.com>`,
        to: email_client,
        subject: "Seu Recibo de compra!",
        text: `1un: ${produto}, description: ${description}`,
        html: `<h1> Recibo de Compra </h1>
                <h2> 1x ${produto}</h2>
                <h3> ${description} </h3>
                <br>
                <h2>Agradecemos a preferência</h2>
        `
    }

    transporter.sendMail(mailOptions, (err, info) => {

        if(err) return { err: err };

        return { msg: "Sent" }
    })
}


module.exports = Send_Mail_Recibo
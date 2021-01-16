const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require("nodemailer");

const app = express()

app.use(cors())
app.use(express.json({ extended: true }))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

async function startApp () {
    try {
        app.post('/mail', async(req, res) => {
            const {email} = req.body
            const message = 'https://myaccount.google.com/lesssecureapps'
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'mail', // enter ure gmail address
                    pass: 'pass', // enter ure gmail pass
                },
            });   
            const send = {
                from: '"Express mail server" <napoleon.leopard1488@gmail.com>',
                to: `${email}`, 
                subject: "Hello ✔", 
                text: `${message}`, // plain text body of message
                html: `<b>${message}</b>`, // html body of message
            }
            // send mail with defined transport object
            let info = await transporter.sendMail(send)

            console.log("Message sent: %s", info.messageId)
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))

            res.send('Email sent!')
        })
        app.listen(6000)
        console.log(`Express server was started`)
    } catch (err) {
        console.log(err.message)
    }
}

startApp()

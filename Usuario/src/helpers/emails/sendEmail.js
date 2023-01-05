import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
    host: process.env.AWS_SES_HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.AWS_SES_USER,
        pass: process.env.AWS_SES_PASSWORD
    }
})


const sendEmailParams = { from: '', to: '', subject: '', html: '' }
const sendEmail = async (data = sendEmailParams) => {
    try {
        const { from, to, subject, html } = data

        const sended = await transporter.sendMail({
            from: from,
            to: to,
            subject: subject,
            html: `${html}`
        })

        return sended
    } catch (error) {
        console.log('Error al enviar el correo (sendEmail)', error)

        return error
    }
}


export default sendEmail
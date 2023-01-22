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

const params = { from: '', to: '', subject: '', html: '' }
export const enviarCorreo = async (data = params) => {
    const { from, to, subject, html } = data

    const sended = await transporter.sendMail({
        from: from,
        to: to,
        subject: subject,
        html: html
    })

    return sended
}
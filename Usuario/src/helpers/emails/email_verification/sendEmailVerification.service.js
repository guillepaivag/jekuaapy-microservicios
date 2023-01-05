import admin from '../../../../firebase-service/firebase-admin.js'
import generateHtmlEmailVerification from './utils/generateHtmlEmailVerification.js'
import sendEmail from '../sendEmail.js'

const sendEmailVerification = async (email = '') => {

    try {
        const linkVerification = await admin.auth().generateEmailVerificationLink(email)
        
        const htmlEmailVerification = generateHtmlEmailVerification(email, linkVerification)

        return await sendEmail({
            from: 'jekuaateam@gmail.com',
            to: email,
            subject: 'Verificación de correo de Jekuaapy.',
            html: htmlEmailVerification
        })

    } catch (error) {
        console.log(`ERROR AL ENVIAR EL EMAIL DE VERIFICACION A ${email}`, error)
    }
    
}

export default sendEmailVerification
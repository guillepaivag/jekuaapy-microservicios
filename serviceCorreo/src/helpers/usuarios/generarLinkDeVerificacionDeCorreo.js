import firebaseAuthenticationService from "../../../firebase-service/firebase-authentication-service.js"

export const generarLinkDeVerificacionDeCorreo = async (correo = '') => {
    return await firebaseAuthenticationService.generateEmailVerificationLink(correo)
}
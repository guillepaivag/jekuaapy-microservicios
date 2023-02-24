import { request, response } from 'express'
import firebaseAuthenticationService from '../../firebase-service/firebase-authentication-service.js'
import { verificarTokenDeAutenticacionDeServicio } from '../helpers/verificarTokenDeAutenticacionDeServicio.js'

export const estaAutenticadoUsuarioServicio = async (req = request, res = response, next) => {
    const { authorization } = req.headers
    req.body.solicitante = {}

    let authToken = null
    if (authorization && authorization.split(' ')[0] === 'Bearer') authToken = authorization.split(' ')[1]
    req.body.solicitante.authToken = authToken

    try {
        // Verificar autenticacion de servicio
        const tokenVerificado = verificarTokenDeAutenticacionDeServicio(authToken)
        if (tokenVerificado.isService) {
            req.body.solicitante.tipo = 'servicio'
            req.body.solicitante.uidSolicitante = tokenVerificado.idService
        } else {
            // Verificar autenticacion de usuario
            const usuarioSolicitanteVerificado = await verificarAutenticacionDeUsuario(authToken)
            req.body.solicitante.tipo = 'usuario'
            req.body.solicitante.uidSolicitante = usuarioSolicitanteVerificado.uidSolicitante
            req.body.solicitante.authSolicitante = usuarioSolicitanteVerificado.authSolicitante
        }

        return next()

    } catch ( error ) {
        console.log('error', error)
        next(error)
    }
    
    
}

const verificarAutenticacionDeUsuario = async (authToken) => {
    const userInfo = await firebaseAuthenticationService.verifyIdToken(authToken)
    const uidSolicitante = userInfo.uid

    const authSolicitante = await firebaseAuthenticationService.getUser( userInfo.uid )

    return { uidSolicitante, authSolicitante }
}
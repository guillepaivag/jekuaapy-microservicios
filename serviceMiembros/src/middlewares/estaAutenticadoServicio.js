import { request, response } from 'express'
import { verificarTokenDeAutenticacionDeServicio } from '../helpers/verificarTokenDeAutenticacionDeServicio.js'
import RespuestaError from '../models/Respuestas/RespuestaError.js'

export const estaAutenticadoServicio = async (req = request, res = response, next) => {
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
            
            return next()
        }

        throw new RespuestaError({
            estado: 400, 
            mensajeCliente: 'no_es_servicio', 
            mensajeServidor: 'El solicitante no es un servicio.', 
            resultado: null
        })

    } catch ( error ) {
        console.log('error', error)
        next(error)
    }
}
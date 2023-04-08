import { request, response } from 'express'
import { verificarTokenDeServicio } from '../helpers/verificarTokenDeServicio.js'
import RespuestaError from '../models/Respuestas/RespuestaError.js'

export const estaAutenticadoServicio = async (req = request, res = response, next) => {
    const { authorization } = req.headers
    req.body.solicitante = {}

    let authToken = null
    if (authorization && authorization.split(' ')[0] === 'Bearer') authToken = authorization.split(' ')[1]
    req.body.solicitante.authToken = authToken

    try {
        // Verificar autenticacion de servicio
        const result = await verificarTokenDeServicio(authToken)
        if (result === 'servicio_no_autorizado') {
            throw new RespuestaError({
                estado: 401, 
                mensajeCliente: 'servicio_no_autorizado', 
                mensajeServidor: 'El servicio solicitante no es un servicio válido.', 
                resultado: null
            })
        }

        req.body.solicitante.tipo = 'servicio'
        // req.body.solicitante.uidSolicitante = tokenVerificado.idService

        return next()

    } catch ( error ) {
        console.log('error', error)
        next(error)
    }

}
import { request, response } from "express"
import RespuestaError from "../models/Respuestas/RespuestaError"

// throw new RespuestaError({
//     estado: 400, 
//     mensajeCliente: 'tipo_restauracion_no_existe', 
//     mensajeServidor: 'No es un tipo de restauracián de foto de perfil válida.', 
//     resultado: null
// })

export const verificarSolicitudDeMiembroInterno = (req = request, res = response, next) => {
    const { params, body } = req
    const { solicitante, correoMiembroNuevo } = body

    try {
        // MIEMBRO_INTERNO-TODO: Verificar permisos del solicitante (es propietario o editor)

        // MIEMBRO_INTERNO-TODO: Verificar existencia del [correoMiembroNuevo]

        // MIEMBRO_INTERNO-TODO: Verificar que el usuario no forme parte del equipo o este en estado pendiente

        next()
    } catch (error) {
        next(error)
    }
}

export const verificarObtencionMiembroInterno = (req = request, res = response, next) => {
    const { params, body } = req
    const { solicitante } = body
    try {
        // MIEMBRO_INTERNO-TODO: 

        next()
    } catch (error) {
        next(error)
    }
}

export const verificarActualizacionMiembroInterno = (req = request, res = response, next) => {
    const { params, body } = req
    const { solicitante } = body

    try {
        // MIEMBRO_INTERNO-TODO: 

        next()
    } catch (error) {
        next(error)
    }
}

export const verificarEliminacionMiembroInterno = (req = request, res = response, next) => {
    const { params, body } = req
    const { solicitante } = body

    try {
        // MIEMBRO_INTERNO-TODO: 

        next()
    } catch (error) {
        next(error)
    }
}
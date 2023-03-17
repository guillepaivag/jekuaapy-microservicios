import { request, response } from "express"
import RespuestaError from "../models/Respuestas/RespuestaError.js"
import { constructorMIECreacion } from "./helpers/miembroInternoEquipo/constructorMIECreacion.js"
import { verificadorCreacionMIE } from "./helpers/miembroInternoEquipo/verificadorCreacionMIE.js"
import { verificadorObtencionMiembro } from "./helpers/miembroInternoEquipo/verificadorObtencionMiembro.js"
import { verificadorSolicitudMiembro } from "./helpers/miembroInternoEquipo/verificadorSolicitudMiembro.js"

export const verificarCreacionDeMiembroInterno = async (req = request, res = response, next) => {
    const { params, body, timeOfRequest } = req
    const { solicitante, miembroNuevo } = body

    try {
        // Validar los datos - [uid, uidEquipo, roles, estado, fechaCreacion]
        const data = await verificadorCreacionMIE(miembroNuevo)
        if (data.respuestaError instanceof RespuestaError) throw data.respuestaError

        // Construir el miembro nuevo
        miembroNuevo.fechaCreacion = timeOfRequest
        const { miembroInternoEquipoVerificado } = constructorMIECreacion(miembroNuevo)
        
        req.body.miembroInternoEquipoVerificado = miembroInternoEquipoVerificado

        next()
    } catch (error) {
        next(error)
    }
}

export const verificarSolicitud = async (req = request, res = response, next) => {
    const { params, body } = req
    const { solicitante, uidEquipo, correoMiembroNuevo, roles } = body

    try {
        const data = await verificadorSolicitudMiembro(solicitante, uidEquipo, correoMiembroNuevo, roles)
        if (data.respuestaError instanceof RespuestaError) throw data.respuestaError

        const { usuarioMiembroNuevo, miembroNuevo } = data.data
        req.body.usuarioMiembroNuevo = usuarioMiembroNuevo
        req.body.miembroNuevo = miembroNuevo

        next()
    } catch (error) {
        next(error)
    }
}

export const verificarAceptacionDeSolicitud = (req = request, res = response, next) => {
    const { params, body } = req
    const { tokenSolicitud } = params
    try {
        // MIEMBRO_INTERNO-TODO: Verificar que el token de solicitud sea valido

        next()
    } catch (error) {
        next(error)
    }
}

export const verificarObtencionMiembroInterno = async (req = request, res = response, next) => {
    const { params, body } = req
    const { uidEquipo, uidMiembro } = params
    const { solicitante } = body
    
    try {
        const data = await verificadorObtencionMiembro(solicitante, uidEquipo, uidMiembro)
        if (data.respuestaError instanceof RespuestaError) throw data.respuestaError

        next()
    } catch (error) {
        next(error)
    }
}

export const verificarActualizacionMiembroInterno = (req = request, res = response, next) => {
    const { params, body } = req
    const { solicitante } = body

    try {
        if ( solicitante.tipo === 'usuario' ) {
            // MIEMBRO_INTERNO-TODO: Verificar que el usuario sea propietario o editor
           
            
        }

        // MIEMBRO_INTERNO-TODO: Verificar los datos de solicitud [roles, estado]


        return next()
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
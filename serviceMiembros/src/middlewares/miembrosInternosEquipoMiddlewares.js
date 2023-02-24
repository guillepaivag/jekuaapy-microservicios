import { request, response } from "express"
import { constructorMIECreacion } from "./helpers/miembroInternoEquipo/constructorMIECreacion.js"
import { verificadorCreacionMIE } from "./helpers/miembroInternoEquipo/verificadorCreacionMIE.js"
import { verificadorObtencionMiembro } from "./helpers/miembroInternoEquipo/verificadorObtencionMiembro.js"
import { verificadorSolicitudMiembro } from "./helpers/miembroInternoEquipo/verificadorSolicitudMiembro.js"

export const verificarCreacionDeMiembroInterno = async (req = request, res = response, next) => {
    const { params, body, timeOfRequest } = req
    const { solicitante, miembroNuevo } = body

    try {
        // Validar los datos - [uid, uidEquipo, rol, estado, fechaCreacion]
        const respuestaError = await verificadorCreacionMIE(miembroNuevo)
        if (respuestaError) throw respuestaError

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
    const { solicitante, uidEquipo, correoMiembroNuevo } = body

    try {
        const respuestaError = await verificadorSolicitudMiembro(solicitante, uidEquipo, correoMiembroNuevo)
        if (respuestaError) throw respuestaError

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
        const respuestaError = await verificadorObtencionMiembro(solicitante, uidEquipo, uidMiembro)
        if (respuestaError) throw respuestaError

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

        // MIEMBRO_INTERNO-TODO: Verificar los datos de solicitud [rol, estado]


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
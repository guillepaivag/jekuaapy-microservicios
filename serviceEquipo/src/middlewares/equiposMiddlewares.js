import { request, response } from "express"
import { verificadorCreacionEquipo } from "./helpers/equipos/verificadorCreacionEquipo.js"
import { constructorEquipoCreacion } from "./helpers/equipos/constructorEquipoCreacion.js"
import { verificadorActualizacionEquipo } from "./helpers/equipos/verificadorActualizacionEquipo.js"
import { constructorEquipoActualizacion } from "./helpers/equipos/constructorEquipoActualizacion.js"
import RespuestaError from "../models/Respuestas/RespuestaError.js"

export const verificarCreacionEquipo = async (req = request, res = response, next) => {
    const { params, body, timeOfRequest } = req
    const { solicitante, equipoNuevo } = body

    try {
        if ( !solicitante.authSolicitante.emailVerified ) {
            return new RespuestaError({
                estado: 400, 
                mensajeCliente: 'correo_no_verificado', 
                mensajeServidor: 'El email no está verificado.', 
                resultado: null
            })
        }

        // Datos requeridos para crear un equipo: codigo, nombre, descripcion
        const respuestaError = await verificadorCreacionEquipo(equipoNuevo)
        if (respuestaError) throw respuestaError

        equipo.responsable = solicitante.uidSolicitante
        equipo.fechaCreacion = timeOfRequest
        const { equipoNuevoVerificado } = constructorEquipoCreacion(equipoNuevo)
        
        req.body.equipoNuevoVerificado = equipoNuevoVerificado

        next()
    } catch (error) {
        next(error)
    }
}

export const verificarObtencionEquipo = async (req = request, res = response, next) => {
    const { params, body } = req
    const { solicitante } = body

    try {
        // Si el usuario es miembro del equipo, puede ver todos los datos
        // Si no esta logeado o no es miembro del equipo, solo puede ver los datos de manera parcial
        // EQUIPO-TODO: Verificar si el solicitante puede ver todos los datos o no
        const esMiembroDelEquipo = { value: false }

        next()
    } catch (error) {
        next(error)
    }
}

export const verificarActualizacionEquipo = async (req = request, res = response, next) => {
    const { params, body } = req
    const { solicitante, equipoActualizado } = body

    try {
        if ( !solicitante.authSolicitante.emailVerified ) {
            return new RespuestaError({
                estado: 400, 
                mensajeCliente: 'correo_no_verificado', 
                mensajeServidor: 'El email no está verificado.', 
                resultado: null
            })
        }

        // Datos que se actualizan: codigo, nombre, descripcion
        const respuestaError = await verificadorActualizacionEquipo(params.uid, equipoActualizado)
        if (respuestaError) throw respuestaError

        // EQUIPO-TODO: El solicitante tiene que ser un miembro del equipo 
        
        // EQUIPO-TODO: El solicitante tiene que ser [propietario o editor] del equipo

        const { equipoActualizadoVerificado } = constructorEquipoActualizacion(equipoActualizado)
        req.body.equipoActualizadoVerificado = equipoActualizadoVerificado

        next()
    } catch (error) {
        next(error)
    }
}

export const verificarEliminacionEquipo = async (req = request, res = response, next) => {
    const { params, body } = req
    const { solicitante } = body

    try {
        if ( !solicitante.authSolicitante.emailVerified ) {
            return new RespuestaError({
                estado: 400, 
                mensajeCliente: 'correo_no_verificado', 
                mensajeServidor: 'El email no está verificado.', 
                resultado: null
            })
        }

        // EQUIPO-TODO: El solicitante tiene que ser un miembro del equipo 
        
        // EQUIPO-TODO: El solicitante tiene que ser [propietario] del equipo
        
        next()
    } catch (error) {
        next(error)
    }
}
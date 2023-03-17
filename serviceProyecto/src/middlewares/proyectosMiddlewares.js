import { request, response } from "express"
import { verificadorCreacionProyecto } from "./helpers/proyectos/verificadorCreacionProyecto.js"
import { constructorProyectoCreacion } from "./helpers/proyectos/constructorProyectoCreacion.js"
import { verificadorActualizacionProyecto } from "./helpers/proyectos/verificadorActualizacionProyecto.js"
import { constructorProyectoActualizacion } from "./helpers/proyectos/constructorProyectoActualizacion.js"
import RespuestaError from "../models/Respuestas/RespuestaError.js"

export const verificarCreacionProyecto = async (req = request, res = response, next) => {
    const { params, body, timeOfRequest } = req
    const { solicitante, proyectoNuevo } = body

    try {
        if ( !solicitante.authSolicitante.emailVerified ) {
            return new RespuestaError({
                estado: 400, 
                mensajeCliente: 'correo_no_verificado', 
                mensajeServidor: 'El email no está verificado.', 
                resultado: null
            })
        }
        // Datos requeridos para crear un proyecto: codigo, nombre, descripcion
        const respuestaError = await verificadorCreacionProyecto(proyectoNuevo)
        if (respuestaError) throw respuestaError

        proyecto.responsable = solicitante.uidSolicitante
        proyecto.fechaCreacion = timeOfRequest
        const { proyectoNuevoVerificado } = constructorProyectoCreacion(proyectoNuevo)
        
        req.body.proyectoNuevoVerificado = proyectoNuevoVerificado

        next()
    } catch (error) {
        next(error)
    }
}

export const verificarObtencionProyecto = async (req = request, res = response, next) => {
    const { params, body } = req
    const { solicitante } = body

    try {
        // Si el usuario es miembro del proyecto, puede ver todos los datos
        // Si no esta logeado o no es miembro del proyecto, solo puede ver los datos de manera parcial
        // EQUIPO-TODO: Verificar si el solicitante puede ver todos los datos o no
        const esMiembroDelProyecto = { value: false }

        next()
    } catch (error) {
        next(error)
    }
}

export const verificarActualizacionProyecto = async (req = request, res = response, next) => {
    const { params, body } = req
    const { solicitante, proyectoActualizado } = body

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
        const respuestaError = await verificadorActualizacionProyecto(params.uid, proyectoActualizado)
        if (respuestaError) throw respuestaError

        // EQUIPO-TODO: El solicitante tiene que ser un miembro del proyecto 
        
        // EQUIPO-TODO: El solicitante tiene que ser [propietario o editor] del proyecto

        const { proyectoActualizadoVerificado } = constructorProyectoActualizacion(proyectoActualizado)
        req.body.proyectoActualizadoVerificado = proyectoActualizadoVerificado

        next()
    } catch (error) {
        next(error)
    }
}

export const verificarEliminacionProyecto = async (req = request, res = response, next) => {
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

        // EQUIPO-TODO: El solicitante tiene que ser un miembro del proyecto 
        
        // EQUIPO-TODO: El solicitante tiene que ser [propietario] del proyecto
        
        next()
    } catch (error) {
        next(error)
    }
}
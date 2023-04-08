import { request, response } from "express"
import { verificadorCreacionProyecto, verificadorUsuarioSolicitante } from "./helpers/proyectos/verificadorCreacionProyecto.js"
import { constructorProyectoCreacion } from "./helpers/proyectos/constructorProyectoCreacion.js"
import { verificadorActualizacionProyecto } from "./helpers/proyectos/verificadorActualizacionProyecto.js"
import { constructorProyectoActualizacion } from "./helpers/proyectos/constructorProyectoActualizacion.js"
import RespuestaError from "../models/Respuestas/RespuestaError.js"
import { verificadorEliminacionProyecto } from "./helpers/proyectos/verificadorEliminarProyecto.js"

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

        let respuestaError = null

        // Datos requeridos para crear un proyecto: codigo, nombre, descripcion
        respuestaError = await verificadorUsuarioSolicitante(solicitante)
        if (respuestaError) throw respuestaError

        // Datos requeridos para crear un proyecto: codigo, nombre, descripcion
        respuestaError = await verificadorCreacionProyecto(proyectoNuevo)
        if (respuestaError) throw respuestaError

        proyectoNuevo.fechaCreacion = timeOfRequest
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
    const { uidEquipo, uid } = params

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
        const respuestaError = await verificadorActualizacionProyecto(uidEquipo, uid, proyectoActualizado)
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
    const { uidEquipo, uid } = params

    try {
        if ( !solicitante.authSolicitante.emailVerified ) {
            return new RespuestaError({
                estado: 400, 
                mensajeCliente: 'correo_no_verificado', 
                mensajeServidor: 'El email no está verificado.', 
                resultado: null
            })
        }

        // TODO: El solicitante tiene que ser un miembro del proyecto 

        // TODO Verificar que exista el proyecto
        const respuestaError = await verificadorEliminacionProyecto( uidEquipo, uid )

        if (respuestaError) throw respuestaError
        
        next()
    } catch (error) {
        next(error)
    }
}
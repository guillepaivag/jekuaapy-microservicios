import { request, response } from "express"
import { verificadorCreacionProyecto, verificadorUsuarioSolicitante } from "./helpers/proyectos/verificadorCreacionProyecto.js"
import { constructorProyectoCreacion } from "./helpers/proyectos/constructorProyectoCreacion.js"
import { verificadorActualizacionProyecto } from "./helpers/proyectos/verificadorActualizacionProyecto.js"
import { constructorProyectoActualizacion } from "./helpers/proyectos/constructorProyectoActualizacion.js"
import RespuestaError from "../models/Respuestas/RespuestaError.js"
import { verificadorEliminacionProyecto } from "./helpers/proyectos/verificadorEliminarProyecto.js"
import { apiMiembroObtenerMiembro } from "../services/service_miembro.js"
import { verificadorActualizacionProyectoServicio } from "./helpers/proyectos/verificadorActualizacionEquipoServicio.js"

export const verificarCreacionProyecto = async (req = request, res = response, next) => {
    const { params, body, timeOfRequest } = req
    const { solicitante, proyectoNuevo } = body

    try {
        if (!solicitante.authSolicitante.emailVerified) {
            return new RespuestaError({
                estado: 400,
                mensajeCliente: 'correo_no_verificado',
                mensajeServidor: 'El email no está verificado.',
                resultado: null
            })
        }

        let respuesta = null

        // El solicitante tiene que ser un miembro del proyecto y que sea 
        const miembro = await apiMiembroObtenerMiembro(proyectoNuevo.uidEquipo, solicitante.uidSolicitante)

        if (!miembro || miembro.estado === 'eliminado') {
            throw new RespuestaError({
                estado: 400,
                mensajeCliente: 'no_es_miembro',
                mensajeServidor: 'El usuario solicitante no es miembro del equipo',
                resultado: null
            })
        }

        if (!miembro.roles.includes('propietario') && !miembro.roles.includes('editor')) {
            throw new RespuestaError({
                estado: 400,
                mensajeCliente: 'miembro_no_tiene_permisos',
                mensajeServidor: 'El usuario solicitante no tiene permisos',
                resultado: null
            })
        }

        // Datos requeridos para crear un proyecto: codigo, nombre, descripcion
        respuesta = await verificadorCreacionProyecto(proyectoNuevo)
        if (respuesta instanceof RespuestaError) throw respuesta

        proyectoNuevo.fechaCreacion = timeOfRequest
        const { proyectoNuevoVerificado } = constructorProyectoCreacion(proyectoNuevo)

        req.body.data = respuesta
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
        const configuracion = body.configuracion ?? {}

        if (solicitante.tipo == 'usuario') {

            if (!solicitante.authSolicitante.emailVerified) {
                return new RespuestaError({
                    estado: 400,
                    mensajeCliente: 'correo_no_verificado',
                    mensajeServidor: 'El email no está verificado.',
                    resultado: null
                })
            }

            // El solicitante tiene que ser un miembro del proyecto y que sea 
            const miembro = await apiMiembroObtenerMiembro(uidEquipo, solicitante.uidSolicitante)

            if (!miembro || miembro.estado === 'eliminado') {
                throw new RespuestaError({
                    estado: 400,
                    mensajeCliente: 'no_es_miembro',
                    mensajeServidor: 'El usuario solicitante no es miembro del equipo',
                    resultado: null
                })
            }

            if (!miembro.roles.includes('propietario') && !miembro.roles.includes('editor')) {
                throw new RespuestaError({
                    estado: 400,
                    mensajeCliente: 'miembro_no_tiene_permisos',
                    mensajeServidor: 'El usuario solicitante no tiene permisos',
                    resultado: null
                })
            }

            // Datos que se actualizan: codigo, nombre, descripcion
            const respuestaError = await verificadorActualizacionProyecto(uidEquipo, uid, proyectoActualizado)
            if (respuestaError) throw respuestaError

        } else {
            const respuestaError = await verificadorActualizacionProyectoServicio(uidEquipo, uid, proyectoActualizado, configuracion)
            if (respuestaError) throw respuestaError
        }

        const { proyectoActualizadoVerificado } = constructorProyectoActualizacion(solicitante, proyectoActualizado, configuracion)
        
        req.body.proyectoActualizadoVerificado = proyectoActualizadoVerificado
        req.body.configuracion = configuracion

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
        if (!solicitante.authSolicitante.emailVerified) {
            throw new RespuestaError({
                estado: 400,
                mensajeCliente: 'correo_no_verificado',
                mensajeServidor: 'El email no está verificado.',
                resultado: null
            })
        }

        // El solicitante tiene que ser un miembro del proyecto y que sea 
        const miembro = await apiMiembroObtenerMiembro(uidEquipo, solicitante.uidSolicitante)

        if (!miembro || miembro.estado === 'eliminado') {
            throw new RespuestaError({
                estado: 400,
                mensajeCliente: 'no_es_miembro',
                mensajeServidor: 'El usuario solicitante no es miembro del equipo',
                resultado: null
            })
        }

        if (!miembro.roles.includes('propietario') && !miembro.roles.includes('editor')) {
            throw new RespuestaError({
                estado: 400,
                mensajeCliente: 'miembro_no_tiene_permisos',
                mensajeServidor: 'El usuario solicitante no tiene permisos',
                resultado: null
            })
        }

        // Verificar que exista el proyecto
        const respuesta = await verificadorEliminacionProyecto(uidEquipo, uid)

        if (respuesta instanceof RespuestaError) throw respuesta

        body.data = respuesta.data

        next()
    } catch (error) {
        next(error)
    }
}
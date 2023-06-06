import { request, response } from "express"
import { verificadorCreacionLectura, verificadorUsuarioSolicitante } from "./helpers/lecturas/verificadorCreacionLectura.js"
import { constructorLecturaCreacion } from "./helpers/lecturas/constructorLecturaCreacion.js"
import { verificadorActualizacionLectura } from "./helpers/lecturas/verificadorActualizacionLectura.js"
import { constructorLecturaActualizacion } from "./helpers/lecturas/constructorLecturaActualizacion.js"
import RespuestaError from "../models/Respuestas/RespuestaError.js"
import { verificadorEliminacionLectura } from "./helpers/lecturas/verificadorEliminarLectura.js"
import { apiMiembroObtenerMiembro } from "../services/service_miembro.js"
import { verificadorActualizacionLecturaServicio } from "./helpers/lecturas/verificadorActualizacionEquipoServicio.js"

export const verificarCreacionLectura = async (req = request, res = response, next) => {
    const { params, body, timeOfRequest } = req
    const { solicitante, lecturaNuevo } = body

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

        // El solicitante tiene que ser un miembro del equipo y que sea 
        const miembro = await apiMiembroObtenerMiembro(lecturaNuevo.uidEquipo, solicitante.uidSolicitante)

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

        // Datos requeridos para crear un lectura: codigo, nombre, descripcion
        respuesta = await verificadorCreacionLectura(lecturaNuevo)
        if (respuesta instanceof RespuestaError) throw respuesta

        lecturaNuevo.fechaCreacion = timeOfRequest
        lecturaNuevo.uidCreador = solicitante.uidSolicitante
        const { lecturaNuevoVerificado } = await constructorLecturaCreacion(lecturaNuevo)

        console.log("lecturaNuevoVerificado",lecturaNuevoVerificado)

        req.body.data = respuesta
        req.body.lecturaNuevoVerificado = lecturaNuevoVerificado

        next()
    } catch (error) {
        next(error)
    }
}

export const verificarObtencionLectura = async (req = request, res = response, next) => {
    const { params, body } = req
    const { solicitante } = body

    try {

        next()
    } catch (error) {
        next(error)
    }
}

export const verificarActualizacionLectura = async (req = request, res = response, next) => {
    const { params, body } = req
    const { solicitante, lecturaActualizado } = body
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

            // El solicitante tiene que ser un miembro del lectura y que sea 
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
            const respuestaError = await verificadorActualizacionLectura(uidEquipo, uid, lecturaActualizado)
            if (respuestaError) throw respuestaError

        } else {
            const respuestaError = await verificadorActualizacionLecturaServicio(uidEquipo, uid, lecturaActualizado, configuracion)
            if (respuestaError) throw respuestaError
        }

        const { lecturaActualizadoVerificado } = constructorLecturaActualizacion(solicitante, lecturaActualizado, configuracion)
        
        req.body.lecturaActualizadoVerificado = lecturaActualizadoVerificado
        req.body.configuracion = configuracion

        next()
    } catch (error) {
        next(error)
    }
}

export const verificarEliminacionLectura = async (req = request, res = response, next) => {
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

        // El solicitante tiene que ser un miembro del lectura y que sea 
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

        // Verificar que exista el lectura
        const respuesta = await verificadorEliminacionLectura(uidEquipo, uid)

        if (respuesta instanceof RespuestaError) throw respuesta

        body.data = respuesta.data

        next()
    } catch (error) {
        next(error)
    }
}
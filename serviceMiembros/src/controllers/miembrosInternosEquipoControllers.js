import { request, response } from "express"
import jwt from "jsonwebtoken"

// Models
import Respuesta from "../models/Respuestas/Respuesta.js"
import RespuestaError from "../models/Respuestas/RespuestaError.js"

// Informacion Usuario
import FirestoreMiembroInternoEquipoRepository from "../repositories/FirestoreMiembroInternoEquipoRepository.js"
import MiembroInternoEquipoUseCase from "../usecases/MiembroInternoEquipoUseCase.js"

// Manejo de errores
import { errorHandler } from "../helpers/errors/error-handler.js"

// Helpers
import { milliseconds_a_timestamp } from "../utils/timestamp.js"

// Variables
const miembroInternoEquipoUseCase = new MiembroInternoEquipoUseCase(new FirestoreMiembroInternoEquipoRepository())

// Manejo de errores
export const crear = async (req = request, res = response) => {
    try {
        const { params, body, timeOfRequest } = req
        const { solicitante, miembroNuevo, miembroInternoEquipoVerificado } = body

        await miembroInternoEquipoUseCase.crear(miembroInternoEquipoVerificado.uidEquipo, miembroInternoEquipoVerificado)

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'Se creó el miembro de manera correcta.',
            resultado: null
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    } catch (error) {
        console.log('Error - crear: ', error)

        // Manejo de errores
        const respuestaManejada = errorHandler(error)
        return res.status(respuestaManejada.estado).json(respuestaManejada.getRespuesta())

    }

}

export const obtener = async (req = request, res = response) => {
    try {
        const { params, body } = req
        const { uidEquipo, uidMiembro } = params
        const { solicitante } = body

        // Verificar existencia del miembro solicitado
        const miembroInterno = await miembroInternoEquipoUseCase.obtenerPorUID(uidEquipo, uidMiembro)

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'Se obtuvo el miembro de manera correcta.',
            mensajeServidor: 'exito',
            resultado: miembroInterno
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    } catch (error) {
        console.log('Error - obtener: ', error)

        // Manejo de errores
        const respuestaManejada = errorHandler(error)
        return res.status(respuestaManejada.estado).json(respuestaManejada.getRespuesta())

    }

}

export const solicitar = async (req = request, res = response) => {
    try {
        const { params, body, timeOfRequest } = req
        const { solicitante, uidEquipo, correoMiembroNuevo, roles, usuarioMiembroNuevo, miembroNuevo } = body

        // MIEMBRO_INTERNO-TODO: Generar token de verificacion de miembro-interno
        const payload = { fechaSolicitud: timeOfRequest }
        const jwtSecretKey = process.env.JWT_SECRET_KEY
        const options = { algorithm: 'RS256', expiresIn: '1h' }
        const token = jwt.sign(payload, jwtSecretKey, options)

        // MIEMBRO_INTERNO-TODO: Crear miembro-interno en estado pendiente
        await miembroInternoEquipoUseCase.crear(uidEquipo, {
            uid: usuarioMiembroNuevo.uid,
            uidEquipo: uidEquipo,
            roles: roles,
            estado: 'pendiente',
            fechaCreacion: milliseconds_a_timestamp(timeOfRequest),
        })

        // MIEMBRO_INTERNO-TODO: Enviar correo a [correoMiembroNuevo]


        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'Se envió una solicitud para ser miembro a un usuario de manera correcta.',
            mensajeServidor: 'exito',
            resultado: null
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    } catch (error) {
        console.log('Error - solicitar: ', error)

        // Manejo de errores
        const respuestaManejada = errorHandler(error)
        return res.status(respuestaManejada.estado).json(respuestaManejada.getRespuesta())

    }

}

export const actualizar = async (req = request, res = response) => {
    try {
        const { params, body } = req
        const { solicitante, equipoActualizado, datosEquipoActualizado } = body

        await equiposUseCase.actualizar(solicitante.uidSolicitante, datosEquipoActualizado)

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'Se actualizó la información del usuario de forma correcta.',
            mensajeServidor: 'exito',
            resultado: datosEquipoActualizado
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    } catch (error) {
        console.log('Error - actualizar: ', error)

        // Manejo de errores
        const respuestaManejada = errorHandler(error)
        return res.status(respuestaManejada.estado).json(respuestaManejada.getRespuesta())

    }

}
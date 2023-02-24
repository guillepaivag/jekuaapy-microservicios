import { request, response } from "express"

// Models
import Respuesta from "../models/Respuestas/Respuesta.js"
import RespuestaError from "../models/Respuestas/RespuestaError.js"

// Informacion Usuario
import FirestoreMiembroInternoEquipoRepository from "../repositories/FirestoreMiembroInternoEquipoRepository.js"
import MiembroInternoEquipoUseCase from "../usecases/MiembroInternoEquipoUseCase.js"

// Manejo de errores
import { errorHandler } from "../helpers/errors/error-handler.js"

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
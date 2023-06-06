import { request, response } from "express"

// Respuestas del servidor
import Respuesta from "../models/Respuestas/Respuesta.js"
import RespuestaError from "../models/Respuestas/RespuestaError.js"

// Lecturas
import FirestoreLecturasRepository from "../repositories/FirestoreLecturasRepository.js"
import LecturasUseCase from "../usecases/LecturasUseCase.js"

// Manejo de errores
import { errorHandler } from "../helpers/errors/error-handler.js"
import { milliseconds_a_timestamp } from "../utils/timestamp.js"

const lecturasUseCase = new LecturasUseCase(new FirestoreLecturasRepository())

export const crear = async (req = request, res = response) => {
    try {
        const { params, body } = req
        const { lecturaNuevoVerificado, data } = body

        const lectura = await lecturasUseCase.crear(lecturaNuevoVerificado)

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'Se creó un lectura con éxito.',
            resultado: lectura

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
        const { params } = req
        const { uidEquipo, uidLectura } = params

        let lectura =  await lecturasUseCase.obtenerPorUID(uidEquipo, uidLectura)

        if (!lectura) {
            throw new RespuestaError({
                estado: 400,
                mensajeCliente: 'no_existe_lectura',
                mensajeServidor: 'No existe el lectura.'
            })
        }

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'Se encontró el lectura de manera correcta!',
            resultado: lectura
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
        const { uidEquipo, uid } = params
        const { solicitante, lecturaActualizadoVerificado } = body
        
        // Actualizar lectura
        await lecturasUseCase.actualizar(uidEquipo, uid, lecturaActualizadoVerificado)

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'Se actualizó el lectura de manera correcta!',
            resultado: lecturaActualizadoVerificado
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    } catch (error) {
        console.log('Error - actualizar: ', error)

        // Manejo de errores
        const respuestaManejada = errorHandler(error)
        return res.status(respuestaManejada.estado).json(respuestaManejada.getRespuesta())

    }
}

export const eliminar = async (req = request, res = response) => {
    try {
        const { params, body, timeOfRequest } = req
        const { solicitante, data } = body
        const { uidEquipo, uid } = params
        
        // Eliminar equipo
        await lecturasUseCase.eliminar(uidEquipo, params.uid)

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'Se eliminó el equipo de manera correcta!',
            resultado: null
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    } catch (error) {
        console.log('Error - eliminar: ', error)

        // Manejo de errores
        const respuestaManejada = errorHandler(error)
        return res.status(respuestaManejada.estado).json(respuestaManejada.getRespuesta())

    }
}
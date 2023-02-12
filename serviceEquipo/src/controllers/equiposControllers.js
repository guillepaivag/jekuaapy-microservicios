import { request, response } from "express"

// Respuestas del servidor
import Respuesta from "../models/Respuestas/Respuesta.js"
import RespuestaError from "../models/Respuestas/RespuestaError.js"

// Equipos
import FirestoreEquipoRepository from "../repositories/FirestoreEquipoRepository.js"
import EquipoUseCase from "../usecases/EquipoUseCase.js"

// Manejo de errores
import { errorHandler } from "../helpers/errors/error-handler.js"

// Helpers & utils
import { milliseconds_a_timestamp } from "../utils/timestamp.js"

// Use cases objects
const equipoUseCase = new EquipoUseCase(new FirestoreEquipoRepository())

export const crear = async (req = request, res = response) => {
    try {
        const { params, body, timeOfRequest } = req
        const { solicitante, equipoNuevo, equipoNuevoVerificado } = body

        // Crear equipo
        const equipo = await equipoUseCase.crear(equipoNuevoVerificado)

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'Se creó un equipo con éxito.',
            resultado: equipo
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
        const { tipo, valor } = params
        const { solicitante, equipoNuevo, equipoNuevoVerificado } = body

        let equipo = null

        if (tipo === 'uid') equipo = await equipoUseCase.obtenerPorUID(valor)
        else if (tipo === 'codigo') equipo = await equipoUseCase.obtenerPorCodigo(valor)
        else throw new TypeError('No hay datos para buscar un equipo.')

        if (!equipo) {
            throw new RespuestaError({
                estado: 400,
                mensajeCliente: 'no_existe_equipo',
                mensajeServidor: 'No existe el equipo.'
            })
        }

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'Se encontró el equipo de manera correcta!',
            resultado: equipo
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
        const { solicitante, equipoActualizado, equipoActualizadoVerificado } = body
        
        // Actualizar equipo
        await equipoUseCase.actualizar(params.uid, equipoActualizadoVerificado)

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'Se actualizó el equipo de manera correcta!',
            resultado: null
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
        const { solicitante } = body
        
        // Eliminar equipo
        const fechaEliminado = milliseconds_a_timestamp(timeOfRequest)
        await equipoUseCase.eliminar(params.uid, fechaEliminado)

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
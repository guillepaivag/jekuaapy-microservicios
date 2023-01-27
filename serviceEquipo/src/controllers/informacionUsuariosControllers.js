import { request, response } from "express"

// Models
import Respuesta from "../models/Respuestas/Respuesta.js"
import RespuestaError from "../models/Respuestas/RespuestaError.js"

// Informacion Usuario
import FirestoreEquipoRepository from "../repositories/FirestoreEquipoRepository.js"
import EquiposUseCase from "../usecases/EquiposUseCase.js"

// Manejo de errores
import { errorHandler } from "../helpers/errors/error-handler.js"

// Variables
const equiposUseCase = new EquiposUseCase(new FirestoreEquipoRepository())

// Manejo de errores
export const obtener = async (req = request, res = response) => {
    try {
        const { params } = req
        const { tipo, valor } = params

        let equipo = null

        if (tipo === 'uid') equipo = await equiposUseCase.obtenerPorUID(valor)
        else if (tipo === 'correo') equipo = await equiposUseCase.obtenerPorCorreo(valor)
        else if (tipo === 'nombreUsuario') equipo = await equiposUseCase.obtenerPorNombreUsuario(valor)
        else throw new TypeError('No hay datos para buscar el usuario.')

        if (!equipo) {
            throw new RespuestaError({
                estado: 400,
                mensajeCliente: 'no_existe_usuario',
                mensajeServidor: 'No existe el usuario.'
            })
        }

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'Se obtuvo la información del usuario de forma correcta.',
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
        const { solicitante, equipoActualizado, datosEquipoActualizado } = body
        const { authToken, uidSolicitante, authSolicitante } = solicitante

        await equiposUseCase.actualizar(uidSolicitante, datosEquipoActualizado)

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
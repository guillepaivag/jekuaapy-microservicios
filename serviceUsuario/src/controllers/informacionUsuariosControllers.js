import { request, response } from "express"

// Models
import Respuesta from "../models/Respuestas/Respuesta.js"
import RespuestaError from "../models/Respuestas/RespuestaError.js"

// Informacion Usuario
import FirestoreInformacionUsuarioRepository from "../repositories/FirestoreInformacionUsuarioRepository.js"
import InformacionUsuariosUseCase from "../usecases/InformacionUsuariosUseCase.js"

// Manejo de errores
import { errorHandler } from "../helpers/errors/error-handler.js"

// Variables
const informacionUsuariosUseCase = new InformacionUsuariosUseCase(new FirestoreInformacionUsuarioRepository())

// Manejo de errores
export const obtener = async (req = request, res = response) => {
    try {
        const { params } = req
        const { tipo, valor } = params

        let informacionUsuario = null

        if (tipo === 'uid') informacionUsuario = await informacionUsuariosUseCase.obtenerPorUID(valor)
        else if (tipo === 'correo') informacionUsuario = await informacionUsuariosUseCase.obtenerPorCorreo(valor)
        else if (tipo === 'nombreUsuario') informacionUsuario = await informacionUsuariosUseCase.obtenerPorNombreUsuario(valor)
        else throw new TypeError('No hay datos para buscar el usuario.')

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'Se obtuvo la información del usuario de forma correcta.',
            resultado: informacionUsuario
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
        const { solicitante, informacionUsuarioActualizado, datosInformacionUsuarioActualizado } = body

        await informacionUsuariosUseCase.actualizar(solicitante.uidSolicitante, datosInformacionUsuarioActualizado)

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'Se actualizó la información del usuario de forma correcta.',
            mensajeServidor: 'exito',
            resultado: datosInformacionUsuarioActualizado
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    } catch (error) {
        console.log('Error - actualizar: ', error)

        // Manejo de errores
        const respuestaManejada = errorHandler(error)
        return res.status(respuestaManejada.estado).json(respuestaManejada.getRespuesta())

    }

}
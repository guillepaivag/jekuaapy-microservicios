import { request, response } from "express"

// Models de respuesta
import Respuesta from "../models/Respuestas/Respuesta.js"
import RespuestaError from "../models/RespuestaError.js"

// Correo
import AwsSesCorreosRepository from "../repositories/AwsSesCorreosRepository.js"
import CorreosUseCases from "../usecases/CorreosUseCases.js"

// Helpers
import { generarHtmlVerificacionCorreoUsuario } from "../helpers/correosEstructurados/verificacionCorreoUsuario/generarHtmlVerificacionCorreoUsuario.js"
import { errorHandler } from "../helpers/errors/error-handler.js"
import { generarLinkDeVerificacionDeCorreo } from "../helpers/usuarios/generarLinkDeVerificacionDeCorreo.js"

// Variables
const correoUseCase = new CorreosUseCases(new AwsSesCorreosRepository())

export const verificarCorreoDeUsuario = async (req = request, res = response) => {
    try {
        const { body } = req
        const { correo } = body
        
        // Enviar correo
        const correoReceptor = correo
        const linkVerificacionCorreoUsuario = await generarLinkDeVerificacionDeCorreo(correo)
        const contenido = generarHtmlVerificacionCorreoUsuario(correo, linkVerificacionCorreoUsuario)
        await correoUseCase.enviarVerificacionDeCorreo({ correoReceptor, contenido })

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'Se envió un correo!',
            resultado: null
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    } catch (error) {
        console.log('Error - verificarCorreoDeUsuario: ', error)

        // Manejo de errores
        const respuestaManejada = errorHandler(error)
        return res.status(respuestaManejada.estado).json(respuestaManejada.getRespuesta())

    }
}
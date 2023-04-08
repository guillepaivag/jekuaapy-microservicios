import { request, response } from "express"
import jwt from "jsonwebtoken"

// Models de respuesta
import Respuesta from "../models/Respuestas/Respuesta.js"
import RespuestaError from "../models/Respuestas/RespuestaError.js"

// Correo
import AwsSesCorreosRepository from "../repositories/AwsSesCorreosRepository.js"
import CorreosUseCases from "../usecases/CorreosUseCases.js"

// Helpers
import { generarHtmlAvisoNuevoMiembroEquipo } from "../helpers/correosEstructurados/avisoNuevoMiembroEquipo/generarHtmlAvisoNuevoMiembroEquipo.js"
import { errorHandler } from "../helpers/errors/error-handler.js"

// Servicios
import { apiEquipoObtenerEquipo } from "../services/service_equipo.js"
import { apiUsuarioObtenerUsuario } from "../services/service_usuario.js"

// Variables
const correoUseCase = new CorreosUseCases(new AwsSesCorreosRepository())

export const enviarAvisoNuevoMiembroEquipo = async (req = request, res = response) => {
    try {
        const { body } = req
        const { uidUsuarioSolicitante, uidEquipo, correo } = body
        
        // Enviar correo
        const usuario = await apiUsuarioObtenerUsuario('uid', uidUsuarioSolicitante)
        const equipo = await apiEquipoObtenerEquipo(uidEquipo)
        
        const asunto = `[Jekuaapy] ${usuario.nombreCompleto} te agregó como miembro del equipo “${equipo.nombre}”`
        const contenido = generarHtmlAvisoNuevoMiembroEquipo({correo, usuario, equipo})

        await correoUseCase.enviarAvisoNuevoMiembroEquipo({
            correoReceptor: correo,
            asunto,
            contenido,
        })

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'Se envió un correo!',
            resultado: null
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    } catch (error) {
        console.log('Error - enviarAvisoNuevoMiembroEquipo: ', error)

        // Manejo de errores
        const respuestaManejada = errorHandler(error)
        return res.status(respuestaManejada.estado).json(respuestaManejada.getRespuesta())

    }
}
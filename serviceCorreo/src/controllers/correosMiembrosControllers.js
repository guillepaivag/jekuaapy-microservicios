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
import { generarHtmlAvisoNuevoMiembroProyecto } from "../helpers/correosEstructurados/avisoNuevoMiembroProyecto/generarHtmlAvisoNuevoMiembroProyecto.js"
import { errorHandler } from "../helpers/errors/error-handler.js"

// Servicios
import { apiEquipoObtenerEquipo } from "../services/service_equipo.js"
import { apiUsuarioObtenerUsuario } from "../services/service_usuario.js"
import { apiProyectoObtenerProyecto } from "../services/service_proyecto.js"

// Variables
const correoUseCase = new CorreosUseCases(new AwsSesCorreosRepository())

export const enviarAvisoNuevoMiembroEquipo = async (req = request, res = response) => {
    try {
        const { body } = req
        const { uidSolicitante, correoSolicitado, uidEquipo } = body
        
        const usuarioSolicitante = await apiUsuarioObtenerUsuario('uid', uidSolicitante)
        const usuarioSolicitado = await apiUsuarioObtenerUsuario('correo', correoSolicitado)
        const equipo = await apiEquipoObtenerEquipo(uidEquipo)
        
        const asunto = `[Jekuaapy] ${usuarioSolicitante.nombreCompleto} te agregó como miembro del equipo “${equipo.nombre}”`
        const contenido = generarHtmlAvisoNuevoMiembroEquipo({usuarioSolicitante, usuarioSolicitado, equipo})
        
        // Enviar correo
        await correoUseCase.enviarAvisoNuevoMiembroEquipo({
            correoReceptor: correoSolicitado,
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

export const enviarAvisoNuevoMiembroProyecto = async (req = request, res = response) => {
    try {
        const { body } = req
        const { uidSolicitante, correoSolicitado, uidEquipo, uidProyecto, } = body
        
        const usuarioSolicitante = await apiUsuarioObtenerUsuario('uid', uidSolicitante)
        const usuarioSolicitado = await apiUsuarioObtenerUsuario('correo', correoSolicitado)
        const equipo = await apiEquipoObtenerEquipo(uidEquipo)
        const proyecto = await apiProyectoObtenerProyecto(uidEquipo, 'uid', uidProyecto)
        
        const asunto = `[Jekuaapy] ${usuarioSolicitante.nombreCompleto} te agregó como miembro del proyecto “${proyecto.nombre}” del equipo “${equipo.nombre}”`
        const contenido = generarHtmlAvisoNuevoMiembroProyecto({usuarioSolicitante, usuarioSolicitado, equipo, proyecto})
        
        // Enviar correo
        await correoUseCase.enviarAvisoNuevoMiembroEquipo({
            correoReceptor: correoSolicitado,
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
        console.log('Error - enviarAvisoNuevoMiembroProyecto: ', error)

        // Manejo de errores
        const respuestaManejada = errorHandler(error)
        return res.status(respuestaManejada.estado).json(respuestaManejada.getRespuesta())

    }
}
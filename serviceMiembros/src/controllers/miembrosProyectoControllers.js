import { request, response } from "express"

// Models
import Respuesta from "../models/Respuestas/Respuesta.js"
import RespuestaError from "../models/Respuestas/RespuestaError.js"

// Manejo de errores
import { errorHandler } from "../helpers/errors/error-handler.js"

// MiembroEquipo
import FirestoreMiembroProyectoRepository from "../repositories/FirestoreMiembroProyectoRepository.js"
import MiembroProyectoUseCase from "../usecases/MiembroProyectoUseCase.js"

// // Servicios
import { apiCorreoEnviarAvisoNuevoMiembroProyecto } from "../services/service_correo.js"
import { apiProyectoActualizarProyecto } from "../services/service_proyecto.js"

// Variables
const miembroProyectoUseCase = new MiembroProyectoUseCase(new FirestoreMiembroProyectoRepository())

export const crear = async (req = request, res = response) => {
    try {
        const { params, body } = req
        const { solicitante, proyecto, usuarioSolicitado, miembroProyectoVerificado } = body
        
        const uidEquipo = miembroProyectoVerificado.uidEquipo
        const uidProyecto = miembroProyectoVerificado.uidProyecto

        // Crear miembro de proyecto
        await miembroProyectoUseCase.crear(uidEquipo, uidProyecto, miembroProyectoVerificado)

        // Actualizar la cantidad de miembros en el proyecto
        apiProyectoActualizarProyecto(
            uidEquipo, 
            uidProyecto, 
            { cantidadMiembros: 1 }, 
            { incrementarCantidadMiembros: true }
        )

        // Enviar mensaje al miembro-nuevo de bienvenida al proyecto
        apiCorreoEnviarAvisoNuevoMiembroProyecto(
            solicitante.uidSolicitante, 
            usuarioSolicitado.correo, 
            uidEquipo, 
            uidProyecto
        )

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
        const { uidEquipo, uidProyecto, uidMiembro } = params

        // Verificar existencia del miembro solicitado
        const miembroProyecto = await miembroProyectoUseCase.obtenerPorUID(uidEquipo, uidProyecto, uidMiembro)

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'Se obtuvo el miembro de manera correcta.',
            mensajeServidor: 'exito',
            resultado: miembroProyecto
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    } catch (error) {
        console.log('Error - obtener: ', error)

        // Manejo de errores
        const respuestaManejada = errorHandler(error)
        return res.status(respuestaManejada.estado).json(respuestaManejada.getRespuesta())

    }

}

export const eliminar = async (req = request, res = response) => {
    try {
        const { params, body, timeOfRequest } = req
        const { uidEquipo, uidProyecto, uidMiembro } = params

        await miembroProyectoUseCase.eliminar(
            uidEquipo, 
            uidProyecto, 
            uidMiembro, 
            milliseconds_a_timestamp(timeOfRequest)
        )
        
        // Disminuir la cantidad de miembros en -1, del proyecto solicitado
        apiProyectoActualizarProyecto(
            uidEquipo, 
            uidProyecto, 
            { cantidadMiembros: -1 }, 
            { incrementarCantidadMiembros: true }
        )

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'Se eliminó un miembro de un equipo de forma correcta.',
            mensajeServidor: 'exito',
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
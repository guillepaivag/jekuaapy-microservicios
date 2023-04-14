import { request, response } from "express"

// Respuestas del servidor
import Respuesta from "../models/Respuestas/Respuesta.js"
import RespuestaError from "../models/Respuestas/RespuestaError.js"

// Proyectos
import FirestoreProyectosRepository from "../repositories/FirestoreProyectosRepository.js"
import ProyectosUseCase from "../usecases/ProyectosUseCase.js"

// Foto de perfil
import StorageFotoPerfilRepository from "../repositories/StorageFotoPerfilRepository.js"
import FotoPerfilUseCase from "../usecases/FotoPerfilUseCase.js"

// Foto de portada
import StorageFotoPortadaRepository from "../repositories/StorageFotoPortadaRepository.js"
import FotoPortadaUseCase from "../usecases/FotoPortadaUseCase.js"

// Manejo de errores
import { errorHandler } from "../helpers/errors/error-handler.js"
import { milliseconds_a_timestamp } from "../utils/timestamp.js"
import { apiEquipoActualizarEquipo } from "../services/service_equipo.js"

const proyectosUseCase = new ProyectosUseCase(new FirestoreProyectosRepository())
const fotoPerfilUseCase = new FotoPerfilUseCase(new StorageFotoPerfilRepository())
const fotoPortadaUseCase = new FotoPortadaUseCase(new StorageFotoPortadaRepository())

export const crear = async (req = request, res = response) => {
    try {
        const { params, body } = req
        const { proyectoNuevoVerificado, data } = body

        const proyecto = await proyectosUseCase.crear(proyectoNuevoVerificado)

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'Se creó un proyecto con éxito.',
            resultado: proyecto

        })
        console.log("data.equipo",data.equipo)
         // TODO aumentar la cantidad de proyectos
        apiEquipoActualizarEquipo(proyectoNuevoVerificado.uidEquipo, {
            cantidadProyectos: data.equipo.cantidadProyectos + 1
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
        const { uidEquipo, tipo, valor } = params

        let proyecto = null

        if (tipo === 'uid') proyecto = await proyectosUseCase.obtenerPorUID(uidEquipo, valor)
        else if (tipo === 'codigo') proyecto = await proyectosUseCase.obtenerPorCodigoProyecto(uidEquipo, valor)
        else throw new TypeError('No hay datos para buscar el proyecto.')

        if (!proyecto) {
            throw new RespuestaError({
                estado: 400,
                mensajeCliente: 'no_existe_proyecto',
                mensajeServidor: 'No existe el proyecto.'
            })
        }

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'Se encontró el proyecto de manera correcta!',
            resultado: proyecto
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
        const { solicitante, proyectoActualizado, datosProyectoActualizado, proyectoActualizadoVerificado } = body
        
        // Actualizar proyecto
        await proyectosUseCase.actualizar(uidEquipo, uid, proyectoActualizadoVerificado)

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'Se actualizó el proyecto de manera correcta!',
            resultado: proyectoActualizadoVerificado
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    } catch (error) {
        console.log('Error - actualizar: ', error)

        // Manejo de errores
        const respuestaManejada = errorHandler(error)
        return res.status(respuestaManejada.estado).json(respuestaManejada.getRespuesta())

    }
}

export const restaurarFotoPerfil = async (req = request, res = response) => {
    try {
        const { params, body } = req
        const { uidEquipo, uid } = params
        const { solicitante, tipoRestauracion } = body

        // Eliminar foto de perfil
        const proyecto = await proyectosUseCase.obtenerPorUID(uidEquipo, uid)
        if (proyecto.fotoPerfil !== '' && proyecto.fotoPerfil !== 'default') 
            await fotoPerfilUseCase.eliminar(`${uid}/foto.`)
        
        await proyectosUseCase.actualizar(uid, { fotoPerfil: tipoRestauracion })

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'Se restauró la foto de perfil.',
            resultado: null
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    } catch (error) {
        console.log('Error - restaurarFotoPerfil: ', error)

        // Manejo de errores
        const respuestaManejada = errorHandler(error)
        return res.status(respuestaManejada.estado).json(respuestaManejada.getRespuesta())

    }
}

export const restaurarFotoPortada = async (req = request, res = response) => {
    try {
        const { params, body } = req
        const { uidEquipo, uid } = params
        const { solicitante, tipoRestauracion } = body

        // Eliminar foto de portada
        const proyecto = await proyectosUseCase.obtenerPorUID(uidEquipo, uid)
        if (proyecto.fotoPortada !== '' && proyecto.fotoPortada !== 'default') 
            await fotoPortadaUseCase.eliminar(`${uid}/foto.`)

        await proyectosUseCase.actualizar(uidEquipo, uid, { fotoPortada: tipoRestauracion })

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'Se restauró la foto de portada.',
            resultado: null
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    } catch (error) {
        console.log('Error - restaurarFotoPortada: ', error)

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
        await proyectosUseCase.eliminar(uidEquipo, params.uid)

        // TODO aumentar la cantidad de proyectos
        apiEquipoActualizarEquipo(proyectoNuevoVerificado.uidEquipo, {
            cantidadProyectos: data.equipo.cantidadProyectos - 1
        })

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'Se eliminó el equipo de manera correcta!',
            resultado: null
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())
        // TODO disminuir la cantidad de proyectos

    } catch (error) {
        console.log('Error - eliminar: ', error)

        // Manejo de errores
        const respuestaManejada = errorHandler(error)
        return res.status(respuestaManejada.estado).json(respuestaManejada.getRespuesta())

    }
}
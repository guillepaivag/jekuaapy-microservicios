import { request, response } from "express"
import jwt from "jsonwebtoken"

// Models
import Respuesta from "../models/Respuestas/Respuesta.js"
import RespuestaError from "../models/Respuestas/RespuestaError.js"

// MiembroEquipo
import FirestoreMiembroEquipoRepository from "../repositories/FirestoreMiembroEquipoRepository.js"
import MiembroEquipoUseCase from "../usecases/MiembroEquipoUseCase.js"

// MiembroProyecto
import FirestoreMiembroProyectoRepository from "../repositories/FirestoreMiembroProyectoRepository.js"
import MiembroProyectoUseCase from "../usecases/MiembroProyectoUseCase.js"

// Manejo de errores
import { errorHandler } from "../helpers/errors/error-handler.js"

// Utils
import listaRolesValidos from "../utils/listaRolesValidos.js"

// Helpers
import { milliseconds_a_timestamp } from "../utils/timestamp.js"

// Servicios
import { apiCorreoEnviarAvisoNuevoMiembroEquipo } from "../services/service_correo.js"
import { apiEquipoActualizarEquipo } from "../services/service_equipo.js"

// Variables
const miembroEquipoUseCase = new MiembroEquipoUseCase(new FirestoreMiembroEquipoRepository())
const miembroProyectoUseCase = new MiembroProyectoUseCase(new FirestoreMiembroProyectoRepository())

export const crear = async (req = request, res = response) => {
    try {
        const { params, body } = req
        const { solicitante, equipo, usuarioSolicitado, miembroEquipoVerificado } = body
        
        await miembroEquipoUseCase.crear(miembroEquipoVerificado.uidEquipo, miembroEquipoVerificado)
        if (solicitante.tipo === 'usuario') apiCorreoEnviarAvisoNuevoMiembroEquipo(solicitante.uidSolicitante, usuarioSolicitado.correo, equipo.uid)

        const datosActualizadosEquipo = {
            cantidadMiembros: equipo.cantidadMiembros,
            cantidadMiembrosPorRol: JSON.parse( JSON.stringify( equipo.cantidadMiembrosPorRol ) )
        }

        datosActualizadosEquipo.cantidadMiembros++
        miembroEquipoVerificado.roles.includes('propietario') ? datosActualizadosEquipo.cantidadMiembrosPorRol.propietario++ : ''
        miembroEquipoVerificado.roles.includes('editor') ? datosActualizadosEquipo.cantidadMiembrosPorRol.editor++ : ''
        miembroEquipoVerificado.roles.includes('visualizador') ? datosActualizadosEquipo.cantidadMiembrosPorRol.visualizador++ : ''
        miembroEquipoVerificado.roles.includes('estudiante') ? datosActualizadosEquipo.cantidadMiembrosPorRol.estudiante++ : ''

        await apiEquipoActualizarEquipo(equipo.uid, datosActualizadosEquipo)

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
        const miembroEquipo = await miembroEquipoUseCase.obtenerPorUID(uidEquipo, uidMiembro)

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'Se obtuvo el miembro de manera correcta.',
            mensajeServidor: 'exito',
            resultado: miembroEquipo
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
        const { params, body, timeOfRequest } = req
        const { uidEquipo, uidMiembro } = params
        const { solicitante, equipo, miembroEquipoSolicitado, miembroEquipoVerificado, } = body

        await miembroEquipoUseCase.actualizar(uidEquipo, uidMiembro, miembroEquipoVerificado)
        
        const datosActualizadosEquipo = {}
        if (miembroEquipoVerificado.roles && miembroEquipoVerificado.roles.length) {
            const viejosRoles = miembroEquipoSolicitado.roles
            const nuevosRoles = miembroEquipoVerificado.roles

            datosActualizadosEquipo.cantidadMiembrosPorRol = JSON.parse( JSON.stringify( equipo.cantidadMiembrosPorRol ) )
    
            for (const rolesValidos of listaRolesValidos) {
                !viejosRoles.includes(rolesValidos) && nuevosRoles.includes(rolesValidos) ? 
                datosActualizadosEquipo.cantidadMiembrosPorRol[rolesValidos]++ : ''

                viejosRoles.includes(rolesValidos) && !nuevosRoles.includes(rolesValidos) ? 
                datosActualizadosEquipo.cantidadMiembrosPorRol[rolesValidos]-- : ''
            }

            await apiEquipoActualizarEquipo(equipo.uid, datosActualizadosEquipo)
        
            if (viejosRoles.includes('estudiante') && !nuevosRoles.includes('estudiante')) {
                // Eliminar este miembro-estudiante de cada proyecto
                const listaProyectosAfectados = await miembroProyectoUseCase.eliminarMimebroProyectoDeTodosSusProyectos(uidEquipo, uidMiembro, milliseconds_a_timestamp(timeOfRequest))
                
                // SERVICE_MIEMBROS-TODO: Disminuir la cantidad de miembros de cada proyecto en -1
                for (const uidProyectoAfectado of listaProyectosAfectados) {
                    
                }
            }
        }

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'Se actualizó la información del usuario de forma correcta.',
            mensajeServidor: 'exito',
            resultado: { miembroEquipoVerificado, datosActualizadosEquipo }
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
        const { uidEquipo, uidMiembro } = params
        const { solicitante, equipo, miembroEquipoSolicitado } = body

        await miembroEquipoUseCase.eliminar(uidEquipo, uidMiembro, milliseconds_a_timestamp(timeOfRequest))

        // Disminuir la cantidad de miembros (total y por rol) del equipo
        const rolesMiembroEquipoSolicitado = miembroEquipoSolicitado.roles
        const datosActualizadosEquipo = {
            cantidadMiembros: equipo.cantidadMiembros-1,
            cantidadMiembrosPorRol: JSON.parse( JSON.stringify( equipo.cantidadMiembrosPorRol ) )
        }

        for (const rolesValidos of listaRolesValidos) {
            rolesMiembroEquipoSolicitado.includes(rolesValidos) ? 
            datosActualizadosEquipo.cantidadMiembrosPorRol[rolesValidos]-- : ''
        }
        
        await apiEquipoActualizarEquipo(equipo.uid, datosActualizadosEquipo)

        // Eliminar miembro-estudiante de cada proyecto
        const listaProyectosAfectados = await miembroProyectoUseCase.eliminarMimebroProyectoDeTodosSusProyectos(uidEquipo, uidMiembro, milliseconds_a_timestamp(timeOfRequest))

        // SERVICE_MIEMBROS-TODO: Disminuir la cantidad de miembros de cada proyecto en -1
        for (const uidProyectoAfectado of listaProyectosAfectados) {
                    
        }

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
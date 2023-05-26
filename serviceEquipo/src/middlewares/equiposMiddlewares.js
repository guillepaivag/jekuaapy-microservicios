import { request, response } from "express"

// Helpers de CREACION
import { verificadorCreacionEquipo } from "./helpers/equipos/creacion/verificadorCreacionEquipo.js"
import { constructorEquipoCreacion } from "./helpers/equipos/creacion/constructorEquipoCreacion.js"
import { constructorMiembroEquipoCreacion } from "./helpers/equipos/creacion/constructorMiembroEquipoCreacion.js"

// Helpers de ACTUALIZACION
import { verificadorActualizacionEquipo } from "./helpers/equipos/actualizacion/verificadorActualizacionEquipo.js"
import { constructorEquipoActualizacion } from "./helpers/equipos/actualizacion/constructorEquipoActualizacion.js"

// Servicios
import { apiMiembroObtenerMiembroEquipo } from "../services/service_miembro.js"

// Models
import RespuestaError from "../models/Respuestas/RespuestaError.js"

export const verificarCreacionEquipo = async (req = request, res = response, next) => {
    const { params, body, timeOfRequest } = req
    const { solicitante, equipoNuevo } = body

    try {
        if ( !solicitante.authSolicitante.emailVerified ) {
            throw new RespuestaError({
                estado: 400, 
                mensajeCliente: 'correo_no_verificado', 
                mensajeServidor: 'El email no está verificado.', 
                resultado: null
            })
        }

        // Datos requeridos para crear un equipo: codigo, nombre, descripcion
        const dataVerificadorCreacionEquipo = await verificadorCreacionEquipo(equipoNuevo)
        if (dataVerificadorCreacionEquipo instanceof Error) throw dataVerificadorCreacionEquipo

        equipoNuevo.responsable = solicitante.uidSolicitante
        equipoNuevo.fechaCreacion = timeOfRequest
        const { equipoNuevoVerificado } = constructorEquipoCreacion(equipoNuevo)
        const { miembroNuevoVerificado } = constructorMiembroEquipoCreacion(equipoNuevoVerificado.responsable, timeOfRequest)
        
        req.body.equipo = dataVerificadorCreacionEquipo.equipo

        req.body.equipoNuevoVerificado = equipoNuevoVerificado
        req.body.miembroNuevoVerificado = miembroNuevoVerificado

        next()
    } catch (error) {
        next(error)
    }
}


/**
 * configuracion: {  }
*/
export const verificarActualizacionEquipo = async (req = request, res = response, next) => {
    const { params, body } = req
    const { solicitante, equipoActualizado, configuracion } = body

    try {
        if (solicitante.tipo === 'usuario') {
            if ( !solicitante.authSolicitante.emailVerified ) {
                throw new RespuestaError({
                    estado: 400, 
                    mensajeCliente: 'correo_no_verificado', 
                    mensajeServidor: 'El email no está verificado.', 
                    resultado: null
                })
            }

            // El solicitante tiene que ser un miembro del equipo 
            // El solicitante tiene que ser [propietario o editor] del equipo
            const miembroEquipoSolicitante = await apiMiembroObtenerMiembroEquipo(params.uid, solicitante.uidSolicitante)
            if (!miembroEquipoSolicitante || miembroEquipoSolicitante.estado !== 'activo' || (!miembroEquipoSolicitante.roles.includes('propietario') && !miembroEquipoSolicitante.roles.includes('editor'))) {
                throw new RespuestaError({
                    estado: 401, 
                    mensajeCliente: 'no_autorizado', 
                    mensajeServidor: 'No eres un miembro autorizado.', 
                    resultado: null
                })
            }
        }

        // Datos que se actualizan: 
        // [responsable (solo para responsable)], codigo, nombre, descripcion, [cantidadMiembros, cantidadMiembrosPorRol (solo para servicios)]
        const uidUsuarioSolicitante = solicitante.tipo === 'usuario' ? solicitante.uidSolicitante : undefined
        const dataVerificadorActualizacionEquipo = await verificadorActualizacionEquipo(solicitante.tipo, uidUsuarioSolicitante, params.uid, equipoActualizado, configuracion)
        if (dataVerificadorActualizacionEquipo instanceof Error) throw dataVerificadorActualizacionEquipo

        const { equipoActualizadoVerificado } = constructorEquipoActualizacion(solicitante.tipo, equipoActualizado, configuracion)
        
        req.body.equipo = dataVerificadorActualizacionEquipo.equipo
        req.body.equipoPorCodigo = dataVerificadorActualizacionEquipo.equipoPorCodigo

        req.body.equipoActualizadoVerificado = equipoActualizadoVerificado

        next()
    } catch (error) {
        next(error)
    }
}

export const verificarEliminacionEquipo = async (req = request, res = response, next) => {
    const { params, body } = req
    const { solicitante } = body

    try {
        if ( !solicitante.authSolicitante.emailVerified ) {
            throw new RespuestaError({
                estado: 400, 
                mensajeCliente: 'correo_no_verificado', 
                mensajeServidor: 'El email no está verificado.', 
                resultado: null
            })
        }

        // El solicitante tiene que ser un miembro del equipo 
        // El solicitante tiene que ser [propietario] del equipo
        const miembroEquipo = await apiMiembroObtenerMiembroEquipo(params.uid, solicitante.uidSolicitante)
        if (!miembroEquipo || miembroEquipo.estado !== 'activo' || !miembroEquipo.roles.includes('propietario')) {
            throw new RespuestaError({
                estado: 401, 
                mensajeCliente: 'no_autorizado', 
                mensajeServidor: 'No eres un miembro autorizado.', 
                resultado: null
            })
        }
        
        next()
    } catch (error) {
        next(error)
    }
}
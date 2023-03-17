import { request, response } from "express"
import { verificadorCreacionEquipo } from "./helpers/equipos/verificadorCreacionEquipo.js"
import { constructorEquipoCreacion } from "./helpers/equipos/constructorEquipoCreacion.js"
import { verificadorActualizacionEquipo } from "./helpers/equipos/verificadorActualizacionEquipo.js"
import { constructorEquipoActualizacion } from "./helpers/equipos/constructorEquipoActualizacion.js"
import { apiMiembroObtenerMiembroInternoDeEquipo } from "../services/service_miembro.js"
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
        const respuestaError = await verificadorCreacionEquipo(equipoNuevo)
        if (respuestaError) throw respuestaError

        equipoNuevo.responsable = solicitante.uidSolicitante
        equipoNuevo.fechaCreacion = timeOfRequest
        const { equipoNuevoVerificado, miembroNuevoVerificado } = constructorEquipoCreacion(equipoNuevo)
        
        req.body.equipoNuevoVerificado = equipoNuevoVerificado
        req.body.miembroNuevoVerificado = miembroNuevoVerificado

        next()
    } catch (error) {
        next(error)
    }
}

export const verificarObtencionEquipo = async (req = request, res = response, next) => {
    const { params, body } = req
    const { solicitante } = body

    try {
        // tipoPermiso: minimo, medio, completo
        const tipoPermiso = { value: 'minimo' }

        if (!solicitante.uidSolicitante) tipoPermiso.value = 'minimo'
        else if (solicitante.tipo === 'servicio') tipoPermiso.value = 'completo'
        else if (solicitante.tipo === 'usuario') {
            // Si el usuario es miembro del equipo, tipoPermiso.value = 'completo'
            // Si no es miembro del equipo, tipoPermiso.value = 'medio'
            const miembroInterno = await apiMiembroObtenerMiembroInternoDeEquipo(params.uid, solicitante.uidSolicitante)
            if (miembroInterno && miembroInterno.estado === 'activo') tipoPermiso.value = 'completo'
            else if (!miembroInterno || miembroInterno.estado !== 'activo') tipoPermiso.value = 'medio'
        }

        req.body.tipoPermiso = tipoPermiso.value

        next()
    } catch (error) {
        next(error)
    }
}

export const verificarActualizacionEquipo = async (req = request, res = response, next) => {
    const { params, body } = req
    const { solicitante, equipoActualizado } = body

    try {
        if ( !solicitante.authSolicitante.emailVerified ) {
            throw new RespuestaError({
                estado: 400, 
                mensajeCliente: 'correo_no_verificado', 
                mensajeServidor: 'El email no está verificado.', 
                resultado: null
            })
        }

        // Datos que se actualizan: codigo, nombre, descripcion
        const respuestaError = await verificadorActualizacionEquipo(params.uid, equipoActualizado)
        if (respuestaError) throw respuestaError

        // El solicitante tiene que ser un miembro del equipo 
        // El solicitante tiene que ser [propietario o editor] del equipo
        const miembroInterno = await apiMiembroObtenerMiembroInternoDeEquipo(params.uid, solicitante.uidSolicitante)
        if (!miembroInterno || miembroInterno.estado !== 'activo' || (!miembroInterno.roles.includes('propietario') && !miembroInterno.roles.includes('editor'))) {
            throw new RespuestaError({
                estado: 401, 
                mensajeCliente: 'no_autorizado', 
                mensajeServidor: 'No eres un miembro autorizado.', 
                resultado: null
            })
        }

        const { equipoActualizadoVerificado } = constructorEquipoActualizacion(equipoActualizado)
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
        const miembroInterno = await apiMiembroObtenerMiembroInternoDeEquipo(params.uid, solicitante.uidSolicitante)
        if (!miembroInterno || miembroInterno.estado !== 'activo' || !miembroInterno.roles.includes('propietario')) {
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
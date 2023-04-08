import { request, response } from "express"
import RespuestaError from "../models/Respuestas/RespuestaError.js"

// Creacion miembro equipo
import { verificadorCreacionMiembroEquipoUsuario } from "./helpers/miembroEquipo/verificadorCreacionMiembroEquipoUsuario.js"
import { verificadorCreacionMiembroEquipoServicio } from "./helpers/miembroEquipo/verificadorCreacionMiembroEquipoServicio.js"
import { constructorMiembroEquipoCreacion } from "./helpers/miembroEquipo/constructorMiembroEquipoCreacion.js"

// Actualizacion miembro equipo
import { verificadorActualizacionMiembroEquipo } from "./helpers/miembroEquipo/verificadorActualizacionMiembroEquipo.js"
import { constructorMiembroEquipoActualizacion } from "./helpers/miembroEquipo/constructorMiembroEquipoActualizacion.js"

export const verificarCreacionDeMiembroEquipo = async (req = request, res = response, next) => {
    const { params, body, timeOfRequest } = req
    const { solicitante, miembroNuevo } = body

    try {
        let dataVerificadorCreacionMiembroEquipo = null

        if (solicitante.tipo === 'usuario') {
            if ( !solicitante.authSolicitante.emailVerified ) {
                throw new RespuestaError({
                    estado: 400, 
                    mensajeCliente: 'correo_no_verificado', 
                    mensajeServidor: 'El email no está verificado.', 
                    resultado: null
                })
            }

            // Validar los datos - [uid, uidEquipo, roles]
            dataVerificadorCreacionMiembroEquipo = await verificadorCreacionMiembroEquipoUsuario(solicitante.uidSolicitante, miembroNuevo)
            req.body.miembroEquipoSolicitante = dataVerificadorCreacionMiembroEquipo.miembroEquipoSolicitante
        } else if (solicitante.tipo === 'servicio') {
            // Validar los datos - [uid, uidEquipo, roles, estado]
            dataVerificadorCreacionMiembroEquipo = await verificadorCreacionMiembroEquipoServicio(miembroNuevo)
        } else {
            throw new RespuestaError({
                estado: 400, 
                mensajeCliente: 'datos_invalidos', 
                mensajeServidor: 'Tipo de solicitante invalido.', 
                resultado: null
            })
        }

        if (dataVerificadorCreacionMiembroEquipo instanceof Error) throw dataVerificadorCreacionMiembroEquipo

        // Construir el miembro nuevo
        miembroNuevo.fechaCreacion = timeOfRequest
        const { miembroEquipoVerificado } = constructorMiembroEquipoCreacion(solicitante.tipo, miembroNuevo)
        
        req.body.equipo = dataVerificadorCreacionMiembroEquipo.equipo
        req.body.usuarioSolicitado = dataVerificadorCreacionMiembroEquipo.usuarioSolicitado
        req.body.miembroEquipoSolicitado = dataVerificadorCreacionMiembroEquipo.miembroEquipoSolicitado
        req.body.miembroEquipoVerificado = miembroEquipoVerificado

        next()
    } catch (error) {
        next(error)
    }
}

export const verificarActualizacionMiembroEquipo = async (req = request, res = response, next) => {
    const { params, body } = req
    const { uidEquipo, uidMiembro } = params
    const { solicitante, miembroActualizado } = body

    try {
        if ( !solicitante.authSolicitante.emailVerified ) {
            throw new RespuestaError({
                estado: 400, 
                mensajeCliente: 'correo_no_verificado', 
                mensajeServidor: 'El email no está verificado.', 
                resultado: null
            })
        }

        // Datos para actualizar: roles, estado
        const dataVerificadorSolicitudMiembroEquipo = await verificadorActualizacionMiembroEquipo(solicitante.uidSolicitante, uidEquipo, uidMiembro, miembroActualizado)
        if (dataVerificadorSolicitudMiembroEquipo instanceof Error) throw dataVerificadorSolicitudMiembroEquipo

        const { miembroEquipoVerificado } = constructorMiembroEquipoActualizacion(miembroActualizado)

        req.body.equipo = dataVerificadorSolicitudMiembroEquipo.equipo
        req.body.miembroEquipoSolicitante = dataVerificadorSolicitudMiembroEquipo.miembroEquipoSolicitante
        req.body.miembroEquipoSolicitado = dataVerificadorSolicitudMiembroEquipo.miembroEquipoSolicitado
        req.body.miembroEquipoVerificado = miembroEquipoVerificado

        return next()
    } catch (error) {
        next(error)
    }
}

export const verificarEliminacionMiembroEquipo = (req = request, res = response, next) => {
    const { params, body } = req
    const { solicitante } = body

    try {
        // MIEMBRO_EQUIPO-TODO: 

        next()
    } catch (error) {
        next(error)
    }
}
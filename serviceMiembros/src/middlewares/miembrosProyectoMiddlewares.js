import { request, response } from "express"

// Models
import RespuestaError from "../models/Respuestas/RespuestaError.js"

// Helpers - Creacion miembro proyecto
import { verificadorCreacionMiembroProyecto } from "./helpers/miembroProyecto/verificadorCreacionMiembroProyecto.js"
import { constructorMiembroProyectoCreacion } from "./helpers/miembroProyecto/constructorMiembroProyectoCreacion.js"

// Helpers - Eliminacion miembro proyecto
import { verificadorEliminacionMiembroProyecto } from "./helpers/miembroProyecto/verificadorEliminacionMiembroProyecto.js"


export const verificarCreacionDeMiembroProyecto = async (req = request, res = response, next) => {
    const { params, body, timeOfRequest } = req
    const { solicitante, miembroNuevo } = body

    try {
        
        if ( !solicitante.authSolicitante.emailVerified ) {
            throw new RespuestaError({
                estado: 400, 
                mensajeCliente: 'correo_no_verificado', 
                mensajeServidor: 'El email no está verificado.', 
                resultado: null
            })
        }

        // Se validan estos datos -> uid, uidEquipo, uidProyecto
        const dataVerificadorCreacionMiembroProyecto = await verificadorCreacionMiembroProyecto(solicitante.uidSolicitante, miembroNuevo)
        if (dataVerificadorCreacionMiembroProyecto instanceof Error) throw dataVerificadorCreacionMiembroProyecto

        miembroNuevo.fechaCreacion = timeOfRequest
        const { miembroProyectoVerificado } = constructorMiembroProyectoCreacion(miembroNuevo)
        
        req.body.miembroEquipoSolicitante = dataVerificadorCreacionMiembroProyecto.miembroEquipoSolicitante
        req.body.usuarioSolicitado = dataVerificadorCreacionMiembroProyecto.usuarioSolicitado
        req.body.miembroEquipoSolicitado = dataVerificadorCreacionMiembroProyecto.miembroEquipoSolicitado
        req.body.proyecto = dataVerificadorCreacionMiembroProyecto.proyecto
        req.body.miembroProyectoSolicitado = dataVerificadorCreacionMiembroProyecto.miembroProyectoSolicitado
        
        req.body.miembroProyectoVerificado = miembroProyectoVerificado

        next()
    } catch (error) {
        next(error)
    }
}

export const verificarEliminacionMiembroProyecto = async (req = request, res = response, next) => {
    const { params, body } = req
    const { uidEquipo, uidProyecto, uidMiembro } = params
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

        const dataVerificadorEliminacionMiembroProyecto = await verificadorEliminacionMiembroProyecto(solicitante.uidSolicitante, uidEquipo, uidProyecto, uidMiembro)
        if (dataVerificadorEliminacionMiembroProyecto instanceof Error) throw dataVerificadorEliminacionMiembroProyecto

        req.body.proyecto = dataVerificadorEliminacionMiembroProyecto.proyecto
        req.body.miembroEquipoSolicitante = dataVerificadorEliminacionMiembroProyecto.miembroEquipoSolicitante
        req.body.miembroProyectoSolicitado = dataVerificadorEliminacionMiembroProyecto.miembroProyectoSolicitado

        next()
    } catch (error) {
        next(error)
    }
}
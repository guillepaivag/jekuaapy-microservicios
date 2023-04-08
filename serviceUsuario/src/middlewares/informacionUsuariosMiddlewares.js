import { request, response } from "express";
import { verificadorActualizacionInformacionUsuario } from "./helpers/informacionUsuarios/verificadorActualizacionInformacionUsuario.js";
import { constructorInformacionUsuarioActualizacion } from "./helpers/informacionUsuarios/constructorInformacionUsuarioActualizacion.js";
import RespuestaError from "../models/Respuestas/RespuestaError.js";

export const verificarActualizacionInformacionUsuario = async (req = request, res = response, next) => {
    const { body } = req
    const { informacionUsuarioActualizado } = body

    try {
        if ( !solicitante.authSolicitante.emailVerified ) {
            throw new RespuestaError({
                estado: 400, 
                mensajeCliente: 'correo_no_verificado', 
                mensajeServidor: 'El email no está verificado.', 
                resultado: null
            })
        }

        // Datos para actualizar en este endpoint: descripcion - especializaciones - intereses - redesSociales
        const respuestaError = verificadorActualizacionInformacionUsuario(informacionUsuarioActualizado)
        if (respuestaError) throw respuestaError

        req.body.datosInformacionUsuarioActualizado = constructorInformacionUsuarioActualizacion(informacionUsuarioActualizado)

        next()
    } catch (error) {
        next(error)
    }
}
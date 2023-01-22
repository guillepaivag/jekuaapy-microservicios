import { request, response } from "express";
import { verificadorCreacionUsuario } from "./helpers/usuarios/verificadorCreacionUsuario.js";
import { verificadorActualizacionUsuario } from "./helpers/usuarios/verificadorActualizacionUsuario.js";
import { constructorUsuarioActualizacion } from "./helpers/usuarios/constructorUsuarioActualizacion.js";
import { constructorUsuarioCreacion } from "./helpers/usuarios/constructorUsuarioCreacion.js";
import { verificadorReenvioCorreoVerificacion } from "./helpers/usuarios/verificadorReenvioCorreoVerificacion.js";
import { verificadorActualizacionContrasena } from "./helpers/usuarios/verificadorActualizacionContrasena.js";

export const verificarCreacionUsuario = async (req = request, res = response, next) => {
    const { body } = req
    const { usuarioNuevo, contrasena, confirmacionContrasena } = body

    try {
        // usuarioNuevo.correo, usuarioNuevo.nombreUsuario, usuarioNuevo.nombreCompleto, contrasena, confirmacionContrasena
        const respuestaError = await verificadorCreacionUsuario(usuarioNuevo, contrasena, confirmacionContrasena)
        if (respuestaError) throw respuestaError

        const { datosUsuarioNuevo, datosInformacionUsuarioNuevo } = constructorUsuarioCreacion(usuarioNuevo)
        req.body.datosUsuarioNuevo = datosUsuarioNuevo
        req.body.datosInformacionUsuarioNuevo = datosInformacionUsuarioNuevo
        
        next()
    } catch (error) {
        next(error)
    }
}

export const verificarActualizacionUsuario = async (req = request, res = response, next) => {
    const { body } = req
    const { usuarioActualizado } = body

    try {
        // Datos para actualizar en este endpoint: correo - fechaNacimiento - nombreCompleto - nombreUsuario
        const respuestaError = await verificadorActualizacionUsuario(usuarioActualizado)
        if (respuestaError) throw respuestaError

        req.body.datosUsuarioActualizado = constructorUsuarioActualizacion(usuarioActualizado)

        next()
    } catch (error) {
        next(error)
    }
}

export const verificarReevioCorreoVerificacion = async (req = request, res = response, next) => {
    const { body } = req
    const { solicitante } = body
    const { authToken, uidSolicitante, authSolicitante } = solicitante

    try {
        const respuestaError = verificadorReenvioCorreoVerificacion(authSolicitante)
        if (respuestaError) throw respuestaError

        next()
    } catch (error) {
        next(error)
    }
}

export const verificarActualizacionContrasena = (req = request, res = response, next) => {
    const { body } = req
    const { solicitante, contrasena, confirmacionContrasena } = body
    const { authToken, uidSolicitante, authSolicitante } = solicitante

    try {
        const respuestaError = verificadorActualizacionContrasena(contrasena, confirmacionContrasena)
        if (respuestaError) throw respuestaError

        next()
    } catch (error) {
        next(error)
    }
}

export const verificarEliminacionUsuario = (req = request, res = response, next) => {

}
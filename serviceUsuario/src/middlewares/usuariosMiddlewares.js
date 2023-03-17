import { request, response } from "express";
import { verificadorCreacionUsuario } from "./helpers/usuarios/verificadorCreacionUsuario.js";
import { verificadorActualizacionUsuario } from "./helpers/usuarios/verificadorActualizacionUsuario.js";
import { constructorUsuarioActualizacion } from "./helpers/usuarios/constructorUsuarioActualizacion.js";
import { constructorUsuarioCreacion } from "./helpers/usuarios/constructorUsuarioCreacion.js";
import { verificadorActualizacionContrasena } from "./helpers/usuarios/verificadorActualizacionContrasena.js";
import RespuestaError from "../models/Respuestas/RespuestaError.js"

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
    const { solicitante, usuarioActualizado } = body

    try {
        const datosDependientesDeCorreoVerificado = usuarioActualizado.fechaNacimiento !== undefined || 
        usuarioActualizado.nombreCompleto !== undefined || 
        usuarioActualizado.nombreUsuario !== undefined

        if ( datosDependientesDeCorreoVerificado && !solicitante.authSolicitante.emailVerified ) {
            throw new RespuestaError({
                estado: 400, 
                mensajeCliente: 'correo_no_verificado', 
                mensajeServidor: 'El email no está verificado.', 
                resultado: null
            })
        }

        // Datos para actualizar en este endpoint: correo - fechaNacimiento - nombreCompleto - nombreUsuario
        const respuestaError = await verificadorActualizacionUsuario(usuarioActualizado)
        if (respuestaError) throw respuestaError

        req.body.datosUsuarioActualizado = constructorUsuarioActualizacion(usuarioActualizado)

        next()
    } catch (error) {
        console.log('error', error)
        next(error)
    }
}

export const verificarActualizacionContrasena = (req = request, res = response, next) => {
    const { body } = req
    const { solicitante, contrasena, confirmacionContrasena } = body

    try {
        
        if ( !solicitante.authSolicitante.emailVerified ) {
            throw new RespuestaError({
                estado: 400, 
                mensajeCliente: 'correo_no_verificado', 
                mensajeServidor: 'El email no está verificado.', 
                resultado: null
            })
        }

        const respuestaError = verificadorActualizacionContrasena(contrasena, confirmacionContrasena)
        if (respuestaError) throw respuestaError

        next()
    } catch (error) {
        next(error)
    }
}

export const verificarRestauracionFotoPerfil = (req = request, res = response, next) => {
    const { params, body } = req
    const { solicitante, tipoRestauracion } = body

    try {
        if ( !solicitante.authSolicitante.emailVerified ) {
            throw new RespuestaError({
                estado: 400, 
                mensajeCliente: 'correo_no_verificado', 
                mensajeServidor: 'El email no está verificado.', 
                resultado: null
            })
        }

        const tiposRestauraciones = ['vacio', 'default']
        if ( !tiposRestauraciones.includes(tipoRestauracion) ) {
            throw new RespuestaError({
                estado: 400, 
                mensajeCliente: 'tipo_restauracion_no_existe', 
                mensajeServidor: 'No es un tipo de restauracián de foto de perfil válida.', 
                resultado: null
            })
        }

        tipoRestauracion === 'vacio' ? req.body.tipoRestauracion = '' : ''

        next()
    } catch (error) {
        next(error)
    }
}

export const verificarRestauracionFotoPortada = (req = request, res = response, next) => {
    const { params, body } = req
    const { solicitante, tipoRestauracion } = body

    try {
        if ( !solicitante.authSolicitante.emailVerified ) {
            throw new RespuestaError({
                estado: 400, 
                mensajeCliente: 'correo_no_verificado', 
                mensajeServidor: 'El email no está verificado.', 
                resultado: null
            })
        }

        const tiposRestauraciones = ['vacio', 'default']
        if ( !tiposRestauraciones.includes(tipoRestauracion) ) {
            throw new RespuestaError({
                estado: 400, 
                mensajeCliente: 'tipo_restauracion_no_existe', 
                mensajeServidor: 'No es un tipo de restauracián de foto de perfil válida.', 
                resultado: null
            })
        }

        tipoRestauracion === 'vacio' ? req.body.tipoRestauracion = '' : ''

        next()
    } catch (error) {
        next(error)
    }
}

export const verificarEliminacionUsuario = (req = request, res = response, next) => {

}
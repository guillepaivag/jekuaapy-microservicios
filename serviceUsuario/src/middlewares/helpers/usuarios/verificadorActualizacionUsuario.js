// Models
import RespuestaError from "../../../models/Respuestas/RespuestaError.js"

// Utils
import { esNombreUsuario } from "../../../utils/esNombreUsuario.js"
import { esCorreoValido } from "../../../utils/esCorreoValido.js"
import { obtenerEdad } from "../../../utils/obtenerEdad.js"

// Repositories&UseCase - Usuarios
import FirestoreUsuariosRepository from "../../../repositories/FirestoreUsuariosRepository.js"
import UsuariosUseCase from "../../../usecases/UsuariosUseCase.js"

// Objetos de use-cases
const usuariosUseCase = new UsuariosUseCase(new FirestoreUsuariosRepository())

export const verificadorActualizacionUsuario = async (usuarioActualizado) => {
    let respuestaError = null
    
    // ##### Datos requeridos #####
    respuestaError = verificacionDatosRequeridos(usuarioActualizado)
    if (respuestaError) return respuestaError

    // ##### Tipos de datos #####
    respuestaError = verificacionTiposDeDatos(usuarioActualizado)
    if (respuestaError) return respuestaError

    // ##### Datos validos #####
    respuestaError = verificacionCondicionalDeDatos(usuarioActualizado)
    if (respuestaError) return respuestaError

    usuarioActualizado.correo ? respuestaError = await verificacionCorreoEnUso(usuarioActualizado.correo) : ''
    if (respuestaError) return respuestaError
    
    usuarioActualizado.nombreUsuario ? respuestaError = await verificacionNombreUsuarioEnUso(usuarioActualizado.nombreUsuario) : ''
    if (respuestaError) return respuestaError

    return null
}

const verificacionDatosRequeridos = (usuarioActualizado) => {

    const cantidadDeCamposParaActualizar = Object.keys(usuarioActualizado).length
    if ( !cantidadDeCamposParaActualizar ) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'sin_campos_para_actualizar', 
            mensajeServidor: 'Se requiere al menos un campo para actualizar.', 
            resultado: null
        })
    }

    return null
}

const verificacionTiposDeDatos = (usuarioActualizado) => {
    if (usuarioActualizado.correo && typeof usuarioActualizado.correo !== 'string') {
        return TypeError('[correo] debe ser string')
    }

    if (usuarioActualizado.nombreUsuario && typeof usuarioActualizado.nombreUsuario !== 'string') {
        return TypeError('[nombreUsuario] debe ser string')
    }

    if (usuarioActualizado.nombreCompleto && typeof usuarioActualizado.nombreCompleto !== 'string') {
        return TypeError('[nombreCompleto] debe ser string')
    }

    if (usuarioActualizado.fechaNacimiento && typeof usuarioActualizado.fechaNacimiento !== 'number') {
        return TypeError('[fechaNacimiento] debe ser number')
    }

    return null
}

const verificacionCondicionalDeDatos = (usuarioActualizado) => {

    // Correo valido
    if ( usuarioActualizado.correo && !esCorreoValido(usuarioActualizado.correo) ) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'correo_invalido', 
            mensajeServidor: '[correo] no es válido.', 
            resultado: null
        })
    }

    // Nombre de usuario valido [cantidad_caracteres, caracteres_validos]
    if (usuarioActualizado.nombreUsuario && usuarioActualizado.nombreUsuario.length > 50) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'caracteres_nombreUsuario_excedido', 
            mensajeServidor: '[nombreUsuario] solo puede tener hasta 50 caracteres.', 
            resultado: null
        })
    }

    if ( usuarioActualizado.nombreUsuario && !esNombreUsuario(usuarioActualizado.nombreUsuario) ) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'nombreUsuario_invalido', 
            mensajeServidor: '[nombreUsuario] no es válido.', 
            resultado: null
        })
    }

    // Nombre completo valido [cantidad_caracteres]
    if (usuarioActualizado.nombreCompleto && usuarioActualizado.nombreCompleto.length > 100) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'caracteres_nombreCompleto_excedido', 
            mensajeServidor: '[nombreCompleto] solo puede tener hasta 100 caracteres.', 
            resultado: null
        })
    }

    // Fecha de nacimiento
    if (usuarioActualizado.fechaNacimiento) {
        // Solo si tiene 1 año de edad puede registrarse
        let edad = obtenerEdad(usuarioActualizado.fechaNacimiento)
        let valido = edad >= 1
        if ( !valido ) {
            throw new TypeError('El usuario debe tener al menos 1 año de edad.')
        }
    }
    
    return null
}

const verificacionCorreoEnUso = async (correo) => {
    const usuario = await usuariosUseCase.obtenerPorCorreo(correo)
    if (usuario) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'correo_en_uso', 
            mensajeServidor: 'Ya se está usando este correo.', 
            resultado: null
        })
    }

    return null
}

const verificacionNombreUsuarioEnUso = async (nombreUsuario) => {
    const usuario = await usuariosUseCase.obtenerPorNombreUsuario(nombreUsuario)
    if (usuario) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'nombreUsuario_en_uso', 
            mensajeServidor: 'Ya se está usando este nombre de usuario.', 
            resultado: null
        })
    }

    return null
}
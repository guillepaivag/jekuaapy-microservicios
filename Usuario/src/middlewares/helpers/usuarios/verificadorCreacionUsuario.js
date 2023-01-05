// Models
import RespuestaError from "../../../models/Respuestas/RespuestaError.js"

// Utils
import { esNombreUsuario } from "../../../utils/esNombreUsuario.js"
import { esCorreoValido } from "../../../utils/esCorreoValido.js"

// Repositories&UseCase - Usuarios
import FirestoreUsuariosRepository from "../../../repositories/FirestoreUsuariosRepository.js"
import UsuariosUseCase from "../../../usecases/UsuariosUseCase.js"

// Objetos de use-cases
const usuariosUseCase = new UsuariosUseCase(new FirestoreUsuariosRepository())

export const verificadorCreacionUsuario = async (usuarioNuevo, contrasena, confirmacionContrasena) => {
    let respuestaError = null

    // ##### Datos requeridos #####
    respuestaError = verificacionDatosRequeridos(usuarioNuevo)
    if (respuestaError) return respuestaError

    // ##### Tipos de datos #####
    respuestaError = verificacionTiposDeDatos(usuarioNuevo)
    if (respuestaError) return respuestaError

    // ##### Datos validos #####
    respuestaError = verificacionCondicionalDeDatos(usuarioNuevo)
    if (respuestaError) return respuestaError

    respuestaError = await verificacionCorreoEnUso(usuarioNuevo.correo)
    if (respuestaError) return respuestaError
    
    respuestaError = await verificacionNombreUsuarioEnUso(usuarioNuevo.nombreUsuario)
    if (respuestaError) return respuestaError

    // ##### Verificacion de contrasena #####
    respuestaError = verificacionContrasena(contrasena, confirmacionContrasena)
    if (respuestaError) return respuestaError

    return null
}

const verificacionDatosRequeridos = (usuarioNuevo, contrasena, confirmacionContrasena) => {

    if ( !usuarioNuevo.correo ) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'correo_requerido', 
            mensajeServidor: '[correo] es requerido.', 
            resultado: null
        })
    }

    if ( !usuarioNuevo.nombreUsuario ) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'nombreUsuario_requerido', 
            mensajeServidor: '[nombreUsuario] es requerido.', 
            resultado: null
        })
    }

    if ( !usuarioNuevo.nombreCompleto ) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'nombreCompleto_requerido', 
            mensajeServidor: '[nombreCompleto] es requerido.', 
            resultado: null
        })
    }

    if ( !contrasena ) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'contrasena_requerido', 
            mensajeServidor: '[contrasena] es requerida.', 
            resultado: null
        })
    }

    if ( !confirmacionContrasena ) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'confirmacionContrasena_requerido', 
            mensajeServidor: '[confirmacionContrasena] es requerida.', 
            resultado: null
        })
    }

    return null
}

const verificacionTiposDeDatos = (usuarioNuevo) => {
    if (typeof usuarioNuevo.correo !== 'string') {
        return TypeError('[correo] debe ser string')
    }

    if (typeof usuarioNuevo.nombreUsuario !== 'string') {
        return TypeError('[nombreUsuario] debe ser string')
    }

    if (typeof usuarioNuevo.nombreCompleto !== 'string') {
        return TypeError('[nombreCompleto] debe ser string')
    }

    return null
}

const verificacionCondicionalDeDatos = (usuarioNuevo) => {

    // Correo valido
    if ( !esCorreoValido(usuarioNuevo.correo) ) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'correo_invalido', 
            mensajeServidor: '[correo] no es válido.', 
            resultado: null
        })
    }

    // Nombre de usuario valido [cantidad_caracteres, caracteres_validos]
    if (usuarioNuevo.nombreUsuario.length > 50) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'caracteres_nombreUsuario_excedido', 
            mensajeServidor: '[nombreUsuario] solo puede tener hasta 50 caracteres.', 
            resultado: null
        })
    }

    if ( !esNombreUsuario(usuarioNuevo.nombreUsuario) ) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'nombreUsuario_invalido', 
            mensajeServidor: '[nombreUsuario] no es válido.', 
            resultado: null
        })
    }

    // Nombre completo valido [cantidad_caracteres]
    if (usuarioNuevo.nombreCompleto.length > 100) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'caracteres_nombreCompleto_excedido', 
            mensajeServidor: '[nombreCompleto] solo puede tener hasta 100 caracteres.', 
            resultado: null
        })
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

const verificacionContrasena = (contrasena, confirmacionContrasena) => {
    if (contrasena !== confirmacionContrasena) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'contrasena_diferente_a_confirmacionContrasena', 
            mensajeServidor: '[contrasena] y [confirmacionContrasena] son diferentes.', 
            resultado: null
        })
    }

    return null
}
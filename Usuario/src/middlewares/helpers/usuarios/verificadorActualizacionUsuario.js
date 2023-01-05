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

export const verificadorActualizacionUsuario = async (usuarioActualizado) => {
    let respuestaError = null

    // correo - fechaNacimiento - nombreCompleto - nombreUsuario
    
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
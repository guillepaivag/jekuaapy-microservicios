// Models
import RespuestaError from "../../../models/Respuestas/RespuestaError.js"

// Apis
import { apiUsuarioObtenerUsuario } from "../../../services/service_usuario.js"
import { apiEquipoObtenerEquipo } from "../../../services/service_equipo.js"

// Repositories&UseCase - Usuarios
import FirestoreMiembroEquipoRepository from "../../../repositories/FirestoreMiembroEquipoRepository.js"
import MiembroEquipoUseCase from "../../../usecases/MiembroEquipoUseCase.js"

// Helpers
import { verificarEstadoDeMiembroEquipo } from "../../../helpers/verificarEstadoDeMiembroEquipo.js"
import { verificarListaDeRoles } from "../../../helpers/esRolValido.js"

// Objetos de use-cases
const miembroEquipoUseCase = new MiembroEquipoUseCase(new FirestoreMiembroEquipoRepository())

export const verificadorCreacionMiembroEquipoServicio = async (miembroNuevo) => {   
    // ##### Datos requeridos #####
    const datosRequeridos = verificacionDatosRequeridos(miembroNuevo)
    if (datosRequeridos instanceof Error) return datosRequeridos

    // ##### Tipos de datos #####
    const tiposDeDatos = verificacionTiposDeDatos(miembroNuevo)
    if (tiposDeDatos instanceof Error) return tiposDeDatos

    // ##### Datos validos #####
    const validacionCondicional = await verificacionCondicionalDeDatos(miembroNuevo)
    if (validacionCondicional instanceof Error) return validacionCondicional

    return validacionCondicional
}

const verificacionDatosRequeridos = (miembroNuevo) => {

    if ( !miembroNuevo.uid ) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'uid_requerido', 
            mensajeServidor: '[uid] es requerido.', 
            resultado: null
        })
    }

    if ( !miembroNuevo.uidEquipo ) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'uidEquipo_requerido', 
            mensajeServidor: '[uidEquipo] es requerido.', 
            resultado: null
        })
    }

    if ( !miembroNuevo.roles || !miembroNuevo.roles.length ) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'rol_requerido', 
            mensajeServidor: '[roles] es requerido.', 
            resultado: null
        })
    }

    if ( !miembroNuevo.estado ) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'estado_requerido', 
            mensajeServidor: '[estado] es requerido.', 
            resultado: null
        })
    }

}

const verificacionTiposDeDatos = (miembroNuevo) => {

    if (typeof miembroNuevo.uid !== 'string') return TypeError('[uid] debe ser string')

    if (typeof miembroNuevo.uidEquipo !== 'string') return TypeError('[uidEquipo] debe ser string')

    if ( !(miembroNuevo.roles instanceof Array) ) return TypeError('[roles] debe ser array')
    
    if (typeof miembroNuevo.estado !== 'string') return TypeError('[estado] debe ser string')

}

// Solo se verifica -> uid, uidEquipo, roles, estado
const verificacionCondicionalDeDatos = async (miembroNuevo) => {
    const data = {}

    // Verificar la existencia del equipo
    const equipo = await apiEquipoObtenerEquipo(miembroNuevo.uidEquipo)
    if (!equipo || equipo.estado === 'eliminado') {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'no_existe_equipo', 
            mensajeServidor: 'No existe el equipo.', 
            resultado: null
        })
    }

    // Verificar existencia del usuario
    const usuarioSolicitado = await apiUsuarioObtenerUsuario('uid', miembroNuevo.uid)
    if (!usuarioSolicitado) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'no_existe_usuario', 
            mensajeServidor: 'No existe el usuario.', 
            resultado: null
        })
    }

    // Verificar que el usuario NO EXISTA en el equipo
    const miembroEquipoSolicitado = await miembroEquipoUseCase.obtenerPorUID(miembroNuevo.uidEquipo, miembroNuevo.uid)
    if (miembroEquipoSolicitado && miembroEquipoSolicitado.estado !== 'eliminado') {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'ya_existe_miembro', 
            mensajeServidor: 'El miembro ya existe.', 
            resultado: null
        })
    }

    // Verificar los datos de solicitud [roles]
    const rolesValidos = verificarListaDeRoles(miembroNuevo.roles)
    if (!rolesValidos) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'datos_invalidos', 
            mensajeServidor: 'Roles invalidos.', 
            resultado: null
        })
    }

    const dataVerificadorCantidadLimiteDeMiembrosPorRoles = verificadorCantidadLimiteDeMiembrosPorRoles(equipo, miembroNuevo.roles)
    if (dataVerificadorCantidadLimiteDeMiembrosPorRoles instanceof Error) return dataVerificadorCantidadLimiteDeMiembrosPorRoles

    // Verificar los datos de solicitud [estado]
    const estadoValido = verificarEstadoDeMiembroEquipo(miembroNuevo.estado)
    if (!estadoValido) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'datos_invalidos', 
            mensajeServidor: 'Estado invalido.', 
            resultado: null
        })
    }

    data.equipo = equipo
    data.usuarioSolicitado = usuarioSolicitado
    data.miembroEquipoSolicitado = miembroEquipoSolicitado
    
    return data
}





// Verificacion de cantidad limites de miembros por roles
const verificadorCantidadLimiteDeMiembrosPorRoles = (equipo, roles) => {
    
    if (roles.includes('propietario') && equipo.cantidadMiembrosPorRol.propietario === 2) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'uid_requerido', 
            mensajeServidor: '[uid] es requerido.', 
            resultado: null
        })
    }

    if (roles.includes('editor') && equipo.cantidadMiembrosPorRol.editor === 4) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'uid_requerido', 
            mensajeServidor: '[uid] es requerido.', 
            resultado: null
        })
    }

    if (roles.includes('visualizador') && equipo.cantidadMiembrosPorRol.visualizador === 5) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'uid_requerido', 
            mensajeServidor: '[uid] es requerido.', 
            resultado: null
        })
    }

}
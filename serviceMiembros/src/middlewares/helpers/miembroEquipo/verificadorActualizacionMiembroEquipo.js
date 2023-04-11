// Models
import RespuestaError from "../../../models/Respuestas/RespuestaError.js"

// Apis
import { apiEquipoObtenerEquipo } from "../../../services/service_equipo.js"

// Repositories&UseCase - Usuarios
import FirestoreMiembroEquipoRepository from "../../../repositories/FirestoreMiembroEquipoRepository.js"
import MiembroEquipoUseCase from "../../../usecases/MiembroEquipoUseCase.js"

// Helpers
import { verificarEstadoDeMiembroEquipo } from "../../../helpers/verificarEstadoDeMiembroEquipo.js"
import { verificarListaDeRoles } from "../../../helpers/esRolValido.js"

// Objetos de use-cases
const miembroEquipoUseCase = new MiembroEquipoUseCase(new FirestoreMiembroEquipoRepository())

export const verificadorActualizacionMiembroEquipo = async (uidSolicitante, uidEquipo, uidMiembro, miembroActualizado) => {

    // ##### Datos requeridos #####
    const datosRequeridos = verificacionDatosRequeridos(miembroActualizado)
    if (datosRequeridos instanceof Error) return datosRequeridos

    // ##### Tipos de datos #####
    const tiposDeDatos = verificacionTiposDeDatos(miembroActualizado)
    if (tiposDeDatos instanceof Error) return tiposDeDatos

    // ##### Datos validos #####
    const validacionCondicional = await verificacionCondicionalDeDatos(uidSolicitante, uidEquipo, uidMiembro, miembroActualizado)
    if (validacionCondicional instanceof Error) return validacionCondicional
    
    return validacionCondicional
}

const verificacionDatosRequeridos = (miembroActualizado) => {
    if (!Object.keys(miembroActualizado).length) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'faltan_datos', 
            mensajeServidor: 'No hay datos para actualizar.', 
            resultado: null
        })
    }
}

const verificacionTiposDeDatos = (miembroActualizado) => {
    if ( miembroActualizado.roles && !(miembroActualizado.roles instanceof Array) ) return TypeError('[roles] debe ser array')
    if ( miembroActualizado.estado && typeof miembroActualizado.estado !== 'string' ) return TypeError('[estado] debe ser string')
}

// Solo se verifica -> roles, estado
const verificacionCondicionalDeDatos = async (uidSolicitante, uidEquipo, uidMiembro, miembroActualizado) => {
    const data = {}

    // Validar la ID del equipo
    const equipo = await apiEquipoObtenerEquipo(uidEquipo)
    if (!equipo) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'no_existe_equipo', 
            mensajeServidor: 'No existe el equipo.', 
            resultado: null
        })
    }

    // Verificar que el usuario sea propietario o editor
    const miembroEquipoSolicitante = await miembroEquipoUseCase.obtenerPorUID(uidEquipo, uidSolicitante)
    if (!miembroEquipoSolicitante || miembroEquipoSolicitante.estado !== 'activo' || (!miembroEquipoSolicitante.roles.includes('propietario') && !miembroEquipoSolicitante.roles.includes('editor'))) {
        return new RespuestaError({
            estado: 401, 
            mensajeCliente: 'no_autorizado', 
            mensajeServidor: 'No eres un miembro propietario o editor.', 
            resultado: null
        })
    }

    // Obtener el miembro solicitado
    const miembroEquipoSolicitado = await miembroEquipoUseCase.obtenerPorUID(uidEquipo, uidMiembro)
    if (!miembroEquipoSolicitado || miembroEquipoSolicitado.estado == 'eliminado') {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'datos_invalidos', 
            mensajeServidor: 'No existe este miembro en este equipo.', 
            resultado: null
        })
    }

    // Verificar que el solicitante no pueda actualizar a los solicitados, si no tiene permisos
    if (miembroEquipoSolicitado.roles.includes('propietario') && !miembroEquipoSolicitante.roles.includes('propietario')) {
        return new RespuestaError({
            estado: 401, 
            mensajeCliente: 'no_autorizado', 
            mensajeServidor: 'No se puede actualizar un miembro con mayor rol si no tienes permisos.', 
            resultado: null
        })
    }

    // Verificar los datos de solicitud [roles]
    if (miembroActualizado.roles) {
        const rolesValidos = verificarListaDeRoles(miembroActualizado.roles)
        if (!rolesValidos) {
            return new RespuestaError({
                estado: 400, 
                mensajeCliente: 'datos_invalidos', 
                mensajeServidor: 'Roles invalidos.', 
                resultado: null
            })
        }

        if (miembroActualizado.roles.includes('propietario') && !miembroEquipoSolicitante.roles.includes('propietario')) {
            return new RespuestaError({
                estado: 401, 
                mensajeCliente: 'no_autorizado', 
                mensajeServidor: 'No puedes crear un propietario si no eres propietario.', 
                resultado: null
            })
        }

        const dataVerificadorCantidadLimiteDeMiembrosPorRoles = verificadorCantidadLimiteDeMiembrosPorRoles(equipo, miembroActualizado.roles)
        if (dataVerificadorCantidadLimiteDeMiembrosPorRoles instanceof Error) return dataVerificadorCantidadLimiteDeMiembrosPorRoles
    }

    // Verificar los datos de solicitud [estado]
    if (miembroActualizado.estado) {
        const estadoValido = verificarEstadoDeMiembroEquipo(miembroActualizado.estado)
        if (!estadoValido) {
            return new RespuestaError({
                estado: 400, 
                mensajeCliente: 'datos_invalidos', 
                mensajeServidor: 'Estado invalido.', 
                resultado: null
            })
        }

        if (miembroActualizado.estado === 'eliminado') {
            return new RespuestaError({
                estado: 400, 
                mensajeCliente: 'datos_invalidos', 
                mensajeServidor: 'No puedes cambiar el estado a "eliminado" en una actualización.', 
                resultado: null
            })
        }
    }

    data.equipo = equipo
    data.miembroEquipoSolicitante = miembroEquipoSolicitante
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
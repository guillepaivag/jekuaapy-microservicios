// Models
import RespuestaError from "../../../models/Respuestas/RespuestaError.js"

// Repositories&UseCase - Usuarios
import FirestoreMiembroEquipoRepository from "../../../repositories/FirestoreMiembroEquipoRepository.js"
import MiembroEquipoUseCase from "../../../usecases/MiembroEquipoUseCase.js"

// Objetos de use-cases
const miembroEquipoUseCase = new MiembroEquipoUseCase(new FirestoreMiembroEquipoRepository())

export const verificadorEliminacionMiembroEquipo = async (uidSolicitante, uidEquipo, uidMiembro) => {

    const data = {}

    // Validar la ID del equipo
    const equipo = await apiEquipoObtenerEquipo(uidEquipo)
    if (!equipo || equipo.estado === 'eliminado') {
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
    if (!miembroEquipoSolicitado || miembroEquipoSolicitado.estado === 'eliminado') {
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

    data.equipo = equipo
    data.miembroEquipoSolicitante = miembroEquipoSolicitante
    data.miembroEquipoSolicitado = miembroEquipoSolicitado

    return data
}
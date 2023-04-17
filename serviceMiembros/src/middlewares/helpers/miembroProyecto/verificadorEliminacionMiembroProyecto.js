// Models
import RespuestaError from "../../../models/Respuestas/RespuestaError.js"

// Apis
import { apiEquipoObtenerEquipo } from "../../../services/service_equipo.js"

// Repositories&UseCase - Usuarios
import FirestoreMiembroEquipoRepository from "../../../repositories/FirestoreMiembroEquipoRepository.js"
import MiembroEquipoUseCase from "../../../usecases/MiembroEquipoUseCase.js"

// Repositories&UseCase - Usuarios
import FirestoreMiembroProyectoRepository from "../../../repositories/FirestoreMiembroProyectoRepository.js"
import MiembroProyectoUseCase from "../../../usecases/MiembroProyectoUseCase.js"

// Objetos de use-cases
const miembroEquipoUseCase = new MiembroEquipoUseCase(new FirestoreMiembroEquipoRepository())
const miembroProyectoUseCase = new MiembroProyectoUseCase(new FirestoreMiembroProyectoRepository())

export const verificadorEliminacionMiembroProyecto = async (uidSolicitante = '', uidEquipo = '', uidProyecto = '', uidMiembro = '') => {
    const data = {}
    
    // Verificar que el solicitante sea propietario o editor
    const miembroEquipoSolicitante = await miembroEquipoUseCase.obtenerPorUID(uidEquipo, uidSolicitante)
    if (!miembroEquipoSolicitante || miembroEquipoSolicitante.estado !== 'activo' || (!miembroEquipoSolicitante.roles.includes('propietario') && !miembroEquipoSolicitante.roles.includes('editor'))) {
        return new RespuestaError({
            estado: 401, 
            mensajeCliente: 'no_autorizado', 
            mensajeServidor: 'No eres un miembro de tipo propietario o editor.', 
            resultado: null
        })
    }
    
    // Verificacion existencia miembro proyecto solicitado
    const miembroProyectoSolicitado = await miembroProyectoUseCase.obtenerPorUID(uidEquipo, uidProyecto, uidMiembro)
    if (!miembroProyectoSolicitado || miembroProyectoSolicitado.estado === 'eliminado') {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'datos_invalidos', 
            mensajeServidor: 'No existe este miembro en este proyecto.', 
            resultado: null
        })
    }

    data.miembroEquipoSolicitante = miembroEquipoSolicitante
    data.miembroProyectoSolicitado = miembroProyectoSolicitado

    return data
}

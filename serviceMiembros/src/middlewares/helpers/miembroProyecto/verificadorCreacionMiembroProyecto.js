// Models
import RespuestaError from "../../../models/Respuestas/RespuestaError.js"

// Apis
import { apiUsuarioObtenerUsuario } from "../../../services/service_usuario.js"
import { apiProyectoObtenerProyecto } from "../../../services/service_proyecto.js"

// Repositories&UseCase - Usuarios
import FirestoreMiembroEquipoRepository from "../../../repositories/FirestoreMiembroEquipoRepository.js"
import MiembroEquipoUseCase from "../../../usecases/MiembroEquipoUseCase.js"

// Repositories&UseCase - Usuarios
import FirestoreMiembroProyectoRepository from "../../../repositories/FirestoreMiembroProyectoRepository.js"
import MiembroProyectoUseCase from "../../../usecases/MiembroProyectoUseCase.js"

// Models
import MiembroProyecto from "../../../models/MiembroProyecto.js"

// Objetos de use-cases
const miembroEquipoUseCase = new MiembroEquipoUseCase(new FirestoreMiembroEquipoRepository())
const miembroProyectoUseCase = new MiembroProyectoUseCase(new FirestoreMiembroProyectoRepository())

export const verificadorCreacionMiembroProyecto = async (uidSolicitante = '', miembroNuevo = MiembroProyecto.params) => {   
    // ##### Datos requeridos #####
    const datosRequeridos = verificacionDatosRequeridos(miembroNuevo)
    if (datosRequeridos instanceof Error) return datosRequeridos

    // ##### Tipos de datos #####
    const tiposDeDatos = verificacionTiposDeDatos(miembroNuevo)
    if (tiposDeDatos instanceof Error) return tiposDeDatos

    // ##### Datos validos #####
    const validacionCondicional = await verificacionCondicionalDeDatos(uidSolicitante, miembroNuevo)
    if (validacionCondicional instanceof Error) return validacionCondicional

    return validacionCondicional
}


const verificacionDatosRequeridos = (miembroNuevo = MiembroProyecto.params) => {
    if ( !miembroNuevo || typeof miembroNuevo !== 'object' || !Object.keys(miembroNuevo).length ) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'datos_requeridos', 
            mensajeServidor: 'Se requiere datos.', 
            resultado: null
        })
    }

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

    if ( !miembroNuevo.uidProyecto ) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'uidProyecto_requerido', 
            mensajeServidor: '[uidProyecto] es requerido.', 
            resultado: null
        })
    }

}

const verificacionTiposDeDatos = (miembroNuevo = MiembroProyecto.params) => {

    if (typeof miembroNuevo.uid !== 'string') return TypeError('[uid] debe ser string')

    if (typeof miembroNuevo.uidEquipo !== 'string') return TypeError('[uidEquipo] debe ser string')
    
    if (typeof miembroNuevo.uidProyecto !== 'string') return TypeError('[uidProyecto] debe ser string')

}

// Solo se verifica -> uid, uidEquipo, roles, estado
const verificacionCondicionalDeDatos = async (uidSolicitante = '', miembroNuevo = MiembroProyecto.params) => {
    const data = {}

    // Verificar que el usuario sea propietario o editor
    const miembroEquipoSolicitante = await miembroEquipoUseCase.obtenerPorUID(miembroNuevo.uidEquipo, uidSolicitante)
    if (!miembroEquipoSolicitante || miembroEquipoSolicitante.estado !== 'activo' || (!miembroEquipoSolicitante.roles.includes('propietario') && !miembroEquipoSolicitante.roles.includes('editor'))) {
        return new RespuestaError({
            estado: 401, 
            mensajeCliente: 'no_autorizado', 
            mensajeServidor: 'No eres un miembro de tipo propietario o editor.', 
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

    // Verificar que el ME exista en el equipo
    const miembroEquipoSolicitado = await miembroEquipoUseCase.obtenerPorUID(miembroNuevo.uidEquipo, miembroNuevo.uid)
    if (!miembroEquipoSolicitado || miembroEquipoSolicitado.estado === 'eliminado') {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'no_existe_miembro_equipo', 
            mensajeServidor: 'El miembro no existe en el equipo.', 
            resultado: null
        })
    }

    // Verificar la existencia del proyecto
    const proyecto = await apiProyectoObtenerProyecto(miembroNuevo.uidEquipo, 'uid', miembroNuevo.uidProyecto)
    if (!proyecto || proyecto.estado === 'eliminado') {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'no_existe_proyecto', 
            mensajeServidor: 'No existe el proyecto.', 
            resultado: null
        })
    }

    // Verificar que el MP no exista en el proyecto
    const miembroProyectoSolicitado = await miembroProyectoUseCase.obtenerPorUID(miembroNuevo.uidEquipo, miembroNuevo.uidProyecto, miembroNuevo.uid)
    if (miembroProyectoSolicitado && miembroProyectoSolicitado.estado !== 'eliminado') {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'ya_existe_miembro', 
            mensajeServidor: 'El miembro ya existe.', 
            resultado: null
        })
    }

    data.miembroEquipoSolicitante = miembroEquipoSolicitante
    data.usuarioSolicitado = usuarioSolicitado
    data.miembroEquipoSolicitado = miembroEquipoSolicitado
    data.proyecto = proyecto
    data.miembroProyectoSolicitado = miembroProyectoSolicitado
    
    return data
}
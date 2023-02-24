// Models
import RespuestaError from "../../../models/Respuestas/RespuestaError.js"

// Apis
import { apiEquipoObtenerEquipo } from "../../../helpers/axios/axiosApiEquipos.js"
import { apiUsuarioObtenerUsuario } from "../../../helpers/axios/axiosApiUsuarios.js"

// Repositories&UseCase - Usuarios
import FirestoreMiembroInternoEquipoRepository from "../../../repositories/FirestoreMiembroInternoEquipoRepository.js"
import MiembroInternoEquipoUseCase from "../../../usecases/MiembroInternoEquipoUseCase.js"

// Objetos de use-cases
const miembroInternoEquipoUseCase = new MiembroInternoEquipoUseCase(new FirestoreMiembroInternoEquipoRepository())

export const verificadorCreacionMIE = async (miembroNuevo) => {
    let respuestaError = null

    // ##### Datos requeridos #####
    respuestaError = verificacionDatosRequeridos(miembroNuevo)

    // ##### Tipos de datos #####
    respuestaError = verificacionTiposDeDatos(miembroNuevo)

    // ##### Datos validos #####
    respuestaError = await verificacionCondicionalDeDatos(miembroNuevo)

    return respuestaError
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

    if ( !miembroNuevo.rol ) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'rol_requerido', 
            mensajeServidor: '[rol] es requerido.', 
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

    if ( !miembroNuevo.fechaCreacion ) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'fechaCreacion_requerido', 
            mensajeServidor: '[fechaCreacion] es requerido.', 
            resultado: null
        })
    }

    return null
}

const verificacionTiposDeDatos = (miembroNuevo) => {
    if (typeof miembroNuevo.uid !== 'string') return TypeError('[uid] debe ser string')

    if (typeof miembroNuevo.uidEquipo !== 'string') return TypeError('[uidEquipo] debe ser string')

    if (typeof miembroNuevo.rol !== 'string') return TypeError('[rol] debe ser string')

    if (typeof miembroNuevo.estado !== 'string') return TypeError('[estado] debe ser string')

    if (typeof miembroNuevo.fechaCreacion !== 'number') return TypeError('[fechaCreacion] debe ser number')

    return null
}

// uid, uidEquipo, rol, estado
const verificacionCondicionalDeDatos = async (miembroNuevo) => {

    // Verificar existencia del usuario
    const usuario = await apiUsuarioObtenerUsuario('uid', miembroNuevo.uid)
    if (!usuario) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'no_existe_usuario', 
            mensajeServidor: 'No existe el usuario.', 
            resultado: null
        })
    }

    // Verificar la existencia del equipo
    const equipo = await apiEquipoObtenerEquipo(miembroNuevo.uidEquipo)
    if (!equipo) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'no_existe_equipo', 
            mensajeServidor: 'No existe el equipo.', 
            resultado: null
        })
    }

    // Verificar que el usuario NO EXISTA en el equipo
    const miembroInternoEquipo = await miembroInternoEquipoUseCase.obtenerPorUID(miembroNuevo.uidEquipo, miembroNuevo.uid)
    if (miembroInternoEquipo) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'ya_existe_miembro', 
            mensajeServidor: 'El miembro ya existe.', 
            resultado: null
        })
    }
    
    return null
}

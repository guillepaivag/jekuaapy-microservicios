import RespuestaError from "../../../models/Respuestas/RespuestaError.js"
import esCodigo from "../../../utils/esCodigo.js"

// Lecturas
import FirestoreLecturasRepository from "../../../repositories/FirestoreLecturasRepository.js"
import LecturasUseCase from "../../../usecases/LecturasUseCase.js"
import { apiEquipoObtenerEquipo } from "../../../services/service_equipo.js"

// Use cases objects
const lecturaUseCase = new LecturasUseCase(new FirestoreLecturasRepository())

export const verificadorCreacionLectura = async (lecturaNuevo) => {
    let respuestaError = null

    // ##### Datos requeridos #####
    respuestaError = verificacionDatosRequeridos(lecturaNuevo)
    if (respuestaError) return respuestaError

    // ##### Tipos de datos #####
    respuestaError = verificacionTiposDeDatos(lecturaNuevo)
    if (respuestaError) return respuestaError

    // ##### Datos validos #####
    respuestaError = await verificacionCondicionalDeDatos(lecturaNuevo)
    if (respuestaError) return respuestaError

    return respuestaError
}

export const verificadorUsuarioSolicitante = async (usuarioSolicitante) => {
    let respuestaError = null

    // ##### Datos requeridos #####
    respuestaError = verificarUsuarioPermisos(usuarioSolicitante)
    if (respuestaError) return respuestaError

    return null
}

const verificacionDatosRequeridos = (lecturaNuevo) => {

    if ( !lecturaNuevo ) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'datos_lectura_vacio', 
            mensajeServidor: 'Sin datos para crear un lectura.', 
            resultado: null
        })
    }

    if ( !lecturaNuevo.uidEquipo ) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'uidEquipo_requerido', 
            mensajeServidor: '[uidEquipo] es requerido.', 
            resultado: null
        })
    }

    if ( !lecturaNuevo.tipoLectura ) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'tipoLectura_requerido', 
            mensajeServidor: '[tipoLectura] es requerido.', 
            resultado: null
        })
    }

    if ( !lecturaNuevo.nombre ) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'nombre_requerido', 
            mensajeServidor: '[nombre] es requerido.', 
            resultado: null
        })
    }

    if ( !lecturaNuevo.codigo ) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'codigo_requerido', 
            mensajeServidor: '[codigo] es requerido.', 
            resultado: null
        })
    }

    return null
}

const verificacionTiposDeDatos = (lecturaNuevo) => {
    if (typeof lecturaNuevo.uidEquipo !== 'string') return TypeError('[uidEquipo] debe ser string')

    if (typeof lecturaNuevo.tipoLectura !== 'string') return TypeError('[tipoLectura] debe ser string')

    if (typeof lecturaNuevo.nombre !== 'string') return TypeError('[nombre] debe ser string')

    if (typeof lecturaNuevo.codigo !== 'string') return TypeError('[codigo] debe ser string')

    return null
}

const verificacionCondicionalDeDatos = async (lecturaNuevo) => {

    const data = {}

    // verificamos que el equipo exista
    const equipo = await apiEquipoObtenerEquipo(lecturaNuevo.uidEquipo)

    if(!equipo) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'equipo_no_existe', 
            mensajeServidor: 'El equipo no existe.', 
            resultado: null
        })
    }


    // codigo valido [caracteres_validos, cantidad_caracteres, verificacion_de_uso]
    if ( !esCodigo(lecturaNuevo.codigo) ) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'codigo_invalido', 
            mensajeServidor: '[codigo] no es válido.', 
            resultado: null
        })
    }

    if (lecturaNuevo.codigo.length < 2 || lecturaNuevo.codigo.length > 25) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'caracteres_codigo_excedido', 
            mensajeServidor: '[codigo] solo puede tener de 2 hasta 25 caracteres.', 
            resultado: null
        })
    }

    const lectura = await lecturaUseCase.obtenerPorCodigoLectura(lecturaNuevo.uidEquipo, lecturaNuevo.codigo)
    if (lectura) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'codigo_en_uso', 
            mensajeServidor: '[codigo] en uso.', 
            resultado: null
        })
    }

    // Nombre valido [cantidad_caracteres]
    if (lecturaNuevo.nombre.length < 2 || lecturaNuevo.nombre.length > 50) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'caracteres_nombre_excedido', 
            mensajeServidor: '[nombre] solo puede tener de 2 hasta 50 caracteres.', 
            resultado: null
        })
    }

    // tipoLectura valido [cantidad_caracteres]
    if (lecturaNuevo.tipoLectura.length < 1 || lecturaNuevo.tipoLectura.length > 100) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'caracteres_tipoLectura_excedido', 
            mensajeServidor: '[tipoLectura] solo puede tener de 1 hasta 100 caracteres.', 
            resultado: null
        })
    }

    data.equipo = equipo

    return data
}

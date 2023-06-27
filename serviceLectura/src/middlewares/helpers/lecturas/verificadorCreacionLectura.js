import RespuestaError from "../../../models/Respuestas/RespuestaError.js"

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

    if ( !lecturaNuevo.nombre ) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'nombre_requerido', 
            mensajeServidor: '[nombre] es requerido.', 
            resultado: null
        })
    }

    return null
}

const verificacionTiposDeDatos = (lecturaNuevo) => {
    if (typeof lecturaNuevo.uidEquipo !== 'string') return TypeError('[uidEquipo] debe ser string')

    if (typeof lecturaNuevo.nombre !== 'string') return TypeError('[nombre] debe ser string')

    return null
}

const verificacionCondicionalDeDatos = async (lecturaNuevo) => {

    const data = {}

    // verificamos que el equipo exista
    const equipo = await apiEquipoObtenerEquipo(lecturaNuevo.uidEquipo)

    console.log("equipo",lecturaNuevo.uidEquipo)

    if(!equipo) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'equipo_no_existe', 
            mensajeServidor: 'El equipo no existe.', 
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

    data.equipo = equipo

    return data
}

import RespuestaError from "../../../models/Respuestas/RespuestaError.js"
import esCodigo from "../../../utils/esCodigo.js"

// Equipos
import FirestoreEquipoRepository from "../../../repositories/FirestoreEquipoRepository.js"
import EquipoUseCase from "../../../usecases/EquipoUseCase.js"

// Use cases objects
const equipoUseCase = new EquipoUseCase(new FirestoreEquipoRepository())

export const verificadorCreacionEquipo = async (equipoNuevo) => {
    let respuestaError = null

    // ##### Datos requeridos #####
    respuestaError = verificacionDatosRequeridos(equipoNuevo)
    if (respuestaError) return respuestaError

    // ##### Tipos de datos #####
    respuestaError = verificacionTiposDeDatos(equipoNuevo)
    if (respuestaError) return respuestaError

    // ##### Datos validos #####
    respuestaError = await verificacionCondicionalDeDatos(equipoNuevo)
    if (respuestaError) return respuestaError

    return null
}

const verificacionDatosRequeridos = (equipoNuevo) => {

    if ( !equipoNuevo ) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'datos_equipo_vacio', 
            mensajeServidor: 'Sin datos para crear un equipo.', 
            resultado: null
        })
    }

    if ( !equipoNuevo.codigo ) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'codigo_requerido', 
            mensajeServidor: '[codigo] es requerido.', 
            resultado: null
        })
    }

    if ( !equipoNuevo.nombre ) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'nombre_requerido', 
            mensajeServidor: '[nombre] es requerido.', 
            resultado: null
        })
    }

    if ( !equipoNuevo.descripcion ) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'descripcion_requerido', 
            mensajeServidor: '[descripcion] es requerido.', 
            resultado: null
        })
    }

    return null
}

const verificacionTiposDeDatos = (equipoNuevo) => {
    if (typeof equipoNuevo.codigo !== 'string') return TypeError('[codigo] debe ser string')

    if (typeof equipoNuevo.nombre !== 'string') return TypeError('[nombre] debe ser string')

    if (typeof equipoNuevo.descripcion !== 'string') return TypeError('[descripcion] debe ser string')

    return null
}

const verificacionCondicionalDeDatos = async (equipoNuevo) => {
    // codigo valido [caracteres_validos, cantidad_caracteres, verificacion_de_uso]
    if ( !esCodigo(equipoNuevo.codigo) ) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'codigo_invalido', 
            mensajeServidor: '[codigo] no es válido.', 
            resultado: null
        })
    }

    if (equipoNuevo.codigo.length > 25) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'caracteres_codigo_excedido', 
            mensajeServidor: '[codigo] solo puede tener hasta 25 caracteres.', 
            resultado: null
        })
    }

    const equipo = await equipoUseCase.obtenerPorCodigo(equipoNuevo.codigo)
    if (equipo) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'codigo_en_uso', 
            mensajeServidor: '[codigo] en uso.', 
            resultado: null
        })
    }

    // Nombre valido [cantidad_caracteres]
    if (equipoNuevo.nombre.length > 50) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'caracteres_nombre_excedido', 
            mensajeServidor: '[nombre] solo puede tener hasta 50 caracteres.', 
            resultado: null
        })
    }
    
    return null
}
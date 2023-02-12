import RespuestaError from "../../../models/Respuestas/RespuestaError.js"
import esCodigo from "../../../utils/esCodigo.js"

// Equipos
import FirestoreEquipoRepository from "../../../repositories/FirestoreEquipoRepository.js"
import EquipoUseCase from "../../../usecases/EquipoUseCase.js"

// Use cases objects
const equipoUseCase = new EquipoUseCase(new FirestoreEquipoRepository())

export const verificadorActualizacionEquipo = async (uidEquipo = '', equipoActualizado) => {
    let respuestaError = null
    
    // ##### Datos requeridos #####
    respuestaError = verificacionDatosRequeridos(equipoActualizado)
    if (respuestaError) return respuestaError

    // ##### Tipos de datos #####
    respuestaError = verificacionTiposDeDatos(equipoActualizado)
    if (respuestaError) return respuestaError

    // ##### Datos validos #####
    respuestaError = await verificacionCondicionalDeDatos(uidEquipo, equipoActualizado)
    if (respuestaError) return respuestaError

    return null
}

const verificacionDatosRequeridos = (equipoActualizado) => {
    if (!Object.keys(equipoActualizado).length) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'faltan_datos', 
            mensajeServidor: 'No hay datos para actualizar.', 
            resultado: null
        })
    }

    return null
}

const verificacionTiposDeDatos = (equipoActualizado) => {
    if (equipoActualizado.codigo && typeof equipoActualizado.codigo !== 'string') 
        return TypeError('[codigo] debe ser string')

    if (equipoActualizado.nombre && typeof equipoActualizado.nombre !== 'string') 
        return TypeError('[nombre] debe ser string')

    if (equipoActualizado.descripcion && typeof equipoActualizado.descripcion !== 'string') 
        return TypeError('[descripcion] debe ser string')

    return null
}

const verificacionCondicionalDeDatos = async (uidEquipo = '', equipoActualizado) => {
    // Verificar si el equipo existe
    const equipo = await equipoUseCase.obtenerPorUID(uidEquipo)
    if (!equipo) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'equipo_no_existe', 
            mensajeServidor: 'El equipo no existe.', 
            resultado: null
        })
    }

    if ( equipoActualizado.codigo ) {
        if ( !esCodigo(equipoActualizado.codigo) ) {
            return new RespuestaError({
                estado: 400, 
                mensajeCliente: 'codigo_invalido', 
                mensajeServidor: '[codigo] no es válido.', 
                resultado: null
            })
        }

        if ( equipoActualizado.codigo.length > 25 ) {
            return new RespuestaError({
                estado: 400, 
                mensajeCliente: 'caracteres_codigo_excedido', 
                mensajeServidor: '[codigo] solo puede tener hasta 25 caracteres.', 
                resultado: null
            })
        }

        const equipo = await equipoUseCase.obtenerPorCodigo(equipoActualizado.codigo)
        if (equipo) {
            return new RespuestaError({
                estado: 400, 
                mensajeCliente: 'codigo_en_uso', 
                mensajeServidor: '[codigo] en uso.', 
                resultado: null
            })
        }
    }

    if (equipoActualizado.nombre.length > 50) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'caracteres_nombre_excedido', 
            mensajeServidor: '[nombre] solo puede tener hasta 50 caracteres.', 
            resultado: null
        })
    }

    return null
}
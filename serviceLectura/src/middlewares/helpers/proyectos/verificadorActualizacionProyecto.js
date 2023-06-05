import RespuestaError from "../../../models/Respuestas/RespuestaError.js"
import esCodigo from "../../../utils/esCodigo.js"

// Lecturas
import FirestoreLecturasRepository from "../../../repositories/FirestoreLecturasRepository.js"
import LecturasUseCase from "../../../usecases/LecturasUseCase.js"

// Use cases objects
const lecturaUseCase = new LecturasUseCase(new FirestoreLecturasRepository())

export const verificadorActualizacionLectura = async (uidEquipo = '', uidLectura = '', lecturaActualizado) => {
    let respuestaError = null
    
    // ##### Datos requeridos #####
    respuestaError = verificacionDatosRequeridos(lecturaActualizado)
    if (respuestaError) return respuestaError

    // ##### Tipos de datos #####
    respuestaError = verificacionTiposDeDatos(lecturaActualizado)
    if (respuestaError) return respuestaError

    // ##### Datos validos #####
    respuestaError = await verificacionCondicionalDeDatos(uidEquipo, uidLectura, lecturaActualizado)
    if (respuestaError) return respuestaError

    return null
}

const verificacionDatosRequeridos = (lecturaActualizado) => {
    if (!Object.keys(lecturaActualizado).length) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'faltan_datos', 
            mensajeServidor: 'No hay datos para actualizar.', 
            resultado: null
        })
    }

    return null
}

const verificacionTiposDeDatos = (lecturaActualizado) => {

    if (lecturaActualizado.nombre && typeof lecturaActualizado.nombre !== 'string') 
        return TypeError('[nombre] debe ser string')

    if (lecturaActualizado.codigo && typeof lecturaActualizado.codigo !== 'string') 
        return TypeError('[codigo] debe ser string')

    return null
}

const verificacionCondicionalDeDatos = async (uidEquipo = '', uidLectura = '', lecturaActualizado) => {
    // Verificar si el lectura existe
    const lectura = await lecturaUseCase.obtenerPorUID(uidEquipo, uidLectura)
    if (!lectura) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'lectura_no_existe', 
            mensajeServidor: 'El lectura no existe.', 
            resultado: null
        })
    }

    if ( lecturaActualizado.codigo ) {
        if ( !esCodigo(lecturaActualizado.codigo) ) {
            return new RespuestaError({
                estado: 400, 
                mensajeCliente: 'codigo_invalido', 
                mensajeServidor: '[codigo] no es válido.', 
                resultado: null
            })
        }

        if ( lecturaActualizado.codigo.length > 25 ) {
            return new RespuestaError({
                estado: 400, 
                mensajeCliente: 'caracteres_codigo_excedido', 
                mensajeServidor: '[codigo] solo puede tener hasta 25 caracteres.', 
                resultado: null
            })
        }

        const lectura = await lecturaUseCase.obtenerPorCodigoLectura(uidEquipo, lecturaActualizado.codigo)
        if (lectura) {
            return new RespuestaError({
                estado: 400, 
                mensajeCliente: 'codigo_en_uso', 
                mensajeServidor: '[codigo] en uso.', 
                resultado: null
            })
        }
    }

    if (lecturaActualizado.nombre) {
        if (lecturaActualizado.nombre.length > 50) {
            return new RespuestaError({
                estado: 400, 
                mensajeCliente: 'caracteres_nombre_excedido', 
                mensajeServidor: '[nombre] solo puede tener hasta 50 caracteres.', 
                resultado: null
            })
        }
    }

    return null
}
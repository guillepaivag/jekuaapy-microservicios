

// Lecturas
import RespuestaError from "../../../models/Respuestas/RespuestaError.js"
import FirestoreLecturasRepository from "../../../repositories/FirestoreLecturasRepository.js"
import LecturasUseCase from "../../../usecases/LecturasUseCase.js"

// Use cases objects
const lecturaUseCase = new LecturasUseCase(new FirestoreLecturasRepository())

export const verificadorActualizacionLecturaServicio = async (uidEquipo = '', uidLectura = '', lecturaActualizado, configuracion = {}) => {
    const data = {}
    
    // ##### Datos requeridos #####
    const datosRequeridos = verificacionDatosRequeridos(lecturaActualizado)
    if (datosRequeridos instanceof Error) return datosRequeridos
    else data.datosRequeridos = datosRequeridos

    // ##### Tipos de datos #####
    const tiposDeDatos = verificacionTiposDeDatos(lecturaActualizado, configuracion)
    if (tiposDeDatos instanceof Error) return tiposDeDatos
    else data.tiposDeDatos = tiposDeDatos

    // ##### Datos validos #####
    const validacionCondicional = await verificacionCondicionalDeDatos(uidEquipo, uidLectura, lecturaActualizado, configuracion)
    if (validacionCondicional instanceof Error) return validacionCondicional
    else data.validacionCondicional = validacionCondicional
    
    return data
}

const verificacionDatosRequeridos = (lecturaActualizado) => {
    const data = {}
    
    if (!Object.keys(lecturaActualizado).length) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'faltan_datos', 
            mensajeServidor: 'No hay datos para actualizar.', 
            resultado: null
        })
    }

    return data
}

const verificacionTiposDeDatos = (lecturaActualizado, configuracion = {}) => {
    const data = {}
    
    if (lecturaActualizado.cantidadMiembros !== undefined && typeof lecturaActualizado.cantidadMiembros !== 'number') 
        return TypeError('[cantidadMiembros] debe ser number')

    if (lecturaActualizado.cantidadTemas !== undefined && typeof lecturaActualizado.cantidadTemas !== 'number') 
        return TypeError('[cantidadTemas] debe ser number')

    if (lecturaActualizado.cantidadElementos !== undefined && typeof lecturaActualizado.cantidadElementos !== 'number') 
        return TypeError('[cantidadElementos] debe ser number')
        
    if (lecturaActualizado.cantidadesPorTipoDeElemento !== undefined && typeof lecturaActualizado.cantidadesPorTipoDeElemento !== 'object') 
        return TypeError('[cantidadesPorTipoDeElemento] debe ser object')

    return data
}

const verificacionCondicionalDeDatos = async (uidEquipo = '', uidLectura = '', lecturaActualizado, configuracion = {}) => {
    const data = {}

    const { incrementarCantidadMiembros } = configuracion
    
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
    
    if (lecturaActualizado.cantidadMiembros) {
        if ( (!incrementarCantidadMiembros && lecturaActualizado.cantidadMiembros < 0) || (incrementarCantidadMiembros && lectura.cantidadMiembros+lecturaActualizado.cantidadMiembros < 0) ) {
            return new RespuestaError({
                estado: 400, 
                mensajeCliente: 'datos_invalidos', 
                mensajeServidor: 'La [cantidadMiembros] no puede ser menor a 0!', 
                resultado: null
            })
        }
    }

    if (lecturaActualizado.cantidadTemas && lecturaActualizado.cantidadTemas < 0) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'datos_invalidos', 
            mensajeServidor: 'La [cantidadTemas] no puede ser menor a 0!', 
            resultado: null
        })
    }

    if (lecturaActualizado.cantidadElementos && lecturaActualizado.cantidadElementos < 0) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'datos_invalidos', 
            mensajeServidor: 'La [cantidadElementos] no puede ser menor a 0!', 
            resultado: null
        })
    }

    if (lecturaActualizado.cantidadesPorTipoDeElemento) {
        const condicionCantidadContenidosPorTipo = 
        lecturaActualizado.cantidadesPorTipoDeElemento.lectura < 0 || lecturaActualizado.cantidadesPorTipoDeElemento.video < 0
        
        if (condicionCantidadContenidosPorTipo) {
            return new RespuestaError({
                estado: 400, 
                mensajeCliente: 'datos_invalidos', 
                mensajeServidor: 'Los campos de cantidadesPorTipoDeElemento no pueden ser menores a 0', 
                resultado: null
            })
        }
    }

    data.lectura = lectura

    return data
}
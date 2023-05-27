

// Proyectos
import RespuestaError from "../../../models/Respuestas/RespuestaError.js"
import FirestoreProyectosRepository from "../../../repositories/FirestoreProyectosRepository.js"
import ProyectosUseCase from "../../../usecases/ProyectosUseCase.js"

// Use cases objects
const proyectoUseCase = new ProyectosUseCase(new FirestoreProyectosRepository())

export const verificadorActualizacionProyectoServicio = async (uidEquipo = '', uidProyecto = '', proyectoActualizado, configuracion = {}) => {
    const data = {}
    
    // ##### Datos requeridos #####
    const datosRequeridos = verificacionDatosRequeridos(proyectoActualizado)
    if (datosRequeridos instanceof Error) return datosRequeridos
    else data.datosRequeridos = datosRequeridos

    // ##### Tipos de datos #####
    const tiposDeDatos = verificacionTiposDeDatos(proyectoActualizado, configuracion)
    if (tiposDeDatos instanceof Error) return tiposDeDatos
    else data.tiposDeDatos = tiposDeDatos

    // ##### Datos validos #####
    const validacionCondicional = await verificacionCondicionalDeDatos(uidEquipo, uidProyecto, proyectoActualizado, configuracion)
    if (validacionCondicional instanceof Error) return validacionCondicional
    else data.validacionCondicional = validacionCondicional
    
    return data
}

const verificacionDatosRequeridos = (proyectoActualizado) => {
    const data = {}
    
    if (!Object.keys(proyectoActualizado).length) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'faltan_datos', 
            mensajeServidor: 'No hay datos para actualizar.', 
            resultado: null
        })
    }

    return data
}

const verificacionTiposDeDatos = (proyectoActualizado, configuracion = {}) => {
    const data = {}
    
    if (proyectoActualizado.cantidadMiembros !== undefined && typeof proyectoActualizado.cantidadMiembros !== 'number') 
        return TypeError('[cantidadMiembros] debe ser number')

    if (proyectoActualizado.cantidadTemas !== undefined && typeof proyectoActualizado.cantidadTemas !== 'number') 
        return TypeError('[cantidadTemas] debe ser number')

    if (proyectoActualizado.cantidadElementos !== undefined && typeof proyectoActualizado.cantidadElementos !== 'number') 
        return TypeError('[cantidadElementos] debe ser number')
        
    if (proyectoActualizado.cantidadesPorTipoDeElemento !== undefined && typeof proyectoActualizado.cantidadesPorTipoDeElemento !== 'object') 
        return TypeError('[cantidadesPorTipoDeElemento] debe ser object')

    return data
}

const verificacionCondicionalDeDatos = async (uidEquipo = '', uidProyecto = '', proyectoActualizado, configuracion = {}) => {
    const data = {}

    const { incrementarCantidadMiembros } = configuracion
    
    // Verificar si el proyecto existe
    const proyecto = await proyectoUseCase.obtenerPorUID(uidEquipo, uidProyecto)
    if (!proyecto) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'proyecto_no_existe', 
            mensajeServidor: 'El proyecto no existe.', 
            resultado: null
        })
    }
    
    if (proyectoActualizado.cantidadMiembros) {
        if ( (!incrementarCantidadMiembros && proyectoActualizado.cantidadMiembros < 0) || (incrementarCantidadMiembros && proyecto.cantidadMiembros+proyectoActualizado.cantidadMiembros < 0) ) {
            return new RespuestaError({
                estado: 400, 
                mensajeCliente: 'datos_invalidos', 
                mensajeServidor: 'La [cantidadMiembros] no puede ser menor a 0!', 
                resultado: null
            })
        }
    }

    if (proyectoActualizado.cantidadTemas && proyectoActualizado.cantidadTemas < 0) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'datos_invalidos', 
            mensajeServidor: 'La [cantidadTemas] no puede ser menor a 0!', 
            resultado: null
        })
    }

    if (proyectoActualizado.cantidadElementos && proyectoActualizado.cantidadElementos < 0) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'datos_invalidos', 
            mensajeServidor: 'La [cantidadElementos] no puede ser menor a 0!', 
            resultado: null
        })
    }

    if (proyectoActualizado.cantidadesPorTipoDeElemento) {
        const condicionCantidadContenidosPorTipo = 
        proyectoActualizado.cantidadesPorTipoDeElemento.lectura < 0 || proyectoActualizado.cantidadesPorTipoDeElemento.video < 0
        
        if (condicionCantidadContenidosPorTipo) {
            return new RespuestaError({
                estado: 400, 
                mensajeCliente: 'datos_invalidos', 
                mensajeServidor: 'Los campos de cantidadesPorTipoDeElemento no pueden ser menores a 0', 
                resultado: null
            })
        }
    }

    data.proyecto = proyecto

    return data
}
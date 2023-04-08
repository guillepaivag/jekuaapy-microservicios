import RespuestaError from "../../../models/Respuestas/RespuestaError.js"
import esCodigo from "../../../utils/esCodigo.js"

// Proyectos
import FirestoreProyectosRepository from "../../../repositories/FirestoreProyectosRepository.js"
import ProyectosUseCase from "../../../usecases/ProyectosUseCase.js"

// Use cases objects
const proyectoUseCase = new ProyectosUseCase(new FirestoreProyectosRepository())

export const verificadorActualizacionProyecto = async (uidEquipo = '', uidProyecto = '', proyectoActualizado) => {
    let respuestaError = null
    
    // ##### Datos requeridos #####
    respuestaError = verificacionDatosRequeridos(proyectoActualizado)
    if (respuestaError) return respuestaError

    // ##### Tipos de datos #####
    respuestaError = verificacionTiposDeDatos(proyectoActualizado)
    if (respuestaError) return respuestaError

    // ##### Datos validos #####
    respuestaError = await verificacionCondicionalDeDatos(uidEquipo, uidProyecto, proyectoActualizado)
    if (respuestaError) return respuestaError

    return null
}

const verificacionDatosRequeridos = (proyectoActualizado) => {
    if (!Object.keys(proyectoActualizado).length) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'faltan_datos', 
            mensajeServidor: 'No hay datos para actualizar.', 
            resultado: null
        })
    }

    return null
}

const verificacionTiposDeDatos = (proyectoActualizado) => {

    if (proyectoActualizado.nombre && typeof proyectoActualizado.nombre !== 'string') 
        return TypeError('[nombre] debe ser string')

    if (proyectoActualizado.codigo && typeof proyectoActualizado.codigo !== 'string') 
        return TypeError('[codigo] debe ser string')

    return null
}

const verificacionCondicionalDeDatos = async (uidEquipo = '', uidProyecto = '', proyectoActualizado) => {
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

    if ( proyectoActualizado.codigo ) {
        if ( !esCodigo(proyectoActualizado.codigo) ) {
            return new RespuestaError({
                estado: 400, 
                mensajeCliente: 'codigo_invalido', 
                mensajeServidor: '[codigo] no es válido.', 
                resultado: null
            })
        }

        if ( proyectoActualizado.codigo.length > 25 ) {
            return new RespuestaError({
                estado: 400, 
                mensajeCliente: 'caracteres_codigo_excedido', 
                mensajeServidor: '[codigo] solo puede tener hasta 25 caracteres.', 
                resultado: null
            })
        }

        const proyecto = await proyectoUseCase.obtenerPorCodigoProyecto(uidEquipo, proyectoActualizado.codigo)
        if (proyecto) {
            return new RespuestaError({
                estado: 400, 
                mensajeCliente: 'codigo_en_uso', 
                mensajeServidor: '[codigo] en uso.', 
                resultado: null
            })
        }
    }

    if (proyectoActualizado.nombre) {
        if (proyectoActualizado.nombre.length > 50) {
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
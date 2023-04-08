import RespuestaError from "../../../models/Respuestas/RespuestaError.js"
import esCodigo from "../../../utils/esCodigo.js"

// Proyectos
import FirestoreProyectosRepository from "../../../repositories/FirestoreProyectosRepository.js"
import ProyectosUseCase from "../../../usecases/ProyectosUseCase.js"

// Use cases objects
const proyectoUseCase = new ProyectosUseCase(new FirestoreProyectosRepository())

export const verificadorCreacionProyecto = async (proyectoNuevo) => {
    let respuestaError = null

    // ##### Datos requeridos #####
    respuestaError = verificacionDatosRequeridos(proyectoNuevo)
    if (respuestaError) return respuestaError

    // ##### Tipos de datos #####
    respuestaError = verificacionTiposDeDatos(proyectoNuevo)
    if (respuestaError) return respuestaError

    // ##### Datos validos #####
    respuestaError = await verificacionCondicionalDeDatos(proyectoNuevo)
    if (respuestaError) return respuestaError

    return null
}

export const verificadorUsuarioSolicitante = async (usuarioSolicitante) => {
    let respuestaError = null

    // ##### Datos requeridos #####
    respuestaError = verificarUsuarioPermisos(usuarioSolicitante)
    if (respuestaError) return respuestaError

    return null
}

const verificacionDatosRequeridos = (proyectoNuevo) => {

    if ( !proyectoNuevo ) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'datos_proyecto_vacio', 
            mensajeServidor: 'Sin datos para crear un proyecto.', 
            resultado: null
        })
    }

    if ( !proyectoNuevo.uidEquipo ) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'uidEquipo_requerido', 
            mensajeServidor: '[uidEquipo] es requerido.', 
            resultado: null
        })
    }

    if ( !proyectoNuevo.tipoProyecto ) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'tipoProyecto_requerido', 
            mensajeServidor: '[tipoProyecto] es requerido.', 
            resultado: null
        })
    }

    if ( !proyectoNuevo.nombre ) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'nombre_requerido', 
            mensajeServidor: '[nombre] es requerido.', 
            resultado: null
        })
    }

    if ( !proyectoNuevo.codigo ) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'codigo_requerido', 
            mensajeServidor: '[codigo] es requerido.', 
            resultado: null
        })
    }

    return null
}

const verificacionTiposDeDatos = (proyectoNuevo) => {
    if (typeof proyectoNuevo.uidEquipo !== 'string') return TypeError('[uidEquipo] debe ser string')

    if (typeof proyectoNuevo.tipoProyecto !== 'string') return TypeError('[tipoProyecto] debe ser string')

    if (typeof proyectoNuevo.nombre !== 'string') return TypeError('[nombre] debe ser string')

    if (typeof proyectoNuevo.codigo !== 'string') return TypeError('[codigo] debe ser string')

    return null
}

const verificacionCondicionalDeDatos = async (proyectoNuevo) => {

    // verificamos que el equipo exista


    // codigo valido [caracteres_validos, cantidad_caracteres, verificacion_de_uso]
    if ( !esCodigo(proyectoNuevo.codigo) ) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'codigo_invalido', 
            mensajeServidor: '[codigo] no es válido.', 
            resultado: null
        })
    }

    if (proyectoNuevo.codigo.length < 2 || proyectoNuevo.codigo.length > 25) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'caracteres_codigo_excedido', 
            mensajeServidor: '[codigo] solo puede tener de 2 hasta 25 caracteres.', 
            resultado: null
        })
    }

    const proyecto = await proyectoUseCase.obtenerPorCodigoProyecto(proyectoNuevo.uidEquipo, proyectoNuevo.codigo)
    if (proyecto) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'codigo_en_uso', 
            mensajeServidor: '[codigo] en uso.', 
            resultado: null
        })
    }

    // Nombre valido [cantidad_caracteres]
    if (proyectoNuevo.nombre.length < 2 || proyectoNuevo.nombre.length > 50) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'caracteres_nombre_excedido', 
            mensajeServidor: '[nombre] solo puede tener de 2 hasta 50 caracteres.', 
            resultado: null
        })
    }

    // tipoProyecto valido [cantidad_caracteres]
    if (proyectoNuevo.tipoProyecto.length < 1 || proyectoNuevo.tipoProyecto.length > 100) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'caracteres_tipoProyecto_excedido', 
            mensajeServidor: '[tipoProyecto] solo puede tener de 1 hasta 100 caracteres.', 
            resultado: null
        })
    }

    return null
}

const verificarUsuarioPermisos = (usuarioSolicitante) => {
    
    // TODO obtenemos el miembro interno y verificamos sus roles

    return null
}

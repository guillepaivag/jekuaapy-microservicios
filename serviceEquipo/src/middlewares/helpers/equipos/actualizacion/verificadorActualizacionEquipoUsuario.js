import RespuestaError from "../../../../models/Respuestas/RespuestaError.js"
import esCodigo from "../../../../utils/esCodigo.js"

// Equipos
import FirestoreEquipoRepository from "../../../../repositories/FirestoreEquipoRepository.js"
import EquipoUseCase from "../../../../usecases/EquipoUseCase.js"

// Use cases objects
const equipoUseCase = new EquipoUseCase(new FirestoreEquipoRepository())

export const verificadorActualizacionEquipoUsuario = async (uidEquipo = '', equipoActualizado, uidSolicitante) => {
    const data = {}
    
    // ##### Datos requeridos #####
    const datosRequeridos = verificacionDatosRequeridos(equipoActualizado)
    if (datosRequeridos instanceof Error) return datosRequeridos
    else data.datosRequeridos = datosRequeridos

    // ##### Tipos de datos #####
    const tiposDeDatos = verificacionTiposDeDatos(equipoActualizado)
    if (tiposDeDatos instanceof Error) return tiposDeDatos
    else data.tiposDeDatos = tiposDeDatos

    // ##### Datos validos #####
    const validacionCondicional = await verificacionCondicionalDeDatos(uidEquipo, equipoActualizado, uidSolicitante)
    if (validacionCondicional instanceof Error) return validacionCondicional
    else data.validacionCondicional = validacionCondicional
    
    return data
}

const verificacionDatosRequeridos = (equipoActualizado) => {
    const data = {}
    
    if (!Object.keys(equipoActualizado).length) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'faltan_datos', 
            mensajeServidor: 'No hay datos para actualizar.', 
            resultado: null
        })
    }

    return data
}

const verificacionTiposDeDatos = (equipoActualizado) => {
    const data = {}
    
    if (equipoActualizado.responsable && typeof equipoActualizado.responsable !== 'string') 
        return TypeError('[responsable] debe ser string')
    
    if (equipoActualizado.codigo && typeof equipoActualizado.codigo !== 'string') 
        return TypeError('[codigo] debe ser string')

    if (equipoActualizado.nombre && typeof equipoActualizado.nombre !== 'string') 
        return TypeError('[nombre] debe ser string')

    if (equipoActualizado.descripcion && typeof equipoActualizado.descripcion !== 'string') 
        return TypeError('[descripcion] debe ser string')

    return data
}

const verificacionCondicionalDeDatos = async (uidEquipo = '', equipoActualizado, uidSolicitante) => {
    const data = {}
    
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
    
    if ( equipoActualizado.responsable && equipo.responsable !== uidSolicitante ) {
        return new RespuestaError({
            estado: 401, 
            mensajeCliente: 'no_eres_responsable_del_equipo', 
            mensajeServidor: 'No eres responsable del equipo.', 
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

        const equipoPorCodigo = await equipoUseCase.obtenerPorCodigo(equipoActualizado.codigo)
        if (equipoPorCodigo && uidEquipo !== equipoPorCodigo.uid) {
            return new RespuestaError({
                estado: 400, 
                mensajeCliente: 'codigo_en_uso', 
                mensajeServidor: '[codigo] en uso.', 
                resultado: null
            })
        }

        data.equipoPorCodigo = equipoPorCodigo
    }

    if (equipoActualizado.nombre && equipoActualizado.nombre.length > 50) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'caracteres_nombre_excedido', 
            mensajeServidor: '[nombre] solo puede tener hasta 50 caracteres.', 
            resultado: null
        })
    }

    data.equipo = equipo

    return data
}
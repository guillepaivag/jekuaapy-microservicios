import RespuestaError from "../../../../models/Respuestas/RespuestaError.js"

// Equipos
import FirestoreEquipoRepository from "../../../../repositories/FirestoreEquipoRepository.js"
import EquipoUseCase from "../../../../usecases/EquipoUseCase.js"

// Use cases objects
const equipoUseCase = new EquipoUseCase(new FirestoreEquipoRepository())

export const verificadorActualizacionEquipoServicio = async (uidEquipo = '', equipoActualizado) => {
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
    const validacionCondicional = await verificacionCondicionalDeDatos(uidEquipo, equipoActualizado)
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
    
    if (equipoActualizado.cantidadMiembros !== undefined && typeof equipoActualizado.cantidadMiembros !== 'number') 
        return TypeError('[cantidadMiembros] debe ser number')

    if (equipoActualizado.cantidadMiembrosPorRol !== undefined && typeof equipoActualizado.cantidadMiembrosPorRol !== 'object') 
        return TypeError('[cantidadMiembrosPorRol] debe ser object')

    if (equipoActualizado.cantidadProyectos !== undefined && typeof equipoActualizado.cantidadProyectos !== 'number') 
        return TypeError('[cantidadProyectos] debe ser number')

    if (equipoActualizado.cantidadContenidos !== undefined && typeof equipoActualizado.cantidadContenidos !== 'number') 
        return TypeError('[cantidadContenidos] debe ser number')

    if (equipoActualizado.cantidadContenidosPorTipo !== undefined && typeof equipoActualizado.cantidadContenidosPorTipo !== 'object') 
        return TypeError('[cantidadContenidosPorTipo] debe ser object')

    return data
}

const verificacionCondicionalDeDatos = async (uidEquipo = '', equipoActualizado) => {
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
    
    if (equipoActualizado.cantidadMiembros && equipoActualizado.cantidadMiembros < 0) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'datos_invalidos', 
            mensajeServidor: 'La [cantidadMiembros] no puede ser menor a 0!', 
            resultado: null
        })
    }

    if (equipoActualizado.cantidadMiembrosPorRol) {
        const condicionCantidadMiembrosPorRol = 
        equipoActualizado.cantidadMiembrosPorRol.propietario < 0 || equipoActualizado.cantidadMiembrosPorRol.editor < 0 ||
        equipoActualizado.cantidadMiembrosPorRol.visualizador < 0 || equipoActualizado.cantidadMiembrosPorRol.estudiante < 0
        
        if (condicionCantidadMiembrosPorRol) {
            return new RespuestaError({
                estado: 400, 
                mensajeCliente: 'datos_invalidos', 
                mensajeServidor: 'Los campos de cantidadMiembrosPorRol no pueden ser menores a 0', 
                resultado: null
            })
        }
    }

    if (equipoActualizado.cantidadProyectos && equipoActualizado.cantidadProyectos < 0) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'datos_invalidos', 
            mensajeServidor: 'La [cantidadProyectos] no puede ser menor a 0!', 
            resultado: null
        })
    }

    if (equipoActualizado.cantidadContenidos && equipoActualizado.cantidadContenidos < 0) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'datos_invalidos', 
            mensajeServidor: 'La [cantidadContenidos] no puede ser menor a 0!', 
            resultado: null
        })
    }

    if (equipoActualizado.cantidadContenidosPorTipo) {
        const condicionCantidadContenidosPorTipo = 
        equipoActualizado.cantidadContenidosPorTipo.lectura < 0 || equipoActualizado.cantidadContenidosPorTipo.video < 0
        
        if (condicionCantidadContenidosPorTipo) {
            return new RespuestaError({
                estado: 400, 
                mensajeCliente: 'datos_invalidos', 
                mensajeServidor: 'Los campos de cantidadContenidosPorTipo no pueden ser menores a 0', 
                resultado: null
            })
        }
    }

    data.equipo = equipo

    return data
}
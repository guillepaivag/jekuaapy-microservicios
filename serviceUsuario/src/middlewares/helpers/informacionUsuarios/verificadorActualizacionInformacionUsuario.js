// Models
import RespuestaError from "../../../models/Respuestas/RespuestaError.js"

export const verificadorActualizacionInformacionUsuario = (informacionUsuarioActualizado) => {
    let respuestaError = null
    
    // ##### Datos requeridos #####
    respuestaError = verificacionDatosRequeridos(informacionUsuarioActualizado)
    if (respuestaError) return respuestaError

    // ##### Tipos de datos #####
    respuestaError = verificacionTiposDeDatos(informacionUsuarioActualizado)
    if (respuestaError) return respuestaError

    // ##### Datos validos #####
    respuestaError = verificacionCondicionalDeDatos(informacionUsuarioActualizado)
    if (respuestaError) return respuestaError

    return null
}

const verificacionDatosRequeridos = (informacionUsuarioActualizado) => {

}

const verificacionTiposDeDatos = (informacionUsuarioActualizado) => {
    
}

const verificacionCondicionalDeDatos = (informacionUsuarioActualizado) => {
    
}
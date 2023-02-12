// Models
import RespuestaError from "../../../models/Respuestas/RespuestaError.js"

export const verificadorActualizacionContrasena = (contrasena, confirmacionContrasena) => {
    if (contrasena !== confirmacionContrasena) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'contrasena_diferente_a_confirmacionContrasena', 
            mensajeServidor: '[contrasena] y [confirmacionContrasena] son diferentes.', 
            resultado: null
        })
    }

    return null
}
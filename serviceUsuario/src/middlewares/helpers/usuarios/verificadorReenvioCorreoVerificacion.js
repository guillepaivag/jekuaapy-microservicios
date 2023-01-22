// Models
import RespuestaError from "../../../models/Respuestas/RespuestaError.js"

export const verificadorReenvioCorreoVerificacion = (authSolicitante) => {
    if (authSolicitante.emailVerified) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'correo_ya_verificado', 
            mensajeServidor: '[correo] ya está verificado.', 
            resultado: null
        })
    }

    return null
}
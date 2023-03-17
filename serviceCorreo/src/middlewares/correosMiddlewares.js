// Models
import RespuestaError from "../models/Respuestas/RespuestaError.js"

// Services
import { apiUsuarioObtenerUsuarioDeFirebaseAuthentication } from "../services/service_usuario.js"

export const verificarEnvioDeVerificacionDeCorreo = async (req = request, res = response, next) => {
    const { body } = req
    const { solicitante, correo } = body

    try {
        const emailVerified = { value: false }
        if (solicitante.tipo === 'servicio') {
            // Obtener usuario para saber si el email esta verificado
            const usuarioAuthentication = await apiUsuarioObtenerUsuarioDeFirebaseAuthentication('correo', correo)
            if (!usuarioAuthentication) {
                throw new RespuestaError({
                    estado: 400, 
                    mensajeCliente: 'no_existe_usuario', 
                    mensajeServidor: 'No existe usuario.', 
                    resultado: null
                })
            }
            emailVerified.value = usuarioAuthentication.emailVerified
        }

        if (solicitante.tipo === 'usuario') 
            emailVerified.value = solicitante.authSolicitante.emailVerified

        if (emailVerified.value) {
            throw new RespuestaError({
                estado: 400, 
                mensajeCliente: 'correo_ya_verificado', 
                mensajeServidor: '[correo] ya está verificado.', 
                resultado: null
            })
        }

        req.body.emailVerified = emailVerified.value

        next()
    } catch (error) {
        next(error)
    }
}
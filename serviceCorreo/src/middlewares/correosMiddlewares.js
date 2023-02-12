// Models
import RespuestaError from "../models/Respuestas/RespuestaError.js"

// Services
import { apiUsuarioObtenerUsuarioDeFirebaseAuthentication } from "../helpers/axios/axiosApiUsuarios.js"

export const verificarEnvioDeVerificacionDeCorreo = async (req = request, res = response, next) => {
    const { body } = req
    const { solicitante, correo } = body

    try {
        const emailVerified = { value: false }
        if (solicitante.tipo === 'servicio') {
            // CORREOS-TODO: Obtener usuario para saber si el email esta verificado
            const usuarioAuthentication = await apiUsuarioObtenerUsuarioDeFirebaseAuthentication('correo', correo)
            emailVerified.value = usuarioAuthentication.emailVerified
        }

        if (solicitante.tipo === 'usuario') {
            emailVerified.value = solicitante.authSolicitante.emailVerified
        }

        if (emailVerified.value) {
            return new RespuestaError({
                estado: 400, 
                mensajeCliente: 'correo_ya_verificado', 
                mensajeServidor: '[correo] ya está verificado.', 
                resultado: null
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}
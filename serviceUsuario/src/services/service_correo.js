import config from '../configs/config.js'
import { googleRequest, googleToken } from '../helpers/googleAuth.js'
import { errorHandlerRequest } from '../helpers/errors/error-handler-request.js'

const serviceName = 'service_correo'

export const apiCorreoVerificacionCorreo = async (correo = '') => {
    // Llamada a la API de correos para enviar una verificacion de correo a un correo
    const targetAudience = config.services[serviceName]
    const tokenDeAutenticacionDeServicio = await googleToken(targetAudience)
    const bodyOfTheRequest = { correo }
    const headersOfTheRequest = { 
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenDeAutenticacionDeServicio}`
        } 
    }

    try { 
        const response = await googleRequest({
            service: serviceName, 
            url: '/usuarios/verificarCorreo', 
            method: 'POST', 
            body: bodyOfTheRequest, 
            headers: headersOfTheRequest
        })
        return response.data.resultado
    } catch (error) { 
        throw errorHandlerRequest(error, serviceName) 
    }
} 
import axios from 'axios'
import config from '../configs/config.js'
import { generarTokenDeServicio } from '../helpers/generarTokenDeServicio.js'
import { errorHandlerRequest } from '../helpers/errors/error-handler-request.js'

const serviceName = 'service_correo'
export const apiCorreo = axios.create({ baseURL: config.services[serviceName] })

export const apiCorreoVerificacionCorreo = async (correo = '', verificarSiTieneCorreoVerificado = false) => {
    // Llamada a la API de correos para enviar una verificacion de correo a un correo
    const bodyOfTheRequest = { correo, verificarSiTieneCorreoVerificado }
    const tokenDeServicio = await generarTokenDeServicio()
    const configOfTheRequest = { 
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenDeServicio}`
        } 
    }

    try { 
        const response = await apiCorreo.post(`/usuarios/verificarCorreo`, bodyOfTheRequest, configOfTheRequest) 
        return response.data.resultado
    } catch (error) { 
        throw errorHandlerRequest(error, serviceName) 
    }
}
import axios from 'axios'
import config from '../configs/config.js'
import { generarTokenDeServicio } from '../helpers/generarTokenDeServicio.js'
import { errorHandlerRequest } from '../helpers/errors/error-handler-request.js'

const serviceName = 'service_correo'
const apiGateway = axios.create({ baseURL: config.services.service_api_gateway })

export const apiCorreoEnviarAvisoNuevoMiembroEquipo = async (uidUsuarioSolicitante = '', uidEquipo = '', correo = '') => {
    // Llamada a la API de correos para enviar una verificacion de correo a un correo
    const bodyOfTheRequest = {
        uidUsuarioSolicitante, 
        uidEquipo, 
        correo
    }

    const tokenDeAutenticacionDeServicio = await generarTokenDeServicio()

    const configOfTheRequest = { 
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenDeAutenticacionDeServicio}`
        } 
    }

    try { 
        const response = await apiGateway.post(`/service_correo/miembrosEquipo/avisoNuevoMiembroEquipo`, bodyOfTheRequest, configOfTheRequest) 
        return response.data.resultado
    } catch (error) { 
        throw errorHandlerRequest(error, serviceName) 
    }
}
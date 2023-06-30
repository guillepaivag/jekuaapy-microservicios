import axios from 'axios'
import config from '../configs/config.js'
import { generarTokenDeServicio } from '../helpers/generarTokenDeServicio.js'
import { errorHandlerRequest } from '../helpers/errors/error-handler-request.js'

const serviceName = 'service_miembro'
const apiGateway = axios.create({ baseURL: config.services.service_api_gateway })

export const apiMiembroObtenerMiembro = async (uidEquipo = '', uidMiembro = '') => {
    // Llamada a la API de correos para enviar una verificacion de correo a un correo
    const tokenDeAutenticacionDeServicio = await generarTokenDeServicio()

    const configOfTheRequest = { 
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenDeAutenticacionDeServicio}`
            } 
        }

    try { 
        const response = await apiGateway.get(`/service_miembro/miembrosEquipo/${uidEquipo}/${uidMiembro}`, configOfTheRequest) 
        return response.data.result
    } catch (error) { 
        throw errorHandlerRequest(error, serviceName) 
    }
}
import axios from 'axios'
import config from '../configs/config.js'
import { generarTokenDeServicio } from '../helpers/generarTokenDeServicio.js'
import { errorHandlerRequest } from '../helpers/errors/error-handler-request.js'

const serviceName = 'service_equipo'
const apiGateway = axios.create({ baseURL: config.services.service_api_gateway })

export const apiEquipoObtenerEquipo = async (uid = '') => {
    // Llamada a la API de correos para enviar una verificacion de correo a un correo
    const tokenDeAutenticacionDeServicio = await generarTokenDeServicio()

    const configOfTheRequest = { 
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenDeAutenticacionDeServicio}`
        } 
    }

    try { 
        const response = await apiGateway.get(`/service_equipo/equipos/${uid}`, configOfTheRequest) 
        return response.data.resultado
    } catch (error) { 
        throw errorHandlerRequest(error, serviceName) 
    }
}

export const apiEquipoActualizarEquipo = async (uid = '', equipoActualizado = {}) => {
    // Llamada a la API de correos para enviar una verificacion de correo a un correo
    const tokenDeAutenticacionDeServicio = await generarTokenDeServicio()

    const bodyOfTheRequest = { equipoActualizado }

    const configOfTheRequest = { 
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenDeAutenticacionDeServicio}`
        } 
    }

    try { 
        const response = await apiGateway.put(`/service_equipo/equipos/${uid}`, bodyOfTheRequest, configOfTheRequest) 
        return response.data.resultado
    } catch (error) { 
        throw errorHandlerRequest(error, serviceName) 
    }
}

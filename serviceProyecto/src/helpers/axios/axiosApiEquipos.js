import axios from 'axios'
import config from '../../configs/config.js'
import { errorHandlerAxios } from '../errors/error-handler-axios.js'
import { generarTokenDeAutenticacionDeServicio } from '../generarTokenDeAutenticacionDeServicio.js'

const serviceName = 'Equipos'
const apiGateway = axios.create({ baseURL: config.services.service_api_gateway })

export const apiEquipoVerificacionEquipo = async (equipo = '') => {
    // Llamada a la API de equipos para enviar una verificacion de equipo a un equipo
    const tokenDeAutenticacionDeServicio = generarTokenDeAutenticacionDeServicio()

    const bodyOfTheRequest = { equipo }
    const configOfTheRequest = { 
        headers: { 
            'Content-Type': 'application/json' ,
            'Authorization': `Bearer ${tokenDeAutenticacionDeServicio}`
        } 
    }

    try { 
        const response = await apiGateway.post('/service-equipo/usuarios/verificarEquipo', bodyOfTheRequest, configOfTheRequest) 
        return response.data.result
    } catch (error) { 
        throw errorHandlerAxios(error, serviceName) 
    }
} 
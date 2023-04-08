import axios from 'axios'
import config from '../configs/config.js'
import { errorHandlerRequest } from '../helpers/errors/error-handler-request.js'
import { generarTokenDeServicio } from '../helpers/generarTokenDeServicio.js'

const serviceName = 'service_equipo'
export const api = axios.create({ baseURL: config.services[serviceName] })

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
        const response = await api.get(`/equipos/${uid}`, configOfTheRequest) 
        return response.data.resultado
    } catch (error) { 
        throw errorHandlerRequest(error, serviceName) 
    }
} 
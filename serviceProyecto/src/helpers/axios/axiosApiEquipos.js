import axios from 'axios'
import config from '../../configs/config.js'
import { errorHandlerAxios } from '../errors/error-handler-axios.js'
import { generarTokenDeAutenticacionDeServicio } from '../generarTokenDeAutenticacionDeServicio.js'

const serviceName = 'Equipos'
const apiEquipo = axios.create({ baseURL: config.urlServices.apiEquipo })

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
        const response = await apiEquipo.post('/usuarios/verificarEquipo', bodyOfTheRequest, configOfTheRequest) 
        return response.data.resultado
    } catch (error) { 
        throw errorHandlerAxios(error, serviceName) 
    }
} 
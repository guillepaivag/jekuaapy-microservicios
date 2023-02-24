import axios from 'axios'
import config from '../../configs/config.js'
import { errorHandlerAxios } from '../errors/error-handler-axios.js'
import { generarTokenDeAutenticacionDeServicio } from '../generarTokenDeAutenticacionDeServicio.js'

const serviceName = 'Equipos'
const apiEquipo = axios.create({ baseURL: config.urlServices.apiEquipo })

export const apiEquipoObtenerEquipo = async (uid = '') => {
    // Llamada a la API de correos para enviar una verificacion de correo a un correo
    const tokenDeAutenticacionDeServicio = generarTokenDeAutenticacionDeServicio()

    const configOfTheRequest = { 
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenDeAutenticacionDeServicio}`
            } 
        }

    try { 
        const response = await apiEquipo.get(`/equipos/${uid}`, configOfTheRequest) 
        return response.data.resultado
    } catch (error) { 
        throw errorHandlerAxios(error, serviceName) 
    }
} 
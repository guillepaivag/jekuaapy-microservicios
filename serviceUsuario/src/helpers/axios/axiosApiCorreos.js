import axios from 'axios'
import config from '../../configs/config.js'
import { errorHandlerAxios } from '../errors/error-handler-axios.js'
import { generarTokenDeAutenticacionDeServicio } from '../generarTokenDeAutenticacionDeServicio.js'

const serviceName = 'Correos'
const apiCorreo = axios.create({ baseURL: config.urlServices.apiCorreo })

export const apiCorreoVerificacionCorreo = async (correo = '') => {
    // Llamada a la API de correos para enviar una verificacion de correo a un correo
    const tokenDeAutenticacionDeServicio = generarTokenDeAutenticacionDeServicio()

    const bodyOfTheRequest = { correo }
    const configOfTheRequest = { 
        headers: { 
            'Content-Type': 'application/json' ,
            'Authorization': `Bearer ${tokenDeAutenticacionDeServicio}`
        } 
    }

    try { 
        const response = await apiCorreo.post('/usuarios/verificarCorreo', bodyOfTheRequest, configOfTheRequest) 
        return response.data.resultado
    } catch (error) { 
        throw errorHandlerAxios(error, serviceName) 
    }
} 
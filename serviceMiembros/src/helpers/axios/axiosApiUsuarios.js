import axios from 'axios'
import config from '../../configs/config.js'
import { errorHandlerAxios } from '../errors/error-handler-axios.js'
import { generarTokenDeAutenticacionDeServicio } from '../generarTokenDeAutenticacionDeServicio.js'

const serviceName = 'Usuarios'
const apiUsuario = axios.create({ baseURL: config.urlServices.apiUsuario })

export const apiUsuarioObtenerUsuario = async (tipo = '', valor = '') => {
    // Llamada a la API de correos para enviar una verificacion de correo a un correo
    const tokenDeAutenticacionDeServicio = generarTokenDeAutenticacionDeServicio()

    const configOfTheRequest = { 
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenDeAutenticacionDeServicio}`
            } 
        }

    try { 
        const response = await apiUsuario.get(`/usuarios/${tipo}/${valor}`, configOfTheRequest) 
        return response.data.resultado
    } catch (error) { 
        throw errorHandlerAxios(error, serviceName) 
    }
} 
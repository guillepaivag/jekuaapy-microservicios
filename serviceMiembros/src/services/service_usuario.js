import axios from 'axios'
import config from '../configs/config.js'
import { generarTokenDeServicio } from '../helpers/generarTokenDeServicio.js'
import { errorHandlerRequest } from '../helpers/errors/error-handler-request.js'

const serviceName = 'service_usuario'
const apiUsuario = axios.create({ baseURL: config.services[serviceName] })

export const apiUsuarioObtenerUsuario = async (tipo = '', valor = '') => {
    // Llamada a la API de correos para enviar una verificacion de correo a un correo
    const tokenDeAutenticacionDeServicio = await generarTokenDeServicio()

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
        throw errorHandlerRequest(error, serviceName) 
    }
}
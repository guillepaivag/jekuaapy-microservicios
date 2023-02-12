import axios from 'axios'
import config from '../../configs/config.js'
import { errorHandlerAxios } from '../errors/error-handler-axios.js'

const serviceName = 'Usuarios'
const apiUsuario = axios.create({ baseURL: config.urlServices.apiUsuario })

export const apiUsuarioObtenerUsuarioDeFirebaseAuthentication = async (tipo = '', valor = '') => {
    // Llamada a la API de correos para enviar una verificacion de correo a un correo
    const configOfTheRequest = { 
            headers: { 
                'Content-Type': 'application/json',
            } 
        }

    try { 
        const response = await apiUsuario.get(`/usuarios/${tipo}/${valor}/authentication`, configOfTheRequest) 
        return response.data.resultado
    } catch (error) { 
        throw errorHandlerAxios(error, serviceName) 
    }
} 
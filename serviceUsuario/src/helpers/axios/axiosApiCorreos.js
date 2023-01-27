import axios from 'axios'
import config from '../../configs/config.js'
import RespuestaError from '../../models/Respuestas/RespuestaError.js'
import { errorHandlerAxios } from '../errors/error-handler-axios.js'

const serviceName = 'Correos'
const apiCorreo = axios.create({ baseURL: config.urlServices.apiCorreo })

export const apiCorreoVerificacionCorreo = async (correo = '') => {
    // Llamada a la API de correos para enviar una verificacion de correo a un correo
    const bodyOfTheRequest = { correo }
    const configOfTheRequest = { headers: { 'Content-Type': 'application/json' } }

    try { 
        const response = await apiCorreo.post('/correos/usuarios/verificarCorreo', bodyOfTheRequest, configOfTheRequest) 
        return response.data.resultado
    } catch (error) { 
        throw errorHandlerAxios(error, serviceName) 
    }
} 
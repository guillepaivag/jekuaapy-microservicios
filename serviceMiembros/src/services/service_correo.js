import axios from 'axios'
import config from '../configs/config.js'
import { generarTokenDeServicio } from '../helpers/generarTokenDeServicio.js'
import { errorHandlerRequest } from '../helpers/errors/error-handler-request.js'

const serviceName = 'service_correo'
const api = axios.create({ baseURL: config.services[serviceName] })

export const apiCorreoEnviarAvisoNuevoMiembroEquipo = async (uidSolicitante = '', correoSolicitado = '', uidEquipo = '') => {
    // Llamada a la API de correos para enviar una verificacion de correo a un correo
    const bodyOfTheRequest = {
        uidSolicitante, 
        correoSolicitado, 
        uidEquipo,
    }

    const tokenDeAutenticacionDeServicio = await generarTokenDeServicio()

    const configOfTheRequest = { 
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenDeAutenticacionDeServicio}`
        } 
    }

    try { 
        const response = await api.post(`/miembros/avisoNuevoMiembroEquipo`, bodyOfTheRequest, configOfTheRequest) 
        return response.data.resultado
    } catch (error) { 
        throw errorHandlerRequest(error, serviceName) 
    }
}

export const apiCorreoEnviarAvisoNuevoMiembroProyecto = async (uidSolicitante = '', correoSolicitado = '', uidEquipo = '', uidProyecto = '') => {
    // Llamada a la API de correos para enviar una verificacion de correo a un correo
    const bodyOfTheRequest = {
        uidSolicitante, 
        correoSolicitado, 
        uidEquipo,
        uidProyecto,
    }

    const tokenDeAutenticacionDeServicio = await generarTokenDeServicio()

    const configOfTheRequest = { 
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenDeAutenticacionDeServicio}`
        } 
    }

    try { 
        const response = await api.post(`/miembros/avisoNuevoMiembroProyecto`, bodyOfTheRequest, configOfTheRequest) 
        return response.data.resultado
    } catch (error) { 
        throw errorHandlerRequest(error, serviceName) 
    }
}
import axios from 'axios'
import config from '../configs/config.js'
import { errorHandlerRequest } from '../helpers/errors/error-handler-request.js'
import { generarTokenDeServicio } from '../helpers/generarTokenDeServicio.js'

const serviceName = 'service_miembro'
const apiMiembro = axios.create({ baseURL: config.services[serviceName] })

export const apiMiembroCrearMiembroEquipo = async (miembroEquipo) => {
    // Llamada a la API de correos para enviar una verificacion de correo a un correo
    const tokenDeServicio = await generarTokenDeServicio()

    const bodyOfTheRequest = { miembroNuevo: miembroEquipo }

    const configOfTheRequest = { 
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenDeServicio}`
        } 
    }

    try { 
        const response = await apiMiembro.post(`/miembrosEquipo`, bodyOfTheRequest, configOfTheRequest) 
        return response.data.resultado
    } catch (error) { 
        throw errorHandlerRequest(error, serviceName) 
    }
} 

export const apiMiembroObtenerMiembroEquipo = async (uidEquipo = '', uidMiembro = '') => {
    // Llamada a la API de correos para enviar una verificacion de correo a un correo
    const tokenDeServicio = await generarTokenDeServicio()

    const configOfTheRequest = { 
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenDeServicio}`
        } 
    }

    try { 
        const response = await apiMiembro.get(`/miembrosEquipo/${uidEquipo}/${uidMiembro}`, configOfTheRequest) 
        return response.data.resultado
    } catch (error) { 
        throw errorHandlerRequest(error, serviceName) 
    }
} 
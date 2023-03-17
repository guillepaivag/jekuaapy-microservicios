import axios from 'axios'
import config from '../configs/config.js'
import { errorHandlerRequest } from '../helpers/errors/error-handler-request.js'
import { generarTokenDeServicio } from '../helpers/generarTokenDeServicio.js'

const serviceName = 'service_miembro'
const apiMiembro = axios.create({ baseURL: config.services[serviceName] })

export const apiMiembroCrearMiembroInternoDeEquipo = async (miembroInterno) => {
    // Llamada a la API de correos para enviar una verificacion de correo a un correo
    const tokenDeServicio = await generarTokenDeServicio()

    const bodyOfTheRequest = { miembroNuevo: miembroInterno }

    const configOfTheRequest = { 
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenDeServicio}`
        } 
    }

    try { 
        const response = await apiMiembro.post(`/miembrosInternosEquipo`, bodyOfTheRequest, configOfTheRequest) 
        return response.data.resultado
    } catch (error) { 
        throw errorHandlerRequest(error, serviceName) 
    }
} 

export const apiMiembroObtenerMiembroInternoDeEquipo = async (uidEquipo = '', uidMiembro = '') => {
    // Llamada a la API de correos para enviar una verificacion de correo a un correo
    const tokenDeServicio = await generarTokenDeServicio()

    const configOfTheRequest = { 
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenDeServicio}`
        } 
    }

    try { 
        const response = await apiMiembro.get(`/miembrosInternosEquipo/${uidEquipo}/${uidMiembro}`, configOfTheRequest) 
        return response.data.resultado
    } catch (error) { 
        throw errorHandlerRequest(error, serviceName) 
    }
} 
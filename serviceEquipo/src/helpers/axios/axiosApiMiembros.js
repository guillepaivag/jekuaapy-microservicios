import axios from 'axios'
import config from '../../configs/config.js'
import { errorHandlerAxios } from '../errors/error-handler-axios.js'
import { generarTokenDeAutenticacionDeServicio } from '../generarTokenDeAutenticacionDeServicio.js'

const serviceName = 'Miembros'
const apiMiembro = axios.create({ baseURL: config.urlServices.apiMiembro })

export const apiMiembroCrearMiembroInternoDeEquipo = async (miembroInterno) => {
    // Llamada a la API de correos para enviar una verificacion de correo a un correo
    const tokenDeAutenticacionDeServicio = generarTokenDeAutenticacionDeServicio()

    const bodyOfTheRequest = { miembroNuevo: miembroInterno }

    const configOfTheRequest = { 
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenDeAutenticacionDeServicio}`
        } 
    }

    try { 
        const response = await apiMiembro.post(`/miembrosInternosEquipo`, bodyOfTheRequest, configOfTheRequest) 
        return response.data.resultado
    } catch (error) { 
        throw errorHandlerAxios(error, serviceName) 
    }
} 

export const apiMiembroObtenerMiembroInternoDeEquipo = async (uidEquipo = '', uidMiembro = '') => {
    // Llamada a la API de correos para enviar una verificacion de correo a un correo
    const tokenDeAutenticacionDeServicio = generarTokenDeAutenticacionDeServicio()

    const configOfTheRequest = { 
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenDeAutenticacionDeServicio}`
        } 
    }

    try { 
        const response = await apiMiembro.get(`/miembrosInternosEquipo/${uidEquipo}/${uidMiembro}`, configOfTheRequest) 
        return response.data.resultado
    } catch (error) { 
        throw errorHandlerAxios(error, serviceName) 
    }
} 
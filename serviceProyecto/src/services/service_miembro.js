import axios from 'axios'
import config from '../configs/config.js'
import { generarTokenDeServicio } from '../helpers/generarTokenDeServicio.js'
import { errorHandlerRequest } from '../helpers/errors/error-handler-request.js'

const serviceName = 'service_miembro'
const apiMiembro = axios.create({ baseURL: config.services[serviceName] })

export const apiMiembroObtenerMiembro = async (uidEquipo = '', uidMiembro = '') => {
    // Llamada a la API de correos para enviar una verificacion de correo a un correo
    const tokenDeAutenticacionDeServicio = await generarTokenDeServicio()

    const configOfTheRequest = { 
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenDeAutenticacionDeServicio}`
            } 
        }

    try { 
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++", apiMiembro, "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
        const response = await apiMiembro.get(`/miembrosEquipo/${uidEquipo}/${uidMiembro}`, configOfTheRequest) 
        console.log('response ---------------------------------------------------',response.data) 
        return response.data.resultado
    } catch (error) { 
        throw errorHandlerRequest(error, serviceName) 
    }
}
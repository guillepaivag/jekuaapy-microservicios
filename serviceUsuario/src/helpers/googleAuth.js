import { JWT } from 'google-auth-library'
import config from '../configs/config.js'
import { errorHandlerRequest } from './errors/error-handler-request.js'

// Variables
const clientName = 'service_usuario'
const requestConfigParams = { service: '', url: '', method: '', body: {}, headers: {} }

// Objetos de google auth y solicitudes
export const googleRequest = async (requestConfig = requestConfigParams) => {
    const { service, url, method, body, headers } = requestConfig
    let urlService = ''

    try { 
        if (service) urlService = `${config.services[service]}${url}`
        if (!service) urlService = url

        const client = new JWT({
            email: config.credentials.client_email,
            key: config.credentials.private_key
        })

        const res = await client.request({
            url: urlService,
            method,
            body,
            headers,
        })
        
        return res
    } catch (error) { 
        throw errorHandlerRequest(error, clientName) 
    }
}

export const googleToken = async (targetAudience = '') => {
    const client = new JWT({
        email: config.credentials.client_email,
        key: config.credentials.private_key,
        additionalClaims: { clientName },
    })
    const idToken = await client.fetchIdToken(targetAudience)
    return idToken
}

export const googleVerifyToken = async (idToken = '') => {
    const client = new JWT({
        email: config.credentials.client_email,
        key: config.credentials.private_key,
        additionalClaims: { serviceName },
    })

    const decodedToken = await client.verifyIdToken({ idToken })

    return decodedToken
}
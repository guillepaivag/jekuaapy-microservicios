import { JWT } from 'google-auth-library'
import config from '../configs/config.js'

export const verificarTokenDeServicio = async (idToken = '') => {
    const credentials = await config.getCredentials()

    const client = new JWT({
        email: credentials.client_email,
        key: credentials.private_key,
    })

    const result = { 
        servicio: false, 
        payload: null 
    }
    
    try {
        const ticket = await client.verifyIdToken({
            idToken, 
            audience: [credentials.private_key_id],
        })

        const payload = ticket.getPayload()

        if (payload.email !== credentials.client_email) return 'servicio_no_autorizado'

        result.servicio = true
        result.payload = payload
    } catch (error) {
        console.log('error verificarTokenDeServicio', error)
    } finally {
        return result
    }
}
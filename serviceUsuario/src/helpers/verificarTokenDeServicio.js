import { JWT } from 'google-auth-library'
import config from '../configs/config.js'

export const verificarTokenDeServicio = async (idToken = '') => {
    const credentials = await config.getCredentials()

    const client = new JWT({
        email: credentials.client_email,
        key: credentials.private_key,
    })
    
    try {
        const ticket = await client.verifyIdToken({
            idToken, audience: [credentials.private_key_id],
        })

        const result = ticket.getPayload()
        return result
    } catch (error) {
        console.log('error verificarTokenDeServicio', error)
    }
}
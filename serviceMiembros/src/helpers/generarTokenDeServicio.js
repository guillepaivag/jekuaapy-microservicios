import { JWT } from 'google-auth-library'
import config from '../configs/config.js'

export const generarTokenDeServicio = async () => {
    const credentials = await config.getCredentials()

    const client = new JWT({
        email: credentials.client_email,
        key: credentials.private_key,
    })

    const idToken = await client.fetchIdToken(credentials.private_key_id)
    return idToken
}
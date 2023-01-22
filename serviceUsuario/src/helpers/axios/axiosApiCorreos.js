import axios from 'axios'
import config from '../../configs/config.js'

const apiCorreo = axios.create({ baseURL: config.urlServices.apiCorreo })

export const apiCorreoVerificacionCorreo = async (correo = '') => {
    const bodyOfTheRequest = { correo }
    const configOfTheRequest = { headers: { 'Content-Type': 'application/json' } }
    await apiCorreo.post('/correos/usuarios/verificarCorreo', bodyOfTheRequest, configOfTheRequest)
} 
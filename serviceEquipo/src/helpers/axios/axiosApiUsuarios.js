import axios from 'axios'
import config from '../../configs/config.js'

const apiUsuario = axios.create({ baseURL: config.urlServices.apiUsuario })

export const apiUsuarioVerificacionUsuario = async (correo = '') => {
    const bodyOfTheRequest = { correo }
    const configOfTheRequest = { headers: { 'Content-Type': 'application/json' } }
    await apiUsuario.post('/correos/usuarios/verificarUsuario', bodyOfTheRequest, configOfTheRequest)
} 
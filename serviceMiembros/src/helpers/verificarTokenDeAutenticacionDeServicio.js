import jwt_decode from 'jwt-decode'

export const verificarTokenDeAutenticacionDeServicio = (token = '') => {
    const decoded = jwt_decode(token)
    console.log(decoded)

    const isService = decoded.PRIVATE_CODE_SERVICE === process.env.PRIVATE_CODE_SERVICE
    const idService = String(decoded.idService)

    return { isService, idService }
}
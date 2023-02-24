import jwt from 'jsonwebtoken'

export const generarTokenDeAutenticacionDeServicio = () => {
    const payload = { 
        idService: 'service_correo', 
        PRIVATE_CODE_SERVICE: process.env.PRIVATE_CODE_SERVICE
    }
    
    const options = { expiresIn: '1h' }
    
    const token = jwt.sign(payload, process.env.SECRET_JWT_SIGN, options)
    console.log('token', token)

    return token
}
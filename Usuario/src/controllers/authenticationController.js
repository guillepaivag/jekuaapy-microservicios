// Respuestas del servidor
import Respuesta from "../models/Respuesta.js"
import RespuestaError from "../models/RespuestaError.js"

// Authentication
import FirebaseAuthenticationRepository from "../repositories/FirebaseAuthenticationRepository.js"
import AuthenticationUseCase from "../usecases/AuthenticationUseCase.js"

// Usuarios
import FirestoreUsuariosRepository from "../repositories/FirestoreUsuariosRepository.js"
import UsuariosUseCase from "../usecases/UsuariosUseCase.js"

const authenticationUseCase = new AuthenticationUseCase(new FirebaseAuthenticationRepository())
const usuariosUseCase = new UsuariosUseCase(new FirestoreUsuariosRepository())

export const obtener = async (req, res) => {
    try {
        const { params } = req
        const { tipo, valor } = params

        let usuarioAuth = null

        if (tipo === 'uid') usuarioAuth = await authenticationUseCase.obtenerPorUID(valor)
        else if (tipo === 'correo') usuarioAuth = await authenticationUseCase.obtenerPorCorreo(valor)
        else throw new TypeError('No hay datos para buscar el usuario.')

        if ( !usuarioAuth ) {
            throw new RespuestaError({
                estado: 400,
                mensajeCliente: 'no_existe_usuario',
                mensajeServidor: 'No existe el usuario.'
            })
        }

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'Se encontró el usuario de manera correcta!',
            resultado: usuarioAuth
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    } catch (error) {
        console.log('Error - obtener-authentication: ', error)

        const respuesta =  new Respuesta({
            estado: 500,
            mensajeCliente: 'error_servidor',
            mensajeServidor: 'Error en el servidor.',
            resultado: null
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    }
}

export const actualizarContrasena = async (req, res) => {
    try {
        const { params, body } = req
        const { tipo, valor } = params
        const { contrasena } = body

        let uid = ''
        if (tipo === 'uid') uid = valor 
        else if (tipo === 'correo') {
            const usuario = await usuariosUseCase.obtenerPorCorreo(valor)
            uid = usuario.uid
        } else if (tipo === 'nombreUsuario') {
            const usuario = await usuariosUseCase.obtenerPorNombreUsuario(valor)
            uid = usuario.uid
        }

        // Actualizacion de contrasena
        await authenticationUseCase.actualizar(uid, { password: contrasena })

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'Se actualizó la contraseña con éxito.',
            resultado: null
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    } catch (error) {
        console.log('Error - actualizar_contrasena-authentication: ', error)

        const respuesta = new RespuestaError({
            estado: 500,
            mensajeCliente: 'error_servidor',
            mensajeServidor: 'Error en el servidor.',
            resultado: null
        })
        
        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    }
}

export default { obtener, actualizarContrasena }
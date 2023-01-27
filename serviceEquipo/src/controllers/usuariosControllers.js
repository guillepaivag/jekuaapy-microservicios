import { request, response } from "express"

// Respuestas del servidor
import Respuesta from "../models/Respuestas/Respuesta.js"
import RespuestaError from "../models/Respuestas/RespuestaError.js"

// Usuarios
import FirestoreUsuariosRepository from "../repositories/FirestoreUsuariosRepository.js"
import UsuariosUseCase from "../usecases/UsuariosUseCase.js"

// Manejo de errores
import { errorHandler } from "../helpers/errors/error-handler.js"

// Services
import { apiUsuarioVerificacionUsuario } from "../helpers/axios/axiosApiUsuarios.js"

const authenticationUseCase = new AuthenticationUseCase(new FirebaseAuthenticationRepository())
const usuariosUseCase = new UsuariosUseCase(new FirestoreUsuariosRepository())
const informacionUsuariosUseCase = new InformacionUsuariosUseCase(new FirestoreInformacionUsuarioRepository())

export const crear = async (req = request, res = response) => {
    try {
        const { params, body } = req
        const { datosUsuarioNuevo, datosInformacionUsuarioNuevo, contrasena } = body

        // Crear Usuario
        datosUsuarioNuevo.uid = usuarioAuth.uid
        const usuario = await usuariosUseCase.crear(datosUsuarioNuevo)

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'Se creó un usuario con éxito.',
            resultado: {
                usuarioAuth,
                usuario,
                informacionUsuario,
            }
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    } catch (error) {
        console.log('Error - crear: ', error)

        // Manejo de errores
        const respuestaManejada = errorHandler(error)
        return res.status(respuestaManejada.estado).json(respuestaManejada.getRespuesta())

    }
}

export const obtener = async (req = request, res = response) => {
    try {
        const { params } = req
        const { tipo, valor } = params

        let usuario = null

        if (tipo === 'uid') usuario = await usuariosUseCase.obtenerPorUID(valor)
        else if (tipo === 'correo') usuario = await usuariosUseCase.obtenerPorCorreo(valor)
        else if (tipo === 'nombreUsuario') usuario = await usuariosUseCase.obtenerPorNombreUsuario(valor)
        else throw new TypeError('No hay datos para buscar el usuario.')

        if (!usuario) {
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
            resultado: usuario
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    } catch (error) {
        console.log('Error - obtener: ', error)

        // Manejo de errores
        const respuestaManejada = errorHandler(error)
        return res.status(respuestaManejada.estado).json(respuestaManejada.getRespuesta())

    }
}

export const actualizar = async (req = request, res = response) => {
    try {
        const { params, body } = req
        const { tipo, valor } = params
        const { solicitante, usuarioActualizado, datosUsuarioActualizado } = body
        const { authToken, uidSolicitante, authSolicitante } = solicitante
        
        // Actualizar usuario
        await usuariosUseCase.actualizar(uidSolicitante, datosUsuarioActualizado)

        // Actualizar authentication [correo] si es necesario
        if (datosUsuarioActualizado.correo) {
            await authenticationUseCase.actualizar(uidSolicitante, { 
                email: datosUsuarioActualizado.correo, 
                emailVerified: false 
            })

            // Enviar correo de verificación
            apiCorreoVerificacionCorreo(datosUsuarioActualizado.correo)
        }

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'Se actualizó el usuario de manera correcta!',
            resultado: datosUsuarioActualizado
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    } catch (error) {
        console.log('Error - actualizar: ', error)

        // Manejo de errores
        const respuestaManejada = errorHandler(error)
        return res.status(respuestaManejada.estado).json(respuestaManejada.getRespuesta())

    }
}

export const eliminar = async (req = request, res = response) => {
    
}
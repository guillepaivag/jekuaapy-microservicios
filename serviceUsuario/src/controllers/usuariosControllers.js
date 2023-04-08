import { request, response } from "express"

// Respuestas del servidor
import Respuesta from "../models/Respuestas/Respuesta.js"
import RespuestaError from "../models/Respuestas/RespuestaError.js"

// Authentication
import FirebaseAuthenticationRepository from "../repositories/FirebaseAuthenticationRepository.js"
import AuthenticationUseCase from "../usecases/AuthenticationUseCase.js"

// Usuarios
import FirestoreUsuariosRepository from "../repositories/FirestoreUsuariosRepository.js"
import UsuariosUseCase from "../usecases/UsuariosUseCase.js"

// InformacionUsuario
import FirestoreInformacionUsuarioRepository from "../repositories/FirestoreInformacionUsuarioRepository.js"
import InformacionUsuariosUseCase from "../usecases/InformacionUsuariosUseCase.js"

// Foto de perfil
import StorageFotoPerfilRepository from "../repositories/StorageFotoPerfilRepository.js"
import FotoPerfilUseCase from "../usecases/FotoPerfilUseCase.js"

// Foto de portada
import StorageFotoPortadaRepository from "../repositories/StorageFotoPortadaRepository.js"
import FotoPortadaUseCase from "../usecases/FotoPortadaUseCase.js"

// Manejo de errores
import { errorHandler } from "../helpers/errors/error-handler.js"

// Services
import { apiCorreoVerificacionCorreo } from "../services/service_correo.js"

const authenticationUseCase = new AuthenticationUseCase(new FirebaseAuthenticationRepository())
const usuariosUseCase = new UsuariosUseCase(new FirestoreUsuariosRepository())
const informacionUsuariosUseCase = new InformacionUsuariosUseCase(new FirestoreInformacionUsuarioRepository())
const fotoPerfilUseCase = new FotoPerfilUseCase(new StorageFotoPerfilRepository())
const fotoPortadaUseCase = new FotoPortadaUseCase(new StorageFotoPortadaRepository())

export const crear = async (req = request, res = response) => {
    try {
        const { params, body } = req
        const { datosUsuarioNuevo, datosInformacionUsuarioNuevo, contrasena } = body

        // Crear Usuario en Firebase Authentication
        const usuarioAuth = await authenticationUseCase.crear(datosUsuarioNuevo.correo, contrasena)
        await authenticationUseCase.actualizarCustomClaims(usuarioAuth.uid, { rol: 'estudiante' })

        // Crear Usuario
        datosUsuarioNuevo.uid = usuarioAuth.uid
        const usuario = await usuariosUseCase.crear(datosUsuarioNuevo)

        // Crear InformacionUsuario
        datosInformacionUsuarioNuevo.uid = usuarioAuth.uid
        const informacionUsuario = await informacionUsuariosUseCase.crear(usuarioAuth.uid, datosInformacionUsuarioNuevo)

        // Enviar correo de verificación
        apiCorreoVerificacionCorreo(datosUsuarioNuevo.correo)

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

export const obtenerAuthentication = async (req = request, res = response) => {
    try {
        const { params } = req
        const { tipo, valor } = params

        let usuarioAuth = null

        if (tipo === 'uid') usuarioAuth = await authenticationUseCase.obtenerPorUID(valor)
        else if (tipo === 'correo') usuarioAuth = await authenticationUseCase.obtenerPorCorreo(valor)
        else throw new TypeError('No hay datos para buscar el usuario.')

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'Se encontró el usuario de manera correcta!',
            resultado: usuarioAuth
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    } catch (error) {
        console.log('Error - obtenerAuthentication: ', error)

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

export const enviarVerificacionCorreo = async (req = request, res = response) => {
    try {
        const { params, body } = req
        const { solicitante } = body

        if (solicitante.authSolicitante.emailVerified) {
            throw new RespuestaError({
                estado: 400, 
                mensajeCliente: 'correo_ya_verificado', 
                mensajeServidor: 'El email ya está verificado.', 
                resultado: null
            })
        }
        
        // Enviar verificacion de correo
        await apiCorreoVerificacionCorreo(solicitante.authSolicitante.email, false)

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'Se envió el correo de verificación de manera correcta!',
            resultado: null
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    } catch (error) {
        console.log('Error - enviarVerificacionCorreo: ', error)

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
        
        // Actualizar usuario
        await usuariosUseCase.actualizar(solicitante.uidSolicitante, datosUsuarioActualizado)

        // Actualizar authentication [correo] si es necesario
        if (datosUsuarioActualizado.correo) {
            await authenticationUseCase.actualizar(solicitante.uidSolicitante, { 
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

export const actualizarContrasena = async (req = request, res = response) => {
    try {
        const { params, body } = req
        const { tipo, valor } = params
        const { solicitante, contrasena, confirmacionContrasena } = body

        // Actualizacion de contrasena
        await authenticationUseCase.actualizar(solicitante.uidSolicitante, { password: contrasena })

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'Se actualizó la contraseña con éxito.',
            resultado: null
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    } catch (error) {
        console.log('Error - actualizarContrasena: ', error)

        // Manejo de errores
        const respuestaManejada = errorHandler(error)
        return res.status(respuestaManejada.estado).json(respuestaManejada.getRespuesta())

    }
}

export const restaurarFotoPerfil = async (req = request, res = response) => {
    try {
        const { params, body } = req
        const { solicitante, tipoRestauracion } = body

        // Eliminar foto de perfil
        const usuario = await usuariosUseCase.obtenerPorUID(solicitante.uidSolicitante)
        if (usuario.fotoPerfil !== '' && usuario.fotoPerfil !== 'default') 
            await fotoPerfilUseCase.eliminar(`${solicitante.uidSolicitante}/foto.`)
        
        await usuariosUseCase.actualizar(solicitante.uidSolicitante, { fotoPerfil: tipoRestauracion })

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'Se restauró la foto de perfil.',
            resultado: null
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    } catch (error) {
        console.log('Error - restaurarFotoPerfil: ', error)

        // Manejo de errores
        const respuestaManejada = errorHandler(error)
        return res.status(respuestaManejada.estado).json(respuestaManejada.getRespuesta())

    }
}

export const restaurarFotoPortada = async (req = request, res = response) => {
    try {
        const { params, body } = req
        const { solicitante, tipoRestauracion } = body

        // Eliminar foto de portada
        const usuario = await usuariosUseCase.obtenerPorUID(solicitante.uidSolicitante)
        if (usuario.fotoPortada !== '' && usuario.fotoPortada !== 'default') 
            await fotoPortadaUseCase.eliminar(`${solicitante.uidSolicitante}/foto.`)

        await usuariosUseCase.actualizar(solicitante.uidSolicitante, { fotoPortada: tipoRestauracion })

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'Se restauró la foto de portada.',
            resultado: null
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    } catch (error) {
        console.log('Error - restaurarFotoPortada: ', error)

        // Manejo de errores
        const respuestaManejada = errorHandler(error)
        return res.status(respuestaManejada.estado).json(respuestaManejada.getRespuesta())

    }
}

export const eliminar = async (req = request, res = response) => {
    
}
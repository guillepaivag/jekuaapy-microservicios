// Respuestas del servidor
import Respuesta from "../models/Respuesta.js"
import RespuestaError from "../models/RespuestaError.js"

// Authentication
import FirebaseAuthenticationRepository from "../repositories/FirebaseAuthenticationRepository.js"
import AuthenticationUseCase from "../usecases/AuthenticationUseCase.js"

// Usuarios
import FirestoreUsuariosRepository from "../repositories/FirestoreUsuariosRepository.js"
import UsuariosUseCase from "../usecases/UsuariosUseCase.js"

// InformacionUsuario
import FirestoreInformacionUsuarioRepository from "../repositories/FirestoreInformacionUsuarioRepository.js"
import InformacionUsuariosUseCase from "../usecases/InformacionUsuariosUseCase.js"

const authenticationUseCase = new AuthenticationUseCase(new FirebaseAuthenticationRepository())
const usuariosUseCase = new UsuariosUseCase(new FirestoreUsuariosRepository())
const informacionUsuariosUseCase = new InformacionUsuariosUseCase(new FirestoreInformacionUsuarioRepository())

export const crear = async (req, res) => {
    try {
        const { params, body } = req
        const { usuarioNuevo, contrasena } = body

        // Crear Usuario en Firebase Authentication
        const usuarioAuth = await authenticationUseCase.crear(usuarioNuevo.correo, contrasena)
        await authenticationUseCase.actualizarCustomClaims(usuarioAuth.uid, { rol: 'estudiante' })

        // Crear Usuario
        const usuario = await usuariosUseCase.crear({
            uid: usuarioAuth.uid, 
            correo: usuarioNuevo.correo, 
            nombreUsuario: usuarioNuevo.nombreUsuario, 
            nombreCompleto: usuarioNuevo.nombreCompleto, 
            fechaNacimiento: null, 
            rol: 'estudiante', 
            fotoPerfil: 'https://firebasestorage.googleapis.com/v0/b/jekuaapydev2.appspot.com/o/WhatsApp%20Image%202022-12-11%20at%2018.02.48.jpeg?alt=media&token=e6d0720e-cba4-4d11-836b-cfdef729eeef', 
            eliminado: false, 
            datosAuthenticationEliminados: null,
        })

        // Crear InformacionUsuario
        const informacionUsuario = await informacionUsuariosUseCase.crear(usuarioAuth.uid, {
            uid: usuarioAuth.uid,
            descripcion: '',
            especializaciones: '',
            intereses: '',
            rolDescriptivo: 'Estudiante de Jekuaapy',
            redesSociales: [],
        })

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
        console.log('Error - crear-usuario: ', error)

        const respuesta = new RespuestaError({
            estado: 500,
            mensajeCliente: 'error_servidor',
            mensajeServidor: 'Error en el servidor.',
            resultado: null
        })
        
        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    }
}

export const obtener = async (req, res) => {
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
        console.log('Error - obtener-usuario: ', error)

        const respuesta =  new Respuesta({
            estado: 500,
            mensajeCliente: 'error_servidor',
            mensajeServidor: 'Error en el servidor.',
            resultado: null
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    }
}

export const actualizar = async (req, res) => {
    
}

export const eliminar = async (req, res) => {
    
}

export default {
    crear,
    obtener,
    actualizar,
    eliminar
}
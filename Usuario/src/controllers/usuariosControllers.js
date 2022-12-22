// instanciamos el repositorio y el use case
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
const usuariosControllers = {}

usuariosControllers.crear = async (req, res) => {
    try {
        const { params, body } = req
        const { usuarioNuevo, contrasena } = body

        // Crear Usuario en Firebase Authentication
        const usuarioAuth = await authenticationUseCase.crear(usuarioNuevo.correo, usuarioNuevo.nombreCompleto, contrasena)
        await authenticationUseCase.actualizarCustomClaims({ rol: 'estudiante' })

        // Crear Usuario
        const usuario = await usuariosUseCase.crear({
            uid: usuarioAuth.uid, 
            correo: usuarioNuevo.correo, 
            nombreUsuario: usuarioNuevo.nombreUsuario, 
            fechaNacimiento: null, 
            rol: 'estudiante', 
            fotoPerfil: usuarioNuevo.fotoPerfil, 
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
        console.log('Error - obtenerMiUsuario: ', error)

        const respuesta =  new RespuestaError({
            estado: 500,
            mensajeCliente: 'error_servidor',
            mensajeServidor: 'Error en el servidor.',
            resultado: null
        })
        
        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    }
}

usuariosControllers.obtener = async (req, res) => {
    
}

usuariosControllers.actualizar = async (req, res) => {
    
}

usuariosControllers.eliminar = async (req, res) => {
    
}

export default usuariosControllers
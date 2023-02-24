import functions from "firebase-functions"

// Authentication
import FirebaseAuthenticationRepository from "../repositories/FirebaseAuthenticationRepository.js"
import AuthenticationUseCase from "../usecases/AuthenticationUseCase.js"

// Usuarios
import FirestoreUsuariosRepository from "../repositories/FirestoreUsuariosRepository.js"
import UsuariosUseCase from "../usecases/UsuariosUseCase.js"

// InformacionUsuario
import FirestoreInformacionUsuarioRepository from "../repositories/FirestoreInformacionUsuarioRepository.js"
import InformacionUsuariosUseCase from "../usecases/InformacionUsuariosUseCase.js"

// Services
import { apiCorreoVerificacionCorreo } from "../services/service_correo.js"

const usuariosUseCase = new UsuariosUseCase(new FirestoreUsuariosRepository())
const authenticationUseCase = new AuthenticationUseCase(new FirebaseAuthenticationRepository())
const informacionUsuariosUseCase = new InformacionUsuariosUseCase(new FirestoreInformacionUsuarioRepository())

const registroConAlgunProveedor = functions
.region('southamerica-east1')
.auth
.user()
.onCreate(async (user) => {
    console.log('\n--------------\n')
    console.log('USUARIO: ', JSON.stringify(user))
    console.log('\n--------------\n')

    const providersId = ['google.com', 'facebook.com']
    if ( user.providerData.length === 1 && providersId.includes(user.providerData[0].providerId) ) {
        // Crear documento de usuario en la colección de 'Usuarios'
        await authenticationUseCase.actualizarCustomClaims(user.uid, { rol: 'estudiante' })
        
        // Datos Usuario
        const nombreUsuario = user.email.split('@')[0] + new Date(user.metadata.creationTime).getTime()
        await usuariosUseCase.crear({
            uid: user.uid,
            nombreUsuario: nombreUsuario,
            correo: user.email,
            nombreCompleto: 'Estudiante de Jekuaapy',
            fechaNacimiento: null,
            rol: 'estudiante',
            fotoPerfil: 'default',
            fotoPortada: 'default',
            estado: 'activo',
            authenticationEliminado: null,
        })

        // Datos Información del usuario
        await informacionUsuariosUseCase.crear(user.uid, {
            uid: user.uid,
            descripcion: '',
            especializaciones: '',
            intereses: '',
            rolDescriptivo: 'Estudiante de Jekuaapy',
            redesSociales: [],
        })
    }

    // // Contador de usuarios
    // const incrementar = admin.firestore.FieldValue.increment(1)
    // db.collection('Contadores').doc('usuarios').update({ cantidad: incrementar })

    // Enviar correo de verificación
    if (!user.emailVerified) apiCorreoVerificacionCorreo(user.email)

    return true
})

export default registroConAlgunProveedor
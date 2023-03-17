// APIs
import { apiUsuarioObtenerUsuario } from "../../../services/service_usuario.js"

// Models
import RespuestaError from "../../../models/Respuestas/RespuestaError.js"

// Repositories&UseCase - Usuarios
import FirestoreMiembroInternoEquipoRepository from "../../../repositories/FirestoreMiembroInternoEquipoRepository.js"
import MiembroInternoEquipoUseCase from "../../../usecases/MiembroInternoEquipoUseCase.js"

// Objetos de use-cases
const miembroInternoEquipoUseCase = new MiembroInternoEquipoUseCase(new FirestoreMiembroInternoEquipoRepository())

// Helpers
import { verificarListaDeRoles } from "../../../helpers/esRolValido.js"

export const verificadorSolicitudMiembro = async (solicitante, uidEquipo, correoMiembroNuevo, roles = []) => {
    const data = {
        respuestaError: null,
        data: { usuarioMiembroNuevo: null, miembroNuevo: null }
    }
    
    if (solicitante.tipo === 'usuario') {
        // Verificar permisos del solicitante (es propietario o editor)
        const miembroInterno = await miembroInternoEquipoUseCase.obtenerPorUID(uidEquipo, solicitante.uidSolicitante)
    
        if (!miembroInterno.roles.includes('propietario') && !miembroInterno.roles.includes('editor')) {
            data.respuestaError = new RespuestaError({
                estado: 401, 
                mensajeCliente: 'uid_requerido', 
                mensajeServidor: '[uid] es requerido.', 
                resultado: null
            })
        }
    }

    if (data.respuestaError) return data

    // Verificar validez del [correoMiembroNuevo]
    const usuario = await apiUsuarioObtenerUsuario('correo', correoMiembroNuevo)
    if (usuario) data.data.usuarioMiembroNuevo = usuario
    else if (!usuario) {
        data.respuestaError = new RespuestaError({
            estado: 400, 
            mensajeCliente: 'uid_requerido', 
            mensajeServidor: '[uid] es requerido.', 
            resultado: null
        })
    }

    if (data.respuestaError) return data

    // Verificar que el [correoMiembroNuevo] no forme parte del equipo
    const miembroInterno = await miembroInternoEquipoUseCase.obtenerPorUID(uidEquipo, usuario.uid)
    if (miembroInterno && miembroInterno.estado === 'activo') {
        data.respuestaError = new RespuestaError({
            estado: 400, 
            mensajeCliente: 'uid_requerido', 
            mensajeServidor: '[uid] es requerido.', 
            resultado: null
        })
    } else {
        data.data.miembroNuevo = miembroInterno
    }

    if (data.respuestaError) return data

    const rolesValidos = verificarListaDeRoles(roles)
    if (!rolesValidos) {
        data.respuestaError = new RespuestaError({
            estado: 400, 
            mensajeCliente: 'uid_requerido', 
            mensajeServidor: '[uid] es requerido.', 
            resultado: null
        })
    }

    return data
}
// Models
import { apiUsuarioObtenerUsuario } from "../../../helpers/axios/axiosApiUsuarios.js"
import RespuestaError from "../../../models/Respuestas/RespuestaError.js"

// Repositories&UseCase - Usuarios
import FirestoreMiembroInternoEquipoRepository from "../../../repositories/FirestoreMiembroInternoEquipoRepository.js"
import MiembroInternoEquipoUseCase from "../../../usecases/MiembroInternoEquipoUseCase.js"

// Objetos de use-cases
const miembroInternoEquipoUseCase = new MiembroInternoEquipoUseCase(new FirestoreMiembroInternoEquipoRepository())

export const verificadorSolicitudMiembro = async (solicitante, uidEquipo, correoMiembroNuevo) => {
    if (solicitante.tipo === 'usuario') {
        // Verificar permisos del solicitante (es propietario o editor)
        const miembroInterno = await miembroInternoEquipoUseCase.obtenerPorUID(uidEquipo, solicitante.uidSolicitante)
    
        if (miembroInterno.rol !== 'propietario' && miembroInterno.rol !== 'editor') {
            return new RespuestaError({
                estado: 400, 
                mensajeCliente: 'uid_requerido', 
                mensajeServidor: '[uid] es requerido.', 
                resultado: null
            })
        }
    }

    // Verificar validez del [correoMiembroNuevo]
    const usuario = await apiUsuarioObtenerUsuario('correo', correoMiembroNuevo)
    if (!usuario) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'uid_requerido', 
            mensajeServidor: '[uid] es requerido.', 
            resultado: null
        })
    }

    // Verificar que el [correoMiembroNuevo] no forme parte del equipo
    const miembroInterno = await miembroInternoEquipoUseCase.obtenerPorUID(uidEquipo, usuario.uid)
    if (miembroInterno && miembroInterno.estado === 'activo') {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'uid_requerido', 
            mensajeServidor: '[uid] es requerido.', 
            resultado: null
        })
    }

    return null
}
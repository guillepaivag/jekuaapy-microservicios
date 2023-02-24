// Models
import { apiUsuarioObtenerUsuario } from "../../../helpers/axios/axiosApiUsuarios.js"
import RespuestaError from "../../../models/Respuestas/RespuestaError.js"

// Repositories&UseCase - Usuarios
import FirestoreMiembroInternoEquipoRepository from "../../../repositories/FirestoreMiembroInternoEquipoRepository.js"
import MiembroInternoEquipoUseCase from "../../../usecases/MiembroInternoEquipoUseCase.js"

// Objetos de use-cases
const miembroInternoEquipoUseCase = new MiembroInternoEquipoUseCase(new FirestoreMiembroInternoEquipoRepository())

export const verificadorObtencionMiembro = async (solicitante, uidEquipo = '', uidMiembro = '') => {
    const respuestaError = {value: null}
    
    if (solicitante.tipo === 'usuario') {
        if ( !solicitante.authSolicitante.emailVerified ) {
            throw new RespuestaError({
                estado: 400, 
                mensajeCliente: 'correo_no_verificado', 
                mensajeServidor: 'El email no está verificado.', 
                resultado: null
            })
        }

        // El solicitante pertenece al equipo
        const miembroInterno = await miembroInternoEquipoUseCase.obtenerPorUID(uidEquipo, solicitante.uidSolicitante)
        if (!miembroInterno || miembroInterno.estado !== 'activo') {
            respuestaError.value = new RespuestaError({
                estado: 401, 
                mensajeCliente: 'miembro_no_autorizado', 
                mensajeServidor: 'El miembro solicitante no esta autorizado para ver este miembro.', 
                resultado: null
            })
        }
    }

    return respuestaError.value
}
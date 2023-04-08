import RespuestaError from "../../../models/Respuestas/RespuestaError.js"
import esCodigo from "../../../utils/esCodigo.js"

// Proyectos
import FirestoreProyectosRepository from "../../../repositories/FirestoreProyectosRepository.js"
import ProyectosUseCase from "../../../usecases/ProyectosUseCase.js"

// Use cases objects
const proyectoUseCase = new ProyectosUseCase(new FirestoreProyectosRepository())

export const verificadorEliminacionProyecto = async (uidEquipo, uid) => {
    let respuestaError = null

    const proyecto = await proyectoUseCase.obtenerPorUID(uidEquipo, uid)
    console.log("proyecto",proyecto)
    if (proyecto === null) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'proyecto_no_existe', 
            mensajeServidor: 'El proyecto no existe.', 
            resultado: null
        })
    }

    return null
}

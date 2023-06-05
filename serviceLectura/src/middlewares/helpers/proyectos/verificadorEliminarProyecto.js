import RespuestaError from "../../../models/Respuestas/RespuestaError.js"
import esCodigo from "../../../utils/esCodigo.js"

// Lecturas
import FirestoreLecturasRepository from "../../../repositories/FirestoreLecturasRepository.js"
import LecturasUseCase from "../../../usecases/LecturasUseCase.js"

// Use cases objects
const lecturaUseCase = new LecturasUseCase(new FirestoreLecturasRepository())

export const verificadorEliminacionLectura = async (uidEquipo, uid) => {
    let respuestaError = null

    // verificar la existencia del lectura
    const data = {}

    // verificamos que el equipo exista
    const equipo = await apiEquipoObtenerEquipo(lecturaNuevo.uidEquipo)

    if(!equipo) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'equipo_no_existe', 
            mensajeServidor: 'El equipo no existe.', 
            resultado: null
        })
    }


    const lectura = await lecturaUseCase.obtenerPorUID(uidEquipo, uid)
    console.log("lectura",lectura)
    if (lectura === null) {
        return new RespuestaError({
            estado: 400, 
            mensajeCliente: 'lectura_no_existe', 
            mensajeServidor: 'El lectura no existe.', 
            resultado: null
        })
    }

    data.equipo = equipo

    return data
}

import MiembroInternoEquipo from "../../../models/MiembroInternoEquipo.js"
import { milliseconds_a_timestamp } from "../../../utils/timestamp.js"

export const constructorMIECreacion = (miembroNuevo = MiembroInternoEquipo.params) => {
    const miembroInternoEquipoVerificado = {
        uid: miembroNuevo.uid, 
        uidEquipo: miembroNuevo.uidEquipo, 
        rol: miembroNuevo.rol, 
        estado: miembroNuevo.estado, 
        fechaCreacion: milliseconds_a_timestamp(miembroNuevo.fechaCreacion)
    }

    return { miembroInternoEquipoVerificado }
}
import MiembroProyecto from "../../../models/MiembroProyecto.js"
import { milliseconds_a_timestamp } from "../../../utils/timestamp.js"

export const constructorMiembroProyectoCreacion = (miembroNuevo = MiembroProyecto.params) => {
    const miembroProyectoVerificado = {
        uid: miembroNuevo.uid, 
        uidEquipo: miembroNuevo.uidEquipo, 
        uidProyecto: miembroNuevo.uidProyecto, 
        estado: 'activo', 
        fechaCreacion: milliseconds_a_timestamp(miembroNuevo.fechaCreacion),
        fechaEliminacion: null
    }

    return { miembroProyectoVerificado }
}
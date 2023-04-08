import MiembroEquipo from "../../../models/MiembroEquipo.js"
import { milliseconds_a_timestamp } from "../../../utils/timestamp.js"

export const constructorMiembroEquipoCreacion = (tipoSolicitante = '', miembroNuevo = MiembroEquipo.params) => {
    const miembroEquipoVerificado = {
        uid: miembroNuevo.uid, 
        uidEquipo: miembroNuevo.uidEquipo, 
        roles: miembroNuevo.roles, 
        estado: tipoSolicitante === 'usuario' ? 'activo' : miembroNuevo.estado, 
        fechaCreacion: milliseconds_a_timestamp(miembroNuevo.fechaCreacion),
    }

    return { miembroEquipoVerificado }
}
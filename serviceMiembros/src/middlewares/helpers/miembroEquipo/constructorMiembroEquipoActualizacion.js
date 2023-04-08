import MiembroEquipo from "../../../models/MiembroEquipo.js"

export const constructorMiembroEquipoActualizacion = (miembroActualizado = MiembroEquipo.params) => {
    const miembroEquipoVerificado = {}
        
    miembroActualizado.roles ? miembroEquipoVerificado.roles = miembroActualizado.roles : ''
    miembroActualizado.estado ? miembroEquipoVerificado.estado = miembroActualizado.estado : ''

    return { miembroEquipoVerificado }
}
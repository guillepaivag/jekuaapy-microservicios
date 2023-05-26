import { verificadorActualizacionEquipoUsuario } from "./verificadorActualizacionEquipoUsuario.js"
import { verificadorActualizacionEquipoServicio } from "./verificadorActualizacionEquipoServicio.js"

export const verificadorActualizacionEquipo = async (tipoSolicitante = '', uidSolicitante = '', uidEquipo = '', equipoActualizado, configuracion) => {
    let data = null
    
    if (tipoSolicitante === 'usuario') data = await verificadorActualizacionEquipoUsuario(uidSolicitante, uidEquipo, equipoActualizado) 
    else if (tipoSolicitante === 'servicio') data = await verificadorActualizacionEquipoServicio(uidEquipo, equipoActualizado, configuracion)
    else return Error('Tipo de solicitante invalido')

    return data
}

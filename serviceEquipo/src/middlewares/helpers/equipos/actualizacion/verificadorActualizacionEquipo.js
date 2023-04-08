import { verificadorActualizacionEquipoUsuario } from "./verificadorActualizacionEquipoUsuario.js"
import { verificadorActualizacionEquipoServicio } from "./verificadorActualizacionEquipoServicio.js"

export const verificadorActualizacionEquipo = async (tipoSolicitante = '', uidEquipo = '', equipoActualizado, uidSolicitante = '') => {
    const data = { value: null }
    
    if (tipoSolicitante === 'usuario') data.value = await verificadorActualizacionEquipoUsuario(uidEquipo, equipoActualizado, uidSolicitante) 
    else if (tipoSolicitante === 'servicio') data.value = await verificadorActualizacionEquipoServicio(uidEquipo, equipoActualizado)
    else return Error('Tipo de solicitante invalido')

    return data.value
}

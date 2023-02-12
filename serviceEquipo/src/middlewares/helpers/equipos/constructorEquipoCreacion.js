import { milliseconds_a_timestamp } from "../../../utils/timestamp.js"

export const constructorEquipoCreacion = (equipoNuevo) => {
    const equipoNuevoVerificado = {
        responsable: equipoNuevo.responsable, 
        codigo: equipoNuevo.codigo,  
        nombre: equipoNuevo.nombre,  
        descripcion: equipoNuevo.descripcion,  
        cantidadMiembros: 0, 
        estado: 'activo', 
        fechaCreacion: milliseconds_a_timestamp(equipoNuevo.fechaCreacion), 
        fechaEliminado: null, 
    }

    return { equipoNuevoVerificado }
}
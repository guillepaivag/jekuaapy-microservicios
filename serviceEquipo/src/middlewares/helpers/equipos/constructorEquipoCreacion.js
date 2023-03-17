import { milliseconds_a_timestamp } from "../../../utils/timestamp.js"

export const constructorEquipoCreacion = (equipoNuevo) => {
    const equipoNuevoVerificado = {
        responsable: equipoNuevo.responsable, 
        codigo: equipoNuevo.codigo,  
        nombre: equipoNuevo.nombre,  
        descripcion: equipoNuevo.descripcion,  
        cantidadMiembros: 1, 
        estado: 'activo', 
        fechaCreacion: milliseconds_a_timestamp(equipoNuevo.fechaCreacion), 
        fechaEliminado: null, 
    }
    
    // Datos para el body de la creacion del miembro
    const miembroNuevoVerificado = {
        uid: equipoNuevo.responsable,
        uidEquipo: '',
        roles: ['propietario'],
        estado: 'activo',
        fechaCreacion: equipoNuevoVerificado.fechaCreacion,
    }

    return { equipoNuevoVerificado, miembroNuevoVerificado }
}
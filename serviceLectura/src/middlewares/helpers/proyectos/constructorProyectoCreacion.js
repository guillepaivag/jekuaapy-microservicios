import { milliseconds_a_timestamp } from "../../../utils/timestamp.js"

export const constructorLecturaCreacion = (lecturaNuevo) => {
    const lecturaNuevoVerificado = {
        uidEquipo: lecturaNuevo.uidEquipo,
        tipoLectura: lecturaNuevo.tipoLectura,
        codigo: lecturaNuevo.codigo,  
        nombre: lecturaNuevo.nombre,  
        estado: 'activo', 
        fechaCreacion: milliseconds_a_timestamp(lecturaNuevo.fechaCreacion), 
        fechaEliminado: null, 
    }

    return { lecturaNuevoVerificado }
}
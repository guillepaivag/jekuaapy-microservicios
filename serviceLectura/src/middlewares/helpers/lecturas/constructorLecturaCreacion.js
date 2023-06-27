import { milliseconds_a_timestamp } from "../../../utils/timestamp.js"

export const constructorLecturaCreacion = (lecturaNuevo) => {
    const lecturaNuevoVerificado = {
        uidEquipo: lecturaNuevo.uidEquipo,
        uidCreador: lecturaNuevo.uidCreador,
        nombre: lecturaNuevo.nombre,
        estado: 'activo', 
        fechaCreacion: milliseconds_a_timestamp(lecturaNuevo.fechaCreacion), 
        fechaEliminacion: null, 
    }

    return { lecturaNuevoVerificado }
}
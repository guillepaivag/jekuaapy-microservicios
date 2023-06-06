import { milliseconds_a_timestamp } from "../../../utils/timestamp.js"

export const constructorLecturaCreacion = (lecturaNuevo) => {
    const lecturaNuevoVerificado = {
        uidEquipo: lecturaNuevo.uidEquipo,
        nombre: lecturaNuevo.nombre,
        uidCreador: lecturaNuevo.uidCreador,
        estado: 'activo', 
        fechaCreacion: milliseconds_a_timestamp(lecturaNuevo.fechaCreacion), 
        fechaEliminado: null, 
    }

    return { lecturaNuevoVerificado }
}
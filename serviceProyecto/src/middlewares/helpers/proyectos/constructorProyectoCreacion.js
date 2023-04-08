import { milliseconds_a_timestamp } from "../../../utils/timestamp.js"

export const constructorProyectoCreacion = (proyectoNuevo) => {
    const proyectoNuevoVerificado = {
        uidEquipo: proyectoNuevo.uidEquipo,
        tipoProyecto: proyectoNuevo.tipoProyecto,
        codigo: proyectoNuevo.codigo,  
        nombre: proyectoNuevo.nombre,  
        estado: 'activo', 
        fechaCreacion: milliseconds_a_timestamp(proyectoNuevo.fechaCreacion), 
        fechaEliminado: null, 
    }

    return { proyectoNuevoVerificado }
}
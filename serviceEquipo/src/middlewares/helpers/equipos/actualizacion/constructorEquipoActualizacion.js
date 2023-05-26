import admin from "../../../../../firebase-service/firebase-admin.js"

export const constructorEquipoActualizacion = (tipoSolicitante, equipoActualizado, configuracion) => {
    let equipoActualizadoVerificado = {}
    
    if (tipoSolicitante  === 'usuario') {
        equipoActualizado.responsable ? equipoActualizadoVerificado.responsable = equipoActualizado.responsable : ''
        equipoActualizado.codigo ? equipoActualizadoVerificado.codigo = equipoActualizado.codigo : ''
        equipoActualizado.nombre ? equipoActualizadoVerificado.nombre = equipoActualizado.nombre : ''
        equipoActualizado.descripcion ? equipoActualizadoVerificado.descripcion = equipoActualizado.descripcion : ''
    } else {
        
        if (equipoActualizado.cantidadMiembros) {
            const cantidadMiembros = equipoActualizado.cantidadMiembros
            equipoActualizadoVerificado.cantidadMiembros = !configuracion.incrementarCantidadMiembros ?
            cantidadMiembros : admin.firestore.FieldValue.increment(cantidadMiembros)
        }

        if (equipoActualizado.cantidadMiembrosPorRol && !configuracion.incrementarCantidadMiembrosPorRol) {
            equipoActualizadoVerificado.cantidadMiembrosPorRol = equipoActualizado.cantidadMiembrosPorRol
        } else if (equipoActualizado.cantidadMiembrosPorRol && configuracion.incrementarCantidadMiembrosPorRol) {
            const cantidadMiembrosPorRolPropietario = equipoActualizado.cantidadMiembrosPorRol.propietario
            const cantidadMiembrosPorRolEditor = equipoActualizado.cantidadMiembrosPorRol.editor
            const cantidadMiembrosPorRolVisualizador = equipoActualizado.cantidadMiembrosPorRol.visualizador
            const cantidadMiembrosPorRolEstudiante = equipoActualizado.cantidadMiembrosPorRol.estudiante
            
            if (cantidadMiembrosPorRolPropietario) {
                equipoActualizadoVerificado = Object.assign(equipoActualizadoVerificado, { 
                    'cantidadMiembrosPorRol.propietario': admin.firestore.FieldValue.increment(cantidadMiembrosPorRolPropietario)
                })
            }

            if (cantidadMiembrosPorRolEditor) {
                equipoActualizadoVerificado = Object.assign(equipoActualizadoVerificado, { 
                    'cantidadMiembrosPorRol.editor': admin.firestore.FieldValue.increment(cantidadMiembrosPorRolEditor)
                })
            }

            if (cantidadMiembrosPorRolVisualizador) {
                equipoActualizadoVerificado = Object.assign(equipoActualizadoVerificado, { 
                    'cantidadMiembrosPorRol.visualizador': admin.firestore.FieldValue.increment(cantidadMiembrosPorRolVisualizador)
                })
            }

            if (cantidadMiembrosPorRolEstudiante) {
                equipoActualizadoVerificado = Object.assign(equipoActualizadoVerificado, { 
                    'cantidadMiembrosPorRol.estudiante': admin.firestore.FieldValue.increment(cantidadMiembrosPorRolEstudiante)
                })
            }
        }

        if (equipoActualizado.cantidadProyectos) {
            const cantidadProyectos = equipoActualizado.cantidadProyectos
            equipoActualizadoVerificado.cantidadProyectos = !configuracion.incrementarCantidadProyectos ?
            cantidadProyectos : admin.firestore.FieldValue.increment(cantidadProyectos)
        }
        
        equipoActualizado.cantidadContenidos !== undefined ? equipoActualizadoVerificado.cantidadContenidos = equipoActualizado.cantidadContenidos : ''
        equipoActualizado.cantidadContenidosPorTipo !== undefined ? equipoActualizadoVerificado.cantidadContenidosPorTipo = equipoActualizado.cantidadContenidosPorTipo : ''
    }
    
    return { equipoActualizadoVerificado }
}
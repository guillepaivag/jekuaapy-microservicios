export const constructorEquipoActualizacion = (equipoActualizado, solicitante) => {
    const equipoActualizadoVerificado = {}
    
    if (solicitante.tipo === 'usuario') {
        equipoActualizado.responsable ? equipoActualizadoVerificado.responsable = equipoActualizado.responsable : ''
        equipoActualizado.codigo ? equipoActualizadoVerificado.codigo = equipoActualizado.codigo : ''
        equipoActualizado.nombre ? equipoActualizadoVerificado.nombre = equipoActualizado.nombre : ''
        equipoActualizado.descripcion ? equipoActualizadoVerificado.descripcion = equipoActualizado.descripcion : ''
    } else {
        equipoActualizado.cantidadMiembros !== undefined ? equipoActualizadoVerificado.cantidadMiembros = equipoActualizado.cantidadMiembros : ''
        equipoActualizado.cantidadMiembrosPorRol !== undefined ? equipoActualizadoVerificado.cantidadMiembrosPorRol = equipoActualizado.cantidadMiembrosPorRol : ''
        equipoActualizado.cantidadProyectos !== undefined ? equipoActualizadoVerificado.cantidadProyectos = equipoActualizado.cantidadProyectos : ''
        equipoActualizado.cantidadContenidos !== undefined ? equipoActualizadoVerificado.cantidadContenidos = equipoActualizado.cantidadContenidos : ''
        equipoActualizado.cantidadContenidosPorTipo !== undefined ? equipoActualizadoVerificado.cantidadContenidosPorTipo = equipoActualizado.cantidadContenidosPorTipo : ''
    }
    
    return { equipoActualizadoVerificado }
}
export const constructorProyectoActualizacion = (proyectoActualizado) => {
    const proyectoActualizadoVerificado = {}
    
    proyectoActualizado.codigo ? proyectoActualizadoVerificado.codigo = proyectoActualizado.codigo : ''
    proyectoActualizado.nombre ? proyectoActualizadoVerificado.nombre = proyectoActualizado.nombre : ''

    return { proyectoActualizadoVerificado }
}
export const constructorProyectoActualizacion = (solicitante, proyectoActualizado) => {
    const proyectoActualizadoVerificado = {}

    if (solicitante.tipo === 'usuario') {
        proyectoActualizado.codigo ? proyectoActualizadoVerificado.codigo = proyectoActualizado.codigo : ''
        proyectoActualizado.nombre ? proyectoActualizadoVerificado.nombre = proyectoActualizado.nombre : ''
    } else {
        proyectoActualizado.cantidadMiembros ? proyectoActualizadoVerificado.cantidadMiembros = proyectoActualizado.cantidadMiembros : ''
        proyectoActualizado.cantidadElementos ? proyectoActualizadoVerificado.cantidadElementos = proyectoActualizado.cantidadElementos : ''
        proyectoActualizado.cantidadesPorTipoDeElemento ? proyectoActualizadoVerificado.cantidadesPorTipoDeElemento = proyectoActualizado.cantidadesPorTipoDeElemento : ''
    }
    
    return { proyectoActualizadoVerificado }
}
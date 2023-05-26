import admin from "../../../../firebase-service/firebase-admin.js"

export const constructorProyectoActualizacion = (solicitante, proyectoActualizado, configuracion) => {
    const proyectoActualizadoVerificado = {}

    if (solicitante.tipo === 'usuario') {
        proyectoActualizado.codigo ? proyectoActualizadoVerificado.codigo = proyectoActualizado.codigo : ''
        proyectoActualizado.nombre ? proyectoActualizadoVerificado.nombre = proyectoActualizado.nombre : ''
    } else {
        if (proyectoActualizado.cantidadMiembros) {
            const cantidadMiembros = proyectoActualizado.cantidadMiembros
            proyectoActualizadoVerificado.cantidadMiembros = !configuracion.incrementarCantidadMiembros ? 
            cantidadMiembros : admin.firestore.FieldValue.increment(cantidadMiembros)
        }
        proyectoActualizado.cantidadElementos ? proyectoActualizadoVerificado.cantidadElementos = proyectoActualizado.cantidadElementos : ''
        proyectoActualizado.cantidadesPorTipoDeElemento ? proyectoActualizadoVerificado.cantidadesPorTipoDeElemento = proyectoActualizado.cantidadesPorTipoDeElemento : ''
    }
    
    return { proyectoActualizadoVerificado }
}
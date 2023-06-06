import admin from "../../../../firebase-service/firebase-admin.js"

export const constructorLecturaActualizacion = (solicitante, lecturaActualizado, configuracion) => {
    const lecturaActualizadoVerificado = {}

    if (solicitante.tipo === 'usuario') {
        lecturaActualizado.codigo ? lecturaActualizadoVerificado.codigo = lecturaActualizado.codigo : ''
        lecturaActualizado.nombre ? lecturaActualizadoVerificado.nombre = lecturaActualizado.nombre : ''
    } else {
        if (lecturaActualizado.cantidadMiembros) {
            const cantidadMiembros = lecturaActualizado.cantidadMiembros
            lecturaActualizadoVerificado.cantidadMiembros = !configuracion.incrementarCantidadMiembros ? 
            cantidadMiembros : admin.firestore.FieldValue.increment(cantidadMiembros)
        }
        lecturaActualizado.cantidadElementos ? lecturaActualizadoVerificado.cantidadElementos = lecturaActualizado.cantidadElementos : ''
        lecturaActualizado.cantidadesPorTipoDeElemento ? lecturaActualizadoVerificado.cantidadesPorTipoDeElemento = lecturaActualizado.cantidadesPorTipoDeElemento : ''
    }
    
    return { lecturaActualizadoVerificado }
}
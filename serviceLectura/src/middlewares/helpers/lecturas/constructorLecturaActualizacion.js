import admin from "../../../../firebase-service/firebase-admin.js"

export const constructorLecturaActualizacion = (solicitante, lecturaActualizado, configuracion) => {
    const lecturaActualizadoVerificado = {}

    if (solicitante.tipo === 'usuario') {
        lecturaActualizado.nombre ? lecturaActualizadoVerificado.nombre = lecturaActualizado.nombre : ''
    }
    
    return { lecturaActualizadoVerificado }
}
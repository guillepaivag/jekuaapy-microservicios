export const constructorEquipoActualizacion = (equipoActualizado) => {
    const equipoActualizadoVerificado = {}
    
    equipoActualizado.codigo ? equipoActualizadoVerificado.codigo = equipoActualizado.codigo : ''
    equipoActualizado.nombre ? equipoActualizadoVerificado.nombre = equipoActualizado.nombre : ''
    equipoActualizado.descripcion ? equipoActualizadoVerificado.descripcion = equipoActualizado.descripcion : ''

    return { equipoActualizadoVerificado }
}
export const constructorMiembroEquipoCreacion = (responsable, fechaCreacion) => {
    const miembroNuevoVerificado = {
        uid: responsable,
        uidEquipo: '',
        roles: ['propietario'],
        estado: 'activo',
        fechaCreacion: fechaCreacion,
    }

    return { miembroNuevoVerificado }
}
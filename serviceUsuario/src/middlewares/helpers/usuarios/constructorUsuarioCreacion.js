export const constructorUsuarioCreacion = (usuarioNuevo) => {
    const datosUsuarioNuevo = {
        correo: usuarioNuevo.correo, 
        nombreUsuario: usuarioNuevo.nombreUsuario, 
        nombreCompleto: usuarioNuevo.nombreCompleto, 
        fechaNacimiento: null, 
        rol: 'estudiante', 
        fotoPerfil: 'default', 
        fotoPortada: 'default', 
        estado: 'activo', 
        authenticationEliminado: null,
    }

    const datosInformacionUsuarioNuevo = {
        descripcion: '',
        especializaciones: '',
        intereses: '',
        rolDescriptivo: 'Estudiante de Jekuaapy',
        redesSociales: [],
    }

    return { datosUsuarioNuevo, datosInformacionUsuarioNuevo }
}
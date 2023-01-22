export const constructorUsuarioCreacion = (usuarioNuevo) => {
    const datosUsuarioNuevo = {
        correo: usuarioNuevo.correo, 
        nombreUsuario: usuarioNuevo.nombreUsuario, 
        nombreCompleto: usuarioNuevo.nombreCompleto, 
        fechaNacimiento: null, 
        rol: 'estudiante', 
        fotoPerfil: 'https://firebasestorage.googleapis.com/v0/b/jekuaapydev2.appspot.com/o/WhatsApp%20Image%202022-12-11%20at%2018.02.48.jpeg?alt=media&token=e6d0720e-cba4-4d11-836b-cfdef729eeef', 
        fotoPortada: 'https://firebasestorage.googleapis.com/v0/b/jekuaapydev2.appspot.com/o/WhatsApp%20Image%202022-12-11%20at%2018.02.48.jpeg?alt=media&token=e6d0720e-cba4-4d11-836b-cfdef729eeef', 
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
import Usuario from '../models/Usuario.js'

// Casos de uso para el manejo de usuarios.
// Acá va la lógica de negocio agnóstica a los frameworks,
// recibiendo como parámetros las dependencias necesarias.

class UsuariosUseCase {

  constructor (usuariosRepository) {
    this.usuariosRepository = usuariosRepository
  }

  async obtenerPorUID (uid = '') {
    return await this.usuariosRepository.obtenerPorUID(uid)
  }

  async obtenerPorCorreo (correo = '') {
    return await this.usuariosRepository.obtenerPorCorreo(correo)
  }

  async obtenerPorNombreUsuario (nombreUsuario = '') {
    return await this.usuariosRepository.obtenerPorNombreUsuario(nombreUsuario)
  }

  async crear (usuarioNuevo = Usuario.params) {

    const { uid, correo, nombreUsuario, fechaNacimiento, rol, 
      fotoPerfil, eliminado, datosAuthenticationEliminados, } = usuarioNuevo 

    const usuario = new Usuario({
      uid,
      correo,
      nombreUsuario,
      fechaNacimiento,
      rol,
      fotoPerfil,
      eliminado,
      datosAuthenticationEliminados,
    })

    await this.usuariosRepository.crear(usuario)

    return usuario

  }

  async actualizar (uid = '', datosActualizados = Usuario.params) {

    const { uid, correo, nombreUsuario, fechaNacimiento, rol, 
      fotoPerfil, eliminado, datosAuthenticationEliminados, } = datosActualizados 

    await this.usuariosRepository.actualizar(uid, {
      uid,
      correo,
      nombreUsuario,
      fechaNacimiento,
      rol,
      fotoPerfil,
      eliminado,
      datosAuthenticationEliminados,
    })

  }

  async eliminar (uid = '', datosAuthenticationEliminados = null) {
    await this.usuariosRepository.eliminar(uid, datosAuthenticationEliminados)
  }

}

export default UsuariosUseCase
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

    const { uid, correo, nombreUsuario, nombreCompleto, fechaNacimiento, rol, 
      fotoPerfil, fotoPortada, estado, authenticationEliminado, } = usuarioNuevo 

    const usuario = new Usuario({
      uid,
      correo,
      nombreUsuario,
      nombreCompleto,
      fechaNacimiento,
      rol,
      fotoPerfil,
      fotoPortada,
      estado,
      authenticationEliminado,
    })

    await this.usuariosRepository.crear(usuario)

    return usuario

  }

  async actualizar (uid = '', datosActualizados = Usuario.params) {
    await this.usuariosRepository.actualizar(uid, datosActualizados)
  }

  async eliminar (uid = '', authenticationEliminado = null) {
    await this.usuariosRepository.eliminar(uid, authenticationEliminado)
  }

}

export default UsuariosUseCase
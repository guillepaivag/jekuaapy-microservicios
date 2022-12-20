import Usuario from '../models/Usuario.js'

// Casos de uso para el manejo de usuarios.
// Acá va la lógica de negocio agnóstica a los frameworks,
// recibiendo como parámetros las dependencias necesarias.

class UsuariosUseCase {

  constructor (usuariosRepository) {
    this.usuariosRepository = usuariosRepository
  }

  async obtenerUsuario (uid = '') {
    return await this.usuariosRepository.obtener(uid)
  }

  async crearUsuario (data = {}) {

    const usuario = new Usuario({
      uid: data.uid,
      correo: data.correo,
      nombreUsuario: data.nombreUsuario,
      fechaNacimiento: data.fechaNacimiento,
      rol: data.rol,
      fotoPerfil: data.fotoPerfil,
      eliminado: data.eliminado,
      datosAuthenticationEliminados: data.datosAuthenticationEliminados,
    })

    await this.usuariosRepository.crear(usuario)

    return usuario

  }

  async actualizarUsuario (uid = '', datosActualizados = {}) {
    
  }

  async eliminarUsuario (uid = '') {
    await this.usuariosRepository.eliminar(uid)
  }

}

export default UsuariosUseCase
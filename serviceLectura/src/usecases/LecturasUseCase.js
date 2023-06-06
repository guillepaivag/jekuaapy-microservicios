import Lectura from '../models/Lectura.js'

// Casos de uso para el manejo de lecturas.
// Acá va la lógica de negocio agnóstica a los frameworks,
// recibiendo como parámetros las dependencias necesarias.

class LecturasUseCase {

  constructor (lecturasRepository) {
    this.lecturasRepository = lecturasRepository
  }

  async obtenerPorUID (uidEquipo = '', uid = '') {
    return await this.lecturasRepository.obtenerPorUID(uidEquipo, uid)
  }

  async crear (lecturaNuevo = Lectura.params) {

    const { uid, uidEquipo, uidCreador, nombre, estado, fechaCreacion, fechaEliminacion, } = lecturaNuevo 

    const lectura = new Lectura({
        uid,
        uidEquipo,
        uidCreador,
        nombre,
        estado,
        fechaCreacion,
        fechaEliminacion,
    })

    await this.lecturasRepository.crear(lectura)

    return lectura

  }

  async actualizar (uidEquipo = '', uid = '', datosActualizados = Lectura.params) {
    await this.lecturasRepository.actualizar(uidEquipo, uid, datosActualizados)
  }

  async eliminar (uidEquipo = '', uid = '') {
    await this.lecturasRepository.eliminar(uidEquipo, uid)
  }

}

export default LecturasUseCase
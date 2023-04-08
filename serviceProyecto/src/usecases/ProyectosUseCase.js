import Proyecto from '../models/Proyecto.js'

// Casos de uso para el manejo de proyectos.
// Acá va la lógica de negocio agnóstica a los frameworks,
// recibiendo como parámetros las dependencias necesarias.

class ProyectosUseCase {

  constructor (proyectosRepository) {
    this.proyectosRepository = proyectosRepository
  }

  async obtenerPorUID (uidEquipo = '', uid = '') {
    return await this.proyectosRepository.obtenerPorUID(uidEquipo, uid)
  }

  async obtenerPorCodigoProyecto (uidEquipo = '', codigo = '') {
    return await this.proyectosRepository.obtenerPorCodigoProyecto(uidEquipo, codigo)
  }

  async crear (proyectoNuevo = Proyecto.params) {

    const { uid, uidEquipo, tipoProyecto, nombre, codigo, fotoPerfil, fotoPortada, cantidadMiembros,
        cantidadElementos, cantidadesPorTipoDeElemento, estado, fechaCreacion, fechaEliminacion, } = proyectoNuevo 

    const proyecto = new Proyecto({
        uid,
        uidEquipo,
        tipoProyecto,
        nombre,
        codigo,
        fotoPerfil,
        fotoPortada,
        cantidadMiembros,
        cantidadElementos,
        cantidadesPorTipoDeElemento,
        estado,
        fechaCreacion,
        fechaEliminacion,
    })

    await this.proyectosRepository.crear(proyecto)

    return proyecto

  }

  async actualizar (uidEquipo = '', uid = '', datosActualizados = Proyecto.params) {
    await this.proyectosRepository.actualizar(uidEquipo, uid, datosActualizados)
  }

  async eliminar (uidEquipo = '', uid = '') {
    await this.proyectosRepository.eliminar(uidEquipo, uid)
  }

}

export default ProyectosUseCase
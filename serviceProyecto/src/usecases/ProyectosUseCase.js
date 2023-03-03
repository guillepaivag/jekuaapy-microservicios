import Proyecto from '../models/Proyecto.js'

// Casos de uso para el manejo de proyectos.
// Acá va la lógica de negocio agnóstica a los frameworks,
// recibiendo como parámetros las dependencias necesarias.

class ProyectosUseCase {

  constructor (proyectosRepository) {
    this.proyectosRepository = proyectosRepository
  }

  async obtenerPorUID (uid = '') {
    return await this.proyectosRepository.obtenerPorUID(uid)
  }

  async obtenerPorCodigoProyecto (codigo = '') {
    return await this.proyectosRepository.obtenerPorCodigoProyecto(codigo)
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

  async actualizar (uid = '', datosActualizados = Proyecto.params) {
    await this.proyectosRepository.actualizar(uid, datosActualizados)
  }

  async eliminar (uid = '') {
    await this.proyectosRepository.eliminar(uid)
  }

}

export default ProyectosUseCase
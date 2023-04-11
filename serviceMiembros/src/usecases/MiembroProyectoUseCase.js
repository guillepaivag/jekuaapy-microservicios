import MiembroProyecto from "../models/MiembroProyecto.js"

class MiembroProyectoUseCase {

    constructor(miembroProyectoRepository) {
        this.miembroProyectoRepository = miembroProyectoRepository
    }

    async crear(uidEquipo = '', uidProyecto = '', miembroProyecto = MiembroProyecto.params) {
        return await this.miembroProyectoRepository.crear(uidEquipo, uidProyecto, miembroProyecto)
    }
    
    async obtenerPorUID(uidEquipo = '', uidProyecto = '', uidMiembro = '') {
        return await this.miembroProyectoRepository.obtenerPorUID(uidEquipo, uidProyecto, uidMiembro)
    }

    async eliminar(uidEquipo = '', uidProyecto = '', uidMiembro = '', fechaEliminacion = null) {
       await this.miembroProyectoRepository.eliminar(uidEquipo, uidProyecto, uidMiembro, fechaEliminacion)
    }

    async eliminarMimebroProyectoDeTodosSusProyectos (uidEquipo = '', uidMiembro = '', fechaEliminacion = null) {
        return await this.miembroProyectoRepository.eliminarMimebroProyectoDeTodosSusProyectos(uidEquipo, uidMiembro, fechaEliminacion)
    }
}

export default MiembroProyectoUseCase
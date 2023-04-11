import MiembroEquipo from "../models/MiembroEquipo.js"

class MiembroEquipoUseCase {

    constructor(miembroEquipoRepository) {
        this.miembroEquipoRepository = miembroEquipoRepository
    }

    async crear(uidEquipo = '', miembroEquipo = MiembroEquipo.params) {
        return await this.miembroEquipoRepository.crear(uidEquipo, miembroEquipo)
    }
    
    async obtenerPorUID(uidEquipo = '', uidMiembro = '') {
        return await this.miembroEquipoRepository.obtenerPorUID(uidEquipo, uidMiembro)
    }

    async actualizar(uidEquipo = '', uidMiembro = '', datosActualizados = MiembroEquipo.params) {
        await this.miembroEquipoRepository.actualizar(uidEquipo, uidMiembro, datosActualizados)
    }

    async eliminar(uidEquipo = '', uidMiembro = '', fechaEliminacion = null) {
       await this.miembroEquipoRepository.eliminar(uidEquipo, uidMiembro, fechaEliminacion)
    }

}

export default MiembroEquipoUseCase
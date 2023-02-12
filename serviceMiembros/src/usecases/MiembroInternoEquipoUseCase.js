import MiembroInternoEquipo from "../models/MiembroInternoEquipo.js"

class MiembroInternoEquipoUseCase {

    constructor(miembroInternoRepository) {
        this.miembroInternoRepository = miembroInternoRepository
    }

    async crear(uidEquipo = '', miembroInterno = MiembroInternoEquipo.params) {
        return await this.miembroInternoRepository.crear(uidEquipo, miembroInterno)
    }
    
    async obtenerPorUID(uidEquipo = '', uidMiembro = '') {
        return await this.miembroInternoRepository.obtenerPorUID(uidEquipo, uidMiembro)
    }

    async actualizar(uidEquipo = '', uidMiembro = '', datosActualizados = MiembroInternoEquipo.params) {
        await this.miembroInternoRepository.actualizar(uidEquipo, uidMiembro, datosActualizados)
    }

    async eliminar(uidEquipo = '', uidMiembro = '') {
       await this.miembroInternoRepository.eliminar(uidEquipo, uidMiembro)
    }

}

export default MiembroInternoEquipoUseCase
import RegistroMiembroInternoEquipo from "../models/RegistroMiembroInternoEquipo.js"

class RegistroMiembroInternoEquipoUseCase {

    constructor(registroMiembroInternoEquipoRepository) {
        this.registroMiembroInternoEquipoRepository = registroMiembroInternoEquipoRepository
    }

    async crear(registroMiembroInternoEquipo = RegistroMiembroInternoEquipo.params) {
        return await this.registroMiembroInternoEquipoRepository.crear(registroMiembroInternoEquipo)
    }
    
    async obtenerPorUID(uidEquipo = '') {
        return await this.registroMiembroInternoEquipoRepository.obtenerPorUID(uidEquipo)
    }

    async actualizar(uidEquipo = '', datosActualizados = RegistroMiembroInternoEquipo.params) {
        await this.registroMiembroInternoEquipoRepository.actualizar(uidEquipo, datosActualizados)
    }

}

export default RegistroMiembroInternoEquipoUseCase
import Equipo from "../models/Equipo.js"

class EquipoUseCase {

    constructor(equipoRepository) {
        this.equipoRepository = equipoRepository
    }

    async crear(equipo = Equipo.params) {
        return await this.equipoRepository.crear(equipo)
    }

    async obtenerPorUID(uid = '') {
        return await this.equipoRepository.obtenerPorUID(uid)
    }

    async obtenerPorCodigo(codigo = '') {
        return await this.equipoRepository.obtenerPorCodigo(codigo)
    }

    async actualizar(uid = '', datosActualizados = {}) {
        await this.equipoRepository.actualizar(uid, datosActualizados)
    }

    async eliminar(uid = '', fechaEliminado) {
        await this.equipoRepository.eliminar(uid, fechaEliminado)
    }

}

export default EquipoUseCase
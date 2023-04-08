import Equipo from "../models/Equipo.js"

class EquipoUseCase {

    constructor(equipoRepository) {
        this.equipoRepository = equipoRepository
    }

    async crear(equipoNuevo = Equipo.params) {
        const equipo = await this.equipoRepository.crear(equipoNuevo)
        return Equipo.structureData(equipo)
    }

    async obtenerPorUID(uid = '') {
        const equipo = await this.equipoRepository.obtenerPorUID(uid)
        return Equipo.structureData(equipo)
    }

    async obtenerPorCodigo(codigo = '') {
        const equipo = await this.equipoRepository.obtenerPorCodigo(codigo)
        return Equipo.structureData(equipo)
    }

    async actualizar(uid = '', datosActualizados = {}) {
        await this.equipoRepository.actualizar(uid, datosActualizados)
    }

    async eliminar(uid = '', fechaEliminado) {
        await this.equipoRepository.eliminar(uid, fechaEliminado)
    }

}

export default EquipoUseCase
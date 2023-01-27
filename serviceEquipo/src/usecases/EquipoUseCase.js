import Equipo from "../models/Equipo.js";

// recibiendo como parámetros las dependencias necesarias.

class EquipoUseCase {

    constructor(equipoRepository) {
        this.equipoRepository = equipoRepository
    }

    async obtenerTodos() {
        return await this.equipoRepository.obtenerTodos();
    }

    async obtenerPorUID(uid) {
        return await this.equipoRepository.obtenerPorUID(uid);
    }

    async obtenerPorCodigo(codigo) {
        return await this.equipoRepository.obtenerPorCodigo(codigo);
    }

    async crear(data = Equipo.params) {
        return await this.equipoRepository.crear(data)
    }

    async actualizar(uid, datosActualizados = {}) {
        const equipo = await this.equipoRepository.actualizar(uid, datosActualizados);
        return equipo;
    }

    async eliminar(uid) {
       await this.equipoRepository.eliminar(uid);
    }

}

export default EquipoUseCase
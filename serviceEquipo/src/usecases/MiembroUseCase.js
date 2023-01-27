import Miembro from "../models/Miembro.js";

// recibiendo como parámetros las dependencias necesarias.

class MiembroUseCase {

    constructor(miembroRepository) {
        this.miembroRepository = miembroRepository
    }

    async obtenerTodos() {
        return await this.miembroRepository.obtenerTodos();
    }

    async obtenerPorUID(uid) {
        return await this.miembroRepository.obtenerPorUID(uid);
    }

    async obtenerPorEquipoYUsuario(equipo, usuario) {
        return await this.miembroRepository.obtenerPorEquipoYUsuario(equipo, usuario);
    }

    async crear(data = Miembro.params) {
        return await this.miembroRepository.crear(data)
    }

    async actualizar(uid, datosActualizados = {}) {
        const miembro = await this.miembroRepository.actualizar(uid, datosActualizados);
        return miembro;
    }

    async eliminar(uid) {
       await this.miembroRepository.eliminar(uid);
    }

}

export default MiembroUseCase
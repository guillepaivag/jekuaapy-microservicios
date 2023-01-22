// Casos de uso para el manejo de usuarios.
// Acá va la lógica de negocio agnóstica a los frameworks,

import InformacionUsuario from "../models/InformacionUsuario.js";

// recibiendo como parámetros las dependencias necesarias.

class InformacionUsuariosUseCase {

    constructor(informacionUsuarioRepository) {
        this.informacionUsuarioRepository = informacionUsuarioRepository
    }

    async obtenerPorUID(uid) {
        return await this.informacionUsuarioRepository.obtenerPorUID(uid);
    }

    async obtenerPorNombreUsuario(nombreUsuario) {
        return await this.informacionUsuarioRepository.obtenerPorNombreUsuario(nombreUsuario);
    }

    async obtenerPorCorreo(correo) {
        return await this.informacionUsuarioRepository.obtenerPorCorreo(correo);
    }

    async crear(uid, data = InformacionUsuario.params) {

        const informacionUsuario = new InformacionUsuario({
            uid: uid,
            descripcion: data.descripcion,
            especializaciones: data.especializaciones,
            intereses: data.intereses,
            rolDescriptivo: data.rolDescriptivo,
            redesSociales: data.redesSociales,
        });

        await this.informacionUsuarioRepository.crear(informacionUsuario)

        return informacionUsuario;

    }

    async actualizar(uid, datosActualizados = InformacionUsuario.params) {
        const informacionUsuario = await this.informacionUsuarioRepository.actualizar(uid, datosActualizados);
        return informacionUsuario;
    }

    async eliminar(uid) {
       await this.informacionUsuarioRepository.eliminar(uid);
    }

}

export default InformacionUsuariosUseCase
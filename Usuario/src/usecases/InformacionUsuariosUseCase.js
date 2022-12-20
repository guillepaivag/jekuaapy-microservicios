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

    async obtenerPorNombre(nombreUsuario) {
        return await this.informacionUsuarioRepository.obtenerPorNombre(nombreUsuario);
    }

    async obtenerPorCorreo(correo) {
        return await this.informacionUsuarioRepository.obtenerPorCorreo(correo);
    }

    async crearInformacionUsuario(uid, data = {}) {

        const informacionUsuario = new InformacionUsuario({
            uid: uid,
            descripcion: data.descripcion,
            especializaciones: data.especializaciones,
            intereses: data.intereses,
            rolDescriptivo: data.rolDescriptivo,
            redesSociales: data.redesSociales,
        });

        await this.informacionUsuarioRepository.crearInformacionUsuario(informacionUsuario)

        return informacionUsuario;

    }

    async actualizarInformacionUsuario(uid, datosActualizados) {
        const informacionUsuario = await this.informacionUsuarioRepository.actualizarInformacionUsuario(uid, datosActualizados);
        return informacionUsuario;
    }

    async eliminarInformacionUsuario(uid) {
       await this.informacionUsuarioRepository.eliminarInformacionUsuario(uid);
    }

}

export default InformacionUsuariosUseCase
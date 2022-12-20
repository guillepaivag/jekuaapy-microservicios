// Casos de uso para el manejo de usuarios.
// Acá va la lógica de negocio agnóstica a los frameworks,

import InformacionUsuario from "../models/InformacionUsuario.js";

// recibiendo como parámetros las dependencias necesarias.

class InformacionUsuariosUseCase {

    constructor(informacionUsuarioRepository) {
        this.informacionUsuarioRepository = informacionUsuarioRepository
    }

    async obtenerInformacionUsuarioPorUID(uid) {
        return await this.informacionUsuarioRepository.obtenerInformacionUsuarioPorUID(uid);
    }

    async obtenerInformacionUsuarioPorNombre(nombreUsuario) {
        return await this.informacionUsuarioRepository.obtenerInformacionUsuarioPorNombre(nombreUsuario);
    }

    async obtenerInformacionUsuarioPorCorreo(correo) {
        return await this.informacionUsuarioRepository.obtenerInformacionUsuarioPorCorreo(correo);
    }

    async crearInformacionUsuario(data = {}) {

        const informacionUsuario = new InformacionUsuario({
            uid: data.uid,
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
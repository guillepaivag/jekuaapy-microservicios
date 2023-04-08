import Correo from "../models/Correo.js"

class CorreosUseCases {

    constructor(correoRepository) {
        this.correoRepository = correoRepository
    }

    async enviarVerificacionDeCorreo(correo = Correo.params) {
        return await this.correoRepository.enviarCorreo({
            correoEmisor: process.env.CORREO_EMISOR_VERIFICACION_CUENTA,
            correoReceptor: correo.correoReceptor,
            asunto: `Jekuaapy - Verificación de correo ${correo.correoReceptor}`,
            contenido: correo.contenido
        })
    }

    async enviarAvisoNuevoMiembroEquipo(correo = Correo.params) {
        return await this.correoRepository.enviarCorreo({
            correoEmisor: process.env.CORREO_EMISOR_ORGANIZACION_MIEMBRO_EQUIPO,
            correoReceptor: correo.correoReceptor,
            asunto: correo.asunto,
            contenido: correo.contenido
        })
    }

}

export default CorreosUseCases
import Correo from "../models/Correo.js"

class CorreosUseCases {

    constructor(correoRepository) {
        this.correoRepository = correoRepository
    }

    async enviarVerificacionDeCorreo(correo = Correo.params) {
        return await this.correoRepository.enviarVerificacionDeCorreo({
            correoEmisor: process.env.CORREO_EMISOR_VERIFICACION_CUENTA,
            correoReceptor: correo.correoReceptor,
            asunto: `Jekuaapy - Verificación de correo ${correo.correoReceptor}`,
            contenido: correo.contenido
        })
    }

}

export default CorreosUseCases
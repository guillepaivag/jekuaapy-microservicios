
// instanciamos el repositorio y el use case
import Respuesta from "../models/Respuestas/Respuesta.js"
import RespuestaError from "../models/Respuestas/RespuestaError.js"
import FirestoreInformacionUsuarioRepository from "../repositories/FirestoreInformacionUsuarioRepository.js"
import InformacionUsuariosUseCase from "../usecases/InformacionUsuariosUseCase.js"
const informacionUsuariosUseCase = new InformacionUsuariosUseCase(new FirestoreInformacionUsuarioRepository())

// Manejo de errores
import { errorHandler } from "../utils/error-handler.js"

export const obtener = async (req, res) => {
    try {
        const { params } = req
        const { tipo, valor } = params

        let informacionUsuario = null

        if (tipo === 'uid') informacionUsuario = await informacionUsuariosUseCase.obtenerPorUID(valor)
        else if (tipo === 'correo') informacionUsuario = await informacionUsuariosUseCase.obtenerPorCorreo(valor)
        else if (tipo === 'nombreUsuario') informacionUsuario = await informacionUsuariosUseCase.obtenerPorNombreUsuario(valor)
        else throw new TypeError('No hay datos para buscar el usuario.')

        if (!informacionUsuario) {
            throw new RespuestaError({
                estado: 400,
                mensajeCliente: 'no_existe_usuario',
                mensajeServidor: 'No existe el usuario.'
            })
        }

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'exito',
            resultado: informacionUsuario
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    } catch (error) {
        console.log('Error - obtenerMiUsuario: ', error)

        // Manejo de errores
        const respuestaManejada = errorHandler(error)
        return res.status(respuestaManejada.estado).json(respuestaManejada.getRespuesta())

    }

}

export const actualizar = async (req, res) => {
    try {
        const { params, body } = req
        const { uid } = params

        let informacionUsuario = await informacionUsuariosUseCase.actualizar(uid, body)

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'exito',
            resultado: informacionUsuario
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    } catch (error) {
        console.log('Error - obtenerMiUsuario: ', error)

        // Manejo de errores
        const respuestaManejada = errorHandler(error)
        return res.status(respuestaManejada.estado).json(respuestaManejada.getRespuesta())

    }

}
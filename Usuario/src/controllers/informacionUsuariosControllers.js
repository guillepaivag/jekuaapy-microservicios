
// instanciamos el repositorio y el use case
import Respuesta from "../models/Respuesta.js"
import RespuestaError from "../models/RespuestaError.js"
import FirestoreInformacionUsuarioRepository from "../repositories/FirestoreInformacionUsuarioRepository.js"
import InformacionUsuariosUseCase from "../usecases/InformacionUsuariosUseCase.js"
const informacionUsuariosUseCase = new InformacionUsuariosUseCase(new FirestoreInformacionUsuarioRepository())

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

        const respuesta =  new Respuesta({
            estado: 500,
            mensajeCliente: 'error_servidor',
            mensajeServidor: 'error en el servidor',
            resultado: null
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

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

        const respuesta =  new Respuesta({
            estado: 500,
            mensajeCliente: 'error_servidor',
            mensajeServidor: 'error en el servidor',
            resultado: null
        })
        
        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    }

}

export default {
    obtener,
    actualizar,
}
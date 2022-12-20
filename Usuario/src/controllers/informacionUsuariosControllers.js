
// instanciamos el repositorio y el use case
import Respuesta from "../models/Respuesta.js"
import RespuestaError from "../models/RespuestaError.js"
import FirestoreInformacionUsuarioRepository from "../repositories/FirestoreInformacionUsuarioRepository.js"
import InformacionUsuariosUseCase from "../usecases/InformacionUsuariosUseCase.js"
const informacionUsuariosUseCase = new InformacionUsuariosUseCase(new FirestoreInformacionUsuarioRepository())

controllerInformacionUsuario = {}

controllerInformacionUsuario.obtenerInformacionUsuario = async (req, res) => {
    try {
        const { datos, params } = req
        const { tipo, valor } = params

        let informacionUsuario = null

        if (tipo === 'nombreUsuario') {
            informacionUsuario = informacionUsuariosUseCase.obtenerInformacionUsuarioPorNombre(valor)

            if (!informacionUsuario) {
                throw new RespuestaError({
                    estado: 400,
                    mensajeCliente: 'no_existe_usuario',
                    mensajeServidor: 'No existe el usuario.'
                })
            }

        } else if (tipo === 'correo') {
            
            const informacionUsuario = informacionUsuariosUseCase.obtenerInformacionUsuarioPorCorreo(valor)

            if (!informacionUsuario) {
                throw new RespuestaError({
                    estado: 400,
                    mensajeCliente: 'no_existe_usuario',
                    mensajeServidor: 'No existe el usuario.'
                })
            }

        } else if (tipo === 'uid') {
            const informacionUsuario = informacionUsuariosUseCase.obtenerInformacionUsuarioPorUID(valor)

            if (!informacionUsuario) {
                throw new RespuestaError({
                    estado: 400,
                    mensajeCliente: 'no_existe_usuario',
                    mensajeServidor: 'No existe el usuario.'
                })
            }

        } else {
            throw new TypeError('No hay datos para buscar el usuario.')
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

export default controllerInformacionUsuario
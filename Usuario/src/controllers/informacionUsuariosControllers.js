
// instanciamos el repositorio y el use case
import Respuesta from "../models/Respuesta.js"
import RespuestaError from "../models/RespuestaError.js"
import FirestoreInformacionUsuarioRepository from "../repositories/FirestoreInformacionUsuarioRepository.js"
import InformacionUsuariosUseCase from "../usecases/InformacionUsuariosUseCase.js"
const informacionUsuariosUseCase = new InformacionUsuariosUseCase(new FirestoreInformacionUsuarioRepository())

controllerInformacionUsuario = {}

controllerInformacionUsuario.obtener = async (req, res) => {
    try {
        const { params } = req
        const { tipo, valor } = params

        let informacionUsuario = null

        if (tipo === 'nombreUsuario') {
            informacionUsuario = informacionUsuariosUseCase.obtenerPorNombreUsuario(valor)

            if (!informacionUsuario) {
                throw new RespuestaError({
                    estado: 400,
                    mensajeCliente: 'no_existe_usuario',
                    mensajeServidor: 'No existe el usuario.'
                })
            }

        } else if (tipo === 'correo') {
            
            const informacionUsuario = informacionUsuariosUseCase.obtenerPorCorreo(valor)

            if (!informacionUsuario) {
                throw new RespuestaError({
                    estado: 400,
                    mensajeCliente: 'no_existe_usuario',
                    mensajeServidor: 'No existe el usuario.'
                })
            }

        } else if (tipo === 'uid') {
            const informacionUsuario = informacionUsuariosUseCase.obtenerPorUID(valor)

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


controllerInformacionUsuario.crearInformacionUsuario = async (req, res) => {
    try {
        const { params, body } = req
        const { uid } = params

        let informacionUsuario = informacionUsuariosUseCase.crearInformacionUsuario(uid, body)

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

controllerInformacionUsuario.actualizar = async (req, res) => {
    try {
        const { params, body } = req
        const { uid } = params

        let informacionUsuario = informacionUsuariosUseCase.actualizar(uid, body)

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

controllerInformacionUsuario.eliminar = async (req, res) => {
    try {
        const { params } = req
        const { uid } = params

        let informacionUsuario = informacionUsuariosUseCase.eliminar(uid)

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
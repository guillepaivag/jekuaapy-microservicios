import { milliseconds_a_timestamp } from "../../../utils/timestamp.js"

export const constructorUsuarioActualizacion = (usuarioActualizado) => {
    const datosActualizados = {}
    
    usuarioActualizado.correo ? datosActualizados.correo = usuarioActualizado.correo : ''
    usuarioActualizado.fechaNacimiento ? datosActualizados.fechaNacimiento = milliseconds_a_timestamp(usuarioActualizado.fechaNacimiento) : ''
    usuarioActualizado.nombreCompleto ? datosActualizados.nombreCompleto = usuarioActualizado.nombreCompleto : ''
    usuarioActualizado.nombreUsuario ? datosActualizados.nombreUsuario = usuarioActualizado.nombreUsuario : ''

    return datosActualizados
}
import { request, response } from "express";
import { verificadorActualizacionInformacionUsuario } from "./helpers/informacionUsuarios/verificadorActualizacionInformacionUsuario.js";
import { constructorInformacionUsuarioActualizacion } from "./helpers/informacionUsuarios/constructorInformacionUsuarioActualizacion.js";

export const verificarActualizacionInformacionUsuario = async (req = request, res = response, next) => {
    const { body } = req
    const { informacionUsuarioActualizado } = body

    try {
        // Datos para actualizar en este endpoint: descripcion - especializaciones - intereses - redesSociales
        const respuestaError = verificadorActualizacionInformacionUsuario(informacionUsuarioActualizado)
        if (respuestaError) throw respuestaError

        req.body.datosInformacionUsuarioActualizado = constructorInformacionUsuarioActualizacion(informacionUsuarioActualizado)

        next()
    } catch (error) {
        next(error)
    }
}
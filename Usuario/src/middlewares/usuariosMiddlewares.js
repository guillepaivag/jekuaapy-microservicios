import { request, response } from "express";
import { verificadorCreacionUsuario } from "./helpers/usuarios/verificadorCreacionUsuario.js";
import { verificadorActualizacionUsuario } from "./helpers/usuarios/verificadorActualizacionUsuario.js";

export const verificarCreacionUsuario = async (req = request, res = response, next) => {
    const { body } = req
    const { usuarioNuevo, contrasena, confirmacionContrasena } = body

    try {
        const respuestaError = await verificadorCreacionUsuario(usuarioNuevo, contrasena, confirmacionContrasena)
        if (respuestaError) throw respuestaError

        next()
    } catch (error) {
        next(error)
    }
}

export const verificarActualizacionUsuario = async (req = request, res = response, next) => {
    const { body } = req
    const { usuarioActualizado } = body

    try {
        const respuestaError = await verificadorActualizacionUsuario(usuarioActualizado)
        if (respuestaError) throw respuestaError

        next()
    } catch (error) {
        next(error)
    }
}

export const verificarActualizacionContrasena = (req = request, res = response, next) => {

}

export const verificarEliminacionUsuario = (req = request, res = response, next) => {

}
import listaRolesValidos from "../utils/listaRolesValidos.js"

export const verificarRol = (rol = '') => listaRolesValidos.includes(rol)

export const verificarListaDeRoles = (roles = []) => {
    let valido = true

    for (const rol of roles) {
        valido = listaRolesValidos.includes(rol)
        if (!valido) break
    }

    return valido
}
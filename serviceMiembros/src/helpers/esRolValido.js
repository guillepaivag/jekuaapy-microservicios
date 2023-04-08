import listaRolesValidos from "../utils/listaRolesValidos.js"

export const verificarListaDeRoles = (roles = []) => {
    let valido = true
    
    for (const rol of roles) {
        valido = verificarRol(rol)
        if (!valido) break
    }
    
    return valido
}

const verificarRol = (rol = '') => listaRolesValidos.includes(rol)
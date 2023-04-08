import listaEstadosValidos from "../utils/listaEstadosValidos.js"

export const esEstadoValido = (estado = '') => listaEstadosValidos.includes(estado)
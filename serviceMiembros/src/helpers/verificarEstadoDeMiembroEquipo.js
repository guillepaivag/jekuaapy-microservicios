import listaEstadosValidosMiembroEquipo from "../utils/listaEstadosValidosMiembroEquipo.js"

export const verificarEstadoDeMiembroEquipo = (estado = '') => listaEstadosValidosMiembroEquipo.includes(estado)
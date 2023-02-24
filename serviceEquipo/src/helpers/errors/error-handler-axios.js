import RespuestaError from "../../models/Respuestas/RespuestaError.js"

export const errorHandlerAxios = (error, serviceName = '') => {
    console.log('error en axios', error)
    
    if (error.response && error.response.data.mensajeCliente) {
        return new RespuestaError({
            estado: error.response.data.estado, 
            mensajeCliente: error.response.data.mensajeCliente, 
            mensajeServidor: `Error en el servicio: ${serviceName}`, 
            resultado: error.response.data.resultado
        })
    }
}
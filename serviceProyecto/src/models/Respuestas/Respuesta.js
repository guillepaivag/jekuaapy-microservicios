const paramsObject = {
    estado: 500,
    mensajeCliente: '',
    mensajeServidor: '',
    resultado: null,
}

class Respuesta {

    static schema = {
        type: 'object',
        properties: {
            estado: { type: 'number', errorMessage: 'must be of number type' },
            mensajeCliente: { type: 'string', errorMessage: 'must be of string type' },
            mensajeServidor: { type: 'string', errorMessage: 'must be of string type' },
            resultado: { type: 'object', errorMessage: 'must be of object type' },
        },
        required: ['estado', 'mensajeCliente', 'mensajeServidor'],
        additionalProperties: false,
    }

    constructor ( data = paramsObject ) {
        const { estado, mensajeCliente, mensajeServidor, resultado } = data
        
        this.estado = estado ? estado : 500
        this.mensajeCliente = mensajeCliente ? mensajeCliente : ''
        this.mensajeServidor = mensajeServidor ? mensajeServidor : ''
        this.resultado = resultado ? resultado : null
        
    }

    getRespuesta() {
        return {
            estado: this.estado,
            mensajeCliente: this.mensajeCliente,
            resultado: this.resultado,
        }
    }

    getRespuestaConFormato() {
        return {
            status: this.estado,
            code: this.mensajeCliente,
            result: this.resultado,
        }
    }
}

export default Respuesta
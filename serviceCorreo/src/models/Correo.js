const paramsObject = {
    correoEmisor: '',
    correoReceptor: '',
    asunto: '',
    contenido: '',
}

class Correo {
    static schema = {
        type: 'object',
        properties: {
            correoEmisor: { type: 'string', errorMessage: 'must be of string type' },
            correoReceptor: { type: 'string', errorMessage: 'must be of string type' },
            asunto: { type: 'string', errorMessage: 'must be of string type' },
            contenido: { type: 'string', errorMessage: 'must be of string type' },
        },
        required: ['correoEmisor', 'correoReceptor', 'asunto', 'contenido'],
    }

    static params = paramsObject

    constructor ( data = paramsObject ) {
        const { correoEmisor, correoReceptor, asunto, contenido } = data
        
        this.correoEmisor = correoEmisor ? correoEmisor : ''
        this.correoReceptor = correoReceptor ? correoReceptor : ''
        this.asunto = asunto ? asunto : ''
        this.contenido = contenido ? contenido : ''
    }
}

export default Correo
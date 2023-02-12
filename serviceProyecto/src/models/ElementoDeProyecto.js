const paramsObject = {
    uidElemento: '',
    tipoElemento: '',
    uidProyecto: '',
    uidEquipo: '',
}

class ElementoDeProyecto {
    static schema = {
        type: 'object',
        properties: {
            uidElemento: { type: 'string', errorMessage: 'must be of string type' },
            tipoElemento: { type: 'string', errorMessage: 'must be of string type' },
            uidProyecto: { type: 'string', errorMessage: 'must be of string type' },
            uidEquipo: { type: 'string', errorMessage: 'must be of string type' },
        },
        required: ['uidElemento', 'tipoElemento', 'uidProyecto', 'uidEquipo'],
        additionalProperties: false,
    }

    static params = paramsObject
    
    constructor (data = paramsObject) {
        const { uidElemento, tipoElemento, uidProyecto, uidEquipo, } = data
        
        this.uidElemento = uidElemento ? uidElemento : ''
        this.tipoElemento = tipoElemento ? tipoElemento : ''
        this.uidProyecto = uidProyecto ? uidProyecto : ''
        this.uidEquipo = uidEquipo ? uidEquipo : ''
    }
    
}

export default ElementoDeProyecto
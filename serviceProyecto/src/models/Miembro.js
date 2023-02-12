const paramsObject = {
    uidUsuario: '',
    uidProyecto: '',
    uidEquipo: '',
    fechaCreacion: null,
}

class ElementoDeProyecto {
    static schema = {
        type: 'object',
        properties: {
            uidUsuario: { type: 'string', errorMessage: 'must be of string type' },
            uidProyecto: { type: 'string', errorMessage: 'must be of string type' },
            uidEquipo: { type: 'string', errorMessage: 'must be of string type' },
            fechaCreacion: { type: 'string', errorMessage: 'must be of string type' },
        },
        required: ['uidUsuario', 'uidProyecto', 'uidEquipo', 'fechaCreacion'],
        additionalProperties: false,
    }

    static params = paramsObject
    
    constructor (data = paramsObject) {
        const { uidUsuario, uidProyecto, uidEquipo, fechaCreacion } = data
        
        this.uidUsuario = uidUsuario ? uidUsuario : ''
        this.uidProyecto = uidProyecto ? uidProyecto : ''
        this.uidEquipo = uidEquipo ? uidEquipo : ''
        this.fechaCreacion = fechaCreacion ? fechaCreacion : null
    }

}

export default ElementoDeProyecto
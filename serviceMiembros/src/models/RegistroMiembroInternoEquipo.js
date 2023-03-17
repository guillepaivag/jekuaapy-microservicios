const paramsObject = {
    uidEquipo : '',
    cantidadMiembrosInternos: 0,
}

class RegistroMiembroInternoEquipo {
    static schema = {
        type: 'object',
        properties: {
            uidEquipo: { type: 'string', errorMessage: 'debe ser de tipo String' },
            cantidadMiembrosInternos: { type: 'number', errorMessage: 'debe ser de tipo String' },
        },
        required: ['uidEquipo', 'cantidadMiembrosInternos' ],
        additionalProperties: true,
    }

    static params = paramsObject
    
    constructor (data = paramsObject) {
        const { uidEquipo, cantidadMiembrosInternos, } = data
        
        this.uidEquipo = uidEquipo ? uidEquipo : ''
        this.cantidadMiembrosInternos = cantidadMiembrosInternos ? cantidadMiembrosInternos : 0
    }

}

export default RegistroMiembroInternoEquipo
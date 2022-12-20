const paramsObject = {
    uid: '',
    descripcion: '',
    especializaciones: '',
    intereses: '',
    rolDescriptivo: 'estudiante',
    redesSociales: []
}

class InformacionUsuario {
    static schema = {
        type: 'object',
        properties: {
            uid: { type: 'string', errorMessage: 'must be of string type' },
            descripcion: { type: 'string', errorMessage: 'must be of string type' },
            especializaciones: { type: 'string', errorMessage: 'must be of string type' },
            intereses: { type: 'string', errorMessage: 'must be of string type' },
            rolDescriptivo: { type: 'string', errorMessage: 'must be of boolean type' },
            redesSociales: { type: 'object', errorMessage: 'must be of boolean type' },
        },
        required: ['uid'],
        additionalProperties: false,
    }

    static params = paramsObject

    constructor ( data = paramsObject ) {
        const { uid, descripcion, especializaciones, intereses, rolDescriptivo, redesSociales } = data
        
        this.uid = uid ? uid : ''
        this.descripcion = descripcion ? descripcion : ''
        this.especializaciones = especializaciones ? especializaciones : ''
        this.intereses = intereses ? intereses : ''
        this.rolDescriptivo = rolDescriptivo ? rolDescriptivo : 'estudiante'
        this.redesSociales = redesSociales ? redesSociales : []
    }
}

export default InformacionUsuario
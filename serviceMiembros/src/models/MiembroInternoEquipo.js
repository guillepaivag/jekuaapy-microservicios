const paramsObject = {
    uid : '',
    uidEquipo: '',
    roles : [],
    estado : 'activo',
    fechaCreacion : null,
}

class MiembroInternoEquipo {
    static schema = {
        type: 'object',
        properties: {
            uid: { type: 'string', errorMessage: 'debe ser de tipo String' },
            uidEquipo: { type: 'string', errorMessage: 'debe ser de tipo String' },
            roles: { type: 'object', errorMessage: 'debe ser de tipo String' },
            estado: { type: 'string', errorMessage: 'debe ser de tipo String' },
            fechaCreacion: { type: 'object', errorMessage: 'debe ser de tipo String' },
        },
        required: ['uid', 'uidEquipo', 'roles' ,'fechaCreacion'],
        additionalProperties: true,
    }

    static params = paramsObject
    
    constructor (data = paramsObject) {
        const { uid, uidEquipo, roles, estado, fechaCreacion, } = data
        
        this.uid = uid ? uid : ''
        this.uidEquipo = uidEquipo ? uidEquipo : ''
        this.roles = roles ? roles : []
        this.estado = estado ? estado : 'activo'
        this.fechaCreacion = fechaCreacion ? fechaCreacion : null
    }

}

export default MiembroInternoEquipo
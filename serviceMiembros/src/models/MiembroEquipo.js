const paramsObject = {
    uid: '',
    uidEquipo: '',
    roles: [],
    estado: 'activo',
    fechaCreacion: null,
    fechaEliminacion: null,
}

class MiembroEquipo {
    static schema = {
        type: 'object',
        properties: {
            uid: { type: 'string', errorMessage: 'debe ser de tipo String' },
            uidEquipo: { type: 'string', errorMessage: 'debe ser de tipo String' },
            roles: { type: 'object', errorMessage: 'debe ser de tipo String' },
            estado: { type: 'string', errorMessage: 'debe ser de tipo String' },
            fechaCreacion: { type: 'object', errorMessage: 'debe ser de tipo String' },
            fechaEliminacion: { type: 'object', errorMessage: 'debe ser de tipo String' },
        },
        required: ['uid', 'uidEquipo', 'roles' ,'fechaCreacion', 'fechaEliminacion'],
        additionalProperties: true,
    }

    static params = paramsObject
    static structureForReturn = (data = paramsObject) => data
    
    constructor (data = paramsObject) {
        const { uid, uidEquipo, roles, estado, fechaCreacion, fechaEliminacion, } = data
        
        this.uid = uid ? uid : ''
        this.uidEquipo = uidEquipo ? uidEquipo : ''
        this.roles = roles ? roles : []
        this.estado = estado ? estado : 'activo'
        this.fechaCreacion = fechaCreacion ? fechaCreacion : null
        this.fechaEliminacion = fechaEliminacion ? fechaEliminacion : null
    }

}

export default MiembroEquipo
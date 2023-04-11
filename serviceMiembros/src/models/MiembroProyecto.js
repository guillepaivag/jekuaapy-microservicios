const paramsObject = {
    uid: '',
    uidEquipo: '',
    uidProyecto: '',
    estado: '',
    fechaCreacion: null,
    fechaEliminacion: null,
}

class MiembroProyecto {
    static schema = {
        type: 'object',
        properties: {
            uid: { type: 'string', errorMessage: 'debe ser de tipo String' },
            uidEquipo: { type: 'string', errorMessage: 'debe ser de tipo String' },
            uidProyecto: { type: 'string', errorMessage: 'debe ser de tipo String' },
            estado: { type: 'string', errorMessage: 'debe ser de tipo String' },
            fechaCreacion: { type: 'object', errorMessage: 'debe ser de tipo Object' },
            fechaEliminacion: { type: 'object', errorMessage: 'debe ser de tipo Object' },
        },
        required: ['uid', 'uidEquipo', 'uidProyecto' ,'estado', 'fechaCreacion', 'fechaEliminacion'],
        additionalProperties: true,
    }

    static params = paramsObject
    static structureForReturn = (data = paramsObject) => data
    
    constructor (data = paramsObject) {
        const { uid, uidEquipo, uidProyecto, estado, fechaCreacion, fechaEliminacion } = data
        
        this.uid = uid ? uid : ''
        this.uidEquipo = uidEquipo ? uidEquipo : ''
        this.uidProyecto = uidProyecto ? uidProyecto : ''
        this.estado = estado ? estado : null
        this.fechaCreacion = fechaCreacion ? fechaCreacion : null
        this.fechaEliminacion = fechaEliminacion ? fechaEliminacion : null
    }

}

export default MiembroProyecto
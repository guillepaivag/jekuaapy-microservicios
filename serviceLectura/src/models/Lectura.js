const paramsObject = {
    uid: '',
    uidEquipo: '',
    uidCreador: '',
    nombre: '',
    estado: 'activo',
    fechaCreacion: null,
    fechaEliminacion: null,
}

class Lectura {
    static schema = {
        type: 'object',
        properties: {
            uid: { type: 'string', errorMessage: 'must be of string type' },
            uidEquipo: { type: 'string', errorMessage: 'must be of string type' },
            uidCreador: { type: 'string', errorMessage: 'must be of string type' },
            nombre: { type: 'string', errorMessage: 'must be of string type' },
            estado: { type: 'string', errorMessage: 'must be of boolean type' },
            fechaCreacion: { type: 'object', errorMessage: 'must be of boolean type' },
            fechaEliminacion: { type: 'object', errorMessage: 'must be of boolean type' },
        },
        required: ['uidEquipo', 'nombre'],
        additionalProperties: false,
    }

    static params = paramsObject
    
    constructor (data = paramsObject) {
        const { uid, uidEquipo, uidCreador, estado, nombre,
            fechaCreacion, fechaEliminacion } = data
        
        this.uid = uid ? uid : ''
        this.uidEquipo = uidEquipo ? uidEquipo : ''
        this.uidCreador = uidCreador ? uidCreador : ''
        this.nombre = nombre ? nombre : ''
        this.estado = estado ? estado : 'activo'
        this.fechaCreacion = fechaCreacion ? fechaCreacion : null
        this.fechaEliminacion = fechaEliminacion ? fechaEliminacion : null
    }

}

export default Lectura
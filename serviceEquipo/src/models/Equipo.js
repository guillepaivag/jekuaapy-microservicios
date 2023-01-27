const paramsObject = {
    uid : '',
    responsable : '',
    codigo : '',
    nombre : '',
    descripcion : '',
    fechaCreacion : null,
    fechaEliminado : null,
    estado : 'activo',
    cantidadMiembros : 0,
}

class Equipo {
    static schema = {
        type: 'object',
        properties: {
            uid: { type: 'string', errorMessage: 'debe ser de tipo String' },
            responsable: { type: 'string', errorMessage: 'debe ser de tipo String' },
            codigo: { type: 'string', errorMessage: 'debe ser de tipo String' },
            nombre: { type: 'string', errorMessage: 'debe ser de tipo String' },
            descripcion: { type: 'string', errorMessage: 'debe ser de tipo String' },
            fechaCreacion: { type: 'object', errorMessage: 'debe ser de tipo Object' },
            fechaEliminado: { type: 'object', errorMessage: 'debe ser de tipo Object' },
            estado: { type: 'string', errorMessage: 'debe ser de tipo string' },
            cantidadMiembros: { type: 'number', errorMessage: 'debe ser de tipo Number' },
        },
        required: ['responsable', 'codigo', 'nombre' ,'descripcion'],
        additionalProperties: true,
    }

    static params = paramsObject
    
    constructor (data = paramsObject) {
        const { uid, responsable, codigo, nombre, descripcion, fechaCreacion, fechaEliminado, estado, cantidadMiembros } = data
        
        this.uid = uid ? uid : ''
        this.responsable = responsable ? responsable : ''
        this.codigo = codigo ? codigo : ''
        this.nombre = nombre ? nombre : ''
        this.descripcion = descripcion ? descripcion : ''
        this.fechaCreacion = fechaCreacion ? fechaCreacion : null
        this.fechaEliminado = fechaEliminado ? fechaEliminado : null
        this.estado = estado ? estado : 'activo'
        this.cantidadMiembros = cantidadMiembros ? cantidadMiembros : 0
    }

}

export default Equipo
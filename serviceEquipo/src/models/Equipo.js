const paramsObject = {
    uid : '',
    responsable : '',
    codigo : '',
    nombre : '',
    descripcion : '',
    cantidadMiembros : 0,
    estado : 'activo',
    fechaCreacion : null,
    fechaEliminado : null,
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
            cantidadMiembros: { type: 'number', errorMessage: 'debe ser de tipo Number' },
            estado: { type: 'string', errorMessage: 'debe ser de tipo string' },
            fechaCreacion: { type: 'object', errorMessage: 'debe ser de tipo Object' },
            fechaEliminado: { type: 'object', errorMessage: 'debe ser de tipo Object' },
        },
        required: ['responsable', 'codigo', 'nombre' ,'descripcion'],
        additionalProperties: true,
    }

    static params = paramsObject
    
    constructor (data = paramsObject) {
        const { uid, responsable, codigo, nombre, descripcion, cantidadMiembros, estado, fechaCreacion, fechaEliminado } = data
        
        this.uid = uid ? uid : ''
        this.responsable = responsable ? responsable : ''
        this.codigo = codigo ? codigo : ''
        this.nombre = nombre ? nombre : ''
        this.descripcion = descripcion ? descripcion : ''
        this.cantidadMiembros = cantidadMiembros ? cantidadMiembros : 0
        this.estado = estado ? estado : 'activo'
        this.fechaCreacion = fechaCreacion ? fechaCreacion : null
        this.fechaEliminado = fechaEliminado ? fechaEliminado : null
    }

}

export default Equipo
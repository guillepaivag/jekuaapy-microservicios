const paramsObject = {
    uid: '',
    uidEquipo: '',
    tipoProyecto: 'interno',   // interno, externo
    nombre: '',
    codigo: '',
    fotoPerfil: '',
    fotoPortada: '',
    cantidadMiembros: 0,
    cantidadElementos: 0,
    cantidadesPorTipoDeElemento: {},
    estado: 'activo',
    fechaCreacion: null,
    fechaEliminacion: null,
}

class Proyecto {
    static schema = {
        type: 'object',
        properties: {
            uid: { type: 'string', errorMessage: 'must be of string type' },
            uidEquipo: { type: 'string', errorMessage: 'must be of string type' },
            tipoProyecto: { type: 'string', errorMessage: 'must be of string type' },
            nombre: { type: 'string', errorMessage: 'must be of string type' },
            codigo: { type: 'string', errorMessage: 'must be of string type' },
            fotoPerfil: { type: 'string', errorMessage: 'must be of string type' },
            fotoPortada: { type: 'string', errorMessage: 'must be of boolean type' },
            cantidadMiembros: { type: 'number', errorMessage: 'must be of string type' },
            cantidadElementos: { type: 'number', errorMessage: 'must be of string type' },
            cantidadesPorTipoDeElemento: { type: 'object', errorMessage: 'must be of boolean type' },
            estado: { type: 'string', errorMessage: 'must be of boolean type' },
            fechaCreacion: { type: 'object', errorMessage: 'must be of boolean type' },
            fechaEliminacion: { type: 'object', errorMessage: 'must be of boolean type' },
        },
        required: ['uidEquipo', 'tipoProyecto', 'nombre', 'codigo'],
        additionalProperties: false,
    }

    static params = paramsObject
    
    constructor (data = paramsObject) {
        const { uid, uidEquipo, tipoProyecto, nombre, codigo, fotoPerfil, fotoPortada, 
            cantidadMiembros, cantidadElementos, cantidadesPorTipoDeElemento, estado, 
            fechaCreacion, fechaEliminacion } = data
        
        this.uid = uid ? uid : ''
        this.uidEquipo = uidEquipo ? uidEquipo : ''
        this.tipoProyecto = tipoProyecto ? tipoProyecto : 'interno'
        this.nombre = nombre ? nombre : ''
        this.codigo = codigo ? codigo : ''
        this.fotoPerfil = fotoPerfil ? fotoPerfil : ''
        this.fotoPortada = fotoPortada ? fotoPortada : ''
        this.cantidadMiembros = cantidadMiembros ? cantidadMiembros : 0
        this.cantidadElementos = cantidadElementos ? cantidadElementos : 0
        this.cantidadesPorTipoDeElemento = cantidadesPorTipoDeElemento ? cantidadesPorTipoDeElemento : {}
        this.estado = estado ? estado : 'activo'
        this.fechaCreacion = fechaCreacion ? fechaCreacion : null
        this.fechaEliminacion = fechaEliminacion ? fechaEliminacion : null
    }

}

export default Proyecto
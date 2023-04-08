const valueDefaultCantidadMiembrosPorRol = { 
    propietario: 0, 
    editor: 0, 
    visualizador: 0, 
    estudiante: 0, 
}

const valueDefaultCantidadContenidosPorTipo = { 
    lectura: 0, 
    video: 0, 
}

const paramsObject = {
    uid: '',
    responsable: '',
    codigo: '',
    nombre: '',
    descripcion: '',
    cantidadMiembros: 0,
    cantidadMiembrosPorRol: valueDefaultCantidadMiembrosPorRol,
    cantidadProyectos: 0,
    cantidadContenidos: 0,
    cantidadContenidosPorTipo: valueDefaultCantidadContenidosPorTipo,
    estado: 'activo',
    fechaCreacion: null,
    fechaEliminado: null,
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
            cantidadMiembrosPorRol: { type: 'object', errorMessage: 'debe ser de tipo Number' },
            cantidadProyectos: { type: 'number', errorMessage: 'debe ser de tipo Number' },
            cantidadContenidos: { type: 'number', errorMessage: 'debe ser de tipo Number' },
            cantidadContenidosPorTipo: { type: 'object', errorMessage: 'debe ser de tipo Number' },
            estado: { type: 'string', errorMessage: 'debe ser de tipo string' },
            fechaCreacion: { type: 'object', errorMessage: 'debe ser de tipo Object' },
            fechaEliminado: { type: 'object', errorMessage: 'debe ser de tipo Object' },
        },
        required: ['responsable', 'codigo', 'nombre' ,'descripcion'],
        additionalProperties: true,
    }

    static params = paramsObject
    static structureData = (data = paramsObject) => data
    
    constructor (data = paramsObject) {
        const { uid, responsable, codigo, nombre, descripcion, 
            cantidadMiembros, cantidadMiembrosPorRol, cantidadProyectos, cantidadContenidos, cantidadContenidosPorTipo,
            estado, fechaCreacion, fechaEliminado } = data
        
        this.uid = uid ? uid : ''
        this.responsable = responsable ? responsable : ''
        this.codigo = codigo ? codigo : ''
        this.nombre = nombre ? nombre : ''
        this.descripcion = descripcion ? descripcion : ''
        this.cantidadMiembros = cantidadMiembros ? cantidadMiembros : 0
        this.cantidadMiembrosPorRol = cantidadMiembrosPorRol ? cantidadMiembrosPorRol : valueDefaultCantidadMiembrosPorRol
        this.cantidadProyectos = cantidadProyectos ? cantidadProyectos : 0
        this.cantidadContenidos = cantidadContenidos ? cantidadContenidos : 0
        this.cantidadContenidosPorTipo = cantidadContenidosPorTipo ? cantidadContenidosPorTipo : valueDefaultCantidadContenidosPorTipo
        this.estado = estado ? estado : 'activo'
        this.fechaCreacion = fechaCreacion ? fechaCreacion : null
        this.fechaEliminado = fechaEliminado ? fechaEliminado : null
    }

}

export default Equipo
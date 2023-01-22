const paramsObject = {
    uid: '',
    nombreUsuario: '',
    correo: '',
    fechaNacimiento: null,
    rol: '',
    fotoPerfil: '',
    eliminado: false,
    datosAuthenticationEliminados: null,
}

class Equipo {
    static schema = {
        type: 'object',
        properties: {
            uid: { type: 'string', errorMessage: 'must be of string type' },
            responsable: { type: 'string', errorMessage: 'must be of string type' },
            codigo: { type: 'string', errorMessage: 'must be of string type' },
            nombre: { type: 'object', errorMessage: 'must be of string type' },
            descripcion: { type: 'string', errorMessage: 'must be of boolean type' },
            fechaCreacion: { type: 'boolean', errorMessage: 'must be of boolean type' },
            fechaActualizado: {type: 'boolean', errorMessage: 'must be of boolean type' },
            fechaEliminado: { type: 'object', errorMessage: 'must be of boolean type' },
            eliminado: { type: 'boolean', errorMessage: 'must be of boolean type' },
            cantidadMiembrosPrivados,
            cantidadCursosPrivados,
            cantidadCursosPublicos,
            cantidadSeccionesPrivadas,
            cantidadSeccionesPublicas,
            cantidadRutasPrivadas,
            cantidadRutasPublicas,
            cantidadCursosCompletadosPrivados,
            cantidadCursosCompletadosPublicos
        },
        required: ['nombreUsuario', 'correo'],
        additionalProperties: false,
    }

    static params = paramsObject
    
    constructor (data = paramsObject) {
        const { uid, nombreUsuario, correo, fechaNacimiento, rol, fotoPerfil, eliminado, datosAuthenticationEliminados } = data
        
        this.uid = uid ? uid : ''
        this.nombreUsuario = nombreUsuario ? nombreUsuario : ''
        this.correo = correo ? correo : ''
        this.fechaNacimiento = fechaNacimiento ? fechaNacimiento : null
        this.rol = rol ? rol : 'estudiante'
        this.fotoPerfil = fotoPerfil ? fotoPerfil : ''
        this.eliminado = eliminado ? eliminado : false
        this.datosAuthenticationEliminados = datosAuthenticationEliminados ? datosAuthenticationEliminados : null
    }

}

export default Equipo
const paramsObject = {
    uid: '',
    nombreUsuario: '',
    correo: '',
    fechaNacimiento: null,
    rol: '',
    fotoPerfil: '',
    eliminado: false,
    datosAuth: null,
}

class Usuario {
    static schema = {
        type: 'object',
        properties: {
            uid: { type: 'string', errorMessage: 'must be of string type' },
            nombreUsuario: { type: 'string', errorMessage: 'must be of string type' },
            correo: { type: 'string', errorMessage: 'must be of string type' },
            fechaNacimiento: { type: 'object', errorMessage: 'must be of string type' },
            rol: { type: 'string', errorMessage: 'must be of boolean type' },
            fotoPerfil: { type: 'string', errorMessage: 'must be of string type' },
            eliminado: { type: 'boolean', errorMessage: 'must be of boolean type' },
            datosAuth: { type: 'object', errorMessage: 'must be of boolean type' },
        },
        required: ['nombreUsuario', 'correo'],
        additionalProperties: false,
    }
    
    constructor (data = paramsObject) {
        const { uid, nombreUsuario, correo, fechaNacimiento, rol, fotoPerfil, eliminado, datosAuth } = data
        
        this.uid = uid ? uid : ''
        this.nombreUsuario = nombreUsuario ? nombreUsuario : ''
        this.correo = correo ? correo : ''
        this.fechaNacimiento = fechaNacimiento ? fechaNacimiento : null
        this.rol = rol ? rol : 'estudiante'
        this.fotoPerfil = fotoPerfil ? fotoPerfil : ''
        this.eliminado = eliminado ? eliminado : false
        this.datosAuth = datosAuth ? datosAuth : null
    }
}

export default Usuario
const paramsObject = {
    uid: '',
    nombreUsuario: '',
    correo: '',
    nombreCompleto: '',
    fechaNacimiento: null,
    rol: '',
    fotoPerfil: '',
    fotoPortada: '',
    estado: 'activo',
    authenticationEliminado: null,
}

class Usuario {
    static schema = {
        type: 'object',
        properties: {
            uid: { type: 'string', errorMessage: 'must be of string type' },
            nombreUsuario: { type: 'string', errorMessage: 'must be of string type' },
            correo: { type: 'string', errorMessage: 'must be of string type' },
            nombreCompleto: { type: 'string', errorMessage: 'must be of string type' },
            fechaNacimiento: { type: 'object', errorMessage: 'must be of string type' },
            rol: { type: 'string', errorMessage: 'must be of boolean type' },
            fotoPerfil: { type: 'string', errorMessage: 'must be of string type' },
            fotoPortada: { type: 'string', errorMessage: 'must be of string type' },
            estado: { type: 'string', errorMessage: 'must be of boolean type' },
            authenticationEliminado: { type: 'object', errorMessage: 'must be of boolean type' },
        },
        required: ['nombreUsuario', 'correo'],
        additionalProperties: false,
    }

    static params = paramsObject
    
    constructor (data = paramsObject) {
        const { uid, nombreUsuario, correo, nombreCompleto, fechaNacimiento, rol, fotoPerfil, fotoPortada, estado, authenticationEliminado } = data
        
        this.uid = uid ? uid : ''
        this.nombreUsuario = nombreUsuario ? nombreUsuario : ''
        this.correo = correo ? correo : ''
        this.nombreCompleto = nombreCompleto ? nombreCompleto : ''
        this.fechaNacimiento = fechaNacimiento ? fechaNacimiento : null
        this.rol = rol ? rol : 'estudiante'
        this.fotoPerfil = fotoPerfil ? fotoPerfil : ''
        this.fotoPortada = fotoPortada ? fotoPortada : ''
        this.estado = estado ? estado : false
        this.authenticationEliminado = authenticationEliminado ? authenticationEliminado : null
    }

}

export default Usuario
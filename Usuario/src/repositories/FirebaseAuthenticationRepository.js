import firebaseAuthenticationService from '../../firebase-service/firebase-authentication-service.js'

// Implementación con Firestore para el repositorio de libros.
// Recibe la conexión con Firestore externamente.

class FirebaseAuthenticationRepository {

    constructor(isTest) {

        // Obtener el nombre de la colección desde variables de entorno.
        // Si "test" es true, se le agrega un sufijo, útil para que 
        // las pruebas de integración no sobreescriban los datos existentes.
    
        this.isTest = isTest
    
    }
    
    async obtenerPorUID (uid = '') {
        const usuarioAuth = await firebaseAuthenticationService.getUser(uid)
        return usuarioAuth
    }

    async obtenerPorCorreo (correo = '') {
        const usuarioAuth = await firebaseAuthenticationService.getUserByEmail(correo)
        return usuarioAuth
    }
    
    async crear (correo = '', contrasena = '') {

        const usuarioAuth = await firebaseAuthenticationService.createUser({
            email: correo,
            password: contrasena,
        })

        return usuarioAuth
    
    }
    
    async actualizar (uid = '', usuarioAuth = {}) {
        await firebaseAuthenticationService.updateUser(uid, usuarioAuth)
    }

    async actualizarCustomClaims (uid = '', claims = {}) {
        await firebaseAuthenticationService.setCustomUserClaims(uid, claims)
    }
    
    async eliminar (uid = '') {
        await firebaseAuthenticationService.deleteUser(uid)
    }
    
}

export default FirebaseAuthenticationRepository
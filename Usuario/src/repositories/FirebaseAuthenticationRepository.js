import firebaseAuthenticationService from '../../firebase-service/firebase-authentication-service.js'
import Authentication from '../models/Authentication.js'

// Implementación con Firestore para el repositorio de libros.
// Recibe la conexión con Firestore externamente.

class FirebaseAuthenticationRepository {

    constructor(isTest) {

        // Obtener el nombre de la colección desde variables de entorno.
        // Si "test" es true, se le agrega un sufijo, útil para que 
        // las pruebas de integración no sobreescriban los datos existentes.
    
        this.isTest = isTest
    
    }
    
    async obtener (uid = '') {
    
    }
    
    async crear () {
    
    }
    
    async actualizar () {
    
    }
    
    async eliminar (uid = '') {
    
    }
    
}

export default FirebaseAuthenticationRepository
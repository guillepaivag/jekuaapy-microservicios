import firebaseFirestoreService from '../../firebase-service/firebase-firestore-service.js'
import Usuario from '../models/Usuario.js'

// Implementación con Firestore para el repositorio de libros.
// Recibe la conexión con Firestore externamente.

class FirestoreUsuariosRepository {

  constructor(isTest) {

    // Obtener el nombre de la colección desde variables de entorno.
    // Si "test" es true, se le agrega un sufijo, útil para que 
    // las pruebas de integración no sobreescriban los datos existentes.

    let collection_name = process.env.FIRESTORE_COLLECTION_NAME_USUARIOS

    if (test) collection_name += '_test'

    this.collection = firebaseFirestoreService.collection(collection_name)
    this.isTest = isTest

  }

  async obtenerPorUID (uid = '') {

    const doc = await this.collection.doc(uid).get()

    if (!doc.exists) return null
    
    return this._obtenerDeDocumento(doc)
  
  }

  async obtenerPorCorreo (correo = '') {

    const query = this.collection
    .where('correo', '==', correo)
    .where('eliminado', '==', false)

    const snapshot = await query.get()
    if (snapshot.empty) return null
    
    const doc = snapshot.docs[0]
    
    return this._obtenerDeDocumento(doc)
  
  }

  async obtenerPorNombreUsuario (nombreUsuario = '') {

    const query = this.collection
    .where('nombreUsuario', '==', nombreUsuario)
    .where('eliminado', '==', false)

    const snapshot = await query.get()
    if (snapshot.empty) return null
    
    const doc = snapshot.docs[0]
    
    return this._obtenerDeDocumento(doc)
  
  }

  async crear (usuario = Usuario.params) {

    await this.collection.doc(usuario.uid).set({
      uid: usuario.uid,
      nombreUsuario: usuario.nombreUsuario,
      correo: usuario.correo,
      fechaNacimiento: usuario.fechaNacimiento,
      rol: usuario.rol,
      fotoPerfil: usuario.fotoPerfil,
      eliminado: usuario.eliminado,
      datosAuthenticationEliminados: usuario.datosAuthenticationEliminados,
    })

    return usuario

  }

  async actualizar (uid = '', datosActualizados = Usuario.params) {
    
    const doc = this.collection.doc(uid)
    
    await doc.set({
      uid: datosActualizados.uid,
      nombreUsuario: datosActualizados.nombreUsuario,
      correo: datosActualizados.correo,
      fechaNacimiento: datosActualizados.fechaNacimiento,
      rol: datosActualizados.rol,
      fotoPerfil: datosActualizados.fotoPerfil,
      eliminado: datosActualizados.eliminado,
      datosAuthenticationEliminados: datosActualizados.datosAuthenticationEliminados,
    })

    return datosActualizados

  }

  async eliminar (uid = '', datosAuthenticationEliminados = null) {

    await this.collection.doc(uid).update({
      eliminado: true,
      datosAuthenticationEliminados,
    })

    return true

  }

  _obtenerDeDocumento (doc) {

    // Retorna una instancia User desde una instancia Document de Firestore.
    const data = doc.data()

    return new Usuario({ 
      uid: data.uid, 
      nombreUsuario: data.nombreUsuario, 
      correo: data.correo, 
      fechaNacimiento: data.fechaNacimiento, 
      rol: data.rol, 
      fotoPerfil: data.fotoPerfil,
      eliminado: data.eliminado, 
      datosAuthenticationEliminados: data.datosAuthenticationEliminados, 
    })
  }

}

export default FirestoreUsuariosRepository
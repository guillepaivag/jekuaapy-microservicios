import collections_name_firestore from '../../firebase-service/collections_name_firestore/collections_name_firestore.js'
import firebaseFirestoreService from '../../firebase-service/firebase-firestore-service.js'
import Usuario from '../models/Usuario.js'

// Implementación con Firestore para el repositorio de libros.
// Recibe la conexión con Firestore externamente.

class FirestoreUsuariosRepository {

  constructor(isTest) {

    // Obtener el nombre de la colección desde variables de entorno.
    // Si "test" es true, se le agrega un sufijo, útil para que 
    // las pruebas de integración no sobreescriban los datos existentes.

    let collection_name = collections_name_firestore.usuarios

    if (isTest) collection_name += '_test'

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
    .where('estado', '==', 'activo')

    const snapshot = await query.get()
    if (snapshot.empty) return null
    
    const doc = snapshot.docs[0]
    
    return this._obtenerDeDocumento(doc)
  
  }

  async obtenerPorNombreUsuario (nombreUsuario = '') {

    const query = this.collection
    .where('nombreUsuario', '==', nombreUsuario)
    .where('estado', '==', 'activo')

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
      nombreCompleto: usuario.nombreCompleto,
      fechaNacimiento: usuario.fechaNacimiento,
      rol: usuario.rol,
      fotoPerfil: usuario.fotoPerfil,
      fotoPortada: usuario.fotoPortada,
      estado: usuario.estado,
      authenticationEliminado: usuario.authenticationEliminado,
    })

    return usuario

  }

  async actualizar (uid = '', datosActualizados = Usuario.params) {
    
    const doc = this.collection.doc(uid)
    await doc.update(datosActualizados)

    return datosActualizados

  }

  async eliminar (uid = '', authenticationEliminado = null) {

    await this.collection.doc(uid).update({
      estado: 'eliminado',
      authenticationEliminado,
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
      nombreCompleto: data.nombreCompleto,
      fechaNacimiento: data.fechaNacimiento, 
      rol: data.rol, 
      fotoPerfil: data.fotoPerfil,
      fotoPortada: data.fotoPortada,
      estado: data.estado, 
      authenticationEliminado: data.authenticationEliminado, 
    })
  }

}

export default FirestoreUsuariosRepository
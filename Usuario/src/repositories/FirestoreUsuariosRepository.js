import db from '../../firebase-service/firestore-service.js'
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

    this.collection = db.collection(collection_name)
    this.isTest = isTest

  }

  async obtenerUsuario (uid = '') {

    const doc = await this.collection.doc(uid).get()

    if (!doc.exists) return null
    
    return this._obtenerUsuarioDeDocumento(doc)
  
  }

  async crearUsuario (usuario = new Usuario()) {

    await this.collection.doc(usuario.uid).set({
      uid: usuario.uid,
      nombreUsuario: usuario.nombreUsuario,
      correo: usuario.correo,
      fechaNacimiento: usuario.fechaNacimiento,
      rol: usuario.rol,
      fotoPerfil: usuario.fotoPerfil,
      eliminado: usuario.eliminado,
      datosAuth: usuario.datosAuth,
    })

    return usuario

  }

  async actualizarUsuario (uid = '', datosActualizados = {}) {
    
    const doc = this.collection.doc(uid)
    
    await doc.set({
      uid: datosActualizados.uid,
      nombreUsuario: datosActualizados.nombreUsuario,
      correo: datosActualizados.correo,
      fechaNacimiento: datosActualizados.fechaNacimiento,
      rol: datosActualizados.rol,
      fotoPerfil: datosActualizados.fotoPerfil,
      eliminado: datosActualizados.eliminado,
      datosAuth: datosActualizados.datosAuth,
    })

    return datosActualizados

  }

  async deleteUser(uid = '') {

    await this.collection.doc(uid).delete()

    return true

  }

  _obtenerUsuarioDeDocumento(doc) {

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
      datosAuth: data.datosAuth, 
    })
  }

}

export default FirestoreUsuariosRepository
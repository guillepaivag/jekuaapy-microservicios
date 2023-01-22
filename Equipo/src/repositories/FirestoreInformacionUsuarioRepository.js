import db from '../../firebase-service/firestore-service.js'
import InformacionUsuario from '../models/InformacionUsuario.js'

class FirestoreInformacionUsuarioRepository {
    
      constructor(isTest) {
    
        // Obtener el nombre de la colección desde variables de entorno.
        // Si "test" es true, se le agrega un sufijo, útil para que 
        // las pruebas de integración no sobreescriban los datos existentes.
    
        let collection_name = process.env.FIRESTORE_COLLECTION_NAME_INFORMACION_USUARIO
    
        if (test) collection_name += '_test'
    
        this.collection = db.collection(collection_name)
        this.isTest = isTest
    
      }
    
      async obtenerPorUID (uid = '') {
    
        const doc = await this.collection.doc(uid).get()
    
        if (!doc.exists) return null
        
        return this._obtenerDeDocumento(doc)
      
      }

      async obtenerPorNombreUsuario (nombreUsuario = '') {
    
        const snapshot = await db
        .collection('Usuarios')
        .where('nombreUsuario', '==', nombreUsuario)
        .where('eliminado', '==', false)
        .get()
    
        if (snapshot.empty) return null

        const uid = snapshot.docs[0].uid
        
        return this.obtenerPorUID(uid)
      
      }

      async obtenerPorCorreo (correo = '') {
    
        const snapshot = await db
        .collection('Usuarios')
        .where('correo', '==', correo)
        .where('eliminado', '==', false)
        .get()
    
        if (snapshot.empty) return null

        const uid = snapshot.docs[0].uid
        
        return this.obtenerPorUID(uid)
      
      }
    
      async crear (informacionUsuario = InformacionUsuario.params) {
    
        await this.collection.doc(informacionUsuario.uid).set({
          uid: informacionUsuario.uid,
          descripcion: informacionUsuario.descripcion,
          especializaciones: informacionUsuario.especializaciones,
          intereses: informacionUsuario.intereses,
          rolDescriptivo: informacionUsuario.rolDescriptivo,
          redesSociales: informacionUsuario.redesSociales,
        })
    
        return informacionUsuario
    
      }
    
      async actualizar (uid = '', datosActualizados = InformacionUsuario.params) {
        
        const doc = this.collection.doc(uid)
        
        await doc.set({
          uid: datosActualizados.uid,
          descripcion: datosActualizados.descripcion,
          especializaciones: datosActualizados.especializaciones,
          intereses: datosActualizados.intereses,
          rolDescriptivo: datosActualizados.rolDescriptivo,
          redesSociales: datosActualizados.redesSociales,
        })
    
        return datosActualizados
    
      }
    
      async eliminar(uid = '') {
    
        await this.collection.doc(uid).delete()
    
        return true
    
      }
    
      _obtenerDeDocumento(doc) {
    
        // Retorna una instancia User desde una instancia Document de Firestore.
        const data = doc.data()
    
        return new InformacionUsuario({ 
          uid: data.uid, 
          descripcion: data.descripcion, 
          especializaciones: data.especializaciones, 
          intereses: data.intereses, 
          rolDescriptivo: data.rolDescriptivo, 
          redesSociales: data.redesSociales,
        })
      }
}

export default FirestoreInformacionUsuarioRepository
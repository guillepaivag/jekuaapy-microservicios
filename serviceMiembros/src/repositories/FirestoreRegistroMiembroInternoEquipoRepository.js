import firebaseFirestoreService from '../../firebase-service/firebase-firestore-service.js'
import collections_name_firestore from '../../firebase-service/collections_name_firestore/collections_name_firestore.js'
import RegistroMiembroInternoEquipo from '../models/RegistroMiembroInternoEquipo.js'

class FirestoreRegistroMiembroInternoEquipoRepository {

    constructor (isTest) {
        // Obtener el nombre de la colección desde variables de entorno.
        // Si "test" es true, se le agrega un sufijo, útil para que 
        // las pruebas de integración no sobreescriban los datos existentes.

        let collection_name = collections_name_firestore.registroMiembrosInternosEquipo

        if (isTest) collection_name += '_test'

        this.collection = firebaseFirestoreService.collection(collection_name)
        this.isTest = isTest
    }

    async crear(registroMiembroInternoEquipo = RegistroMiembroInternoEquipo.params) {
        await this.collection.doc(registroMiembroInternoEquipo.uidEquipo).set({
            uidEquipo: registroMiembroInternoEquipo.uidEquipo,
            cantidadMiembrosInternos: registroMiembroInternoEquipo.cantidadMiembrosInternos, 
        })
    }

    async obtenerPorUID(uidEquipo = '') {
        const doc = await this.collection.doc(uidEquipo).get()
        if (!doc.exists) return null

        const registroMiembroInternoEquipo = this._obtenerDeDocumento(doc)
        return registroMiembroInternoEquipo
    }

    async actualizar(uidEquipo = '', datosActualizados = RegistroMiembroInternoEquipo.params) {
        const doc = this.collection.doc(uidEquipo)
        await doc.update(datosActualizados)
    }

    _obtenerDeDocumento(doc) {

        // Retorna una instancia User desde una instancia Document de Firestore.
        const data = doc.data()

        return new RegistroMiembroInternoEquipo({
            uidEquipo: data.uidEquipo,
            cantidadMiembrosInternos: data.cantidadMiembrosInternos,
        })
    }
}

export default FirestoreRegistroMiembroInternoEquipoRepository
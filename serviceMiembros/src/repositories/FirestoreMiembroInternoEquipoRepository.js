import MiembroInternoEquipo from '../models/MiembroInternoEquipo.js'
import firebaseFirestoreService from '../../firebase-service/firebase-firestore-service.js'
import collections_name_firestore from '../../firebase-service/collections_name_firestore/collections_name_firestore.js'

class FirestoreMiembroInternoEquipoRepository {

    constructor(isTest) {
        let collection_name_equipos = collections_name_firestore.equipos
        let collection_name_miembrosInternos = collections_name_firestore.miembrosInternosEquipo

        if (isTest) collection_name_equipos += '_test'
        if (isTest) collection_name_miembrosInternos += '_test'

        this.collection_name_equipos = collection_name_equipos
        this.collection_name_miembrosInternos = collection_name_miembrosInternos
        this.isTest = isTest
    }

    async crear(uidEquipo = '', miembroInterno = MiembroInternoEquipo.params) {
        await firebaseFirestoreService
        .collection(this.collection_name_equipos).doc(uidEquipo)
        .collection(this.collection_name_miembrosInternos).doc(miembroInterno.uid)
        .set({
            uid: miembroInterno.uid,
            uidEquipo: miembroInterno.uidEquipo,
            rol: miembroInterno.rol, 
            estado: miembroInterno.estado, 
            fechaCreacion: miembroInterno.fechaCreacion, 
        })

        return miembroInterno
    }

    async obtenerPorUID(uidEquipo = '', uidMiembro = '') {
        const snapshot = await firebaseFirestoreService
        .collection(this.collection_name_equipos).doc(uidEquipo)
        .collection(this.collection_name_miembrosInternos)
        .where('uid', '==', uidMiembro)
        .get()

        if (snapshot.empty) return null
        const doc = snapshot.docs[0]

        return this._obtenerDeDocumento(doc)
    }

    async actualizar(uidEquipo = '', uidMiembro = '', datosActualizados = MiembroInternoEquipo.params) {
        await firebaseFirestoreService
        .collection(this.collection_name_equipos).doc(uidEquipo)
        .collection(this.collection_name_miembrosInternos).doc(uidMiembro)
        .update(datosActualizados)
    }

    async eliminar(uidEquipo = '', uidMiembro = '') {
        await firebaseFirestoreService
        .collection(this.collection_name_equipos).doc(uidEquipo)
        .collection(this.collection_name_miembrosInternos).doc(uidMiembro)
        .delete()
    }

    _obtenerDeDocumento(doc) {

        // Retorna una instancia User desde una instancia Document de Firestore.
        const data = doc.data()

        return new MiembroInternoEquipo({
            uid: data.uid,
            uidEquipo: data.uidEquipo,
            rol: data.rol,
            estado: data.estado,
            fechaCreacion: data.fechaCreacion,
        })
    }
}

export default FirestoreMiembroInternoEquipoRepository
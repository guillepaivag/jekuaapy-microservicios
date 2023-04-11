import MiembroEquipo from '../models/MiembroEquipo.js'
import firebaseFirestoreService from '../../firebase-service/firebase-firestore-service.js'
import collections_name_firestore from '../../firebase-service/collections_name_firestore/collections_name_firestore.js'

class FirestoreMiembroEquipoRepository {

    constructor(isTest) {
        let collection_name_equipos = collections_name_firestore.equipos
        let collection_name_miembrosEquipo = collections_name_firestore.miembrosEquipo

        if (isTest) collection_name_equipos += '_test'
        if (isTest) collection_name_miembrosEquipo += '_test'

        this.collection_name_equipos = collection_name_equipos
        this.collection_name_miembrosEquipo = collection_name_miembrosEquipo
        this.isTest = isTest
    }

    async crear(uidEquipo = '', miembroEquipo = MiembroEquipo.params) {
        await firebaseFirestoreService
        .collection(this.collection_name_equipos).doc(uidEquipo)
        .collection(this.collection_name_miembrosEquipo).doc(miembroEquipo.uid)
        .set({
            uid: miembroEquipo.uid,
            uidEquipo: miembroEquipo.uidEquipo,
            roles: miembroEquipo.roles, 
            estado: miembroEquipo.estado, 
            fechaCreacion: miembroEquipo.fechaCreacion, 
            fechaEliminacion: miembroEquipo.fechaEliminacion,
        })

        return miembroEquipo
    }

    async obtenerPorUID(uidEquipo = '', uidMiembro = '') {
        const doc = await firebaseFirestoreService
        .collection(this.collection_name_equipos).doc(uidEquipo)
        .collection(this.collection_name_miembrosEquipo).doc(uidMiembro)
        .get()

        if (!doc.exists) return null
        const miembroEquipo = this._obtenerDeDocumento(doc)

        return miembroEquipo
    }

    async actualizar(uidEquipo = '', uidMiembro = '', datosActualizados = MiembroEquipo.params) {
        await firebaseFirestoreService
        .collection(this.collection_name_equipos).doc(uidEquipo)
        .collection(this.collection_name_miembrosEquipo).doc(uidMiembro)
        .update(datosActualizados)
    }

    async eliminar(uidEquipo = '', uidMiembro = '', fechaEliminacion = null) {
        await firebaseFirestoreService
        .collection(this.collection_name_equipos).doc(uidEquipo)
        .collection(this.collection_name_miembrosEquipo).doc(uidMiembro)
        .update({
            estado: 'eliminado',
            fechaEliminacion,
        })
    }

    _obtenerDeDocumento(doc) {
        // Retorna una instancia User desde una instancia Document de Firestore.
        const data = doc.data()

        return new MiembroEquipo({
            uid: data.uid,
            uidEquipo: data.uidEquipo,
            roles: data.roles,
            estado: data.estado, 
            fechaCreacion: data.fechaCreacion, 
            fechaEliminacion: data.fechaEliminacion,
        })
    }
}

export default FirestoreMiembroEquipoRepository
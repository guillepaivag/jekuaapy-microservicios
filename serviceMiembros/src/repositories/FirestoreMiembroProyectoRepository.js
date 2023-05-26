import MiembroProyecto from '../models/MiembroProyecto.js'
import firebaseFirestoreService from '../../firebase-service/firebase-firestore-service.js'
import collections_name_firestore from '../../firebase-service/collections_name_firestore/collections_name_firestore.js'

class FirestoreMiembroProyectoRepository {

    constructor(isTest) {
        let collection_name_equipos = collections_name_firestore.equipos
        let collection_name_proyectosEquipo = collections_name_firestore.proyectosEquipo
        let collection_name_miembrosProyecto = collections_name_firestore.miembrosProyecto

        if (isTest) collection_name_equipos += '_test'
        if (isTest) collection_name_proyectosEquipo += '_test'
        if (isTest) collection_name_miembrosProyecto += '_test'

        this.collection_name_equipos = collection_name_equipos
        this.collection_name_proyectosEquipo = collection_name_proyectosEquipo
        this.collection_name_miembrosProyecto = collection_name_miembrosProyecto
        this.isTest = isTest
    }

    async crear(uidEquipo = '', uidProyecto = '', miembroProyecto = MiembroProyecto.params) {
        await firebaseFirestoreService
        .collection(this.collection_name_equipos).doc(uidEquipo)
        .collection(this.collection_name_proyectosEquipo).doc(uidProyecto)
        .collection(this.collection_name_miembrosProyecto).doc(miembroProyecto.uid)
        .set({
            uid: miembroProyecto.uid,
            uidEquipo: miembroProyecto.uidEquipo,
            uidProyecto: miembroProyecto.uidProyecto, 
            estado: miembroProyecto.estado,
            fechaCreacion: miembroProyecto.fechaCreacion,
            fechaEliminacion: miembroProyecto.fechaEliminacion, 
        })

        return miembroProyecto
    }

    async obtenerPorUID(uidEquipo = '', uidProyecto = '', uidMiembro = '') {
        const doc = await firebaseFirestoreService
        .collection(this.collection_name_equipos).doc(uidEquipo)
        .collection(this.collection_name_proyectosEquipo).doc(uidProyecto)
        .collection(this.collection_name_miembrosProyecto).doc(uidMiembro)
        .get()

        if (!doc.exists) return null
        const miembroProyecto = this._obtenerDeDocumento(doc)

        return miembroProyecto
    }

    async eliminar(uidEquipo = '', uidProyecto = '', uidMiembro = '', fechaEliminacion = null) {
        await firebaseFirestoreService
        .collection(this.collection_name_equipos).doc(uidEquipo)
        .collection(this.collection_name_proyectosEquipo).doc(uidProyecto)
        .collection(this.collection_name_miembrosProyecto).doc(uidMiembro)
        .update({
            estado: 'eliminado',
            fechaEliminacion,
        })
    }

    async eliminarMimebroProyectoDeTodosSusProyectos (uidEquipo = '', uidMiembro = '', fechaEliminacion = null) {
        const miembrosEliminados = []
        
        const snapshot = await firebaseFirestoreService
        .collectionGroup(this.collection_name_miembrosProyecto)
        .where('uid', '==', uidMiembro)
        .where('uidEquipo', '==', uidEquipo)
        .where('estado', '!=', 'eliminado')
        .get()

        const docs = snapshot.docs

        for (const doc of docs) {
            const miembroProyecto = this._obtenerDeDocumento(doc)
            this.eliminar(
                miembroProyecto.uidEquipo, 
                miembroProyecto.uidProyecto, 
                miembroProyecto.uid, 
                fechaEliminacion
            )
            miembrosEliminados.push(miembroProyecto)
        }

        return miembrosEliminados
    }

    _obtenerDeDocumento(doc) {
        // Retorna una instancia User desde una instancia Document de Firestore.
        const data = doc.data()

        return new MiembroProyecto({
            uid: data.uid,
            uidEquipo: data.uidEquipo,
            uidProyecto: data.uidProyecto,
            estado: data.estado,
            fechaCreacion: data.fechaCreacion,
            fechaEliminacion: data.fechaEliminacion,
        })
    }
}

export default FirestoreMiembroProyectoRepository
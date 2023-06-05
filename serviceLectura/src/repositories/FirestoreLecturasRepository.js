import collections_name_firestore from '../../firebase-service/collections_name_firestore/collections_name_firestore.js'
import firebaseFirestoreService from '../../firebase-service/firebase-firestore-service.js'
import Lectura from '../models/Lectura.js'
import { milliseconds_a_timestamp } from '../utils/timestamp.js'

// Implementación con Firestore para el repositorio de libros.
// Recibe la conexión con Firestore externamente.

class FirestoreLecturasRepository {

    constructor(isTest) {

        // Obtener el nombre de la colección desde variables de entorno.
        // Si "test" es true, se le agrega un sufijo, útil para que 
        // las pruebas de integración no sobreescriban los datos existentes.

        let collection_name_equipos = collections_name_firestore.equipos
        let collection_name_lectura = collections_name_firestore.lecturas

        if (isTest) collection_name_equipos += '_test'
        if (isTest) collection_name_lectura += '_test'

        this.collection_name_equipos = collection_name_equipos
        this.collection_name_lectura = collection_name_lectura
        this.isTest = isTest
    }

    async obtenerPorUID(uidEquipo = '', uid = '') {

        const query = firebaseFirestoreService.collection(this.collection_name_equipos).doc(uidEquipo)
            .collection(this.collection_name_lectura)
            .where('uid', '==', uid)
            .where('estado', '!=', 'eliminado')

        const snapshot = await query.get()
        if (snapshot.empty) return null

        const doc = snapshot.docs[0]

        return this._obtenerDeDocumento(doc)

    }

    async crear(lectura = Lectura.params) {

        const doc = firebaseFirestoreService.collection(this.collection_name_lectura).doc()

        await firebaseFirestoreService.collection(this.collection_name_equipos).doc(lectura.uidEquipo)
        .collection(this.collection_name_lectura).doc(doc.id).set({
            uid: doc.id,
            uidEquipo: lectura.uidEquipo,
            uidCreador: lectura.tipoLectura,
            estado: lectura.estado,
            fechaCreacion: lectura.fechaCreacion,
            fechaEliminacion: lectura.fechaEliminacion,
        })

        lectura.uid = doc.id

        return lectura

    }

    async actualizar(uidEquipo = '', uid = '', datosActualizados = Lectura.params) {

        const doc = firebaseFirestoreService.collection(this.collection_name_equipos).doc(uidEquipo)
        .collection(this.collection_name_lectura).doc(uid)
        await doc.update(datosActualizados)

        return datosActualizados

    }

    async eliminar(uidEquipo = '', uid = '') {

        await firebaseFirestoreService.collection(this.collection_name_equipos).doc(uidEquipo)
        .collection(this.collection_name_lectura).doc(uid).update({
            estado: 'eliminado',
            fechaEliminacion: milliseconds_a_timestamp(new Date())
        })

        return true
    }

    _obtenerDeDocumento(doc) {

        // Retorna una instancia User desde una instancia Document de Firestore.
        const data = doc.data()

        return new Lectura({
            uid: data.uid,
            uidEquipo: data.uidEquipo,
            uidCreador: data.tipoLectura,
            estado: data.estado,
            fechaCreacion: data.fechaCreacion,
            fechaEliminacion: data.fechaEliminacion,
        })

    }
}

export default FirestoreLecturasRepository
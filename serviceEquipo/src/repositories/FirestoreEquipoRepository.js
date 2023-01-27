import collections_name_firestore from '../../firebase-service/collections_name_firestore/collections_name_firestore.js'
import firebaseFirestoreService from '../../firebase-service/firebase-firestore-service.js'
import { milliseconds_a_timestamp } from '../helpers/timestamp.js'
import Equipo from '../models/Equipo.js'


class FirestoreEquipoRepository {

    constructor(isTest) {

        // Obtener el nombre de la colección desde variables de entorno.
        // Si "test" es true, se le agrega un sufijo, útil para que 
        // las pruebas de integración no sobreescriban los datos existentes.

        let collection_name = collections_name_firestore.equipos

        if (isTest) collection_name += '_test'

        this.collection = firebaseFirestoreService.collection(collection_name)
        this.isTest = isTest

    }

    async obtenerTodos() {

        const snapshot = await this.collection.get();
        const equipos = snapshot.docs.map(doc => this._obtenerDeDocumento(doc));

        return equipos;

    }

    async obtenerPorUID(uid = '') {


        const snapshot = await this.collection
            .where('uid', '==', uid)
            .where('estado', '==', 'activo')
            .get()

        if (snapshot.empty) return null

        const doc = snapshot.docs[0]

        return this._obtenerDeDocumento(doc)

    }

    async obtenerPorCodigo(codigo = '') {

        const snapshot = await this.collection
            .where('codigo', '==', codigo)
            .where('estado', '==', 'activo')
            .get()

        if (snapshot.empty) return null

        const doc = snapshot.docs[0]

        return this._obtenerDeDocumento(doc)

    }

    async crear(equipo = Equipo.params) {

        const doc = this.collection.doc();

        await this.collection.doc(doc.id).set({
            uid: doc.id,
            responsable: equipo.responsable, 
            codigo: equipo.codigo, 
            nombre: equipo.nombre, 
            descripcion: equipo.descripcion, 
            fechaCreacion: milliseconds_a_timestamp(Date.now()),
            fechaEliminado: null,
            estado: 'activo', 
            cantidadMiembros: 0, 
        })

        equipo.uid = doc.id

        return equipo

    }

    async actualizar(uid = '', datosActualizados = {}) {

        const doc = this.collection.doc(uid)

        await doc.update(
            datosActualizados
        )

        return datosActualizados

    }

    async eliminar(uid = '') {

        await this.collection.doc(uid).delete()

        return true

    }

    _obtenerDeDocumento(doc) {

        // Retorna una instancia User desde una instancia Document de Firestore.
        const data = doc.data()

        return new Equipo({
            uid: data.uid,
            responsable: data.responsable,
            codigo: data.codigo,
            nombre: data.nombre,
            descripcion: data.descripcion,
            fechaCreacion: data.fechaCreacion,
            fechaEliminado: data.fechaEliminado,
            estado: data.estado,
            cantidadMiembros: data.cantidadMiembros,
        })
    }
}

export default FirestoreEquipoRepository
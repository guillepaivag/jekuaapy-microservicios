import Equipo from '../models/Equipo.js'
import firebaseFirestoreService from '../../firebase-service/firebase-firestore-service.js'
import collections_name_firestore from '../../firebase-service/collections_name_firestore/collections_name_firestore.js'

class FirestoreEquipoRepository {

    constructor (isTest) {
        // Obtener el nombre de la colección desde variables de entorno.
        // Si "test" es true, se le agrega un sufijo, útil para que 
        // las pruebas de integración no sobreescriban los datos existentes.

        let collection_name = collections_name_firestore.equipos

        if (isTest) collection_name += '_test'

        this.collection = firebaseFirestoreService.collection(collection_name)
        this.isTest = isTest
    }

    async crear(equipo = Equipo.params) {
        const doc = this.collection.doc()

        await this.collection.doc(doc.id).set({
            uid: doc.id,
            responsable: equipo.responsable, 
            codigo: equipo.codigo, 
            nombre: equipo.nombre, 
            descripcion: equipo.descripcion, 
            cantidadMiembros: 0,
            estado: 'activo',
            fechaCreacion: equipo.fechaCreacion, 
            fechaEliminado: null, 
        })

        equipo.uid = doc.id

        return equipo
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

    async actualizar(uid = '', datosActualizados = {}) {
        const doc = this.collection.doc(uid)
        await doc.update(datosActualizados)
    }

    async eliminar(uid = '', fechaEliminado) {
        const doc = this.collection.doc(uid)
        await doc.update({
            estado: 'eliminado',
            fechaEliminado
        })
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
            cantidadMiembros: data.cantidadMiembros,
            estado: data.estado,
            fechaCreacion: data.fechaCreacion,
            fechaEliminado: data.fechaEliminado,
        })
    }
}

export default FirestoreEquipoRepository
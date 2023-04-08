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

    async crear(equipoNuevo = Equipo.params) {
        const doc = this.collection.doc()

        equipoNuevo.uid = doc.id

        await this.collection.doc(doc.id).set({
            uid: doc.id,
            responsable: equipoNuevo.responsable, 
            codigo: equipoNuevo.codigo, 
            nombre: equipoNuevo.nombre, 
            descripcion: equipoNuevo.descripcion, 
            cantidadMiembros: equipoNuevo.cantidadMiembros, 
            cantidadMiembrosPorRol: equipoNuevo.cantidadMiembrosPorRol, 
            cantidadProyectos: equipoNuevo.cantidadProyectos, 
            cantidadContenidos: equipoNuevo.cantidadContenidos, 
            cantidadContenidosPorTipo: equipoNuevo.cantidadContenidosPorTipo, 
            estado: equipoNuevo.estado, 
            fechaCreacion: equipoNuevo.fechaCreacion, 
            fechaEliminado: equipoNuevo.fechaEliminado, 
        })

        return new Equipo(equipoNuevo) 
    }

    async obtenerPorUID(uid = '') {
        const doc = await this.collection.doc(uid).get()

        if (!doc.exists) return null
        const equipo = this._obtenerDeDocumento(doc)
        if (equipo.estado === 'eliminado') return null
    
        return equipo
    }

    async obtenerPorCodigo(codigo = '') {
        const snapshot = await this.collection
            .where('codigo', '==', codigo)
            .where('estado', '!=', 'eliminado')
            .get()

        if (snapshot.empty) return null
        const doc = snapshot.docs[0]

        return this._obtenerDeDocumento(doc)
    }

    async actualizar(uid = '', datosActualizados = Equipo.params) {
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
        const documentData = doc.data()
        const data = Equipo.structureData(documentData)
        return new Equipo(data)
    }
}

export default FirestoreEquipoRepository
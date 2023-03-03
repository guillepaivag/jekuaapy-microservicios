import collections_name_firestore from '../../firebase-service/collections_name_firestore/collections_name_firestore.js'
import firebaseFirestoreService from '../../firebase-service/firebase-firestore-service.js'
import Proyecto from '../models/Proyecto.js'

// Implementación con Firestore para el repositorio de libros.
// Recibe la conexión con Firestore externamente.

class FirestoreProyectosRepository {

    constructor(isTest) {

        // Obtener el nombre de la colección desde variables de entorno.
        // Si "test" es true, se le agrega un sufijo, útil para que 
        // las pruebas de integración no sobreescriban los datos existentes.

        let collection_name = collections_name_firestore.proyectos

        if (isTest) collection_name += '_test'

        this.collection = firebaseFirestoreService.collection(collection_name)
        this.isTest = isTest

    }

    async obtenerPorUID(uid = '') {

        const query = this.collection
            .where('uid', '==', uid)
            .where('estado', '!=', 'eliminado')

        const snapshot = await query.get()
        if (snapshot.empty) return null

        const doc = snapshot.docs[0]

        return this._obtenerDeDocumento(doc)

    }

    async obtenerPorCodigoProyecto(codigo = '') {

        const query = this.collection
            .where('codigo', '==', codigo)
            .where('estado', '!=', 'eliminado')

        const snapshot = await query.get()
        if (snapshot.empty) return null

        const doc = snapshot.docs[0]

        return this._obtenerDeDocumento(doc)

    }

    async crear(proyecto = Proyecto.params) {

        const doc = this.collection.doc()

        await this.collection.doc(doc.id).set({
            uid: doc.id,
            uidEquipo: proyecto.uidEquipo,
            tipoProyecto: proyecto.tipoProyecto,
            nombre: proyecto.nombre,
            codigo: proyecto.codigo,
            fotoPerfil: proyecto.fotoPerfil,
            fotoPortada: proyecto.fotoPortada,
            cantidadMiembros: proyecto.cantidadMiembros,
            cantidadElementos: proyecto.cantidadElementos,
            cantidadesPorTipoDeElemento: proyecto.cantidadesPorTipoDeElemento,
            estado: proyecto.estado,
            fechaCreacion: proyecto.fechaCreacion,
            fechaEliminacion: proyecto.fechaEliminacion,
        })

        proyecto.uid = doc.id

        return proyecto

    }

    async actualizar(uid = '', datosActualizados = Proyecto.params) {

        const doc = this.collection.doc(uid)
        await doc.update(datosActualizados)

        return datosActualizados

    }

    async eliminar(uid = '') {

        await this.collection.doc(uid).update({
            estado: 'eliminado',
        })

        return true
    }

    _obtenerDeDocumento(doc) {

        // Retorna una instancia User desde una instancia Document de Firestore.
        const data = doc.data()

        return new Proyecto({
            uid: data.uid,
            uidEquipo: data.uidEquipo,
            tipoProyecto: data.tipoProyecto,
            nombre: data.nombre,
            codigo: data.codigo,
            fotoPerfil: data.fotoPerfil,
            fotoPortada: data.fotoPortada,
            cantidadMiembros: data.cantidadMiembros,
            cantidadElementos: data.cantidadElementos,
            cantidadesPorTipoDeElemento: data.cantidadesPorTipoDeElemento,
            estado: data.estado,
            fechaCreacion: data.fechaCreacion,
            fechaEliminacion: data.fechaEliminacion,
        })

    }
}

export default FirestoreProyectosRepository
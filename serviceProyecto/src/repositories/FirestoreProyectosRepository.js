import collections_name_firestore from '../../firebase-service/collections_name_firestore/collections_name_firestore.js'
import firebaseFirestoreService from '../../firebase-service/firebase-firestore-service.js'
import Proyecto from '../models/Proyecto.js'
import { milliseconds_a_timestamp } from '../utils/timestamp.js'

// Implementación con Firestore para el repositorio de libros.
// Recibe la conexión con Firestore externamente.

class FirestoreProyectosRepository {

    constructor(isTest) {

        // Obtener el nombre de la colección desde variables de entorno.
        // Si "test" es true, se le agrega un sufijo, útil para que 
        // las pruebas de integración no sobreescriban los datos existentes.

        let collection_name_equipos = collections_name_firestore.equipos
        let collection_name_proyecto = collections_name_firestore.proyectos

        if (isTest) collection_name_equipos += '_test'
        if (isTest) collection_name_proyecto += '_test'

        this.collection_name_equipos = collection_name_equipos
        this.collection_name_proyecto = collection_name_proyecto
        this.isTest = isTest
    }

    async obtenerPorUID(uidEquipo = '', uid = '') {

        const query = firebaseFirestoreService.collection(this.collection_name_equipos).doc(uidEquipo)
            .collection(this.collection_name_proyecto)
            .where('uid', '==', uid)
            .where('estado', '!=', 'eliminado')

        const snapshot = await query.get()
        if (snapshot.empty) return null

        const doc = snapshot.docs[0]

        return this._obtenerDeDocumento(doc)

    }

    async obtenerPorCodigoProyecto(uidEquipo = '', codigo = '') {

        const query = firebaseFirestoreService.collection(this.collection_name_equipos).doc(uidEquipo)
            .collection(this.collection_name_proyecto)
            .where('codigo', '==', codigo)
            .where('estado', '!=', 'eliminado')

        const snapshot = await query.get()
        if (snapshot.empty) return null

        const doc = snapshot.docs[0]

        return this._obtenerDeDocumento(doc)

    }

    async crear(proyecto = Proyecto.params) {

        console.log("proyecto",proyecto)

        const doc = firebaseFirestoreService.collection(this.collection_name_proyecto).doc()

        await firebaseFirestoreService.collection(this.collection_name_equipos).doc(proyecto.uidEquipo)
        .collection(this.collection_name_proyecto).doc(doc.id).set({
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

    async actualizar(uidEquipo = '', uid = '', datosActualizados = Proyecto.params) {

        const doc = firebaseFirestoreService.collection(this.collection_name_equipos).doc(uidEquipo)
        .collection(this.collection_name_proyecto).doc(uid)
        await doc.update(datosActualizados)

        return datosActualizados

    }

    async eliminar(uidEquipo = '', uid = '') {

        await firebaseFirestoreService.collection(this.collection_name_equipos).doc(uidEquipo)
        .collection(this.collection_name_proyecto).doc(uid).update({
            estado: 'eliminado',
            fechaEliminacion: milliseconds_a_timestamp(new Date())
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
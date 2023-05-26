import { Timestamp, DocumentSnapshot } from "firebase-admin/firestore"
import { CreateTemaDto } from "../domain/dtos/tema.dto";
import { ITemaRepository } from "../domain/interfaces/repositories/tema.repository";
import { Tema } from "../domain/models/tema.model";
import firebaseFirestoreService from "../firebase-service/firebase-firestore-service";
import * as collectionsFirestore from "../firebase-service/collections_name_firestore/collections_name_firestore";

export class TemaRepository implements ITemaRepository {
    
    private collection_firestore_equipos: string
    private collection_firestore_proyectos: string
    private collection_firestore_temas: string

    constructor (private isTest: Boolean) {
        this.collection_firestore_equipos = collectionsFirestore.collection_firestore_equipos
        this.collection_firestore_proyectos = collectionsFirestore.collection_firestore_proyectos
        this.collection_firestore_temas = collectionsFirestore.collection_firestore_temas

        this.isTest ? this.collection_firestore_equipos += '_test' : ''
        this.isTest ? this.collection_firestore_proyectos += '_test' : ''
        this.isTest ? this.collection_firestore_temas += '_test' : ''
    }

    async create(newTema: CreateTemaDto, orden: number): Promise<Tema> {       
        const document = firebaseFirestoreService.collection(this.collection_firestore_temas).doc()
        const tema = {
            uid: document.id,
            nombre: newTema.nombre,
            orden: orden,
            uidEquipo: newTema.uidEquipo,
            uidProyecto: newTema.uidProyecto,
            fechaCreacion: Timestamp.fromMillis(Date.now())
        }

        firebaseFirestoreService
        .collection(this.collection_firestore_equipos).doc(newTema.uidEquipo)
        .collection(this.collection_firestore_proyectos).doc(newTema.uidProyecto)
        .collection(this.collection_firestore_temas).doc(document.id)
        .set(tema)

        return tema
    }

    async get(uidEquipo: string, uidProyecto: string, uidTema: string): Promise<Tema> {
        const documentTema = await firebaseFirestoreService
        .collection(this.collection_firestore_equipos).doc(uidEquipo)
        .collection(this.collection_firestore_proyectos).doc(uidProyecto)
        .collection(this.collection_firestore_temas).doc(uidTema)
        .get()

        return this._getFromDocument(documentTema)
    }

    async update(uidEquipo: string, uidProyecto: string, uidTema: string, temaUpdated: object) {
        const documentReferenceTema = firebaseFirestoreService
        .collection(this.collection_firestore_equipos).doc(uidEquipo)
        .collection(this.collection_firestore_proyectos).doc(uidProyecto)
        .collection(this.collection_firestore_temas).doc(uidTema)

        await documentReferenceTema.update(temaUpdated)
    }

    async delete(uidEquipo: string, uidProyecto: string, uidTema: string) {
        const documentReferenceTema = firebaseFirestoreService
        .collection(this.collection_firestore_equipos).doc(uidEquipo)
        .collection(this.collection_firestore_proyectos).doc(uidProyecto)
        .collection(this.collection_firestore_temas).doc(uidTema)

        await documentReferenceTema.delete()
    }

    private _getFromDocument (documentFirestore: DocumentSnapshot): Tema {
        const data = documentFirestore.data()

        return { 
            uid: data.uid, 
            nombre: data.nombre, 
            orden: data.orden, 
            uidEquipo: data.uidEquipo,
            uidProyecto: data.uidProyecto, 
            fechaCreacion: data.fechaCreacion, 
        }
    }
}
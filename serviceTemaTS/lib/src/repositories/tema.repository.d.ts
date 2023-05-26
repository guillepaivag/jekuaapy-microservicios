import { CreateTemaDto } from "../domain/dtos/tema.dto";
import { ITemaRepository } from "../domain/interfaces/repositories/tema.repository";
import { Tema } from "../domain/models/tema.model";
export declare class TemaRepository implements ITemaRepository {
    private isTest;
    private collection_firestore_equipos;
    private collection_firestore_proyectos;
    private collection_firestore_temas;
    constructor(isTest: Boolean);
    create(newTema: CreateTemaDto, orden: number): Promise<Tema>;
    get(uidEquipo: string, uidProyecto: string, uidTema: string): Promise<Tema>;
    update(uidEquipo: string, uidProyecto: string, uidTema: string, temaUpdated: object): Promise<void>;
    delete(uidEquipo: string, uidProyecto: string, uidTema: string): Promise<void>;
    private _getFromDocument;
}

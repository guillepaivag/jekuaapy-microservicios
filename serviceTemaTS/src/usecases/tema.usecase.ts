import { CreateTemaDto } from "../domain/dtos/tema.dto";
import { ITemaRepository } from "../domain/interfaces/repositories/tema.repository";
import { ITemaUseCase } from "../domain/interfaces/usecases/tema.usecase";
import { Tema } from "../domain/models/tema.model";

export class TemaUseCase implements ITemaUseCase {
    
    constructor (private temaRepository: ITemaRepository) {}

    async create(newTema: CreateTemaDto, orden: number): Promise<Tema> {
        return this.temaRepository.create(newTema, orden)
    }

    async get(uidEquipo: string, uidProyecto: string, uidTema: string): Promise<Tema> {
        return this.temaRepository.get(uidEquipo, uidProyecto, uidTema)
    }

    async update(uidEquipo: string, uidProyecto: string, uidTema: string, temaUpdated: object) {
        this.temaRepository.update(uidEquipo, uidProyecto, uidTema, temaUpdated)
    }

    async delete(uidEquipo: string, uidProyecto: string, uidTema: string) {
        this.temaRepository.delete(uidEquipo, uidProyecto, uidTema)
    }
}
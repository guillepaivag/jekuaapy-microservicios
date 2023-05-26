import { CreateTemaDto } from "../domain/dtos/tema.dto";
import { ITemaRepository } from "../domain/interfaces/repositories/tema.repository";
import { ITemaUseCase } from "../domain/interfaces/usecases/tema.usecase";
import { Tema } from "../domain/models/tema.model";
export declare class TemaUseCase implements ITemaUseCase {
    private temaRepository;
    constructor(temaRepository: ITemaRepository);
    create(newTema: CreateTemaDto, orden: number): Promise<Tema>;
    get(uidEquipo: string, uidProyecto: string, uidTema: string): Promise<Tema>;
    update(uidEquipo: string, uidProyecto: string, uidTema: string, temaUpdated: object): Promise<void>;
    delete(uidEquipo: string, uidProyecto: string, uidTema: string): Promise<void>;
}

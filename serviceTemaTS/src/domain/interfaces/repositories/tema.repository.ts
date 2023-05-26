import { CreateTemaDto } from '../../dtos/tema.dto'
import { Tema } from '../../models/tema.model'

export interface ITemaRepository {
    create(newTema: CreateTemaDto, orden: number): Promise<Tema>
    get(uidEquipo: string, uidProyecto: string, uidTema: string): Promise<Tema>
    update(uidEquipo: string, uidProyecto: string, uidTema: string, temaUpdated: object): void
    delete(uidEquipo: string, uidProyecto: string, uidTema: string): void
}
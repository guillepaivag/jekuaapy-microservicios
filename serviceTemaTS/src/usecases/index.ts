// import { ITemaUseCase } from "../domain/interfaces/usecases/tema.usecase";
import { TemaUseCase } from "./tema.usecase";

export class UseCases {
    tema: TemaUseCase

    constructor (usecases: AllUseCases) {
        this.tema = usecases.tema
    }
}

class AllUseCases {
    tema: TemaUseCase
}
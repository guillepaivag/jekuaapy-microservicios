import { TemaRepository } from "../repositories/tema.repository"
import { UseCases } from "../usecases"
import { TemaUseCase } from "../usecases/tema.usecase"

export const generateUseCases = (isTest: Boolean) : UseCases => {
    const temaUseCase = new TemaUseCase(new TemaRepository(isTest))
    
    return new UseCases({
        tema: temaUseCase
    })
}
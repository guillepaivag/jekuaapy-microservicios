import { Router } from 'express'
import { TemaMiddleware } from '../middlewares/tema.middleware'
import { TemaController } from '../controllers/tema.controller'
import { generateUseCases } from '../helpers/generateUseCases'
import { ResponseAppDto } from '../domain/dtos/response-app.dto'

const usecases = generateUseCases(false)
const responseApp = new ResponseAppDto()

export const getTemaRouter = () => {
    const router = Router()

    const temaMiddleware = new TemaMiddleware()
    const temaController = new TemaController(usecases, responseApp)

    router.post('/', 
        temaMiddleware.create.bind(temaMiddleware),
        temaController.create.bind(temaController))

    router.get('/:uid', 
        temaMiddleware.get.bind(temaMiddleware),
        temaController.get.bind(temaController))

    router.patch('/:uid', 
        temaMiddleware.update.bind(temaMiddleware),
        temaController.update.bind(temaController))

    router.delete('/:uid', 
        temaMiddleware.delete.bind(temaMiddleware),
        temaController.delete.bind(temaController))

    return router
}
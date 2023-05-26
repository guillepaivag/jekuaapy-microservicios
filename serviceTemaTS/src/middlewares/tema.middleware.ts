import { Request, Response, NextFunction } from "express"
// import { UseCases } from "../usecases"

export class TemaMiddleware {

    // private readonly usecases: UseCases
    constructor () {}

    async create (req: Request, res: Response, next: NextFunction) {
        // const { tema } = req.body
        
        try {

            req.body.orden = 1

            next()

        } catch (error) {
            console.log('error, middleware.tema.create', error)
            next(error)
        } 
    }

    async get (req: Request, res: Response, next: NextFunction) {
        // const { uidEquipo, uidProyecto, uidTema } = req.params
        
        try {

            

            next()

        } catch (error) {
            console.log('error, middleware.tema.get', error)
            next(error)
        } 
    }

    async update (req: Request, res: Response, next: NextFunction) {
        // const { uidEquipo, uidProyecto, uidTema } = req.params
        // const { tema } = req.body
        
        try {



            next()

        } catch (error) {
            console.log('error, middleware.tema.update', error)
            next(error)
        }
    }

    async delete (req: Request, res: Response, next: NextFunction) {
        // const { uidEquipo, uidProyecto, uidTema } = req.params
        
        try {

            

            next()

        } catch (error) {
            console.log('error, middleware.tema.delete', error)
            next(error)
        } 
    }

}
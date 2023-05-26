import { Request, Response } from "express";
import { UseCases } from "../usecases";
import { ResponseAppDto } from "../domain/dtos/response-app.dto";

export class TemaController {

    constructor (private readonly usecases: UseCases, private readonly responseApp: ResponseAppDto) {}

    async create (req: Request, res: Response) {
        const { tema } = req.body
        
        try {
            const temaCreated = await this.usecases.tema.create(tema, 1)

            this.responseApp.status = 200
            this.responseApp.code = 'exito'
            this.responseApp.result = temaCreated

            res.json(this.responseApp)

        } catch (error) {
            console.log('error, tema.create', error)

            this.responseApp.status = 500
            this.responseApp.code = 'error'
            this.responseApp.result = error.message

            res.json(this.responseApp)
        } 
    }

    async get (req: Request, res: Response) {
        const { uidEquipo, uidProyecto, uidTema } = req.params
        
        try {
            const tema = await this.usecases.tema.get(uidEquipo, uidProyecto, uidTema)

            this.responseApp.status = 200
            this.responseApp.code = 'exito'
            this.responseApp.result = tema

            res.json(this.responseApp)

        } catch (error) {
            console.log('error, tema.get', error)

            this.responseApp.status = 500
            this.responseApp.code = 'error'
            this.responseApp.result = error.message

            res.json(this.responseApp)

        }
    }

    async update (req: Request, res: Response) {
        const { uidEquipo, uidProyecto, uidTema } = req.params
        const { tema } = req.body
        
        try {
            await this.usecases.tema.update(uidEquipo, uidProyecto, uidTema, tema)

            this.responseApp.status = 200
            this.responseApp.code = 'exito'
            this.responseApp.result = null

            res.json(this.responseApp)

        } catch (error) {
            console.log('error, tema.update', error)

            this.responseApp.status = 500
            this.responseApp.code = 'error'
            this.responseApp.result = error.message

            res.json(this.responseApp)

        }
    }

    async delete (req: Request, res: Response) {
        const { uidEquipo, uidProyecto, uidTema } = req.params
        
        try {
            await this.usecases.tema.delete(uidEquipo, uidProyecto, uidTema)

            this.responseApp.status = 200
            this.responseApp.code = 'exito'
            this.responseApp.result = null

            res.json(this.responseApp)

        } catch (error) {
            console.log('error, tema.delete', error)

            this.responseApp.status = 500
            this.responseApp.code = 'error'
            this.responseApp.result = error.message

            res.json(this.responseApp)

        }
    }
}
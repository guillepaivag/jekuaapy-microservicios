import { Request, Response } from "express";
import { UseCases } from "../usecases";
import { ResponseAppDto } from "../domain/dtos/response-app.dto";
export declare class TemaController {
    private usecases;
    private responseApp;
    constructor(usecases: UseCases, responseApp: ResponseAppDto);
    create(req: Request, res: Response): Promise<void>;
    get(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
}

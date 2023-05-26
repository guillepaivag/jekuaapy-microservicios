import { Request, Response, NextFunction } from "express";
export declare class TemaMiddleware {
    constructor();
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
}

import { Application } from "express";
import { getTemaRouter } from "../../routes/tema.route";

export const setRoutes = (app: Application) => {
    app.use('/temas', getTemaRouter())
}
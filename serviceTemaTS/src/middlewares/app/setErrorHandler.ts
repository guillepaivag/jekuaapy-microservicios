import { Application } from "express";

export const setErrorHandler = (app: Application) => {
    app.use((error, req, res, next) => { 
        console.log('Error en middleware: ', error)
        // const respuestaManejada = errorHandler(error)
        // return res.status(respuestaManejada.estado).json(respuestaManejada.getRespuesta())
    })
}
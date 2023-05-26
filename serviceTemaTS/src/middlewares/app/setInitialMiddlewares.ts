import express from "express";
import cors from 'cors'

export const setInitialMiddlewares = (app: express.Application) => {
    app.use((req, res, next) => { 
        req.body.timeOfRequest = Date.now()
        next()
    })

    app.use(cors({
        credentials: true,
        origin: ['*'],
        methods: ['GET','POST','DELETE','PUT','UPDATE','PATCH'],
        allowedHeaders: ['Authorization', 'Content-Type']
    }))
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
}
import dotenv from 'dotenv'
dotenv.config()
console.log(`Environment: ${process.env.ENVIRONMENT}`)

import functions from "firebase-functions"
import app from "./src/app.js"
import registroConAlgunProveedor from './src/triggers/registroConAlgunProveedor.js'

export const service_usuario = functions.region('southamerica-east1').https.onRequest(app)
export const triggerRegistroConAlgunProveedor = registroConAlgunProveedor
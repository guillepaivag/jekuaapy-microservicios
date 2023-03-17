import functions from "firebase-functions"
import dotenv from 'dotenv'
import app from "./src/app.js"
import { registroConAlgunProveedor } from "./src/triggers/registroConAlgunProveedor.js"
import { subidaFotoPerfil } from "./src/triggers/subidaFotoPerfil.js"
import { subidaFotoPortada } from "./src/triggers/subidaFotoPortada.js"

dotenv.config()

export const service_usuario = functions.region('southamerica-east1').https.onRequest(app)
export const triggerRegistroConAlgunProveedor = registroConAlgunProveedor
export const triggerSubidaFotoPerfil = subidaFotoPerfil
export const triggerSubidaFotoPortada = subidaFotoPortada
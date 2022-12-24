import dotenv from 'dotenv'
dotenv.config()
console.log(`Environment: ${process.env.ENVIRONMENT}`)

import functions from "firebase-functions"
import app from "./src/app.js"

export let service_usuario = functions.region('southamerica-east1').https.onRequest(app)
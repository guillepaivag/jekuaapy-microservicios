import functions from "firebase-functions"
import dotenv from 'dotenv'
import app from "./src/app.js"

dotenv.config()

export const service_proyecto = functions.region('southamerica-east1').https.onRequest(app)
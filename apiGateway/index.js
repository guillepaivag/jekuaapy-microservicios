import functions from "firebase-functions"
import app from "./src/app.js"

export const api_gateway = functions.region('southamerica-east1').https.onRequest(app)
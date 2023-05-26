// Start writing functions
// https://firebase.google.com/docs/functions/typescript

import dotenv from 'dotenv'
import * as functions from "firebase-functions";
import app from "./app";

dotenv.config()

export const service_tema = functions.region('southamerica-east1').https.onRequest(app)
import express from 'express'
import { setProxies } from './helpers/setProxies.js'

// Aplicación en Express.
const app = express()

// Configuraciones varias.
app.use(express.json())

// Creamos los proxys.
setProxies(app)

export default app
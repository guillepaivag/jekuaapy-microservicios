import express from 'express'
import cors from 'cors'
import config from './configs/config.js'

// Get Routes
import miembrosInternosEquipoRoutes from './routes/miembrosInternosEquipoRoutes.js'

// Manejador de errores
import { errorHandler } from './helpers/errors/error-handler.js'

// App
const app = express()

// Middlewares
app.use((req, res, next) => { 
  req.timeOfRequest = Date.now()
  next()
})

const origin = []
const urlsProduccion = ['']
const urlsDesarrolloLocal = ['http://localhost:3000']
const urlsDesarrolloRemoto = ['']
config.production ? origin.push(...urlsProduccion) : ''
!config.production && config.remote ? origin.push(...urlsDesarrolloRemoto) : ''
!config.production && !config.remote ? origin.push(...urlsDesarrolloLocal) : ''

app.use(cors({
  credentials: true,
  origin,
  methods: ['GET','POST','DELETE','PUT','UPDATE','PATCH'],
  allowedHeaders: ['Authorization', 'Content-Type']
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/miembrosInternosEquipo', miembrosInternosEquipoRoutes)

// Manejo de errores
app.use((error, req, res, next) => { 
  console.log('Error en middleware: ', error)
  const respuestaManejada = errorHandler(error)
  return res.status(respuestaManejada.estado).json(respuestaManejada.getRespuesta())
})

export default app
import express from 'express'
import cors from 'cors'
import config from './configs/config.js'

// Get Routes
import correosUsuariosRoutes from './routes/correosUsuariosRoutes.js'
import correosMiembrosRoutes from './routes/correosMiembrosRoutes.js'

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
app.use('/usuarios', correosUsuariosRoutes)
app.use('/miembros', correosMiembrosRoutes)

// Manejo de errores
app.use((error, req, res, next) => { 
  console.log('Error en middleware: ', error)
  const respuestaManejada = errorHandler(error)
  return res.status(respuestaManejada.estado).json(respuestaManejada.getRespuesta())
})

export default app
import express from 'express'
import cors from 'cors'

// Get Routes
import correosRoutes from './routes/correosRoutes.js'

// App
const app = express()

// Middlewares
app.use(cors({
  credentials: true,
  origin: ['https://jekuaapy.com', 'https://jekuaa-py.web.app', 'http://localhost:3000'],
  methods: ['GET','POST','DELETE','PUT','UPDATE','PATCH'],
  allowedHeaders: ['Authorization', 'Content-Type']
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/correos', correosRoutes)

// Manejo de errores
app.use((error, req, res, next) => { 
  console.log('Error en middleware: ', error)
  const respuestaManejada = errorHandler(error)
  return res.status(respuestaManejada.estado).json(respuestaManejada.getRespuesta())
})

export default app
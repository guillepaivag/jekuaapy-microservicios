import express from 'express'
import cors from 'cors'

// Get Routes
import usuariosRoutes from './routes/usuariosRoutes.js'

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
app.use('/usuarios', usuariosRoutes)

// Manejo de errores
app.use((err, req, res, next) => { 
  console.log('Error en middleware: ', err)
})

export default app
import express from 'express'
import cors from 'cors'
// const manejadorErrores = require('../../helpers/manejoErrores')

const app = express()

app.use(cors({
  credentials: true,
  origin: ['https://jekuaapy.com', 'https://jekuaa-py.web.app', 'http://localhost:3000'],
  methods: ['GET','POST','DELETE','PUT','UPDATE','PATCH'],
  allowedHeaders: ['Authorization', 'Content-Type']
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', require('./routes/estudiante'))

/**
 *  MANEJO DE ERRORES: Para enviar una respuesta con la 
 *  estructura establecida al cliente cuando haya algun 
 *  error. 
 */ 
app.use((err, req, res, next) => { 
  console.log('Error en middleware: ', err)
  
//   const respuesta = manejadorErrores( err )
//   return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
})


export default app
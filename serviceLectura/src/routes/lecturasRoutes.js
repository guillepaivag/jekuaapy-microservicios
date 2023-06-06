import { Router } from 'express'
import { estaAutenticado } from '../middlewares/estaAutenticado.js'
import { verificarCreacionLectura, verificarActualizacionLectura, verificarEliminacionLectura } from '../middlewares/lecturasMiddlewares.js'
import { crear, obtener, actualizar, eliminar } from '../controllers/lecturaControllers.js'
import { estaAutenticadoUsuarioServicio } from '../middlewares/estaAutenticadoUsuarioServicio.js'

const router = Router()

router.post('/', estaAutenticado, verificarCreacionLectura, crear)

router.get('/:uidEquipo/:uidLectura', obtener)

router.put('/:uidEquipo/:uid', //estaAutenticadoUsuarioServicio, verificarActualizacionLectura, 
actualizar)

router.delete('/:uidEquipo/:uid', //estaAutenticado, verificarEliminacionLectura, 
eliminar)

export default router
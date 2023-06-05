import { Router } from 'express'
import { estaAutenticado } from '../middlewares/estaAutenticado.js'
import { verificarCreacionLectura, verificarActualizacionLectura, verificarEliminacionLectura } from '../middlewares/lecturasMiddlewares.js'
import { crear, obtener, actualizar, restaurarFotoPerfil, restaurarFotoPortada, eliminar } from '../controllers/lecturaControllers.js'
import { estaAutenticadoUsuarioServicio } from '../middlewares/estaAutenticadoUsuarioServicio.js'

const router = Router()

router.post('/', estaAutenticado, verificarCreacionLectura, crear)

router.get('/:uidEquipo/:tipo/:valor', obtener)

router.put('/:uidEquipo/:uid', estaAutenticadoUsuarioServicio, verificarActualizacionLectura, actualizar)

router.put('/restaurarFotoPerfil', restaurarFotoPerfil)

router.put('/restaurarFotoPortada', restaurarFotoPortada)

router.delete('/:uidEquipo/:uid', estaAutenticado, verificarEliminacionLectura, eliminar)

export default router
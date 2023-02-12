import { Router } from 'express'
import { estaAutenticado } from '../middlewares/estaAutenticado.js'
import { estaAutenticadoOpcional } from '../middlewares/estaAutenticadoOpcional.js'
import { verificarCreacionEquipo, verificarObtencionEquipo, verificarActualizacionEquipo, verificarEliminacionEquipo, } from "../middlewares/equiposMiddlewares.js"
import { crear, obtener, actualizar, eliminar } from '../controllers/equiposControllers.js'

const router = Router()

router.post('/', estaAutenticado, verificarCreacionEquipo, crear)

router.get('/:tipo/:valor', estaAutenticadoOpcional, verificarObtencionEquipo, obtener)

router.put('/:uid', estaAutenticado, verificarActualizacionEquipo, actualizar)

router.delete('/:uid', estaAutenticado, verificarEliminacionEquipo, eliminar)

export default router
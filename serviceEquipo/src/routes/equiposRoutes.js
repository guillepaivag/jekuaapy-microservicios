import { Router } from 'express'
import { estaAutenticadoUsuario } from '../middlewares/estaAutenticadoUsuario.js'
import { estaAutenticadoUsuarioServicioOpcional } from '../middlewares/estaAutenticadoUsuarioServicioOpcional.js'
import { verificarCreacionEquipo, verificarObtencionEquipo, verificarActualizacionEquipo, verificarEliminacionEquipo, } from "../middlewares/equiposMiddlewares.js"
import { crear, obtener, actualizar, eliminar } from '../controllers/equiposControllers.js'

const router = Router()

router.post('/', estaAutenticadoUsuario, verificarCreacionEquipo, crear)

router.get('/:uid', estaAutenticadoUsuarioServicioOpcional, verificarObtencionEquipo, obtener)

router.put('/:uid', estaAutenticadoUsuario, verificarActualizacionEquipo, actualizar)

router.delete('/:uid', estaAutenticadoUsuario, verificarEliminacionEquipo, eliminar)

export default router
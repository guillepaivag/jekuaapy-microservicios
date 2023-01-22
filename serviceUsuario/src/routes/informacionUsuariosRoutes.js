import { Router } from 'express'
import { obtener, actualizar } from '../controllers/informacionUsuariosControllers.js'
import { estaAutenticado } from '../middlewares/estaAutenticado.js'
import { verificarActualizacionInformacionUsuario } from '../middlewares/informacionUsuariosMiddlewares.js'

const router = Router()

router.get('/:tipo/:valor', obtener)

router.put('/', estaAutenticado, verificarActualizacionInformacionUsuario, actualizar)

export default router
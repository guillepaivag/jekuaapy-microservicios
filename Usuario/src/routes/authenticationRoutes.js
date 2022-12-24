import { Router } from 'express'
import { obtener, actualizarContrasena } from '../controllers/authenticationController.js'

const router = Router()

router.get('/:tipo/:valor/authentication', obtener)

router.put('/:tipo/:valor/contrasena', actualizarContrasena)

export default router
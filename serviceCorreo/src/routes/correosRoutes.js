import { Router } from 'express'
import { verificarCorreoDeUsuario } from '../controllers/correosControllers.js'

const router = Router()

// Bienvenida [endpoint - privado]

// Enviar verificacion de correo de usuario
router.post('/usuarios/verificarCorreo', verificarCorreoDeUsuario)

export default router
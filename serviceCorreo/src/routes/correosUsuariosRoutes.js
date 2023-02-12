import { Router } from 'express'
import { estaAutenticadoUsuarioServicio } from '../middlewares/estaAutenticadoUsuarioServicio.js'
import { verificarEnvioDeVerificacionDeCorreo } from '../middlewares/correosMiddlewares.js'
import { verificarCorreoDeUsuario } from '../controllers/correosControllers.js'

const router = Router()

// Enviar verificacion de correo de usuario
router.post('/verificarCorreo', estaAutenticadoUsuarioServicio, verificarEnvioDeVerificacionDeCorreo, verificarCorreoDeUsuario)

export default router
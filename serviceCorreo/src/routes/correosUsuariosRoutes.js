import { Router } from 'express'
import { estaAutenticadoServicio } from '../middlewares/estaAutenticadoServicio.js'
import { verificarEnvioDeVerificacionDeCorreo } from '../middlewares/correosUsuariosMiddlewares.js'
import { verificarCorreoDeUsuario } from '../controllers/correosUsuariosControllers.js'

const router = Router()

// Enviar verificacion de correo de usuario
router.post('/verificarCorreo', estaAutenticadoServicio, verificarEnvioDeVerificacionDeCorreo, verificarCorreoDeUsuario)

export default router